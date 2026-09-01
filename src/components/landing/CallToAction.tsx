import { ArrowUpRight } from 'lucide-react'
import type { CallToActionContent } from '~/types'

/**
 * L'appel au rendez-vous, au bas de chaque page.
 *
 * Il n'occupe pas un écran : on l'atteint après avoir tout lu, et lui donner la
 * hauteur d'un bloc obligerait à défiler encore une fois devant une seule
 * phrase.
 *
 * L'adresse est un `mailto:` avec son sujet prérempli, et non un formulaire : un
 * formulaire demande de la confiance avant d'en avoir donné, et il faudrait un
 * serveur pour le recevoir alors que le site n'en a pas. Le jour où un agenda
 * existe, seule l'adresse change.
 */
export function CallToAction({ cta }: { cta: CallToActionContent }) {
  return (
    <section className="relative isolate flex items-center px-6 md:px-gutter py-20 md:py-28 bg-ground overflow-hidden border-t border-rule">
      <span aria-hidden="true" className="grain absolute inset-0" />

      <div className="relative w-full max-w-page xl:max-w-wide mx-auto flex flex-col md:flex-row md:items-end md:justify-between gap-8">
        <div className="flex flex-col gap-4">
          <h2 className="title2 title-block text-ink">{cta.title}</h2>
          <p className="body-text text-muted max-w-md">{cta.note}</p>
        </div>

        <a href={cta.href} className="pill label text-ink shrink-0 gap-2">
          {cta.label}
          <ArrowUpRight aria-hidden="true" strokeWidth={1.5} className="size-4" />
        </a>
      </div>
    </section>
  )
}
