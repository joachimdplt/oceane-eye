import type { Project } from '~/types'
import { BlockTitle } from './BlockTitle'
import { WorkBlock } from './WorkBlock'

/**
 * Les travaux : un bandeau d'annonce, puis une pile de cartes.
 *
 * Le bandeau n'occupe PAS un écran entier. Il en tenait un, ce qui laissait un
 * écran vide entre la dernière prestation et le premier travail — un titre seul
 * au milieu d'un vide n'annonce rien, il fait attendre.
 *
 * La pile réserve de la place SOUS elle, et c'est elle qui fait tenir la
 * dernière carte : un élément collant n'a de prise que sur ce qui reste de son
 * conteneur en dessous. La dernière étant la dernière du flux, sans réserve elle
 * atteint sa position d'arrêt au moment même où le conteneur se termine — donc
 * elle ne se colle jamais.
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

      <div className="work-stack px-6 md:px-gutter">
        {projects.map((project, i) => (
          <WorkBlock
            key={project.id}
            project={project}
            index={i}
            total={projects.length}
            heading="h3"
          />
        ))}
      </div>
    </>
  )
}
