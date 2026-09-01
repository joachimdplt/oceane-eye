import type { HeroContent } from '~/types'
import { GrowText } from '~/components/ui/GrowText'

/**
 * L'écran d'ouverture, et le seul.
 *
 * Présentationnel : il reçoit son texte en props et n'en va chercher aucun
 * (CONVENTIONS.md § 5). Aucune valeur arbitraire non plus, tout descend du
 * thème (§ 9).
 *
 * Le titre arrive lettre par lettre, chacune poussant hors de sa propre ligne
 * de base. Aucun fondu, ni sur l'arrivée ni sur la prose : un noir à moitié
 * fondu reste un noir plus clair, et la page n'en a qu'un. Ce qui met le texte
 * en retrait est donc sa taille, jamais son opacité.
 *
 * `GrowText` part au montage, ce qui est juste tant que la page tient sur un
 * écran. Le jour où un bloc passera sous la ligne de flottaison, il aura fini
 * de pousser sans avoir été vu : il faudra alors le retenir jusqu'à ce qu'il
 * entre dans le champ.
 */
export function Hero({ role, title, body }: HeroContent) {
  return (
    <main className="min-h-svh flex items-center px-6 md:px-gutter py-20">
      <div className="w-full max-w-page xl:max-w-wide mx-auto">
        <p className="font-plex text-eyebrow md:text-eyebrow-lg font-bold uppercase tracking-eyebrow">
          {role}
        </p>

        <h1 className="display mt-6 md:mt-8">
          <GrowText text={title} delay={120} spread={620} />
        </h1>

        {/* Le corps est la seule chose ici destinée à se lire comme de la
            prose : c'est donc la seule qui ne crie pas.
            Voir COPYWRITING.md § 12. */}
        <p className="font-plex mt-8 md:mt-10 max-w-2xl text-base md:text-lg leading-prose">
          {body}
        </p>
      </div>
    </main>
  )
}
