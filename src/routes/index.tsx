import { createFileRoute } from '@tanstack/react-router'
import { FixedNav } from '~/components/landing/FixedNav'
import { ScrollLayers } from '~/components/landing/ScrollLayers'
import { SITE_URL, canonical, seo } from '~/utils/seo'

export const Route = createFileRoute('/')({
  head: () => ({
    meta: [
      ...seo({
        title: 'Ocean Eye',
        description: 'Ocean Eye.',
        url: SITE_URL,
      }),
    ],
    links: [canonical(SITE_URL)],
  }),
  component: Home,
})

function Home() {
  return (
    <main className="landing-dark">
      <FixedNav />
      <ScrollLayers />
    </main>
  )
}
