import type {
  AboutContent,
  Contact,
  ErrorMessages,
  HeroContent,
  Offer,
  OffersIntro,
  PageMeta,
  Project,
  Step,
} from '~/types'

/**
 * Le contenu éditorial du site, statique.
 *
 * `data/` est transversal : les pages y puisent et passent le résultat en props
 * aux composants, qui eux ne l'importent jamais (CONVENTIONS.md § 5 et § 10).
 */
export const hero: HeroContent = {
  title: { name: 'Océane', tag: 'studio' },
  disciplines: ['Graphics', 'Identity', 'Brand'],
  // ⚠ Image de remplacement, à changer : elle vient d'un autre projet et ne
  // dit rien du travail présenté. Déposer la bonne au même chemin suffit.
  //
  // Pour passer au film : déposer public/video/hero.mp4 et son affiche, puis
  //   media: { kind: 'video', src: '/video/hero.mp4', poster: '/img/hero.jpg', alt: '' }
  media: { kind: 'image', src: '/img/hero.jpg', alt: '' },
  aside: { place: 'Nice', timeZone: 'Europe/Paris', since: 'since 2018' },
  scrollCue: 'Défiler',
}

/**
 * Les blocs de la page, dans leur ordre.
 *
 * Les CLÉS sont les ancres : c'est ce qui permet à la nav de se fabriquer
 * d'elle-même à partir d'ici, sans qu'une seconde liste de liens ait à être
 * tenue à jour à côté. Réordonner cet objet réordonne la nav.
 */
export const blockTitles = {
  studio: 'Le studio',
  services: 'Services',
  travaux: 'Travaux',
  methode: 'Méthode',
  contact: 'Travaillons ensemble',
}

/**
 * Ce que le studio est, dit du dehors.
 *
 * L'ancienne version parlait de ce qu'Océane aime faire — « j'apprécie
 * construire avec des personnes motivées ». Un acheteur n'achète pas un goût,
 * il achète un résultat : le texte dit donc ce qui sort du studio et ce que ça
 * change, et garde la personne pour la preuve, pas pour l'argument.
 *
 * Les deux chiffres sont VRAIS et vérifiables sur la page elle-même : neuf
 * projets sont montrés plus bas, et huit ans séparent 2018 d'aujourd'hui. Pas
 * de note de satisfaction ni de nombre de clients — on n'en a aucune trace, et
 * un chiffre invente vaut moins qu'une case vide.
 */
export const about: AboutContent = {
  lede: 'Ocean Eye est un studio de design de marque, ancré à Nice.',
  rest:
    'On y cherche ce qui fait qu’une marque se reconnaît : une couleur, un geste, une façon de dire les choses. L’intuition trouve la piste, la méthode la rend tenable. Puis on lui donne une forme qui vive ailleurs que dans sa charte, sur un packaging, sur une devanture, sur un écran de téléphone, et qui tienne encore dans deux ans, entre d’autres mains que les nôtres.',
  stats: [
    { value: '09', label: 'marques livrées', note: 'de l’identité au packaging' },
    { value: '08', label: 'années de pratique', note: 'en agence, en entreprise, en indépendant' },
  ],
  cta: { label: 'Voir les travaux', href: '#travaux' },
}

/**
 * Les prestations, avec leur plancher.
 *
 * ⚠ LES MONTANTS SONT À VALIDER. Ils sont calés sur le marché français d'un
 * studio indépendant de ce niveau d'expérience, pas sur une grille existante :
 * personne d'autre qu'Océane ne peut les arrêter. Ils sont ici pour que la
 * page tienne debout, pas pour être publiés tels quels.
 *
 * Le plancher plutôt que le tarif : il écarte les demandes hors budget sans
 * engager sur un périmètre qu'on n'a pas encore lu.
 */
export const offersIntro: OffersIntro = {
  lede:
    'Une marque a un univers avant d’avoir une forme. Le travail commence ici : aller chercher ce qui vous ressemble déjà sans avoir été nommé, puis lui donner de quoi se voir.',
}

export const offers: Offer[] = [
  {
    id: 'identite',
    name: 'Identité visuelle',
    pitch: 'Le système complet, livré prêt à être tenu par quelqu’un d’autre.',
    deliverables: [
      'Logo et ses déclinaisons',
      'Palette et système typographique',
      'Charte d’utilisation',
      'Fichiers sources et exports',
    ],
    image: '/img/projets/satine-by-fany.jpg',
    icon: 'identite',
    from: 2400,
    duration: '4 à 6 semaines',
  },
  {
    id: 'direction-artistique',
    name: 'Direction artistique',
    pitch: 'Le territoire visuel avant les visuels : ce qu’on montre, et ce qu’on ne montre pas.',
    deliverables: [
      'Moodboards et pistes créatives',
      'Territoire visuel et règles de cadrage',
      'Déclinaisons sur vos supports',
      'Suivi de production',
    ],
    image: '/img/projets/thelma-rose.jpg',
    icon: 'direction',
    from: 3200,
    duration: '5 à 8 semaines',
  },
  {
    id: 'packaging',
    name: 'Packaging',
    pitch: 'L’objet qu’on tient en main, du volume au fichier d’impression.',
    deliverables: [
      'Structure et calage sur le gabarit',
      'Illustration et mise en page',
      'Déclinaison sur la gamme',
      'Fichiers prêts pour l’imprimeur',
    ],
    image: '/img/projets/bobines-etrange.jpg',
    icon: 'packaging',
    from: 1800,
    duration: '3 à 5 semaines',
  },
  {
    id: 'supports',
    name: 'Supports de communication',
    pitch: 'Une campagne qui se tient, du format d’affichage au post.',
    deliverables: [
      'Affiches, dépliants, éditions',
      'Déclinaisons réseaux sociaux',
      'Gabarits réutilisables',
      'Fichiers d’impression',
    ],
    image: '/img/projets/bauhaus-109.jpg',
    icon: 'supports',
    from: 900,
    duration: '2 à 3 semaines',
  },
]

