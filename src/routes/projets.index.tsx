import { createFileRoute } from '@tanstack/react-router'
import { Work } from '~/components/landing/Work'
import {
  blockTitles,
  pageMeta,
  projects,
} from '~/data/content'
import { SITE_URL, canonical, seo } from '~/utils/seo'

/**
 * La page des projets : les neuf, et non la sélection de l'accueil.
 *
 * C'est la seule différence avec le bloc de la page d'accueil, qui n'en garde
 * qu'un par prestation — d'où le même composant, nourri d'une liste plus
 * longue.
 */
export const Route = createFileRoute('/projets/')({
  head: () => {
    const url = `${SITE_URL}/projets`
    return {
      meta: [...seo({ ...pageMeta.projets, url })],
      links: [canonical(url)],
    }
  },
  component: ProjetsPage,
})

function ProjetsPage() {
  return (
    <main>
      <Work title={blockTitles.projets} projects={projects} />
    </main>
  )
}
