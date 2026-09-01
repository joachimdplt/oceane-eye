import { Link } from '@tanstack/react-router'
import type { Project } from '~/types'
import { Unfold } from '~/components/ui/Unfold'

/**
 * Un projet, un écran. Le composant partagé par toutes les pages qui en
 * montrent : l'accueil, les pages de prestation, et le voisinage d'une page de
 * projet.
 *
 * Il existait en deux exemplaires — un dans la liste d'accueil, un dans la page
 * d'une prestation — et les deux avaient déjà divergé sur la couleur du texte.
 * Un bloc dupliqué ne reste jamais identique très longtemps.
 *
 * L'image se déplie à l'entrée dans le champ et se replie en sortant : c'est le
 * geste de l'arche de l'ouverture, et il se rejoue à chaque passage.
 *
 * Le texte repose sur un voile qui descend jusqu'au fond de la page. Le
 * contraste y est donc celui qu'il a partout ailleurs, quelle que soit la
 * photo — et le bas d'un bloc étant exactement la couleur du suivant, le
 * raccord ne se voit pas.
 */
export function WorkBlock({ project, heading = 'h2' }: { project: Project; heading?: 'h2' | 'h3' }) {
  // Le rang du titre dépend de la page : sous un « Travaux » il est de niveau
  // 3, seul sur une page de prestation il est de niveau 2. Un plan de titres
  // qui saute un niveau se lit mal à la synthèse vocale.
  const Heading = heading

  return (
    <article id={project.id} className="relative isolate h-svh overflow-hidden bg-ground">
      <Unfold className="absolute inset-0">
        <img
          src={project.image}
          alt={`${project.name} — ${project.summary}`}
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover"
        />
      </Unfold>

      <div aria-hidden="true" className="project-scrim absolute inset-x-0 bottom-0" />

      <div className="relative h-full flex flex-col justify-end px-6 md:px-gutter pb-14 md:pb-20">
        <div className="w-full max-w-page xl:max-w-wide mx-auto flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div className="flex flex-col gap-4">
            <Heading className="title2 text-ink">
              <Link
                to="/travaux/$projectId"
                params={{ projectId: project.id }}
                className="text-ink no-underline hover:opacity-70 transition-opacity motion-reduce:transition-none"
              >
                {project.name}
              </Link>
            </Heading>
            <p className="body-text text-ink max-w-2xl">{project.summary}</p>
          </div>

          {/* La discipline mène à sa prestation, qui porte tous ses travaux.
              C'est le seul chemin vers les cinq que l'accueil ne montre pas :
              il n'en garde qu'un par discipline. */}
          <Link
            to="/services/$serviceId"
            params={{ serviceId: project.offer }}
            className="border-text-xl text-ink md:text-right shrink-0 no-underline underline-offset-4 hover:underline"
          >
            {project.discipline}
          </Link>
        </div>
      </div>
    </article>
  )
}
