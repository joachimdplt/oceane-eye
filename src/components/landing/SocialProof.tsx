import { Star } from 'lucide-react'
import type { SocialProofContent } from '~/types'

/**
 * La preuve par les clients : un bandeau de mots, puis trois voix.
 *
 * Le bandeau est rendu DEUX FOIS et glisse de la moitié de sa largeur : c'est
 * ce qui rend la boucle sans couture. Une seule copie laisserait un blanc à
 * chaque tour.
 *
 * Les étoiles ne paraissent que si une note existe dans les données. Aucune n'en
 * a pour l'instant, et c'est voulu : des étoiles inventées sur la page de
 * quelqu'un qui vend son jugement coûtent plus cher qu'elles ne rapportent.
 */
export function SocialProof({ title, proof }: { title: string; proof: SocialProofContent }) {
  return (
    <section
      id="confiance"
      className="relative isolate min-h-svh flex flex-col justify-center gap-12 md:gap-16 py-24 bg-ground overflow-hidden"
    >
      <span aria-hidden="true" className="grain absolute inset-0" />

      {/* Le bandeau sort de la colonne : il doit toucher les deux bords. */}
      <div className="relative marquee" aria-hidden="true">
        <div className="marquee-track flex items-baseline">
          {[0, 1].map((copie) => (
            <div key={copie} className="flex items-baseline shrink-0">
              {proof.words.map((word) => (
                <span key={word} className="title2 title-block text-ink px-6 md:px-10 whitespace-nowrap">
                  {word}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
      {/* Le bandeau est décoratif et masqué : sa liste est déjà dite ailleurs.
          Le titre du bloc, lui, doit être lu. */}
      <h2 className="sr-only">{title}</h2>

      <ul className="relative w-full max-w-page xl:max-w-wide mx-auto px-6 md:px-gutter grid gap-4 md:grid-cols-3">
        {proof.voices.map((voice) => (
          <li
            key={voice.id}
            className="relative isolate rounded-card overflow-hidden aspect-[3/4] bg-ink"
          >
            <img
              src={voice.image}
              alt=""
              loading="lazy"
              decoding="async"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <span aria-hidden="true" className="card-scrim-bottom absolute inset-x-0 bottom-0" />

            <div className="relative h-full flex flex-col justify-end gap-1 p-6">
              {voice.rating ? (
                <span className="flex gap-1" aria-label={`${voice.rating} sur 5`}>
                  {Array.from({ length: 5 }, (_, i) => (
                    <Star
                      key={i}
                      aria-hidden="true"
                      className={`size-4 ${i < voice.rating! ? 'fill-ground text-ground' : 'text-ground/40'}`}
                    />
                  ))}
                </span>
              ) : null}

              <p className="border-text-xl text-ground">{voice.name}</p>
              <p className="label text-ground">{voice.detail}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}
