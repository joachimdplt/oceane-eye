import { createFileRoute } from '@tanstack/react-router'
import { Hero } from '~/components/landing/Hero'
import { Section } from '~/components/landing/Section'
import { hero, meta, sections } from '~/data/content'
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
  component: Landing,
})

function Landing() {
  /* `<main>` est le conteneur de l'écran épinglé du hero : c'est lui qui
     décide combien de temps il le reste. Il court sur toute la page, donc le
     hero tient jusqu'à ce que les blocs suivants l'aient entièrement couvert. */
  return (
    <main>
      <Hero {...hero} />
      {sections.map((section) => (
        <Section key={section.id} {...section} />
      ))}
    </main>
  )
}
