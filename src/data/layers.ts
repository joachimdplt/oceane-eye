import type { Locale } from '~/stores/useLocaleStore'

/** Tout ce qui est visible existe dans les deux langues. */
export type L<T = string> = Record<Locale, T>

/**
 * Le contenu de la couche animée.
 *
 * ⚠ Texte de départ : la structure est celle qui marche, les mots sont à
 * remplacer. Les règles à tenir en les réécrivant sont dans COPYWRITING.md —
 * en particulier le proverbe de fin de panneau (§ 1) et l'interdiction de
 * concaténer (§ 16).
 *
 * Le premier panneau porte le NOM, démonté ; les suivants portent ce que la
 * maison fait. Ajouter un panneau est un changement de données : la piste de
 * défilement, le compteur et la barre de progression se règlent seuls sur
 * `LAYERS.length`.
 */
export const site = {
  /** Le nom ne se traduit pas. Voir COPYWRITING.md § 13. */
  name: 'Ocean Eye',
  /** La formule, puis le mot qu'elle attend. */
  formula: 'some kind of',
  /**
   * Les fins possibles, aucune retenue : la ligne se termine autrement à
   * chaque tour plutôt que d'annoncer ce que nous sommes.
   */
  endings: ['studio.', 'atelier.', 'crew.', 'people.'],
}

export interface Layer {
  id: string
  /** Les métiers, sur chaque panneau. */
  discipline: L
  /** Le titre, une entrée par ligne : les retours sont décidés à la main. */
  label: L<string[]>
  /** Le corps, une entrée par paragraphe. Un `\n` est un retour à la ligne. */
  body: L<string[]>
  /** Le proverbe. Un objet du quotidien, jamais un bénéfice. */
  headline: L
}

export const LAYERS: Layer[] = [
  {
    id: 'name',
    discipline: {
      fr: 'Ocean Eye',
      en: 'Ocean Eye',
    },
    // Le panneau du nom compose son titre lui-même, à partir de `site`.
    label: { fr: [], en: [] },
    body: {
      fr: [
        'Une sorte de. Floue, sans nom, décrite par approximation : la chose existe déjà dans la tête de quelqu’un, mais pas encore dans le monde. C’est à ce moment-là qu’on nous appelle.',
        'Notre métier consiste à retirer les trois premiers mots : à donner à cette chose un nom, une forme, une adresse, et des gens qui s’en servent.',
      ],
      en: [
        'Some kind of. Vague, unnamed, described by approximation: the thing already exists in someone’s head but not yet in the world. That is the moment we are called.',
        'Our trade consists of removing the first three words: of giving that thing a name, a shape, an address, and people who use it.',
      ],
    },
    headline: {
      fr: 'Parce qu’une voiture rouge n’avance pas plus vite.',
      en: 'Because a red car does not go any faster.',
    },
  },
  {
    id: 'build',
    discipline: {
      fr: 'Branding · Design · Développement',
      en: 'Branding · Design · Development',
    },
    label: {
      fr: ['On construit', 'le produit.'],
      en: ['We build', 'the product.'],
    },
    body: {
      fr: [
        'Votre positionnement, votre identité, votre ton. Puis le produit lui-même, livré prêt à servir et reconnaissable dès la première visite.',
      ],
      en: [
        'Your positioning, your identity, your voice. Then the product itself, delivered ready to use and recognisable from the first visit.',
      ],
    },
    headline: {
      fr: 'Parce qu’une belle cuisine n’a jamais fait à manger.',
      en: 'Because a beautiful kitchen has never cooked dinner.',
    },
  },
  {
    id: 'run',
    discipline: {
      fr: 'Hébergement · Maintenance',
      en: 'Hosting · Maintenance',
    },
    label: {
      fr: ['On l’héberge,', 'on le surveille,', 'on le répare.'],
      en: ['We host it,', 'we watch it,', 'we repair it.'],
    },
    body: {
      fr: [
        'Un dimanche de novembre, quatre heures du matin : un certificat expire. Rien n’a prévenu personne, ce genre de chose arrive simplement à sa date. Au réveil, les visiteurs tombent sur une page d’avertissement rouge, et ils s’en vont.',
        'C’est ce genre de dimanche qu’on prend à votre place. Le serveur, les sauvegardes, les certificats, les mises à jour : autant de choses qui tiennent exactement tant que quelqu’un s’en occupe.',
      ],
      en: [
        'A Sunday in November, four in the morning: a certificate expires. Nothing warned anyone, that sort of thing simply arrives on its date. By breakfast the visitors are meeting a red warning page, and they leave.',
        'That is the kind of Sunday we take off your hands. The server, the backups, the certificates, the updates: things that keep running for exactly as long as someone is looking after them.',
      ],
    },
    headline: {
      fr: 'Parce qu’on ne remercie jamais l’ascenseur qui marche.',
      en: 'Because nobody ever thanked a lift for working.',
    },
  },
]
