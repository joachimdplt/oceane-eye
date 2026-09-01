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
  title: HeroTitle
  /**
   * Les disciplines. Elles servent deux fois — empilées à gauche, et en ligne
   * au-dessus du titre — mais ne sont écrites qu'ici : deux listes à tenir à
   * jour finissent toujours par diverger.
   */
  disciplines: string[]
  /** Ce que l'arche révèle : une image, ou un film. */
  media: HeroMedia
  /** Le vis-à-vis du corps de texte, à droite de l'arche. */
  aside: HeroAside
  /** L'invitation à descendre, sous l'arche. */
  scrollCue: string
}

/** Un chiffre mis en avant, avec ce qu'il compte. */
export interface Stat {
  value: string
  label: string
  note: string
}

/**
 * Le bloc du studio.
 *
 * `lede` et `rest` sont deux champs et non un seul texte coupé au rendu : la
 * césure est une décision d'écriture — quelle phrase porte l'annonce — et non
 * un comptage de caractères.
 */
export interface AboutContent {
  lede: string
  rest: string
  stats: Stat[]
  cta: { label: string; href: string }
}

/** Les icônes disponibles pour une prestation. */
export type OfferIcon = 'identite' | 'direction' | 'packaging' | 'supports'

/**
 * Une prestation vendue.
 *
 * `from` est un prix plancher, pas un tarif : il filtre les demandes sans
 * engager sur un périmètre qu'on n'a pas encore lu. `deliverables` dit ce que
 * le client emporte, parce qu'un prix sans périmètre ne se compare à rien.
 */
export interface Offer {
  id: string
  name: string
  pitch: string
  deliverables: string[]
  /** L'image du panneau. Prise dans les projets : elle montre la discipline. */
  image: string
  /**
   * L'icône du panneau, désignée par un NOM et non par un composant : `data/`
   * ne connaît pas React, et une donnée qui importerait un composant lierait la
   * couche transversale à la couche 4 (CONVENTIONS.md § 8).
   */
  icon: OfferIcon
  /** Plancher en euros, hors taxes. */
  from: number
  /** Délai indicatif, en clair. */
  duration: string
}

/** Un projet livré. */
export interface Project {
  id: string
  name: string
  /**
   * La prestation dont ce projet relève, par son `id`.
   *
   * Un lien explicite, et non un rapprochement sur le libellé de la discipline :
   * « Identité visuelle et community management » ne s'appariera jamais avec
   * « Identité visuelle » par comparaison de chaînes, et le jour où l'un des
   * deux se réécrit, le rapprochement casse en silence.
   */
  offer: string
  /** La discipline, telle qu'elle se vend. */
  discipline: string
  /** Ce qui a été livré, en une phrase. */
  summary: string
  image: string
}

/** Le chapô du bloc des prestations. */
export interface OffersIntro {
  lede: string
}

/** Une formule de travail, avec ce qu'elle comprend et son plancher. */
export interface Plan {
  id: string
  name: string
  features: string[]
  /** Plancher en euros, hors taxes. */
  from: number
  /** Ce qui suit le montant : « au projet », « par mois »… */
  unit: string
}

/** Le bloc des tarifs : deux formules encadrant une image. */
export interface PlansContent {
  eyebrow: string
  lede: string
  rest: string
  image: string
  plans: Plan[]
}

/** Une étape de la méthode. */
export interface Step {
  id: string
  name: string
  detail: string
}

/** Où l'on écrit, et à qui. */
export interface Contact {
  email: string
  phone: string
  instagram: string
  instagramUrl: string
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
