/**
 * Les types du domaine, en barrel.
 *
 * Le site est une vitrine : il n'a ni API ni entités persistées, donc le
 * « domaine » se réduit ici au contenu éditorial. Ces types sont ce que les
 * pages passent en props aux composants, jamais ce que les composants vont
 * chercher eux-mêmes (CONVENTIONS.md § 5 et § 8).
 */

/** L'écran d'ouverture. */
export interface HeroContent {
  /** Le métier, au-dessus du nom. */
  role: string
  title: string
  body: string
}

/** Ce que la page raconte aux moteurs et aux aperçus de partage. */
export interface PageMeta {
  title: string
  description: string
}

/** Les deux écrans qu'on ne veut jamais montrer. */
export interface ErrorMessages {
  notFound: string
  failed: string
  retry: string
  back: string
  home: string
}
