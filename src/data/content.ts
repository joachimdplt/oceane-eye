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
