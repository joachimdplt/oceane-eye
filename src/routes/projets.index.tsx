import { createFileRoute } from '@tanstack/react-router'
import { BlockTitle } from '~/components/landing/BlockTitle'
import { WorkMosaic } from '~/components/landing/WorkMosaic'
import {
  blockTitles,
  pageMeta,
  projects,
} from '~/data/content'
import { SITE_URL, canonical, seo } from '~/utils/seo'

/**
 * La page des projets : les neuf, en mosaïque.
 *
 * Une mosaïque et non la pile de l'accueil : celle-ci montre un projet à la
 * fois, ce qui est juste pour une sélection de quatre et intenable pour neuf.
 * Ici on veut pouvoir les embrasser d'un regard et choisir.
 */
export const Route = createFileRoute('/projets/')({
  head: () => {
    const url = `${SITE_URL}/projets`
    return {
      meta: [...seo({ ...pageMeta.projets, url })],
      links: [canonical(url)],
    }
  },
  component: ProjetsPage,
})

function ProjetsPage() {
  return (
    <main>
      <section className="relative isolate min-h-svh flex flex-col justify-center gap-10 md:gap-14 px-6 md:px-gutter pt-32 pb-24 bg-ground overflow-hidden">
        <span aria-hidden="true" className="grain absolute inset-0" />

        <div className="relative w-full max-w-page xl:max-w-wide mx-auto">
          <BlockTitle>{blockTitles.projets}</BlockTitle>
        </div>

        <div className="relative w-full max-w-page xl:max-w-wide mx-auto">
          <WorkMosaic projects={projects} />
        </div>
      </section>
    </main>
  )
}
