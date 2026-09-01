import type { ReactNode } from 'react'

/**
 * Le châssis commun à tous les blocs de la page.
 *
 * `isolate` n'est pas décoratif : il ouvre un contexte d'empilement, sans quoi
 * le `mix-blend-mode` du grain irait chercher ce qu'il y a derrière le bloc au
 * lieu de son propre fond. Et c'est lui, avec le fond opaque, qui permet aux
 * blocs de glisser par-dessus l'ouverture restée épinglée.
 */
export function Block({
  id,
  title,
  children,
}: {
  id: string
  title: ReactNode
  children?: ReactNode
}) {
  return (
    <section
      id={id}
      className="relative isolate min-h-svh flex flex-col justify-center gap-12 md:gap-16 px-6 md:px-gutter py-24 bg-ground overflow-hidden"
    >
      <span aria-hidden="true" className="grain absolute inset-0" />

      <div className="relative w-full max-w-page xl:max-w-wide mx-auto">
        {title}
      </div>

      {children ? (
        <div className="relative w-full max-w-page xl:max-w-wide mx-auto">{children}</div>
      ) : null}
    </section>
  )
}
