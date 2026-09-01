import { createFileRoute } from '@tanstack/react-router'
import { Hero } from '~/components/landing/Hero'
import { hero, meta } from '~/data/content'
import { SITE_URL, canonical, seo } from '~/utils/seo'

/**
 * La page : assemblage seul, zéro logique (CONVENTIONS.md § 6).
 *
 * Elle lit le contenu dans `data/` — transversal — et le passe en props au
 * composant, qui ne va rien chercher lui-même.
 */
export const Route = createFileRoute('/')({
  head: () => ({
    meta: [...seo({ ...meta, url: SITE_URL })],
    links: [canonical(SITE_URL)],
  }),
  component: () => <Hero {...hero} />,
})
