import type { AboutContent } from '~/types'
import { GrowText } from '~/components/ui/GrowText'
import { Reveal } from '~/components/ui/Reveal'

/**
 * Le bloc du studio : le titre à gauche, le discours et les chiffres à droite.
 *
 * Le chapô est à deux valeurs — la phrase qui annonce en pleine encre, la suite
 * en retrait. Le retrait est une COULEUR DÉCLARÉE et non une opacité : un noir
 * à 60 % change de valeur selon ce qu'il y a derrière, un gris nommé vaut la
 * même chose partout. Celui-ci reste à 4,76:1 sur le fond, donc il se lit
 * encore au lieu d'être seulement décoratif.
 *
 * Les deux blocs ne sont pas alignés en haut : le titre tient le haut du bloc
 * et le texte descend d'un tiers, ce qui laisse le titre respirer plutôt que de
 * les faire commencer côte à côte.
 */
export function About({ title, about }: { title: string; about: AboutContent }) {
  return (
    <section
      id="studio"
      className="relative isolate min-h-svh flex flex-col justify-between gap-16 px-6 md:px-gutter py-24 bg-ground overflow-hidden"
    >
      <span aria-hidden="true" className="grain absolute inset-0" />

      <div className="relative w-full max-w-page xl:max-w-wide mx-auto grid md:grid-cols-2 gap-12 md:gap-16">
        <h2 className="title2 title-block text-ink self-start">
          <Reveal>
            <GrowText text={title} delay={0} spread={520} />
          </Reveal>
        </h2>

        <div className="flex flex-col gap-12 md:pt-24">
          <p className="body-text">
            <span className="text-ink">{about.lede}</span>{' '}
            <span className="text-muted">{about.rest}</span>
          </p>

          {/* Les cartes partagent leur trait plutôt que d'en porter chacune un :
              accolées, deux bordures voisines feraient un filet deux fois plus
              épais que les autres. */}
          <ul className="grid sm:grid-cols-2 border border-rule rounded-card overflow-hidden">
            {about.stats.map((stat, i) => (
              <li
                key={stat.label}
                className={`flex flex-col gap-2 p-6 md:p-8 min-h-52 ${
                  i > 0 ? 'border-t sm:border-t-0 sm:border-l border-rule' : ''
                }`}
              >
                <p className="title1 text-ink leading-none">{stat.value}</p>
                <p className="body-text text-ink">{stat.label}</p>
                <p className="label text-muted mt-auto">{stat.note}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* La porte de sortie du bloc, en bas à gauche : on a lu ce que fait le
          studio, la suite logique est de regarder ce qu'il a fait. */}
      <div className="relative w-full max-w-page xl:max-w-wide mx-auto">
        <a href={about.cta.href} className="pill label text-ink">
          {about.cta.label}
        </a>
      </div>
    </section>
  )
}
