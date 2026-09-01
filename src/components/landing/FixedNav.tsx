import { LocaleToggle } from '~/components/ui/LocaleToggle'
import { useLocaleStore } from '~/stores/useLocaleStore'
import { site } from '~/data/layers'

/**
 * La seule chose fixe de la page.
 *
 * Un bandeau opaque plutôt que du texte flottant : le texte de la page passe
 * dessous en défilant, et une barre transparente le laisserait se mêler au sien.
 * Le filet du bas est tout ce qui la sépare de la page, puisque les deux sont
 * blancs.
 */
export function FixedNav() {
  const locale = useLocaleStore((s) => s.locale)

  return (
    <div
      className="fixed top-0 left-0 right-0 z-40 px-6 md:px-[6vw] py-4 bg-white text-[#0a0a0a] border-b border-[#0a0a0a]/10"
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
