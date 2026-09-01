import { createServerFn } from '@tanstack/react-start'

export interface ContactRequest {
  name: string
  email: string
  phone: string
  message: string
}

export interface ContactResponse {
  ok: boolean
  /** Faux quand aucun fournisseur n'est configuré : le message n'est que noté. */
  delivered: boolean
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function str(value: unknown, max: number): string {
  return typeof value === 'string' ? value.trim().slice(0, max) : ''
}

/**
 * Pour les champs qui finissent dans un en-tête de courriel.
 *
 * Un saut de ligne ou un caractère de contrôle y est le début d'une injection
 * d'en-tête, et aucun de ces champs n'en a besoin.
 */
function line(value: unknown, max: number): string {
  return str(value, max)
    .replace(/[\u0000-\u001F\u007F]+/g, ' ')
    .trim()
}

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')

/**
 * Ne jamais faire confiance au client pour ce qui atterrit dans un courriel.
 *
 * Le navigateur valide déjà, ce qui est exactement pourquoi on revalide ici :
 * une requête écrite à la main ne passe pas par le navigateur.
 */
function validate(raw: unknown): ContactRequest {
  const input = (raw ?? {}) as Record<string, unknown>
  const name = line(input.name, 200)
  const email = line(input.email, 200)
  if (!name || !email) throw new Error('Le nom et l’adresse sont nécessaires')
  if (!EMAIL_RE.test(email)) throw new Error('Adresse invalide')
  return {
    name,
    email,
    phone: line(input.phone, 60),
    // Le message garde ses retours à la ligne : il est rendu en `pre-wrap` et
    // n'atteint jamais un en-tête.
    message: str(input.message, 4000),
  }
}

function render(data: ContactRequest, stamp: string) {
  const ligne = (label: string, value: string) =>
    value
      ? `<tr><td style="padding:6px 16px 6px 0;font:700 13px/1.4 sans-serif;">${escapeHtml(label)}</td>` +
        `<td style="padding:6px 0;font:400 13px/1.5 sans-serif;">${escapeHtml(value)}</td></tr>`
      : ''

  return {
    subject: `Ocean Eye — ${data.name}`,
    html:
      `<div style="font:400 14px/1.6 sans-serif;color:#0a0a0a;">` +
      `<p style="font:700 15px/1.4 sans-serif;">Message reçu depuis le site, ${escapeHtml(stamp)}</p>` +
      `<table>${ligne('Nom', data.name)}${ligne('Adresse', data.email)}${ligne('Téléphone', data.phone)}</table>` +
      (data.message ? `<p style="white-space:pre-wrap;">${escapeHtml(data.message)}</p>` : '') +
      `</div>`,
  }
}

/**
 * Envoie le message du formulaire.
 *
 * Sans clé d'API configurée, le message est écrit dans les journaux du conteneur
 * plutôt qu'envoyé, et la réponse le dit — la page affiche alors l'adresse en
 * clair. Un formulaire qui avale silencieusement un message est pire que pas de
 * formulaire du tout.
 */
export const sendContactRequest = createServerFn({ method: 'POST' })
  .validator(validate)
  .handler(async ({ data }): Promise<ContactResponse> => {
    const stamp = new Intl.DateTimeFormat('fr-FR', {
      dateStyle: 'long',
      timeStyle: 'short',
      timeZone: 'Europe/Paris',
    }).format(new Date())

    const mail = render(data, stamp)
    const apiKey = process.env.RESEND_API_KEY
    const to = (process.env.CONTACT_TO || 'oceaneye.studio@gmail.com')
      .split(',')
      .map((a) => a.trim())
    const from = process.env.CONTACT_FROM || 'Ocean Eye <onboarding@resend.dev>'

    if (!apiKey) {
      console.warn(
        '[contact] RESEND_API_KEY absente. Message noté au lieu d’être envoyé :',
        JSON.stringify(data, null, 2),
      )
      return { ok: true, delivered: false }
    }

    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from,
        to,
        // La réponse part vers la personne qui a écrit, et non vers l'expéditeur
        // technique : sans ça, répondre au message écrirait au robot.
        reply_to: data.email,
        subject: mail.subject,
        html: mail.html,
      }),
    })
    if (!res.ok) throw new Error(`Resend a répondu ${res.status} : ${await res.text()}`)

    return { ok: true, delivered: true }
  })
