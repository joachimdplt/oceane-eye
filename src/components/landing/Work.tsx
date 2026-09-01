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
      className="relative isolate h-svh overflow-hidden bg-ground"
    >
      {/* Plein cadre, d'un bord à l'autre : l'image n'est plus enfermée dans
          une boîte au milieu de la colonne, elle EST l'écran. Le dépliage
          reprend donc exactement le geste de l'arche de l'ouverture. */}
      <Unfold className="absolute inset-0">
        <img
          src={project.image}
          alt={`${project.name} — ${project.summary}`}
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover"
        />
      </Unfold>

      {/* Le voile.
          Le texte est posé sur une photo dont on ne maîtrise pas le fond : sans
          lui, le jaune tombait à 1,5:1 sur les fonds clairs. Le dégradé descend
          jusqu'au gris de la page, donc le texte y retrouve le contraste qu'il
          a partout ailleurs — et le raccord avec le bloc suivant est invisible,
          puisque c'est la même couleur. */}
      <div aria-hidden="true" className="project-scrim absolute inset-x-0 bottom-0" />

      <div className="relative h-full flex flex-col justify-end px-6 md:px-gutter pb-14 md:pb-20">
        <div className="w-full max-w-page xl:max-w-wide mx-auto flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div className="flex flex-col gap-4">
            <h3 className="title2 text-ink">{project.name}</h3>
            <p className="body-text text-ink max-w-2xl">{project.summary}</p>
          </div>

          <p className="border-text-xl text-ink md:text-right shrink-0">
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
