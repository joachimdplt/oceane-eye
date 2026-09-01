import { useEffect, useRef, useState } from 'react'
import type { HeroContent } from '~/types'
import { GrowText } from '~/components/ui/GrowText'

/** La géométrie de l'arche au repos, en pourcentage de l'écran. */
const ARCH = { top: 16, side: 36, bottom: 24 }

/** Hauteur de la piste de défilement, en écrans. */
const TRACK = 2.6

export function Hero({ role, title, body, media, aside, scrollCue }: HeroContent) {
  const track = useRef<HTMLElement | null>(null)
  const [progress, setProgress] = useState(0)
  const [still, setStill] = useState(false)

  /**
   * La position dans la piste, de 0 à 1.
   *
   * Mesure du DOM et rien d'autre : ni store, ni service, ni donnée métier. Ce
   * n'est donc pas de l'orchestration au sens de la Couche 3, et ça reste dans
   * le composant plutôt que de devenir un hook de feature (CONVENTIONS.md § 8).
   */
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      // Une fenêtre qui grandit sous les yeux est exactement le mouvement qu'on
      // nous demande d'éviter : l'arche reste à sa taille, la page défile.
      setStill(true)
      return
    }

    const node = track.current
    if (!node) return
    let frame = 0
    const read = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        const { top, height } = node.getBoundingClientRect()
        const travelled = -top / Math.max(1, height - window.innerHeight)
        setProgress(Math.min(1, Math.max(0, travelled)))
      })
    }
    read()
    window.addEventListener('scroll', read, { passive: true })
    window.addEventListener('resize', read)
    return () => {
      window.removeEventListener('scroll', read)
      window.removeEventListener('resize', read)
      cancelAnimationFrame(frame)
    }
  }, [])

  // L'image occupe tout l'écran en permanence ; ce qui grandit est la fenêtre
  // découpée dedans. Rien n'est mis à l'échelle, donc rien ne se déforme et
  // rien ne repasse par la mise en page — seul le `clip-path` change.
  const p = still ? 0 : progress
  const ease = p * p * (3 - 2 * p)
  const inset = (from: number) => (from * (1 - ease)).toFixed(2)
  // Le rayon est écrêté par le navigateur à la moitié de la largeur découpée :
  // une valeur volontairement énorme donne donc un demi-cercle parfait, quelle
  // que soit la taille de la fenêtre au moment où on la regarde.
  const radius = (999 * (1 - ease)).toFixed(0)
  const clip = `inset(${inset(ARCH.top)}% ${inset(ARCH.side)}% ${inset(ARCH.bottom)}% ${inset(ARCH.side)}% round ${radius}px ${radius}px 0 0)`

  // Les textes de flanc s'effacent pendant le premier tiers : passé là, l'image
  // occupe leur place et un texte posé dessus deviendrait illisible.
  const asidesOpacity = Math.max(0, 1 - ease * 3)

  return (
    <section ref={track} className="relative bg-ground" style={{ height: `${TRACK * 100}svh` }}>
      <div className="sticky top-0 h-svh overflow-hidden">
        {/* Le film ne démarre pas pour qui a demandé moins de mouvement : son
            affiche tient l'écran, ce qui est aussi ce qu'on voit le temps du
            chargement. */}
        {media.kind === 'video' && !still ? (
          <video
            src={media.src}
            poster={media.poster}
            aria-label={media.alt || undefined}
            aria-hidden={media.alt ? undefined : true}
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
            style={{ clipPath: clip, WebkitClipPath: clip }}
          />
        ) : (
          <img
            src={media.kind === 'video' ? media.poster : media.src}
            alt={media.alt}
            className="absolute inset-0 w-full h-full object-cover"
            style={{ clipPath: clip, WebkitClipPath: clip }}
          />
        )}

        <div className="relative h-full flex items-center px-6 md:px-gutter py-20">
          {/* Sous `md`, une simple pile : les trois colonnes se superposeraient
              dans la même cellule et le titre passerait sur le texte. */}
          <div className="w-full max-w-page xl:max-w-wide mx-auto flex flex-col items-center gap-8 md:grid md:grid-cols-3 md:items-center">
            <p
              className="font-garamond text-accent text-sm leading-prose max-w-xs text-center md:text-left md:justify-self-start transition-opacity duration-300 motion-reduce:transition-none"
              style={{ opacity: asidesOpacity }}
            >
              {body}
            </p>

            {/* Le titre déborde de l'arche des deux côtés, comme la référence :
                il est donc posé sur le fond autant que sur l'image, et porte la
                même couleur dans les deux cas. */}
            <h1 className="display text-accent text-center md:col-start-2 md:row-start-1">
              <GrowText text={title} delay={120} spread={620} />
            </h1>

            {aside ? (
              <p
                className="font-garamond text-accent text-sm leading-prose max-w-xs text-center md:text-right md:justify-self-end transition-opacity duration-300 motion-reduce:transition-none"
                style={{ opacity: asidesOpacity }}
              >
                {aside}
              </p>
            ) : (
              // La troisième colonne reste réservée même vide : sans elle, la
              // grille se resserre et le titre cesse d'être au centre de l'écran.
              <span aria-hidden="true" className="hidden md:block" />
            )}
          </div>
        </div>

        {/* Le métier et l'invitation à descendre, aux deux bords de l'écran. */}
        <p
          className="absolute top-8 left-0 right-0 text-center font-garamond text-accent text-eyebrow md:text-eyebrow-lg font-bold uppercase tracking-eyebrow transition-opacity duration-300 motion-reduce:transition-none"
          style={{ opacity: asidesOpacity }}
        >
          {role}
        </p>

        <div
          className="absolute bottom-8 left-0 right-0 flex flex-col items-center gap-4 transition-opacity duration-300 motion-reduce:transition-none"
          style={{ opacity: asidesOpacity }}
        >
          <span className="block w-px h-16 bg-accent" aria-hidden="true" />
          <span className="font-garamond text-accent text-eyebrow md:text-eyebrow-lg font-bold uppercase tracking-eyebrow">
            {scrollCue}
          </span>
        </div>
      </div>
    </section>
  )
}
