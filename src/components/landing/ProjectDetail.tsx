import { Link } from '@tanstack/react-router'
import type { Offer, Project } from '~/types'
import { Unfold } from '~/components/ui/Unfold'
import { WorkBlock } from './WorkBlock'

/**
 * La page d'un projet.
 *
 * Elle porte le contenu repris du portfolio d'Océane : la demande telle qu'elle
 * s'est posée, la fiche du projet, et le récit de ce qui a été fait. C'est le
 * récit qui fait la page — le reste le situe.
 *
 * Les projets voisins réutilisent le même bloc que partout ailleurs : c'est ce
 * qui garantit qu'ils se lisent exactement comme sur l'accueil.
 */
export function ProjectDetail({
  project,
  offer,
  siblings,
  ui,
}: {
  project: Project
  offer?: Offer
  siblings: Project[]
  ui: {
    back: string
    client: string
    role: string
    year: string
    deliverables: string
    offer: string
    siblings: string
  }
}) {
  return (
    <main>
      <section className="relative isolate min-h-svh flex flex-col justify-center gap-10 px-6 md:px-gutter py-24 bg-ground overflow-hidden">
        <span aria-hidden="true" className="grain absolute inset-0" />

        <div className="relative w-full max-w-page xl:max-w-wide mx-auto flex flex-col gap-10">
          <Link
            to="/"
            className="label text-muted no-underline hover:text-ink transition-colors motion-reduce:transition-none"
          >
            {ui.back}
          </Link>

          <h1 className="title2 title-block text-ink">{project.name}</h1>

          <Unfold className="w-full">
            <img
              src={project.image}
              alt={`${project.name} — ${project.summary}`}
              decoding="async"
              className="w-full aspect-[16/9] object-cover"
            />
          </Unfold>

          <div className="grid md:grid-cols-[1fr_auto] gap-10 md:gap-16 items-start">
            <div className="flex flex-col gap-6 max-w-2xl">
              <p className="body-text text-ink">{project.summary}</p>
              <p className="body-text text-muted">{project.context}</p>
            </div>

            {/* La fiche du projet : à qui, dans quel rôle, quand, et ce qui a
                été remis. Une liste de définitions et non un tableau — ce sont
                des paires, pas des lignes et des colonnes. */}
            <dl className="flex flex-col md:min-w-64">
              {(
                [
                  [ui.client, project.client],
                  [ui.role, project.role],
                  [ui.year, project.year],
                  [ui.deliverables, project.deliverables],
                ] as const
              ).map(([terme, valeur]) => (
                <div key={terme} className="flex flex-col gap-1 py-3 border-t border-rule">
                  <dt className="label text-muted">{terme}</dt>
                  <dd className="body-text text-ink">{valeur}</dd>
                </div>
              ))}

              <div className="flex flex-col gap-1 py-3 border-t border-rule">
                <dt className="label text-muted">{ui.offer}</dt>
                <dd className="body-text text-ink">
                  {offer ? (
                    <Link
                      to="/services/$serviceId"
                      params={{ serviceId: offer.id }}
                      className="text-ink underline underline-offset-4 hover:opacity-70 transition-opacity motion-reduce:transition-none"
                    >
                      {offer.name}
                    </Link>
                  ) : (
                    project.discipline
                  )}
                </dd>
              </div>
            </dl>
          </div>

          {/* Le récit, en pleine largeur de colonne : c'est le cœur de la page,
              pas une légende. */}
          <div className="flex flex-col gap-6 max-w-3xl">
            {project.narrative.map((para) => (
              <p key={para} className="body-text text-ink">
                {para}
              </p>
            ))}
          </div>
        </div>
      </section>

      {siblings.length > 0 && (
        <>
          <section className="relative isolate flex items-end px-6 md:px-gutter py-16 bg-ground overflow-hidden">
            <span aria-hidden="true" className="grain absolute inset-0" />
            <h2 className="relative w-full max-w-page xl:max-w-wide mx-auto title2 title-block text-ink">
              {ui.siblings}
            </h2>
          </section>
          <div className="work-stack px-6 md:px-gutter">
            {siblings.map((sibling, i) => (
              <WorkBlock
                key={sibling.id}
                project={sibling}
                index={i}
                total={siblings.length}
                heading="h3"
              />
            ))}
          </div>
        </>
      )}
    </main>
  )
}
