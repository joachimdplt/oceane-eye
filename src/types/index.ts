/**
 * Les types du domaine, en barrel.
 *
 * Le site est une vitrine : il n'a ni API ni entités persistées, donc le
 * « domaine » se réduit ici au contenu éditorial. Ces types sont ce que les
 * pages passent en props aux composants, jamais ce que les composants vont
 * chercher eux-mêmes (CONVENTIONS.md § 5 et § 8).
 */

/**
 * Le fond révélé par l'arche.
 *
 * Un film porte une affiche : c'est elle qu'on montre à qui a demandé moins de
 * mouvement, et c'est elle qui tient l'écran le temps du chargement.
 */
export type HeroMedia =
  | { kind: 'image'; src: string; alt: string }
  | { kind: 'video'; src: string; poster: string; alt: string }

/**
 * Le titre est un bloc-marque, pas une phrase : le nom porté par le titre 1, et
 * le mot qui dit le métier posé à côté en titre 2. Les deux vivent séparément
 * parce qu'ils ne sont pas composés dans la même police.
 */
export interface HeroTitle {
  name: string
  tag: string
}

/** Le bloc de droite : d'où l'on travaille, à quelle heure, et depuis quand. */
export interface HeroAside {
  place: string
  /** Le fuseau de cette ville, en identifiant IANA. */
  timeZone: string
  since: string
}

/** L'écran d'ouverture. */
export interface HeroContent {
  /** Le métier, au-dessus du nom. */
  role: string
  title: HeroTitle
  body: string
  /** Ce que l'arche révèle : une image, ou un film. */
  media: HeroMedia
  /** Le vis-à-vis du corps de texte, à droite de l'arche. */
  aside: HeroAside
  /** L'invitation à descendre, sous l'arche. */
  scrollCue: string
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
