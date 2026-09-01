import type { ErrorMessages, HeroContent, PageMeta } from '~/types'

/**
 * Le contenu éditorial du site, statique.
 *
 * `data/` est transversal : les pages y puisent et passent le résultat en props
 * aux composants, qui eux ne l'importent jamais (CONVENTIONS.md § 5 et § 10).
 */
export const hero: HeroContent = {
  role: 'SERVICE 1 - SERVICE 2 - SERVICE 3',
  title: { name: 'Océane', tag: 'studio' },
  body: '+10 clients accompagnés',
  // ⚠ Image de remplacement, à changer : elle vient d'un autre projet et ne
  // dit rien du travail présenté. Déposer la bonne au même chemin suffit.
  //
  // Pour passer au film : déposer public/video/hero.mp4 et son affiche, puis
  //   media: { kind: 'video', src: '/video/hero.mp4', poster: '/img/hero.jpg', alt: '' }
  media: { kind: 'image', src: '/img/hero.jpg', alt: '' },
  aside: { place: 'Nice', timeZone: 'Europe/Paris', since: 'since 2018' },
  scrollCue: 'Défiler',
}

export const meta: PageMeta = {
  title: 'Océane studio · Graphiste',
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
