import { LocaleToggle } from '~/components/ui/LocaleToggle'
import { useLocaleStore } from '~/stores/useLocaleStore'
import { toneAt } from '~/components/ui/tones'
import { site } from '~/data/layers'

/**
 * La seule chose fixe de la page.
 *
 * Un bandeau plein plutôt que du texte flottant : la page passe au noir sous le
 * premier écran, et une barre sans fond propre devrait changer d'encre pour y
 * survivre. Portant sa couleur, elle se lit pareil du haut en bas et tient lieu
 * du filet de couleur qui accompagne les écrans sombres.
 */
export function FixedNav() {
  const locale = useLocaleStore((s) => s.locale)
  const band = toneAt(0)

  return (
    <div
      className="fixed top-0 left-0 right-0 z-40 px-6 md:px-[6vw] py-4"
      style={{ background: band.bg, color: band.fg }}
    >
      <div className="w-full max-w-[1070px] xl:max-w-[74vw] mx-auto flex items-center justify-between">
        <span className="font-plex text-sm md:text-base font-bold uppercase tracking-[0.06em]">
          {site.name}
        </span>
        <LocaleToggle locale={locale} />
      </div>
    </div>
  )
}
