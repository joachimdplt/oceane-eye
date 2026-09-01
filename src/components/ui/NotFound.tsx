import { Link } from '@tanstack/react-router'
import type { ErrorMessages } from '~/types'

/**
 * L'écran d'une adresse qui ne mène nulle part.
 *
 * Générique, donc dans `ui/` : il reçoit ses mots en props et ne porte aucune
 * couleur « one-shot » (CONVENTIONS.md § 5 et § 9). Le bouton et le lien ont le
 * même poids — la page n'a pas de couleur pour hiérarchiser deux sorties.
 */
export function NotFound({ messages, children }: { messages: ErrorMessages; children?: React.ReactNode }) {
  const actionClass =
    'label text-ink underline underline-offset-4'

  return (
    <main className="min-h-svh flex items-center px-6 md:px-gutter py-20">
      <div className="w-full max-w-page xl:max-w-wide mx-auto">
        <h1 className="title1">404</h1>
        <p className="font-garamond mt-8 max-w-2xl text-base md:text-lg leading-prose">
          {children ?? messages.notFound}
        </p>
        <div className="flex flex-wrap items-center gap-6 mt-10">
          <button type="button" onClick={() => window.history.back()} className={actionClass}>
            {messages.back}
          </button>
          <Link to="/" className={actionClass}>
            {messages.home}
          </Link>
        </div>
      </div>
    </main>
  )
}
