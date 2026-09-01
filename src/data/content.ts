/**
 * Le texte visible de la page.
 *
 * Il vit ici et non dans le composant, comme partout ailleurs : un composant
 * qui porte ses propres mots oblige à ouvrir du JSX pour corriger une virgule,
 * et c'est ainsi qu'une version finit par diverger de l'autre.
 * Voir CONVENTIONS.md § 3.
 */
export const hero = {
  /** Le métier, au-dessus du nom. */
  role: 'Graphiste',
  title: 'Je suis Océane',
  body: 'Avec mes 8 ans d’expérience, je propose mes compétences en identité visuelle, branding et direction artistique, afin de vous accompagner dans votre image de marque.',
}

/** Ce que la page raconte aux moteurs et aux aperçus de partage. */
export const meta = {
  title: 'Océane · Graphiste',
  description:
    'Identité visuelle, branding et direction artistique. Huit ans d’expérience au service de votre image de marque.',
}

/**
 * Les deux écrans qu'on ne veut jamais montrer.
 *
 * En français comme le reste : ils héritaient de l'exemple TanStack et
 * parlaient anglais sous un `<html lang="fr">`. Ils disent ce qui s'est passé
 * et laissent une porte ouverte, jamais « une erreur est survenue ».
 * Voir COPYWRITING.md § 10.
 */
export const errors = {
  notFound: 'Cette page n’existe pas.',
  failed: 'Quelque chose n’a pas tenu de notre côté.',
  retry: 'Réessayer',
  back: 'Revenir en arrière',
  home: 'Retour à l’accueil',
}
