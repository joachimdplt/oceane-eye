import { createFileRoute } from '@tanstack/react-router'
import { CallToAction } from '~/components/landing/CallToAction'
import { Offers } from '~/components/landing/Offers'
import { Plans } from '~/components/landing/Plans'
import { Process } from '~/components/landing/Process'
import {
  blockTitles,
  callToAction,
  offers,
  offersIntro,
  pageMeta,
  plans,
  steps,
} from '~/data/content'
import { SITE_URL, canonical, seo } from '~/utils/seo'

/**
 * La page des prestations : ce qu'on fait, comment, et ce que ça coûte.
 *
 * Elle n'invente aucun composant. Les trois blocs sont ceux de l'accueil, dans
 * l'ordre qui répond aux questions telles qu'elles viennent : quoi, comment,
 * combien. Un bloc qui se rend au même endroit de deux façons différentes est
 * un bloc qui va diverger.
 */
export const Route = createFileRoute('/services/')({
  head: () => {
    const url = `${SITE_URL}/services`
    return {
      meta: [...seo({ ...pageMeta.services, url })],
      links: [canonical(url)],
    }
  },
  component: ServicesPage,
})

function ServicesPage() {
  return (
    <main>
      <Offers title={blockTitles.services} lede={offersIntro.lede} offers={offers} />
      <Process title={blockTitles.methode} steps={steps} />
      <Plans title={blockTitles.tarifs} plans={plans} />
      <CallToAction cta={callToAction} />
    </main>
  )
}
