import type { Project } from '~/types'
import { Unfold } from '~/components/ui/Unfold'
import { Block } from './Block'
import { BlockTitle } from './BlockTitle'

/**
 * Un projet, un écran.
 *
 * L'image se déplie à l'entrée dans le champ, comme l'arche de l'ouverture :
 * c'est le même geste, donc la page n'en a qu'un à faire comprendre.
 *
 * Le nom et la discipline sont posés SOUS l'image et non dessus : la photo
 * change à chaque projet, et un texte posé sur une image dont on ne maîtrise
 * pas le fond finit toujours par tomber sur le mauvais endroit.
 */
function ProjectBlock({ project }: { project: Project }) {
  return (
    <article
      id={project.id}
      className="relative isolate min-h-svh flex flex-col justify-center gap-8 px-6 md:px-gutter py-24 bg-ground overflow-hidden"
    >
      <span aria-hidden="true" className="grain absolute inset-0" />

      <div className="relative w-full max-w-page xl:max-w-wide mx-auto flex flex-col gap-8">
        <Unfold>
          <img
            src={project.image}
            alt={`${project.name} — ${project.summary}`}
            loading="lazy"
            decoding="async"
            className="w-full aspect-[16/9] object-cover"
          />
        </Unfold>

        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div className="flex flex-col gap-2">
            <h3 className="title1 text-accent">{project.name}</h3>
            <p className="font-garamond text-accent text-lg md:text-xl leading-prose max-w-2xl">
              {project.summary}
            </p>
          </div>

          <p className="border-text-xl text-accent md:text-right whitespace-nowrap">
            {project.discipline}
          </p>
        </div>
      </div>
    </article>
  )
}

export function Work({ title, projects }: { title: string; projects: Project[] }) {
  return (
    <>
      <Block id="travaux" title={<BlockTitle>{title}</BlockTitle>} />
      {projects.map((project) => (
        <ProjectBlock key={project.id} project={project} />
      ))}
    </>
  )
}
