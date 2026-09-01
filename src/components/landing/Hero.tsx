import { useEffect, useRef, useState } from 'react'
import type { HeroContent } from '~/types'
import { GrowText } from '~/components/ui/GrowText'
import { LiveTime } from '~/components/ui/LiveTime'

/** La géométrie de l'arche au repos, en pourcentage de l'écran. */
const ARCH = { top: 16, side: 36, bottom: 24 }

/** Hauteur de la piste de défilement, en écrans. */
const TRACK = 2.6

export function Hero({ title, disciplines, media, aside, scrollCue }: HeroContent) {
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

  // Le centre optique de l'arche : à mi-hauteur de sa propre boîte, pas de
  // l'écran. Au repos elle va de 16 % à 76 %, donc son milieu est à 46 % ; une
  // fois ouverte elle occupe tout, et les deux centres se confondent à 50 %.
  const archCentre = (ARCH.top + (100 - ARCH.bottom)) / 2
  const titleTop = archCentre + (50 - archCentre) * ease

  return (
    <section ref={track} className="relative bg-ground" style={{ height: `${TRACK * 100}svh` }}>
      <div className="sticky top-0 h-svh overflow-hidden bg-ground">
        {/* Le grain se pose sur le fond, derrière l'image : la photo a déjà le
            sien. Le fond est porté par ce conteneur et non par la section
            parente, car `position: sticky` ouvre un contexte d'empilement — un
            `mix-blend-mode` ne voit que ce qui est peint dans le sien. */}
        <span aria-hidden="true" className="grain absolute inset-0" />

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

        {/* Le titre, plein centre de l'arche.

            Posé en absolu plutôt que dans la grille : au centre d'une colonne,
            il dépendait de ce que pesaient les textes de flanc. Ici il ne
            dépend plus que de l'arche, et il déborde des deux côtés comme la
            référence — donc il est sur le fond autant que sur l'image, et
            porte la même couleur dans les deux cas.

            Le `nowrap` est une promesse que le texte doit tenir : au-delà
            d'une vingtaine de signes, il finira par toucher les bords. */}
        <h1
          className="absolute inset-x-0 -translate-y-1/2 title1 text-accent text-center whitespace-nowrap px-6"
          style={{ top: `${titleTop.toFixed(2)}%` }}
        >
          <GrowText text={title.name} delay={120} spread={620} />
          {/* Le mot du métier, en titre 2, aligné sur la même ligne de base que
              le nom : c'est ce qui en fait un bloc-marque plutôt que deux
              titres empilés. Il arrive après, une fois le nom posé. */}
          <span className="title2 ml-3 md:ml-5">
            <GrowText text={title.tag} delay={760} spread={240} />
          </span>
        </h1>

        {/* Les textes de flanc, en miroir de part et d'autre du titre. */}
        <div
          className="hero-asides absolute inset-x-0 px-6 md:px-gutter"
          style={{ '--aside-top': `${titleTop.toFixed(2)}%` } as React.CSSProperties}
        >
          <div className="w-full max-w-page xl:max-w-wide mx-auto flex flex-col md:flex-row md:justify-between md:items-start gap-8">
            {/* À gauche, ferré à gauche. Une vraie liste : ce sont des
                éléments de même rang, et un lecteur d'écran les annonce alors
                comme tels au lieu d'en faire une phrase. */}
            <ul className="border-text-xl text-accent max-w-xs text-center md:text-left">
              {disciplines.map((discipline) => (
                <li key={discipline}>{discipline}</li>
              ))}
            </ul>

            {/* À droite, ferré à droite : les deux blocs se regardent en
                miroir, comme la référence. */}
            <p className="border-text-xl text-accent max-w-xs text-center md:text-right">
              {aside.place} · <LiveTime timeZone={aside.timeZone} />
              <br />
              {aside.since}
            </p>
          </div>
        </div>

        {/* Les mêmes disciplines qu'à gauche, mises en ligne. Elles viennent
            de la même liste : le point médian est une mise en forme, pas une
            seconde version du contenu. */}
        <p className="absolute top-8 left-0 right-0 text-center font-garamond text-accent text-eyebrow-lg md:text-sm font-bold uppercase tracking-eyebrow">
          {disciplines.join(' · ')}
        </p>

        <div className="absolute bottom-8 left-0 right-0 flex flex-col items-center gap-4">
          <span className="block w-px h-16 bg-accent" aria-hidden="true" />
          <span className="font-garamond text-accent text-eyebrow-lg md:text-sm font-bold uppercase tracking-eyebrow">
            {scrollCue}
          </span>
        </div>
      </div>
    </section>
  )
}
