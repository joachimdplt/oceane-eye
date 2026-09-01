import { ErrorComponent, Link, rootRouteId, useMatch, useRouter } from '@tanstack/react-router'
import type { ErrorComponentProps } from '@tanstack/react-router'
import { errors } from '~/data/content'

/**
 * L'écran d'une erreur non rattrapée.
 *
 * Le détail technique reste rendu par `ErrorComponent` : il n'a d'intérêt qu'en
 * développement, et le masquer en production nous priverait de la seule trace
 * qu'un visiteur puisse nous recopier.
 */
export function DefaultCatchBoundary({ error }: ErrorComponentProps) {
  const router = useRouter()
  const isRoot = useMatch({ strict: false, select: (state) => state.id === rootRouteId })

  console.error(error)

  const linkClass =
    'font-plex text-[11px] md:text-[13px] font-bold uppercase tracking-[0.18em] underline underline-offset-4'

  return (
    <main className="min-h-[100svh] flex items-center px-6 md:px-[6vw] py-20">
      <div className="w-full max-w-[1070px] xl:max-w-[74vw] mx-auto">
        <p className="font-plex mb-8 max-w-2xl text-base md:text-lg leading-[1.6]">
          {errors.failed}
        </p>

        <ErrorComponent error={error} />

        <div className="flex flex-wrap items-center gap-6 mt-10">
          <button type="button" onClick={() => router.invalidate()} className={linkClass}>
            {errors.retry}
          </button>
          {isRoot ? (
            <Link to="/" className={linkClass}>
              {errors.home}
            </Link>
          ) : (
            <button type="button" onClick={() => window.history.back()} className={linkClass}>
              {errors.back}
            </button>
          )}
        </div>
      </div>
    </main>
  )
}
