import type { ErrorMessages, HeroContent, PageMeta } from '~/types'

/**
 * Le contenu éditorial du site, statique.
 *
 * `data/` est transversal : les pages y puisent et passent le résultat en props
 * aux composants, qui eux ne l'importent jamais (CONVENTIONS.md § 5 et § 10).
 */
export const hero: HeroContent = {
  role: 'Graphiste ùolb',
  title: 'OCEAN EYE STUDIO',
  body: 'Avec mes 8 ans d’expérience, je propose mes compétences en identité visuelle, branding et direction artistique, afin de vous accompagner dans votre image de marque.',
}

export const meta: PageMeta = {
  title: 'Océane · Graphiste',
  description:
    'Identité visuelle, branding et direction artistique. Huit ans d’expérience au service de votre image de marque.',
}

/**
 * En français comme le reste du site, et chacun laisse une porte ouverte plutôt
 * que d'annoncer qu'une erreur est survenue. Voir COPYWRITING.md § 10.
 */
export const errors: ErrorMessages = {
  notFound: 'Cette page n’existe pas.',
  failed: 'Quelque chose n’a pas tenu de notre côté.',
  retry: 'Réessayer',
  back: 'Revenir en arrière',
  home: 'Retour à l’accueil',
}
