import type { LandingSection } from '~/types'
import { GrowText } from '~/components/ui/GrowText'
import { Reveal } from '~/components/ui/Reveal'

/**
 * Un bloc de la page, un écran.
 *
 * Il ne porte que son titre, au centre : la structure d'abord, le contenu
 * ensuite. Chacun garde son `id` pour être atteint depuis une ancre.
 *
 * `isolate` n'est pas décoratif : il ouvre un contexte d'empilement, sans quoi
 * le `mix-blend-mode` du grain irait chercher ce qu'il y a derrière la section
 * au lieu du fond de la section elle-même.
 */
export function Section({ id, title }: LandingSection) {
  return (
    <section
      id={id}
      className="relative isolate min-h-svh flex items-center justify-center px-6 md:px-gutter bg-ground overflow-hidden"
    >
      <span aria-hidden="true" className="grain absolute inset-0" />

      <h2 className="relative title1 text-accent text-center">
        <Reveal>
          <GrowText text={title} delay={0} spread={520} />
        </Reveal>
      </h2>
    </section>
  )
}
