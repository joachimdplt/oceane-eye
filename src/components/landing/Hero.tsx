import { hero } from '~/data/content'
import { GrowText } from './GrowText'

/**
 * L'écran d'ouverture, et le seul.
 *
 * Le titre arrive lettre par lettre, chacune poussant hors de sa propre ligne
 * de base. Aucun fondu nulle part, ni sur l'arrivée ni sur la prose : un noir à
 * moitié fondu reste un noir plus clair, et la page n'en a qu'un. Ce qui met le
 * texte en retrait est donc sa taille, jamais son opacité.
 * Voir CONVENTIONS.md § 19.
 *
 * `GrowText` part au montage, ce qui est juste tant que la page tient sur un
 * écran. Le jour où un bloc passera sous la ligne de flottaison, il aura fini
 * de pousser sans avoir été vu : il faudra alors le retenir jusqu'à ce qu'il
 * entre dans le champ.
 */
export function Hero() {
  return (
    <main className="min-h-[100svh] flex items-center px-6 md:px-[6vw] py-20">
      <div className="w-full max-w-[1070px] xl:max-w-[74vw] mx-auto">
        <p className="font-plex text-[11px] md:text-[13px] font-bold uppercase tracking-[0.18em]">
          {hero.role}
        </p>

        <h1 className="display mt-6 md:mt-8">
          <GrowText text={hero.title} delay={120} spread={620} />
        </h1>

        {/* Le corps est la seule chose ici destinée à se lire comme de la
            prose : c'est donc la seule qui ne crie pas.
            Voir COPYWRITING.md § 12. */}
        <p className="font-plex mt-8 md:mt-10 max-w-2xl text-base md:text-lg leading-[1.6]">
          {hero.body}
        </p>
      </div>
    </main>
  )
}
