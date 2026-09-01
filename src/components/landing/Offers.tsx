import { useState } from 'react'
import { Compass, Fingerprint, Megaphone, Package } from 'lucide-react'
import type { Offer, OfferIcon } from '~/types'
import { GrowText } from '~/components/ui/GrowText'
import { Reveal } from '~/components/ui/Reveal'

/**
 * Le nom d'icône venu des données rendu en composant.
 *
 * La table vit ici et non dans `data/` : une donnée qui importerait un
 * composant lierait la couche transversale à la couche 4 (CONVENTIONS.md § 8).
 */
const ICONS: Record<OfferIcon, typeof Compass> = {
  identite: Fingerprint,
  direction: Compass,
  packaging: Package,
  supports: Megaphone,
}

/**
 * Les prestations, en accordéon de panneaux.
 *
 * Chaque panneau ne porte que son icône, son nom et son délai. Pas de prix :
 * une grille tarifaire au milieu d'une page qui cherche encore à convaincre
 * fait trier avant d'avoir donné envie. Les montants restent dans les données,
 * pour le jour où ils auront leur place — un devis, une page dédiée.
 *
 * Un seul panneau est ouvert ; les autres se réduisent à une bande où le nom
 * passe à la verticale — « Supports de communication » ne tiendrait pas couché
 * dans une colonne de cette largeur.
 *
 * Chaque panneau est un vrai bouton : il s'ouvre au survol comme à la
 * tabulation et au clic, donc au doigt et au clavier autant qu'à la souris. Le
 * contenu des panneaux fermés reste dans le document, rogné et jamais retiré,
 * pour qu'un lecteur d'écran lise les quatre prestations sans avoir à deviner
 * qu'il faut ouvrir quelque chose.
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
            const Icon = ICONS[offer.icon]
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
                  {/* Le voile : le nom est posé sur une photo dont on ne
                      maîtrise pas le fond. Il descend vers l'encre, donc le
                      texte reste en clair dessus quelle que soit l'image. */}
                  <span aria-hidden="true" className="panel-scrim absolute inset-0" />

                  {/* L'icône, en haut : elle est décorative et le nom est juste
                      dessous, donc elle est cachée aux lecteurs d'écran plutôt
                      que de faire entendre la prestation deux fois. */}
                  <Icon
                    aria-hidden="true"
                    strokeWidth={1.5}
                    className="absolute top-6 left-6 md:top-8 md:left-8 z-10 size-7 md:size-8 text-ground"
                  />

                  {/* Fermé, le nom se redresse : couché, il serait tronqué. */}
                  <span
                    className={`absolute z-10 title2 title-panel text-ground whitespace-nowrap ${
                      active
                        ? 'bottom-14 left-6 md:bottom-16 md:left-8'
                        : 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 md:origin-center md:-rotate-90'
                    }`}
                  >
                    {offer.name}
                  </span>

                  {/* Le délai, seul chiffre gardé. Visible ouvert comme fermé :
                      c'est ce qu'on vient vérifier en premier après le nom. */}
                  <span
                    className={`absolute z-10 label text-ground whitespace-nowrap ${
                      active
                        ? 'bottom-6 left-6 md:bottom-8 md:left-8'
                        : 'bottom-6 inset-x-0 text-center px-2'
                    }`}
                  >
                    {offer.duration}
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
