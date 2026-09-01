import { Link } from '@tanstack/react-router'
import type { CSSProperties } from 'react'
import type { Project } from '~/types'

/**
 * Un travail, en carte qui s'empile.
 *
 * Le composant partagé par toutes les pages qui montrent des travaux :
 * l'accueil, les pages de prestation, le voisinage d'une page de travail. Il a
 * existé en deux exemplaires le temps d'un commit, et les deux avaient déjà
 * divergé sur la couleur du texte — un bloc dupliqué ne reste jamais identique
 * très longtemps.
 *
 * Les cartes se collent à des hauteurs croissantes : la première se cale, la
 * deuxième glisse par-dessus et se cale un cran plus bas, et ainsi de suite.
 *
 * Seul le BORD HAUT d'une carte déjà passée reste visible. Tout ce qu'elle a à
 * dire tient donc sur cette bande : le nom, ce qui a été livré et la
 * discipline, sur une seule ligne. Ce qui serait posé plus bas ne se lirait que
 * sur la dernière carte de la pile.
 *
 * Elles s'élargissent aussi en descendant. C'est la dernière qui est la plus
 * large : la pile paraît s'ouvrir au lieu de se refermer.
 *
 * `index` et `total` viennent de la page. Le composant ne les devine pas : il
 * ne sait pas combien de travaux l'entourent, et une carte qui compterait ses
 * frères irait lire son propre parent.
 */
export function WorkBlock({
  project,
  index = 0,
  total = 1,
  heading = 'h2',
}: {
  project: Project
  index?: number
  total?: number
  heading?: 'h2' | 'h3'
}) {
  // Le rang du titre dépend de la page : sous un « Travaux » il est de niveau
  // 3, seul sur une page de prestation il est de niveau 2. Un plan de titres
  // qui saute un niveau se lit mal à la synthèse vocale.
  const Heading = heading

  return (
    <article
      id={project.id}
      className="work-card"
      style={{ '--i': index, '--n': total } as CSSProperties}
    >
      {/* Pas de dépliage ici : la carte se déplace déjà, et deux gestes qui se
          superposent ne se lisent ni l'un ni l'autre. C'est l'empilement qui
          porte le mouvement, l'image se contente d'être là. */}
      <img
        src={project.image}
        alt={`${project.name} — ${project.summary}`}
        loading="lazy"
        decoding="async"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Le voile ne couvre plus que le haut : c'est la seule bande où il y a
          du texte, et l'assombrir en bas ne ferait que manger l'image. */}
      <span aria-hidden="true" className="card-scrim absolute inset-x-0 top-0" />

      <div className="relative flex flex-col md:flex-row md:items-baseline gap-2 md:gap-8 p-6 md:p-8">
        <Heading className="title2 title-panel text-ground shrink-0">
          <Link
            to="/projets/$projectId"
            params={{ projectId: project.id }}
            className="text-ground no-underline hover:opacity-70 transition-opacity motion-reduce:transition-none"
          >
            {project.name}
          </Link>
        </Heading>

        <p className="body-text text-ground md:flex-1">{project.summary}</p>

        {/* La discipline mène à sa prestation, qui porte tous ses travaux.
            C'est le seul chemin vers ceux que l'accueil ne montre pas : il
            n'en garde qu'un par discipline. */}
        <Link
          to="/services/$serviceId"
          params={{ serviceId: project.offer }}
          className="label text-ground shrink-0 no-underline underline-offset-4 hover:underline"
        >
          {project.discipline}
        </Link>
      </div>
    </article>
  )
}
