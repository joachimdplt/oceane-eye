import { useEffect, useRef, useState, type ReactNode } from 'react'

/**
 * Holds a growing text still until it is on screen, and starts it over on
 * every pass.
 *
 * `GrowText` begins its animation the moment it mounts, which is right for the
 * opening screen and wrong for everything below it: by the time someone scrolls
 * down, the letters have long finished growing unseen. The letters are paused
 * by CSS and released when the block comes into view.
 *
 * Leaving the view bumps a counter used as the child key, which remounts the
 * letters so the animation truly restarts. Toggling the play state alone would
 * only resume it from where it stopped.
 */
export function Reveal({ children, className = '' }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLSpanElement | null>(null)
  const [on, setOn] = useState(false)
  const [pass, setPass] = useState(0)

  useEffect(() => {
    const node = ref.current
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
