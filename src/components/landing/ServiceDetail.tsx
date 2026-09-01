import { Link } from '@tanstack/react-router'
import type { Offer, Project } from '~/types'
import { Unfold } from '~/components/ui/Unfold'
import { WorkBlock } from './WorkBlock'

/**
 * La page d'une prestation : ce qu'elle comprend, et ce qu'elle a produit.
 *
 * C'est ici que les livrables et l'argumentaire reviennent — retirés de
 * l'accordéon, qui n'avait à donner que l'envie d'en savoir plus. Le prix reste
 * absent, comme sur la page d'accueil.
 *
 * Les projets sont ceux que les données rattachent à cette prestation, jamais
 * un rapprochement sur le libellé de leur discipline.
 */
export function ServiceDetail({
  offer,
  projects,
  backLabel,
  emptyLabel,
}: {
  offer: Offer
  projects: Project[]
  backLabel: string
  emptyLabel: string
}) {
  return (
    <main>
      <section className="relative isolate min-h-svh flex flex-col justify-center gap-12 px-6 md:px-gutter py-24 bg-ground overflow-hidden">
        <span aria-hidden="true" className="grain absolute inset-0" />

        <div className="relative w-full max-w-page xl:max-w-wide mx-auto flex flex-col gap-10">
          <Link to="/" className="label text-muted no-underline hover:text-ink transition-colors motion-reduce:transition-none">
            {backLabel}
          </Link>

          <h1 className="title2 title-block text-ink">{offer.name}</h1>

          <p className="body-text text-ink max-w-2xl">{offer.pitch}</p>

          <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-start">
            <ul className="flex flex-col">
              {offer.deliverables.map((item) => (
                <li key={item} className="body-text text-ink py-3 border-t border-rule">
                  {item}
                </li>
              ))}
            </ul>

            <Unfold className="w-full">
              <img
                src={offer.image}
                alt=""
                loading="lazy"
                decoding="async"
                className="w-full aspect-[4/3] object-cover"
              />
            </Unfold>
          </div>

          <p className="label text-muted">{offer.duration}</p>
        </div>
      </section>

      {projects.length === 0 ? (
        <section className="relative isolate min-h-svh flex items-center px-6 md:px-gutter py-24 bg-ground overflow-hidden">
          <span aria-hidden="true" className="grain absolute inset-0" />
          <p className="relative w-full max-w-page xl:max-w-wide mx-auto body-text text-muted">
            {emptyLabel}
          </p>
        </section>
      ) : (
        projects.map((project) => <WorkBlock key={project.id} project={project} />)
      )}
    </main>
  )
}
