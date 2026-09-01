import { Link } from '@tanstack/react-router'
import { ArrowUpRight } from 'lucide-react'
import type { Project } from '~/types'

/**
 * Tous les projets, en mosaïque.
 *
 * La tuile ENTIÈRE est le lien, image comprise : une vignette dont seul le titre
 * est cliquable oblige à viser, et c'est l'image qu'on a envie de toucher.
 *
 * Le rythme des tailles vient du rang et non des données. Une tuile qui
 * porterait sa propre largeur obligerait à retoucher les données pour changer la
 * composition, et à les retoucher encore en ajoutant un projet au milieu.
 *
 * La légende est SOUS l'image et non dessus : les neuf visuels n'ont ni la même
 * clarté ni le même cadrage, et un texte posé sur eux serait lisible sur
 * certains seulement.
 */
export function WorkMosaic({ projects }: { projects: Project[] }) {
  return (
    <ul className="grid grid-cols-2 md:grid-cols-6 gap-3 md:gap-4">
      {projects.map((project, i) => {
        // Un projet sur trois prend deux fois plus de large : la mosaïque
        // respire au lieu de dérouler une grille régulière.
        const large = i % 3 === 0
        return (
          <li
            key={project.id}
            className={large ? 'col-span-2 md:col-span-4' : 'col-span-2 md:col-span-2'}
          >
            <Link
              to="/projets/$projectId"
              params={{ projectId: project.id }}
              className="group block no-underline"
            >
              <span
                className={`relative block overflow-hidden rounded-card bg-ink ${
                  large ? 'aspect-[16/10]' : 'aspect-[4/5]'
                }`}
              >
                <img
                  src={project.image}
                  alt={`${project.name} — ${project.summary}`}
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                />
              </span>

              <span className="flex items-start justify-between gap-4 pt-4">
                <span className="flex flex-col gap-1">
                  <span className="title2 title-panel text-ink">{project.name}</span>
                  <span className="label text-muted">{project.discipline}</span>
                </span>

                <ArrowUpRight
                  aria-hidden="true"
                  strokeWidth={1.5}
                  className="size-5 shrink-0 mt-1 text-muted transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 motion-reduce:transition-none"
                />
              </span>
            </Link>
          </li>
        )
      })}
    </ul>
  )
}
