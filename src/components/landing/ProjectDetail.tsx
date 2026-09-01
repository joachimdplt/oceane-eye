import { Link } from '@tanstack/react-router'
import type { Offer, Project } from '~/types'
import { Unfold } from '~/components/ui/Unfold'
import { WorkBlock } from './WorkBlock'

/**
 * La page d'un projet.
 *
 * Elle ne montre que ce dont on dispose : l'image, le nom, la discipline, la
 * phrase qui dit ce qui a été livré, et la prestation dont il relève. Une vraie
 * étude de cas demanderait le contexte, plusieurs vues et le résultat obtenu —
 * rien de tout cela n'existe encore, et meubler ferait plus de mal que la page
 * courte.
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
  ui: { back: string; offer: string; siblings: string }
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

          <div className="grid md:grid-cols-2 gap-8 md:gap-16 items-start">
            <p className="body-text text-ink">{project.summary}</p>

            <dl className="flex flex-col gap-4">
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
