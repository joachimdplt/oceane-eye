import type { Offer } from '~/types'
import { Block } from './Block'
import { BlockTitle } from './BlockTitle'

/** `2 400 €`, jamais `2400€` : l'espace insécable et le symbole après. */
function euros(amount: number) {
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 0,
  })
    .format(amount)
    // Les espaces fines insécables se lisent comme des artefacts dans
    // certaines polices : une insécable normale rend mieux.
    .replace(/[  ]/g, ' ')
}

/**
 * Les prestations, chacune avec son plancher.
 *
 * Le prix est posé à côté du périmètre et jamais seul : un montant sans ce
 * qu'il achète ne se compare à rien, et c'est exactement ce qui fait écrire
 * « sur devis » partout ailleurs.
 */
export function Offers({ title, offers }: { title: string; offers: Offer[] }) {
  return (
    <Block id="services" title={<BlockTitle>{title}</BlockTitle>}>
      <ul className="grid gap-px bg-ink/15 md:grid-cols-2">
        {offers.map((offer) => (
          <li key={offer.id} className="bg-ground p-8 md:p-10 flex flex-col gap-6">
            <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
              <h3 className="title2 text-ink">{offer.name}</h3>
              <p className="border-text-xl text-ink whitespace-nowrap">
                dès {euros(offer.from)}
              </p>
            </div>

            <p className="font-garamond text-ink text-lg md:text-xl leading-prose max-w-prose">
              {offer.pitch}
            </p>

            <ul className="flex flex-col gap-1">
              {offer.deliverables.map((item) => (
                <li
                  key={item}
                  className="font-garamond text-ink text-base md:text-lg leading-prose"
                >
                  {item}
                </li>
              ))}
            </ul>

            <p className="font-garamond text-ink text-eyebrow-lg font-bold uppercase tracking-eyebrow mt-auto">
              {offer.duration}
            </p>
          </li>
        ))}
      </ul>
    </Block>
  )
}
