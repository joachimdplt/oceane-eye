import { createFileRoute } from '@tanstack/react-router'
import { Hero } from '~/components/landing/Hero'
import { meta } from '~/data/content'
import { SITE_URL, canonical, seo } from '~/utils/seo'

export const Route = createFileRoute('/')({
  head: () => ({
    meta: [...seo({ ...meta, url: SITE_URL })],
    links: [canonical(SITE_URL)],
  }),
  component: Hero,
})
