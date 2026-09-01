import { Link } from '@tanstack/react-router'
import type { CSSProperties } from 'react'
import type { Project } from '~/types'
import { Unfold } from '~/components/ui/Unfold'

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
 * deuxième glisse par-dessus et se cale un cran plus bas, et ainsi de suite. Ce
 * décalage est ce qui laisse voir le bord haut de chaque carte déjà passée,
 * donc son titre — c'est pour ça que le nom est en HAUT de la carte et non en
 * bas comme avant.
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
      <Unfold className="absolute inset-0">
        <img
          src={project.image}
          alt={`${project.name} — ${project.summary}`}
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover"
        />
      </Unfold>

      {/* Un voile aux deux bords : le nom est en haut, le reste en bas, et la
          photo change à chaque carte. Sans lui, la lisibilité dépendrait de
          l'image. */}
      <span aria-hidden="true" className="card-scrim absolute inset-0" />

      <div className="relative h-full flex flex-col justify-between p-6 md:p-10">
        <Heading className="title2 title-panel text-ground">
          <Link
            to="/travaux/$projectId"
            params={{ projectId: project.id }}
            className="text-ground no-underline hover:opacity-70 transition-opacity motion-reduce:transition-none"
          >
            {project.name}
          </Link>
        </Heading>

        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 max-w-page">
          <p className="body-text text-ground max-w-2xl">{project.summary}</p>

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
      </div>
    </article>
  )
}
