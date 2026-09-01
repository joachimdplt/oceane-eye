import { useLocaleStore, type Locale } from '~/stores/useLocaleStore'

/**
 * Le sélecteur de langue, porté par la barre fixe. Sans lui le site serait
 * bilingue sans aucun moyen de le dire.
 *
 * Il nomme en toutes lettres la langue vers laquelle il bascule : un drapeau
 * désigne un pays et jamais une langue, et la moitié de l'Europe serait fondée
 * à s'offusquer de celui qu'on aurait choisi. Voir COPYWRITING.md § 14.
 *
 * Switching restarts the whole site from the top. Translating a page under
 * someone who is halfway down it leaves them looking at a paragraph that has
 * moved, and the opening they paid attention to never plays again.
 */
export function LocaleToggle({ locale }: { locale: Locale }) {
  const setLocale = useLocaleStore((s) => s.setLocale)
  const next: Locale = locale === 'fr' ? 'en' : 'fr'

  return (
    <button
      type="button"
      onClick={() => {
        setLocale(next)
        // A full restart: the language is read back from storage on boot, so
        // reloading replays the opening from the top rather than swapping the
        // words under someone who is halfway down the page.
        if (typeof window !== 'undefined') {
          if ('scrollRestoration' in window.history) window.history.scrollRestoration = 'manual'
          window.scrollTo(0, 0)
          window.location.reload()
        }
      }}
      lang={next}
      aria-label={next === 'en' ? 'Switch to English' : 'Passer en français'}
      className="font-plex text-sm md:text-base font-bold uppercase tracking-[0.08em] hover:opacity-70 transition"
    >
      {next.toUpperCase()}
    </button>
  )
}
