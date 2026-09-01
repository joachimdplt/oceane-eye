import { useEffect, useRef, useState, type ReactNode } from 'react'

/**
 * Tient un texte immobile tant qu'il n'est pas à l'écran, puis le relâche.
 *
 * `GrowText` démarre au montage, ce qui est juste pour l'écran d'ouverture et
 * faux pour tout ce qui suit : le temps qu'on y arrive, les lettres ont fini de
 * pousser sans avoir été vues. Elles sont donc mises en pause par la CSS et
 * relâchées quand le bloc entre dans le champ.
 *
 * Une seule fois. Une version précédente relançait l'animation à chaque
 * passage, ce qui se défendait sur une page d'un écran et bégaie sur quatorze
 * blocs : en remontant, on repasse devant tout ce qu'on vient de lire et la
 * page entière se remet à bouger. L'observateur est donc débranché dès qu'il a
 * servi, ce qui évite en prime d'en garder quatorze en vie.
 */
export function Reveal({ children, className = '' }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLSpanElement | null>(null)
  const [on, setOn] = useState(false)

  useEffect(() => {
    const node = ref.current
    // Sans observateur, on montre plutôt que de cacher : un texte figé
    // invisible serait pire que pas d'animation du tout.
    if (!node || typeof IntersectionObserver === 'undefined') {
      setOn(true)
      return
    }
    const watcher = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        setOn(true)
        watcher.disconnect()
      },
      { threshold: 0.2 },
    )
    watcher.observe(node)
    return () => watcher.disconnect()
  }, [])

  return (
    <span ref={ref} className={`reveal ${on ? 'reveal-on' : ''} ${className}`}>
      {children}
    </span>
  )
}