/**
 * La méthode, reprise du site actuel : elle y était déjà juste.
 *
 * Quatre étapes nommées valent mieux qu'une promesse d'écoute : elles disent au
 * client où il est, et ce qu'il doit avoir reçu avant de payer la suite.
 */
export const steps: Step[] = [
  {
    id: 'cadrage',
    name: 'Cadrage du projet',
    detail:
      'On écrit ce qu’il faut obtenir avant de dessiner quoi que ce soit : à qui la marque parle, contre qui elle se tient, et ce qui devra encore fonctionner dans deux ans.',
  },
  {
    id: 'direction',
    name: 'Réflexion de la direction artistique',
    detail:
      'Votre univers devient des intentions visuelles : moodboards et pistes créatives. C’est ici que se décide l’esthétique, et c’est ici qu’on change d’avis sans que ça coûte cher.',
  },
  {
    id: 'conception',
    name: 'Conception de l’identité',
    detail:
      'Logo, couleurs, typographies, éléments graphiques. Le système prend sa forme définitive, et chaque pièce est dessinée pour tenir à côté des autres.',
  },
  {
    id: 'livraison',
    name: 'Livraison',
    detail:
      'Tous les fichiers finaux, plus le guide qui dit comment s’en servir. Une identité qu’on ne peut pas appliquer sans son auteur n’est pas livrée.',
  },
]

/** Les projets, du plus récent au plus ancien. */
export const projects: Project[] = [
  {
    id: 'thelma-rose',
    name: 'Thelma & Rose',
    discipline: 'Direction artistique',
    summary: 'Appel d’offres remporté pour une marque française engagée de prêt-à-porter féminin.',
    image: '/img/projets/thelma-rose.jpg',
  },
  {
    id: 'satine-by-fany',
    name: 'Satiné by Fany',
    discipline: 'Identité visuelle',
    summary: 'L’identité d’une experte en soins et lissages capillaires.',
    image: '/img/projets/satine-by-fany.jpg',
  },
  {
    id: 'conciergerie-riviera',
    name: 'Conciergerie Riviera',
    discipline: 'Identité visuelle',
    summary: 'La Côte d’Azur sur mesure, pour une conciergerie niçoise de luxe.',
    image: '/img/projets/conciergerie-riviera.jpg',
  },
  {
    id: 'bobines-etrange',
    name: 'Les Bobines de l’Étrange',
    discipline: 'Packaging et identité visuelle',
    summary: 'Une édition limitée de boîtes de sardines de collection.',
    image: '/img/projets/bobines-etrange.jpg',
  },
  {
    id: 'zoenka',
    name: 'ZOËNKA',
    discipline: 'Identité visuelle et community management',
    summary: 'Une identité pensée pour une psychologue et thérapeute en médiation animale.',
    image: '/img/projets/zoenka.jpg',
  },
  {
    id: 'lavender-rose',
    name: 'Lavender & Rose',
    discipline: 'Identité visuelle',
    summary: 'Un logo pour une collection de vaisselle haut de gamme.',
    image: '/img/projets/lavender-rose.jpg',
  },
  {
    id: 'amare',
    name: 'Amare',
    discipline: 'Conception produit et direction artistique',
    summary: 'Un concept produit qui transforme la pollution en ressource, pour reconnecter à l’océan.',
    image: '/img/projets/amare.jpg',
  },
  {
    id: 'bauhaus-109',
    name: 'BAUHAUS by Le 109',
    discipline: 'Supports de communication',
    summary: 'La campagne visuelle des 109 ans du 109, à Nice.',
    image: '/img/projets/bauhaus-109.jpg',
  },
  {
    id: 'la-doyenne',
    name: 'La Doyenne',
    discipline: 'Print',
    summary: 'Un dépliant-affiche illustré sur l’expérience d’alternance à Condé Nice.',
    image: '/img/projets/la-doyenne.jpg',
  },
]

/** Repris tels quels du site actuel : ce sont ses vraies coordonnées. */
export const contact: Contact = {
  email: 'oceaneye.studio@gmail.com',
  phone: '07 86 93 91 64',
  instagram: '@oceaneye.studio',
  instagramUrl: 'https://www.instagram.com/oceaneye.studio/',
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
