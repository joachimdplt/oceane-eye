import { useEffect, useRef, useState, type ReactNode } from 'react'

/**
 * Tient un texte immobile tant qu'il n'est pas à l'écran, et le relance à
 * chaque passage.
 *
 * `GrowText` démarre au montage, ce qui est juste pour l'écran d'ouverture et
 * faux pour tout ce qui suit : le temps qu'on y arrive, les lettres ont fini de
 * pousser sans avoir été vues. Elles sont donc mises en pause par la CSS et
 * relâchées quand le bloc entre dans le champ.
 *
 * Sortir du champ incrémente un compteur qui sert de clé à l'enfant, ce qui le
 * remonte et fait vraiment repartir l'animation. Basculer le seul état de
 * lecture la reprendrait là où elle s'est arrêtée.
 */
export function Reveal({ children, className = '' }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLSpanElement | null>(null)
  const [on, setOn] = useState(false)
  const [pass, setPass] = useState(0)

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
        if (entry.isIntersecting) {
          setOn(true)
        } else {
          setOn(false)
          setPass((n) => n + 1)
        }
      },
      { threshold: 0.2 },
    )
    watcher.observe(node)
    return () => watcher.disconnect()
  }, [])

  return (
    <span ref={ref} className={`reveal ${on ? 'reveal-on' : ''} ${className}`}>
      <span key={pass}>{children}</span>
    </span>
  )
}
