import { createFileRoute } from '@tanstack/react-router'
import { Offers } from '~/components/landing/Offers'
import { Plans } from '~/components/landing/Plans'
import { Process } from '~/components/landing/Process'
import { Questions } from '~/components/landing/Questions'
import { SocialProof } from '~/components/landing/SocialProof'
import {
  blockTitles,
  faq,
  offers,
  offersIntro,
  pageMeta,
  plans,
  socialProof,
  steps,
} from '~/data/content'
import { SITE_URL, canonical, seo } from '~/utils/seo'

/**
 * La page des prestations : ce qu'on fait, comment, et ce que ça coûte.
 *
 * Elle n'invente aucun composant : ce sont ceux de l'accueil, dans l'ordre où
 * les questions viennent. Quoi, comment, combien — puis ce que d'autres en
 * disent, puis ce qui reste à demander, et enfin le contact du pied de page.
 *
 * Les avis et les questions arrivent APRÈS le prix et non avant : ils lèvent
 * les objections que le prix vient de faire naître. Placés plus haut, ils
 * répondraient à des doutes que personne n'a encore.
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
      <SocialProof title={blockTitles.confiance} proof={socialProof} />
      <Questions title={blockTitles.questions} faq={faq} />
    </main>
  )
}
