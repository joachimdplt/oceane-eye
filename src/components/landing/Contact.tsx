import type { Contact as ContactDetails } from '~/types'
import { Block } from './Block'
import { BlockTitle } from './BlockTitle'

/**
 * La sortie de la page.
 *
 * Trois adresses en clair et rien d'autre : pas de formulaire. Un formulaire
 * demande de la confiance avant d'en avoir donné, et il faudrait un serveur
 * pour le recevoir alors que le site n'en a pas.
 */
export function Contact({ title, contact }: { title: string; contact: ContactDetails }) {
  const linkClass =
    'title2 text-ink no-underline hover:opacity-70 transition-opacity motion-reduce:transition-none'

  return (
    <Block id="contact" title={<BlockTitle>{title}</BlockTitle>}>
      <ul className="flex flex-col gap-6">
        <li>
          <a href={`mailto:${contact.email}`} className={linkClass}>
            {contact.email}
          </a>
        </li>
        <li>
          {/* Les espaces du numéro sont pour l'œil ; `tel:` veut des chiffres. */}
          <a href={`tel:${contact.phone.replace(/\s/g, '')}`} className={linkClass}>
            {contact.phone}
          </a>
        </li>
        <li>
          <a
            href={contact.instagramUrl}
            target="_blank"
            rel="noreferrer"
            className={linkClass}
          >
            {contact.instagram}
          </a>
        </li>
      </ul>
    </Block>
  )
}
