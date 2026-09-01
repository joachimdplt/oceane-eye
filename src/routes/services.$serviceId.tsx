import { createFileRoute, notFound } from '@tanstack/react-router'
import { NotFound } from '~/components/ui/NotFound'
import { ServiceDetail } from '~/components/landing/ServiceDetail'
import { errors, offerById, projectsOf, serviceUi } from '~/data/content'
import { SITE_URL, canonical, seo } from '~/utils/seo'

/**
 * La page d'une prestation.
 *
 * L'existence de la prestation est vérifiée dans le `loader` et non dans le
 * composant : une adresse inventée doit répondre 404 au moment du rendu
 * serveur, pas afficher une page vide après avoir été indexée.
 */
export const Route = createFileRoute('/services/$serviceId')({
  loader: ({ params }) => {
    const offer = offerById(params.serviceId)
    if (!offer) throw notFound()
    return { offer, projects: projectsOf(offer.id) }
  },
  head: ({ loaderData }) => {
    if (!loaderData) return {}
    const url = `${SITE_URL}/services/${loaderData.offer.id}`
    return {
      meta: [...seo({ title: `${loaderData.offer.name} · Ocean Eye Studio`, description: loaderData.offer.pitch, url })],
      links: [canonical(url)],
    }
  },
  notFoundComponent: () => <NotFound messages={errors} />,
  component: ServicePage,
})

function ServicePage() {
  const { offer, projects } = Route.useLoaderData()
  return (
    <ServiceDetail
      offer={offer}
      projects={projects}
      backLabel={serviceUi.back}
      emptyLabel={serviceUi.empty}
    />
  )
}
