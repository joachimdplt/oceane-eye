import { Link } from '@tanstack/react-router'
import { useEffect, useState } from 'react'

/** Une entrée de la barre : une adresse, un intitulé. */
type NavLink = { to: string; label: string }

/**
 * La barre fixe, faite des pages du site.
 *
 * De vraies adresses et non des ancres : chaque entrée mène à une page qui
 * existe, se copie, s'ouvre dans un onglet, et se trouve par un moteur. La barre
 * se fabrique à partir de `navLinks`, il n'y a donc pas de seconde liste à tenir
 * à jour.
 *
 * Elle s'efface quand on descend et revient quand on remonte, ou quand la souris
 * s'approche du haut de l'écran — une barre qu'on ne peut rappeler qu'en
 * défilant à contresens est une barre qu'on abandonne.
 *
 * `quietOver` nomme une zone où elle se tait quoi qu'il arrive. Les cartes de
 * travaux se collent exactement là où elle se tient : superposées, on ne lirait
 * ni l'une ni l'autre.
 */
export function Nav({ links, quietOver }: { links: readonly NavLink[]; quietOver?: string }) {
  const [shown, setShown] = useState(true)
  const [quiet, setQuiet] = useState(false)

  useEffect(() => {
    let last = window.scrollY
    let frame = 0

    const read = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        const y = window.scrollY
        // Le seuil de 6 px n'est pas de la coquetterie : sans lui, le tremblement
        // d'un pavé tactile fait clignoter la barre à chaque trame.
        if (y < 32) setShown(true)
        else if (y > last + 6) setShown(false)
        else if (y < last - 6) setShown(true)
        last = y
      })
    }

    // La souris qui monte vers le haut de l'écran est une demande de menu.
    const onMove = (event: MouseEvent) => {
      if (event.clientY < 140) setShown(true)
    }

    window.addEventListener('scroll', read, { passive: true })
    window.addEventListener('mousemove', onMove, { passive: true })
    return () => {
      window.removeEventListener('scroll', read)
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(frame)
    }
  }, [])

  useEffect(() => {
    if (!quietOver) return
    const node = document.getElementById(quietOver)
    if (!node || typeof IntersectionObserver === 'undefined') return
    // La marge basse de -90 % réduit la zone d'observation à la bande haute de
    // l'écran : la barre se tait quand les travaux atteignent SA hauteur, pas
    // quand ils apparaissent en bas.
    const watcher = new IntersectionObserver(([entry]) => setQuiet(entry.isIntersecting), {
      rootMargin: '0px 0px -90% 0px',
    })
    watcher.observe(node)
    return () => watcher.disconnect()
  }, [quietOver])

  const visible = shown && !quiet

  return (
    <nav
      aria-label="Pages du site"
      className={`site-nav ${visible ? '' : 'site-nav--hidden'} fixed top-0 left-0 right-0 z-50 px-6 md:px-gutter py-5`}
    >
      <ul className="w-full max-w-page xl:max-w-wide mx-auto flex flex-wrap items-center justify-center gap-x-6 gap-y-2 md:gap-x-10">
        {links.map((link) => (
          <li key={link.to}>
            <Link
              to={link.to}
              // La page courante est signalée par le soulignement et par
              // `aria-current`, que le routeur pose seul : la couleur seule ne
              // se voit pas de tout le monde.
              activeProps={{ className: 'underline underline-offset-4' }}
              activeOptions={{ exact: link.to === '/' }}
              className="font-dm text-ink text-eyebrow-lg md:text-sm font-medium no-underline hover:opacity-70 transition-opacity motion-reduce:transition-none"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}
