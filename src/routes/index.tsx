import { createFileRoute } from '@tanstack/react-router'
import { About } from '~/components/landing/About'
import { Nav } from '~/components/landing/Nav'
import { Contact } from '~/components/landing/Contact'
import { Hero } from '~/components/landing/Hero'
import { Offers } from '~/components/landing/Offers'
import { Process } from '~/components/landing/Process'
import { Work } from '~/components/landing/Work'
import {
  about,
  blockTitles,
  contact,
  hero,
  meta,
  offers,
  offersIntro,
  projects,
  steps,
} from '~/data/content'
import { SITE_URL, canonical, seo } from '~/utils/seo'

export const Route = createFileRoute('/')({
  head: () => ({
    meta: [...seo({ ...meta, url: SITE_URL })],
    links: [canonical(SITE_URL)],
  }),
  component: Landing,
})

/**
 * La page : assemblage seul, zéro logique (CONVENTIONS.md § 6).
 *
 * `<main>` est le conteneur de l'écran épinglé du hero : c'est lui qui décide
 * combien de temps il le reste. Il court sur toute la page, donc l'ouverture
 * tient jusqu'à ce que les blocs suivants l'aient entièrement couverte.
 */
function Landing() {
  return (
    <main>
      <Nav items={blockTitles} />

      <Hero {...hero} />
      <About title={blockTitles.studio} about={about} />
      <Offers title={blockTitles.services} lede={offersIntro.lede} offers={offers} />
      <Work title={blockTitles.produits} projects={projects} />
      <Process title={blockTitles.methode} steps={steps} />
      <Contact title={blockTitles.contact} contact={contact} />
    </main>
  )
}
