import { useState } from 'react'
import type { Offer } from '~/types'
import { GrowText } from '~/components/ui/GrowText'
import { Reveal } from '~/components/ui/Reveal'

/** `2 400 €`, jamais `2400€` : l'espace insécable, et le symbole après. */
function euros(amount: number) {
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 0,
  })
    .format(amount)
    // fr-FR sépare les milliers par une espace FINE insécable (U+202F), qui se
    // lit comme un artefact dans certaines polices. On la remplace par une
    // insécable ordinaire — en l'écrivant en échappement, parce qu'une espace
    // invisible dans un littéral ne se relit pas.
    .replace(/[\u202f\u2009]/g, '\u00a0')
}

/**
 * Les prestations, en accordéon de panneaux.
 *
 * Un seul panneau est ouvert ; les autres se réduisent à une bande où le nom
 * passe à la verticale — « Supports de communication » ne tiendrait pas
 * couché dans une colonne de cette largeur.
 *
 * Chaque panneau est un vrai bouton : il s'ouvre au survol comme à la tabulation
 * et au clic, donc au doigt et au clavier autant qu'à la souris. Le contenu des
 * panneaux fermés reste dans le document — il est rogné, jamais retiré — pour
 * qu'un lecteur d'écran lise les quatre offres et leurs prix sans avoir à
 * deviner qu'il faut ouvrir quelque chose.
 *
 * Sous `md`, l'accordéon se déplie en pile : quatre bandes verticales dans la
 * largeur d'un téléphone ne seraient lisibles pour personne.
 */
export function Offers({
  title,
  lede,
  offers,
}: {
  title: string
  lede: string
  offers: Offer[]
}) {
  const [open, setOpen] = useState(0)

  return (
    <section
      id="services"
      className="relative isolate min-h-svh flex flex-col justify-center gap-12 md:gap-16 px-6 md:px-gutter py-24 bg-ground overflow-hidden"
    >
      <span aria-hidden="true" className="grain absolute inset-0" />

      <div className="relative w-full max-w-page xl:max-w-wide mx-auto flex flex-col gap-5">
        <h2 className="title2 title-block text-ink">
          <Reveal>
            <GrowText text={title} delay={0} spread={520} />
          </Reveal>
        </h2>
        <p className="body-text text-muted max-w-xl">{lede}</p>
      </div>

      <div className="relative w-full max-w-page xl:max-w-wide mx-auto">
        <ul className="services-rail flex flex-col md:flex-row gap-3">
          {offers.map((offer, i) => {
            const active = i === open
            return (
              <li
                key={offer.id}
                className="services-panel"
                data-open={active ? 'true' : 'false'}
              >
                <button
                  type="button"
                  aria-expanded={active}
                  onMouseEnter={() => setOpen(i)}
                  onFocus={() => setOpen(i)}
                  onClick={() => setOpen(i)}
                  className="relative block w-full h-full overflow-hidden text-left"
                >
                  <img
                    src={offer.image}
                    alt=""
                    loading="lazy"
                    decoding="async"
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  {/* Le voile : le nom et les prix sont posés sur une photo dont
                      on ne maîtrise pas le fond. Il descend vers l'encre, donc
                      le texte est en clair dessus, quelle que soit l'image. */}
                  <span aria-hidden="true" className="panel-scrim absolute inset-0" />

                  {/* Fermé, le nom se redresse : couché, il serait tronqué. */}
                  <span
                    className={`absolute z-10 title2 title-panel text-ground whitespace-nowrap ${
                      active
                        ? 'top-6 left-6 md:top-8 md:left-8'
                        : 'top-6 left-6 md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:origin-center md:-rotate-90'
                    }`}
                  >
                    {offer.name}
                  </span>

                  {/* Toujours rendu, seulement rogné quand le panneau est
                      fermé : un prix retiré du document est un prix que
                      personne ne trouve. */}
                  {/* Le prix est HORS du bloc qui s'efface : c'est la première
                      chose qu'on vient chercher ici, et trois prix sur quatre
                      cachés derrière un survol sont trois prix qu'on ne lit
                      pas. Fermé, il se réduit et se centre au pied de la bande. */}
                  <span
                    className={`absolute inset-x-0 bottom-0 z-20 flex flex-wrap items-baseline gap-x-4 gap-y-1 px-6 md:px-8 pb-6 md:pb-8 ${
                      active ? 'justify-between' : 'justify-center text-center'
                    }`}
                  >
                    <span className={active ? 'border-text-xl text-ground' : 'label text-ground'}>
                      dès {euros(offer.from)}
                    </span>
                    <span
                      className={`label text-ground transition-opacity duration-300 motion-reduce:transition-none ${
                        active ? 'opacity-100' : 'opacity-0'
                      }`}
                    >
                      {offer.duration}
                    </span>
                  </span>

                  <span
                    className={`absolute inset-x-0 bottom-0 z-10 flex flex-col gap-4 p-6 md:p-8 pb-20 md:pb-24 transition-opacity duration-300 motion-reduce:transition-none ${
                      active ? 'opacity-100' : 'opacity-0 pointer-events-none'
                    }`}
                  >
                    <span className="body-text text-ground max-w-xl">{offer.pitch}</span>

                    <span className="flex flex-col">
                      {offer.deliverables.map((item) => (
                        <span
                          key={item}
                          className="label text-ground py-2 border-t border-ground/25"
                        >
                          {item}
                        </span>
                      ))}
                    </span>
                  </span>
                </button>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
