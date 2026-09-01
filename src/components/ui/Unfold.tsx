import { useEffect, useRef, useState, type ReactNode } from 'react'

/**
 * Déplie son contenu quand il entre dans le champ.
 *
 * Même geste que l'arche de l'ouverture, et pour la même raison : ce n'est pas
 * l'image qu'on met à l'échelle, c'est la fenêtre découpée dedans qui s'écarte.
 * Rien ne se déforme, et la mise en page n'est jamais recalculée.
 *
 * L'ouverture est confiée à une transition CSS plutôt qu'au défilement image
 * par image : neuf projets qui liraient chacun la position de la page à chaque
 * trame coûteraient bien plus cher que le geste ne rapporte.
 *
 * Le geste se rejoue à chaque passage. C'est ce qui distingue ce composant de
 * `Reveal`, qui ne part qu'une fois : les titres de blocs relancés en boucle
 * faisaient bégayer la page, alors qu'une image qui se déplie EST le contenu du
 * bloc — la revoir en remontant, c'est la revoir tout court.
 *
 * L'observateur reste donc branché, et le seuil est bas : refermer une image
 * encore à moitié visible se verrait comme un défaut.
 */
export function Unfold({ children, className = '' }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement | null>(null)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const node = ref.current
    // Sans observateur, on montre : un contenu resté fermé serait pire que pas
    // d'animation du tout.
    if (!node || typeof IntersectionObserver === 'undefined') {
      setOpen(true)
      return
    }
    const watcher = new IntersectionObserver(
      ([entry]) => setOpen(entry.isIntersecting),
      { threshold: 0.15 },
    )
    watcher.observe(node)
    return () => watcher.disconnect()
  }, [])

  return (
    <div ref={ref} className={`unfold ${open ? 'unfold-open' : ''} ${className}`}>
      {children}
    </div>
  )
}
