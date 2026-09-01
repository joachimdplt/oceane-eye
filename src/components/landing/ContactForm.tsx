import { useId, useState } from 'react'
import type { FooterContent } from '~/types'
import { sendContactRequest } from '~/utils/contact'

type Statut = 'attente' | 'envoi' | 'envoyé' | 'erreur'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

/**
 * Le formulaire du pied de page.
 *
 * `noValidate` avec une validation à nous : les messages du navigateur sont
 * anglais chez la moitié des visiteurs et ne disent pas la même chose d'un
 * navigateur à l'autre.
 *
 * Quand aucun fournisseur d'envoi n'est configuré, le serveur répond
 * `delivered: false` et la page le dit, avec l'adresse en clair. Un formulaire
 * qui avale silencieusement un message est pire que pas de formulaire du tout.
 */
export function ContactForm({ ui }: { ui: FooterContent['form'] }) {
  const uid = useId()
  const [statut, setStatut] = useState<Statut>('attente')
  const [erreur, setErreur] = useState('')
  const [remis, setRemis] = useState(true)
  const [champs, setChamps] = useState({ name: '', email: '', phone: '', message: '' })

  const set = (cle: keyof typeof champs) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setChamps((c) => ({ ...c, [cle]: e.target.value }))

  async function envoyer(e: React.FormEvent) {
    e.preventDefault()
    if (statut === 'envoi') return

    if (!champs.name.trim() || !champs.email.trim()) {
      setStatut('erreur')
      setErreur(ui.errorRequired)
      return
    }
    if (!EMAIL_RE.test(champs.email.trim())) {
      setStatut('erreur')
      setErreur(ui.errorEmail)
      return
    }

    setStatut('envoi')
    setErreur('')
    try {
      const res = await sendContactRequest({ data: champs })
      setRemis(res.delivered)
      setStatut('envoyé')
    } catch {
      setStatut('erreur')
      setErreur(ui.errorSend)
    }
  }

  if (statut === 'envoyé') {
    return (
      <div className="flex flex-col gap-3">
        <p className="title2 title-panel text-ink">{ui.sentTitle}</p>
        <p className="body-text text-muted max-w-md">{ui.sentBody}</p>
        {!remis ? <p className="body-text text-muted max-w-md">{ui.notDelivered}</p> : null}
      </div>
    )
  }

  const champ = 'w-full bg-transparent border-b border-rule py-3 body-text text-ink placeholder:text-muted focus:outline-none focus:border-ink transition-colors motion-reduce:transition-none'

  return (
    <form onSubmit={envoyer} noValidate className="flex flex-col gap-6">
      {(
        [
          ['name', ui.name, 'text', 'name', true],
          ['email', ui.email, 'email', 'email', true],
          ['phone', ui.phone, 'tel', 'tel', false],
        ] as const
      ).map(([cle, label, type, autoComplete, requis]) => (
        <div key={cle} className="flex flex-col gap-1">
          <label htmlFor={`${uid}-${cle}`} className="label text-muted">
            {label}
            {requis ? null : <span className="ml-1">({ui.optional})</span>}
          </label>
          <input
            id={`${uid}-${cle}`}
            name={cle}
            type={type}
            autoComplete={autoComplete}
            required={requis}
            value={champs[cle]}
            onChange={set(cle)}
            className={champ}
          />
        </div>
      ))}

      <div className="flex flex-col gap-1">
        <label htmlFor={`${uid}-message`} className="label text-muted">
          {ui.message}
        </label>
        <textarea
          id={`${uid}-message`}
          name="message"
          rows={4}
          value={champs.message}
          onChange={set('message')}
          className={`${champ} resize-y min-h-28`}
        />
      </div>

      <div className="flex flex-wrap items-center justify-between gap-4">
        <button type="submit" disabled={statut === 'envoi'} className="pill label text-ink disabled:opacity-60">
          {statut === 'envoi' ? ui.sending : ui.submit}
        </button>

        {statut === 'erreur' ? (
          <p role="alert" className="label text-ink">
            {erreur}
          </p>
        ) : null}
      </div>
    </form>
  )
}
