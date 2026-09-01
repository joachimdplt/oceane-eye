import { Plus } from 'lucide-react'
import type { FaqContent } from '~/types'
import { GrowText } from '~/components/ui/GrowText'
import { Reveal } from '~/components/ui/Reveal'

/**
 * Les questions fréquentes.
 *
 * Chaque question est un `<details>` natif, et non un dépliant fait à la main :
 * il s'ouvre au clavier, s'annonce comme repliable aux lecteurs d'écran, se
 * trouve par la recherche du navigateur, et fonctionne avant que le JavaScript
 * ait chargé. Aucune de ces quatre choses ne s'obtient gratuitement autrement.
 *
 * Le `+` bascule en `×` par une simple rotation : deux icônes différentes
 * auraient demandé de charger la seconde pour la voir.
 */
export function Questions({ title, faq }: { title: string; faq: FaqContent }) {
  return (
    <section
      id="questions"
      className="relative isolate min-h-svh flex items-center px-6 md:px-gutter py-24 bg-ground overflow-hidden"
    >
      <span aria-hidden="true" className="grain absolute inset-0" />

      <div className="relative w-full max-w-page xl:max-w-wide mx-auto grid md:grid-cols-2 gap-12 md:gap-16 items-start">
        <div className="flex flex-col gap-6 items-start">
          <p className="label text-ink uppercase tracking-eyebrow">{faq.eyebrow}</p>

          <h2 className="title2 title-block text-ink">
            <Reveal>
              <GrowText text={title} delay={0} spread={520} />
            </Reveal>
          </h2>

          <p className="body-text text-muted max-w-sm">{faq.lede}</p>

          <a href={faq.cta.href} className="pill label text-ink mt-4">
            {faq.cta.label}
          </a>
        </div>

        <ul className="flex flex-col">
          {faq.items.map((item) => (
            <li key={item.question} className="border-t border-rule last:border-b">
              <details className="faq group">
                <summary className="flex items-start justify-between gap-6 py-5 cursor-pointer list-none">
                  <span className="body-text text-ink">{item.question}</span>
                  <Plus
                    aria-hidden="true"
                    strokeWidth={1.5}
                    className="faq-mark size-5 shrink-0 mt-1 text-muted"
                  />
                </summary>
                <p className="body-text text-muted pb-5 pr-12">{item.answer}</p>
              </details>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
