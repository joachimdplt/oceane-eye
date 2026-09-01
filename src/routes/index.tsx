import { createFileRoute } from '@tanstack/react-router'
import { Hero } from '~/components/landing/Hero'
import { SITE_URL, canonical, seo } from '~/utils/seo'

export const Route = createFileRoute('/')({
  head: () => ({
    meta: [
      ...seo({
        title: 'Océane · Graphiste',
        description:
          'Identité visuelle, branding et direction artistique. Huit ans d’expérience au service de votre image de marque.',
        url: SITE_URL,
      }),
    ],
    links: [canonical(SITE_URL)],
  }),
  component: Hero,
})
