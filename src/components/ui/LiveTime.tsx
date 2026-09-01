import { useEffect, useState } from 'react'

/** Ce qu'on affiche tant que l'heure n'est pas connue. */
const ATTENTE = '--:--:--'

/**
 * L'heure qu'il est, dans un fuseau donné.
 *
 * Le fuseau est celui du lieu affiché, jamais celui du visiteur : la ligne dit
 * l'heure qu'il est à Nice, ce qui n'a d'intérêt que si elle ne suit pas la
 * montre de qui regarde.
 *
 * Rien n'est rendu côté serveur : l'heure de la machine qui rend la page et
 * celle du navigateur qui la reprend ne peuvent pas coïncider, et React
 * reprocherait la différence à l'hydratation. Le gabarit d'attente a la largeur
 * du résultat, donc rien ne bouge quand la vraie valeur arrive.
 */
export function LiveTime({ timeZone, className }: { timeZone: string; className?: string }) {
  const [now, setNow] = useState<string | null>(null)

  useEffect(() => {
    const format = new Intl.DateTimeFormat('fr-FR', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
      timeZone,
    })
    const tick = () => setNow(format.format(new Date()))
    tick()
    const clock = setInterval(tick, 1000)
    return () => clearInterval(clock)
  }, [timeZone])

  return (
    <span className={className} suppressHydrationWarning>
      {now ?? ATTENTE}
    </span>
  )
}
