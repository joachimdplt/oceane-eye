import { createFileRoute, notFound } from '@tanstack/react-router'
import { NotFound } from '~/components/ui/NotFound'
import { ProjectDetail } from '~/components/landing/ProjectDetail'
import { errors, offerById, projectById, projectUi, siblingsOf } from '~/data/content'
import { SITE_URL, canonical, seo } from '~/utils/seo'

/**
 * La page d'un projet.
 *
 * L'existence du projet est vérifiée dans le `loader` : une adresse inventée
 * doit répondre 404 au rendu serveur, pas afficher une page vide après avoir
 * été indexée.
 */
export const Route = createFileRoute('/produits/$projectId')({
  loader: ({ params }) => {
    const project = projectById(params.projectId)
    if (!project) throw notFound()
    return { project, offer: offerById(project.offer), siblings: siblingsOf(project) }
  },
  head: ({ loaderData }) => {
    if (!loaderData) return {}
    const url = `${SITE_URL}/produits/${loaderData.project.id}`
    return {
      meta: [
        ...seo({
          title: `${loaderData.project.name} · Ocean Eye Studio`,
          description: loaderData.project.summary,
          image: `${SITE_URL}${loaderData.project.image}`,
          url,
        }),
      ],
      links: [canonical(url)],
    }
  },
  notFoundComponent: () => <NotFound messages={errors} />,
  component: ProjectPage,
})

function ProjectPage() {
  const { project, offer, siblings } = Route.useLoaderData()
  return <ProjectDetail project={project} offer={offer} siblings={siblings} ui={projectUi} />
}
