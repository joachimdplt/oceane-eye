import { Link } from '@tanstack/react-router'
import { errors } from '~/data/content'

/** Le lien et le bouton portent le même poids : ni l'un ni l'autre n'est une
 *  couleur, la page n'en a aucune. Voir CONVENTIONS.md § 19. */
export function NotFound({ children }: { children?: React.ReactNode }) {
  return (
    <main className="min-h-[100svh] flex items-center px-6 md:px-[6vw] py-20">
      <div className="w-full max-w-[1070px] xl:max-w-[74vw] mx-auto">
        <h1 className="display">404</h1>
        <p className="font-plex mt-8 max-w-2xl text-base md:text-lg leading-[1.6]">
          {children ?? errors.notFound}
        </p>
        <div className="flex flex-wrap items-center gap-6 mt-10">
          <button
            type="button"
            onClick={() => window.history.back()}
            className="font-plex text-[11px] md:text-[13px] font-bold uppercase tracking-[0.18em] underline underline-offset-4"
          >
            {errors.back}
          </button>
          <Link
            to="/"
            className="font-plex text-[11px] md:text-[13px] font-bold uppercase tracking-[0.18em] underline underline-offset-4"
          >
            {errors.home}
          </Link>
        </div>
      </div>
    </main>
  )
}
