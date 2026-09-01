import { ErrorComponent, Link, rootRouteId, useMatch, useRouter } from '@tanstack/react-router'
import type { ErrorComponentProps } from '@tanstack/react-router'
import type { ErrorMessages } from '~/types'

/**
 * L'écran d'une erreur non rattrapée.
 *
 * `useRouter` et `useMatch` sont du routing, pas du state applicatif : un
 * composant d'erreur qui ne saurait ni réessayer ni dire où il se trouve ne
 * servirait à rien. Aucun store ni service en revanche (CONVENTIONS.md § 5).
 *
 * Le détail technique reste rendu par `ErrorComponent` : il n'a d'intérêt qu'en
 * développement, et le masquer en production nous priverait de la seule trace
 * qu'un visiteur puisse nous recopier.
 */
export function ErrorState({ messages, ...props }: ErrorComponentProps & { messages: ErrorMessages }) {
  const router = useRouter()
  const isRoot = useMatch({ strict: false, select: (state) => state.id === rootRouteId })

  console.error(props.error)

  const actionClass =
    'font-garamond text-eyebrow md:text-eyebrow-lg font-bold uppercase tracking-eyebrow underline underline-offset-4'

  return (
    <main className="min-h-svh flex items-center px-6 md:px-gutter py-20">
      <div className="w-full max-w-page xl:max-w-wide mx-auto">
        <p className="font-garamond mb-8 max-w-2xl text-base md:text-lg leading-prose">
          {messages.failed}
        </p>

        <ErrorComponent error={props.error} />

        <div className="flex flex-wrap items-center gap-6 mt-10">
          <button type="button" onClick={() => router.invalidate()} className={actionClass}>
            {messages.retry}
          </button>
          {isRoot ? (
            <Link to="/" className={actionClass}>
              {messages.home}
            </Link>
          ) : (
            <button type="button" onClick={() => window.history.back()} className={actionClass}>
              {messages.back}
            </button>
          )}
        </div>
      </div>
    </main>
  )
}
