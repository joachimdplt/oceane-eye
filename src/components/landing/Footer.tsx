import { Link } from '@tanstack/react-router'
// `Instagram` n'existe plus dans lucide v1, qui a retiré les icônes de marque.
// `AtSign` dit la même chose pour un identifiant qui commence par une arobase.
import { AtSign, Mail, Phone } from 'lucide-react'
import type { Contact as ContactDetails, FooterContent } from '~/types'
import { ContactForm } from './ContactForm'

type NavLink = { to: string; label: string }

/**
 * Le pied de page, sur toutes les pages.
 *
 * Il porte tout ce qui ferme une visite : la carte de contact avec son
 * formulaire, les coordonnées en clair, les pages du site, et le nom en très
 * grand. C'est lui qui fait l'appel au rendez-vous partout — un bandeau séparé
 * aurait dit deux fois la même chose sur la même page.
 *
 * Les coordonnées sont données EN PLUS du formulaire, pas à la place. Certaines
 * personnes n'écrivent jamais dans un champ dont elles ne savent pas où il
 * arrive, et une adresse qu'on peut copier ne coûte rien.
 *
 * Le nom en bas est rendu par un `aria-hidden` : c'est un motif, il est déjà dit
 * par le titre de la page et par la marque du contact.
 */
export function Footer({
  content,
  contact,
  links,
}: {
  content: FooterContent
  contact: ContactDetails
  links: readonly NavLink[]
}) {
  const lien =
    'body-text text-muted no-underline hover:text-ink transition-colors motion-reduce:transition-none'

  return (
    <footer className="relative isolate bg-ground overflow-hidden">
      <span aria-hidden="true" className="grain absolute inset-0" />

      <div className="relative px-6 md:px-gutter pt-20 md:pt-28 pb-10 flex flex-col gap-16">
        {/* La carte de contact, encadrée comme les cartes de tarifs. */}
        <div className="w-full max-w-page xl:max-w-wide mx-auto border border-rule rounded-card p-6 md:p-10 grid md:grid-cols-2 gap-12 md:gap-16">
          <div className="flex flex-col gap-6">
            <p className="label text-ink uppercase tracking-eyebrow">{content.eyebrow}</p>
            <h2 className="title2 title-block text-ink">{content.title}</h2>
            <p className="body-text text-muted max-w-sm">{content.lede}</p>
          </div>

          <ContactForm ui={content.form} />
        </div>

        <div className="w-full max-w-page xl:max-w-wide mx-auto grid md:grid-cols-2 gap-12">
          <div className="flex flex-col gap-3 items-start">
            <p className="label text-muted">{content.reachTitle}</p>
            <p className="body-text text-muted">{content.availability}</p>

            <a href={`mailto:${contact.email}`} className={`${lien} flex items-center gap-2`}>
              <Mail aria-hidden="true" strokeWidth={1.5} className="size-4" />
              {contact.email}
            </a>
            {/* Les espaces du numéro sont pour l'œil ; `tel:` veut des chiffres. */}
            <a href={`tel:${contact.phone.replace(/\s/g, '')}`} className={`${lien} flex items-center gap-2`}>
              <Phone aria-hidden="true" strokeWidth={1.5} className="size-4" />
              {contact.phone}
            </a>
            <a
              href={contact.instagramUrl}
              target="_blank"
              rel="noreferrer"
              className={`${lien} flex items-center gap-2`}
            >
              <AtSign aria-hidden="true" strokeWidth={1.5} className="size-4" />
              {contact.instagram}
            </a>
          </div>

          <nav aria-label="Pages du site" className="md:justify-self-end">
            <ul className="flex flex-col gap-2">
              {links.map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className={lien}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <p className="w-full max-w-page xl:max-w-wide mx-auto label text-muted">{content.legal}</p>
      </div>

      {/* Le nom, en très grand, coupé par le bas du document.
          Décoratif : il est déjà dit par le titre de la page. */}
      <p aria-hidden="true" className="footer-mark text-ink">
        {content.wordmark}
      </p>
    </footer>
  )
}
