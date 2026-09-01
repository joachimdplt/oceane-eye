import { createFileRoute } from '@tanstack/react-router'
import { Person } from '~/components/landing/Person'
import { SocialProof } from '~/components/landing/SocialProof'
import {
  about,
  blockTitles,
  pageMeta,
  socialProof,
} from '~/data/content'
import { SITE_URL, canonical, seo } from '~/utils/seo'

/**
 * La page du studio : Océane, puis ce que ses clients disent d'elle.
 *
 * Elle ne reprend PAS le bloc de l'accueil, qui dit ce que fait la maison :
 * quelqu'un qui arrive ici cherche la personne, pas une seconde fois l'offre.
 *
 * Les avis sont sur cette page et nulle part ailleurs : c'est là qu'on cherche à
 * savoir à qui l'on a affaire, donc là qu'une parole extérieure pèse le plus.
 */
export const Route = createFileRoute('/about')({
  head: () => {
    const url = `${SITE_URL}/about`
    return {
      meta: [...seo({ ...pageMeta.about, url })],
      links: [canonical(url)],
    }
  },
  component: AboutPage,
})

function AboutPage() {
  return (
    <main>
      <Person title={blockTitles.studio} about={about} />
      <SocialProof title={blockTitles.confiance} proof={socialProof} />
    </main>
  )
}
