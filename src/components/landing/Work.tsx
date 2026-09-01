import type { Project } from '~/types'
import { BlockTitle } from './BlockTitle'
import { WorkBlock } from './WorkBlock'

/**
 * Les travaux : un bandeau d'annonce, puis un écran par projet.
 *
 * Le bandeau n'occupe PAS un écran entier. Il en tenait un, ce qui laissait un
 * écran vide entre la dernière prestation et le premier travail — un titre seul
 * au milieu d'un vide n'annonce rien, il fait attendre. Il se pose donc juste
 * au-dessus de ce qu'il annonce, et le premier travail arrive dans la foulée.
 */
export function Work({ title, projects }: { title: string; projects: Project[] }) {
  return (
    <>
      <section
        id="travaux"
        className="relative isolate flex items-end px-6 md:px-gutter pt-8 pb-10 md:pt-12 md:pb-14 bg-ground overflow-hidden"
      >
        <span aria-hidden="true" className="grain absolute inset-0" />
        <div className="relative w-full max-w-page xl:max-w-wide mx-auto">
          <BlockTitle>{title}</BlockTitle>
        </div>
      </section>

      {projects.map((project) => (
        <WorkBlock key={project.id} project={project} heading="h3" />
      ))}
    </>
  )
}
