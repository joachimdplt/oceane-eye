import type { AboutContent } from '~/types'
import { GrowText } from '~/components/ui/GrowText'
import { Reveal } from '~/components/ui/Reveal'

/**
 * Qui tient le studio : le portrait, et ce qu'elle en dit.
 *
 * Séparé du bloc du studio, dont il partageait les données mais pas les pages :
 * l'accueil montre ce que fait la maison, la page « À propos » montre la
 * personne. Deux drapeaux sur un même composant étaient le signe qu'il en
 * cachait deux.
 */
export function Person({ title, about }: { title: string; about: AboutContent }) {
  return (
    <section
      id="studio"
      className="relative isolate min-h-svh flex flex-col justify-center gap-12 md:gap-16 px-6 md:px-gutter pt-32 pb-24 bg-ground overflow-hidden"
    >
      <span aria-hidden="true" className="grain absolute inset-0" />

      <div className="relative w-full max-w-page xl:max-w-wide mx-auto">
        <h1 className="title2 title-block text-ink">
          <Reveal>
            <GrowText text={title} delay={0} spread={520} />
          </Reveal>
        </h1>
      </div>

      <div className="relative w-full max-w-page xl:max-w-wide mx-auto grid md:grid-cols-2 gap-10 md:gap-16 items-center">
        <img
          src={about.person.image}
          alt={about.person.alt}
          decoding="async"
          className="rounded-card w-full max-w-sm aspect-[3/4] object-cover"
        />

        <div className="flex flex-col gap-5 items-start">
          <div className="flex flex-col gap-1">
            <p className="title2 title-panel text-ink">{about.person.name}</p>
            <p className="label text-muted">{about.person.role}</p>
          </div>

          {about.person.lines.map((line) => (
            <p key={line} className="body-text text-muted max-w-prose">
              {line}
            </p>
          ))}

          <a href={about.cta.href} className="pill label text-ink mt-2">
            {about.cta.label}
          </a>
        </div>
      </div>
    </section>
  )
}
