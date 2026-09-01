import { createFileRoute } from '@tanstack/react-router'
import { About } from '~/components/landing/About'
import { SocialProof } from '~/components/landing/SocialProof'
import {
  about,
  blockTitles,
  pageMeta,
  socialProof,
} from '~/data/content'
import { SITE_URL, canonical, seo } from '~/utils/seo'

/**
 * La page du studio : qui l'on est, puis ce que les clients en disent.
 *
 * Les avis sont ici et non ailleurs : c'est la page où quelqu'un cherche à
 * savoir à qui il a affaire, donc celle où une parole extérieure pèse le plus.
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
      <About title={blockTitles.studio} about={about} />
      <SocialProof title={blockTitles.confiance} proof={socialProof} />
    </main>
  )
}
