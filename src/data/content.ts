import type {
  AboutContent,
  FooterContent,
  Contact,
  ErrorMessages,
  HeroContent,
  Offer,
  PlansContent,
  FaqContent,
  SocialProofContent,
  OffersIntro,
  PageMeta,
  Project,
  Voice,
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
 * Les pages du site, dans l'ordre de la barre.
 *
 * De vraies adresses et non des ancres : chaque entrée mène à une page qui
 * existe, se partage et se trouve. La barre se fabrique à partir d'ici, il n'y
 * a donc pas de seconde liste à tenir à jour.
 */
export const navLinks = [
  { to: '/', label: 'Accueil' },
  { to: '/services', label: 'Services' },
  { to: '/projets', label: 'Projets' },
  { to: '/about', label: 'About us' },
  { to: '/contact', label: 'Contact' },
] as const

/** Les titres des blocs, où qu'ils soient rendus. */
export const blockTitles = {
  studio: 'Le studio',
  services: 'Services',
  projets: 'Projets',
  tarifs: 'Tarifs flexibles',
  methode: 'Méthode',
  confiance: 'Ils ont confié leur marque',
  questions: 'Questions fréquentes',
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
  lede: 'Ocean Eye, c’est mon studio de design de marque. Ou plutôt : c’est moi, Océane, ancrée à Nice.',
  rest:
    'Je cherche ce qui fait qu’une marque se reconnaît : une couleur, un geste, une façon de dire les choses. L’intuition trouve la piste, la méthode la rend tenable. Puis je lui donne une forme qui vive ailleurs que dans sa charte, sur un packaging, sur une devanture, sur un écran de téléphone, et qui tienne encore dans deux ans, entre d’autres mains que les miennes.',
  person: {
    name: 'Océane',
    role: 'Graphiste et directrice artistique',
    lines: [
      'Ce qui ne change pas d’un projet à l’autre, c’est ma méthode : écouter longtemps, proposer peu, et livrer un système que quelqu’un d’autre saura tenir.',
      'J’ai passé huit ans en agence, en entreprise et à mon compte, à faire la même chose sous trois casquettes : donner une forme à ce qu’une marque n’a pas encore su dire.',
      'Formée à la direction artistique et installée à Nice, je travaille aussi bien pour une conciergerie de luxe que pour une édition de boîtes de sardines de collection. Je puise dans la Méditerranée une matière sensible qui nourrit ma façon de créer.',
    ],
    image: '/img/oceane.jpg',
    alt: 'Océane, assise dans un fauteuil, en portrait noir et blanc.',
  },
  stats: [
    { value: '09', label: 'marques livrées', note: 'de l’identité au packaging' },
    { value: '08', label: 'années de pratique', note: 'en agence, en entreprise, en indépendant' },
  ],
  cta: { label: 'Voir les projets', href: '#projets' },
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
    'Une marque a un univers avant d’avoir une forme. Mon travail commence là : aller chercher ce qui vous ressemble déjà sans avoir été nommé, puis lui donner de quoi se voir.',
}

export const offers: Offer[] = [
  {
    id: 'identite',
    name: 'Identité visuelle',
    pitch: 'Je construis le système complet, et je vous le livre prêt à être tenu sans moi.',
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
    pitch: 'Je pose le territoire visuel avant les visuels : ce que votre marque montre, et ce qu’elle ne montre pas.',
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
    pitch: 'L’objet qu’on tient en main, du volume au fichier prêt pour l’imprimeur.',
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
    pitch: 'Je tiens la campagne d’un bout à l’autre, du format d’affichage au post.',
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
 * Les tarifs.
 *
 * ⚠ LES DEUX MONTANTS SONT À VALIDER, comme ceux des prestations. Le plancher
 * au projet reprend celui de la prestation la moins chère ; celui au mois n'a
 * aucune source — il n'existe nulle part dans ce qu'Océane a écrit, et personne
 * d'autre qu'elle ne peut l'arrêter.
 *
 * C'est le seul endroit du site où un prix s'affiche. Les prestations n'en
 * portent plus : un tarif au milieu d'une page qui cherche encore à convaincre
 * fait trier avant d'avoir donné envie, alors qu'un bloc qui s'annonce comme tel
 * est consulté par quelqu'un qui a déjà décidé de regarder.
 */
export const plans: PlansContent = {
  eyebrow: 'Ocean Eye Studio',
  lede: 'Deux façons de travailler ensemble, selon que votre marque se lance ou qu’elle avance déjà.',
  rest: 'Je pose le périmètre et le prix avant de commencer, et rien ne s’ajoute en chemin sans que vous l’ayez demandé.',
  // Une image neutre, et non un projet : entre deux formules, une réalisation
  // ferait croire qu'elle en illustre une des deux.
  image: '/img/hero.jpg',
  cta: { label: 'En parler', href: '#contact' },
  plans: [
    {
      id: 'projet',
      name: 'Au projet',
      features: [
        'Périmètre écrit avant de commencer',
        'Nombre de pistes fixé',
        'Prix ferme, sans dépassement',
      ],
      from: 1800,
      unit: 'au projet',
      note: 'Je livre l’identité en une fois, avec ses fichiers et son guide d’usage.',
    },
    {
      id: 'mois',
      name: 'Au mois',
      features: [
        'Pistes et retouches sans compter',
        'Vos supports suivis dans la durée',
        'Interruptible d’un mois sur l’autre',
      ],
      from: 900,
      unit: 'par mois',
      note: 'Je tiens vos supports dans la durée, mois après mois.',
    },
  ],
}

/**
 * La preuve par les clients.
 *
 * Six avis VRAIS, repris mot pour mot des publications d'Océane. Les coupes
 * portent des points de suspension ; rien n'est réécrit, rien n'est arrangé.
 *
 * Aucune note sur cinq : personne n'en a donné. Une étoile inventée sous une
 * phrase authentique jetterait le doute sur la phrase elle-même, et ces
 * phrases-là valent mieux que n'importe quelle étoile.
 *
 * Pas de portrait non plus : on n'a la photo d'aucune de ces personnes, et
 * poser l'image d'un projet derrière une citation laisserait croire que
 * l'auteur y figure.
 */
/**
 * Les mots du bandeau défilant.
 *
 * Ils vivent à part du bloc de preuve depuis que le bandeau s'en est détaché :
 * une donnée rangée dans un bloc auquel elle ne sert plus finit par déménager
 * une seconde fois, en moins bon état.
 */
export const bandWords = [
  'Identité',
  'Marque',
  'Packaging',
  'Direction artistique',
  'Édition',
  'Nice',
]

export const socialProof: SocialProofContent = {
  voices: [
    {
      id: 'guillaume',
      quote:
        'Je travaille depuis 3 ans avec Océane et elle m’a toujours donné pleinement satisfaction. Ses capacités de designer sont très supérieures à ce que j’ai pu rencontrer par ailleurs. Elle ne se contente pas d’être un conseiller artistique au goût très sûr : elle s’assure toujours de la cohérence d’ensemble des projets qui lui sont confiés.',
      name: 'Guillaume',
      role: 'Fondateur de STANTEM, coach et conférencier',
    },
    {
      id: 'fany',
      quote:
        'Tu as su être à l’écoute de mes besoins, force de proposition et très professionnelle. Je me suis sentie accompagnée et comprise tout au long du projet, ce qui a rendu l’expérience fluide et agréable.',
      name: 'Fany',
      role: 'Fondatrice de Satiné',
      // Le seul avis qui parle d'un projet montré sur le site. Les cinq autres
      // viennent de clients dont le travail n'est pas au portfolio.
      project: 'satine-by-fany',
    },
    {
      id: 'kerrynn',
      quote:
        'Dès le départ, elle a su capter l’essence de mon activité de coaching sportif et traduire mon univers à travers une identité visuelle forte et élégante.',
      name: 'Kerry-Ann',
      role: 'Fondatrice du ItsKerrynClub',
    },
    {
      id: 'majorel',
      quote:
        'Tu as su parfaitement comprendre nos attentes et retranscrire notre univers avec justesse. Nous avons beaucoup apprécié ton écoute, ta disponibilité et ta créativité tout au long du processus.',
      name: 'Zoé F. et Mohammed C.',
      role: 'Fondateurs du Majorel',
    },
    {
      id: 'romain',
      quote:
        'Je me suis senti vraiment écouté. Tu as tout de suite capté ce que j’aimais ou pas. Le logo que tu as créé me ressemble vraiment beaucoup, et j’ai même eu pas mal de retours positifs dessus.',
      name: 'Romain T.',
      role: 'Fondateur de RTMO',
    },
    {
      id: 'alice',
      quote:
        'Elle a su être à l’écoute et répondre à mes attentes. Je ne peux que recommander Océane pour sa créativité et son professionnalisme !',
      name: 'Alice P.',
      role: 'Dirigeante de D Day Wedding Planner, Nice',
    },
  ],
}

/**
 * Les questions fréquentes.
 *
 * ⚠ LES RÉPONSES SONT À VALIDER. Elles sont construites sur ce que le site dit
 * déjà — les délais des prestations, les quatre étapes de la méthode, la
 * distinction entre la formule au projet et celle au mois — mais chacune est un
 * engagement pris au nom d'Océane, et aucune ne vient d'elle.
 */
export const faq: FaqContent = {
  eyebrow: 'Réponses rapides',
  lede: 'Ce qu’on me demande avant de commencer, et ce que je réponds.',
  cta: { label: 'Poser la vôtre', href: '#contact' },
  items: [
    {
      question: 'Combien de temps prend une identité visuelle ?',
      answer:
        'Quatre à six semaines pour une identité complète, deux à trois pour une campagne. J’écris le délai dans le devis, avec les étapes qui le composent.',
    },
    {
      question: 'Qu’est-ce que je reçois à la fin ?',
      answer:
        'Tous les fichiers finaux, sources comprises, et le guide qui dit comment vous en servir. Une identité qu’on ne peut pas appliquer sans moi n’est pas livrée.',
    },
    {
      question: 'Et si le projet change en cours de route ?',
      answer:
        'Le périmètre est écrit au cadrage. Ce qui s’y ajoute, je le chiffre à part et vous le validez avant que je le fasse : jamais découvert sur la facture.',
    },
    {
      question: 'Combien de pistes créatives ?',
      answer:
        'Au projet, je fixe le nombre au départ, avec les retouches qui vont avec. Au mois, il ne l’est pas.',
    },
    {
      question: 'Travaillez-vous à distance ?',
      answer:
        'Je suis à Nice et je travaille avec des marques ailleurs. On se voit sur place ou à distance, comme vous préférez.',
    },
    {
      question: 'Comment est-ce qu’on commence ?',
      answer:
        'Par un échange d’une demi-heure sur ce que vous avez en tête. Il n’engage à rien, et je vous donne déjà une fourchette.',
    },
  ],
}

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
      'On écrit ensemble ce qu’il faut obtenir avant que je dessine quoi que ce soit : à qui la marque parle, contre qui elle se tient, et ce qui devra encore fonctionner dans deux ans.',
  },
  {
    id: 'direction',
    name: 'Réflexion de la direction artistique',
    detail:
      'Je traduis votre univers en intentions visuelles : moodboards et pistes créatives. C’est ici que se décide l’esthétique, et ici qu’on change d’avis sans que ça coûte cher.',
  },
  {
    id: 'conception',
    name: 'Conception de l’identité',
    detail:
      'Logo, couleurs, typographies, éléments graphiques. Le système prend sa forme définitive, et je dessine chaque pièce pour qu’elle tienne à côté des autres.',
  },
  {
    id: 'livraison',
    name: 'Livraison',
    detail:
      'Vous recevez tous les fichiers finaux, et le guide qui dit comment vous en servir. Une identité qu’on ne peut pas appliquer sans moi n’est pas livrée.',
  },
]

/** Les projets, du plus récent au plus ancien. */
export const projects: Project[] = [
  {
    id: 'thelma-rose',
    name: 'Thelma & Rose',
    offer: 'direction-artistique',
    discipline: 'Direction Artistique',
    summary:
      'Gagnante de l\'appel d\'offre au profit d\'une marque française engagée de prêt à porter féminin',
    image: '/img/projets/thelma-rose.jpg',
    context:
      'Thelma Rose n’a jamais vraiment travaillé sur son identité graphique. Elle a “hérité” d’un logo issu d’une première intention de lancement en 2015. À l’époque, le positionnement adopté n’était pas le même. L’idée est de mettre au goût du jour le nouveau nom de marque ainsi qu’affirmer son positionnement et ses valeurs par sa nouvelle identité visuelle et supports graphiques digitaux.',
    client: 'Thelma & Rose',
    role: 'DA',
    year: '2025',
    deliverables: 'Conception d\'Identité Visuelle & DA',
    narrative: [
      'Thelma Rose est une aventure écrite entre sœurs. C’est une histoire de femmes, d’envies, de passions et d’exigences. La marque s’inspire de l’univers sensible et complice de ses deux fondatrices pour créer une identité à la fois féminine, solaire et contemporaine.',
      'Pour résumer, Thelma Rose, c’est une communauté, où chaque femme s’affirme et se retrouve, entre bien-être, féminité et élégance naturelle. Un mélange de modernité et d’intemporalité, où le luxe se veut sincère et responsable. Un univers doux, pensé pour sublimer sans artifice.',
    ],
    gallery: [
      '/img/projets/thelma-rose-1.jpg',
      '/img/projets/thelma-rose-2.jpg',
      '/img/projets/thelma-rose-3.jpg',
      '/img/projets/thelma-rose-4.jpg',
    ],
  },
  {
    id: 'satine-by-fany',
    name: 'Satiné by Fany',
    offer: 'identite',
    discipline: 'Identité Visuelle',
    summary:
      'L\'identité brillante d\'éclat pour une experte en Soins & Lissages Capillaires',
    image: '/img/projets/satine-by-fany.jpg',
    context:
      'Dans le cadre de son activité indépendante d\'experte en lissage et soin du cuir chevelu, Fany a fait appel à mes compétences en design graphique afin de redonner un nouveau souffle à son logo du nom de SATINÉ. Aussi, j\'ai pu effectuer auprès d\'elle une approche esthétique en tant que Community Manager afin de relancer son activité dans la zone niçoise, tout en construisant une identité propre à son univers.',
    client: 'Satiné by Fany',
    role: 'Graphiste & CM',
    year: '2024',
    deliverables: 'Logo & CM et Consulting',
    narrative: [
      'Graphiquement, l’univers repose sur une cohérence visuelle douce et raffinée, portée par des matières sensorielles comme le sable, la soie, les bulles d’eau ou les cheveux. La palette, naturelle et élégante, associe beige, crème et brun pour renforcer le positionnement haut de gamme. Les typographies fines et modernes apportent une lecture fluide et sophistiquée, tandis que le moodboard développe une véritable sensualité visuelle, à la fois texturée, lisse et rassurante.',
      'Côté community management, les contenus sont structurés selon des rôles précis : présenter la marque, valoriser les produits, informer sur les prix ou développer le storytelling. Des call-to-action discrets accompagnent les publications sans rompre avec l’esthétique premium. L’objectif est de construire une expérience visuelle cohérente, mêlant contenus pédagogiques et images organiques et esthétiques, propres à l’identité de SATINÉ.',
    ],
    gallery: [
      '/img/projets/satine-by-fany-1.jpg',
      '/img/projets/satine-by-fany-2.jpg',
      '/img/projets/satine-by-fany-3.jpg',
    ],
  },
  {
    id: 'conciergerie-riviera',
    name: 'Conciergerie Riviera',
    offer: 'identite',
    discipline: 'Identité Visuelle',
    summary:
      'La Côte d\'Azur sur-mesure pour cette conciergerie niçoise de luxe',
    image: '/img/projets/conciergerie-riviera.jpg',
    context:
      'Suite à un entretien dans le cadre de ma recherche d\'alternance comme Graphiste et Créatrice de contenu, s\'offre à moi le projet Conciergerie Riviera — All Services, un concept de service à la personne haut de gamme, aux services privés et locatifs sur-mesure, basé sur la Côte d\'Azur.',
    client: 'Conciergerie Riviera (fictif)',
    role: 'Designer & DA',
    year: '2024',
    deliverables: 'Graphiste & DA',
    narrative: [
      'Entre luxe discret et esprit méditerranéen, cette identité a été imaginée comme une respiration. Un souffle chaud et élégant, porté par les courbes du Sud, la lumière du bord de mer, et l’art de vivre sur mesure.',
      'Chaque élément visuel — logo, palette, typographie, textures — traduit une promesse : celle d’un service haut de gamme, incarné avec douceur, exigence et simplicité. Le résultat ? Une conciergerie d’exception, à l’image de ses clients : exigeants, sensibles à la beauté, et attachés à une certaine idée du slow living.',
    ],
    gallery: [
      '/img/projets/conciergerie-riviera-1.jpg',
      '/img/projets/conciergerie-riviera-2.jpg',
      '/img/projets/conciergerie-riviera-3.jpg',
    ],
  },
  {
    id: 'bobines-etrange',
    name: 'Les Bobines de l’Étrange',
    offer: 'packaging',
    discipline: 'Packaging & Identité Visuelle',
    summary:
      'Création d\'une édition limitée de boîtes de sardines de collection',
    image: '/img/projets/bobines-etrange.jpg',
    context:
      'Création d\'une édition limitée de boîtes de sardines de collection, fusionnant le patrimoine breton avec les codes iconiques de la pop culture fantastique et horrifique (niche du festival).',
    client: 'Les Sardines Font Leur Cinéma - Festival Breton',
    role: 'Graphisme & DA',
    year: '2025',
    deliverables: 'Product Design, Art Direction',
    narrative: [
      'Mon souhait fut de créer un pont visuel entre le folklore breton (dont je suis moi-même originaire), et l\'angoisse du cinéma de genre. Le projet repose sur un décalage humoristique : la sardine est modulée à chaque édition par l’univers qu’elle illustre. Le trait naïf sert une narration précise, transformant un objet quotidien en une pièce de collection hybride, nostalgique et résolument culte.',
    ],
    gallery: [
      '/img/projets/bobines-etrange-1.jpg',
      '/img/projets/bobines-etrange-2.jpg',
      '/img/projets/bobines-etrange-3.jpg',
      '/img/projets/bobines-etrange-4.jpg',
    ],
  },
  {
    id: 'zoenka',
    name: 'ZOËNKA',
    offer: 'identite',
    discipline: 'Identité Visuelle & CM',
    summary:
      'Une identité pensée pour une psychologue et thérapeute en médiation animale.',
    image: '/img/projets/zoenka.jpg',
    context:
      'Une identité pensée pour une psychologue et thérapeute en médiation animale.',
    client: 'ZOËNKA',
    role: 'Graphisme & DA',
    year: '2026',
    deliverables: 'Web Design, Framer Development',
    narrative: [
      'Le nom et l’univers visuel traduisent une approche douce, rassurante et profondément humaine, loin des codes médicaux traditionnels. L’identité cherche à créer un sentiment de confiance, d’écoute et de connexion, essentiel dans la relation thérapeutique. Le langage graphique associe ainsi sobriété, sensibilité et organicité pour évoquer le vivant et le lien qui se crée au cours de l’accompagnement. ZOENKA devient une identité chaleureuse et contemporaine, qui place la relation, l’humain et l’animal au cœur du soin.',
    ],
    gallery: [
      '/img/projets/zoenka-1.jpg',
      '/img/projets/zoenka-2.jpg',
      '/img/projets/zoenka-3.jpg',
      '/img/projets/zoenka-4.jpg',
    ],
  },
  {
    id: 'lavender-rose',
    name: 'Lavender & Rose',
    offer: 'identite',
    discipline: 'Identité Visuelle',
    summary:
      'Création d\'un logo célébrant la poésie des instants partagés à travers une collection de vaisselle haut-de-gamme',
    image: '/img/projets/lavender-rose.jpg',
    context:
      'Proposition d’un univers visuel pour la gamme d’assiettes en porcelaine de la société d’événementiel de luxe LAVENDER & ROSE, à Cannes. Une gamme qui chercher à évoquer le savoir-faire artisanal français, la délicatesse et une esthétique européenne classique revisitée.',
    client: 'Lavender & Rose Event',
    role: 'Graphiste',
    year: '2024',
    deliverables: 'Graphisme',
    narrative: [
      'Ma proposition révèle un univers visuel qui évoque le savoir-faire artisanal, la délicatesse et une esthétique européenne classique revisitée. Le nom Lavender & Rose suggère la Provence et la sophistication florale, tandis que L’Art de la Table renforce l’idée de tradition française et de raffinement dans le détail. En somme, un logo proposant une fusion entre l’élégance française et la sensibilité romantique anglaise.',
    ],
    gallery: [
      '/img/projets/lavender-rose-1.jpg',
      '/img/projets/lavender-rose-2.jpg',
      '/img/projets/lavender-rose-3.jpg',
      '/img/projets/lavender-rose-4.jpg',
    ],
  },
  {
    id: 'amare',
    name: 'Amare',
    offer: 'direction-artistique',
    discipline: 'Conception Produit & DA',
    summary:
      'Réflexion autour d\'un concept produit transformant la pollution en ressources pour reconnecter l’Homme à l’océan, entre émotion, innovation et transmission.',
    image: '/img/projets/amare.jpg',
    context:
      'Amare est une marque sociale qui, en transformant la pollution marine en ressources grâce au design circulaire, répare le lien entre l’Homme et l’océan en suscitant l’émotion et la fierté d’agir pour le bien commun.',
    client: 'École de Condé Nice',
    role: 'Designer & DA',
    year: '2026',
    deliverables: 'Conception produit & DA',
    narrative: [
      'AMARE puise son nom dans amare, « aimer » en latin et en italien, et dans mare, « la mer ». Le concept associe ainsi l’amour que l’on porte à la Méditerranée à la volonté de la préserver. Il évoque aussi l’idée de s’ancrer, de créer un lien durable avec la mer et son territoire. Celle-ci transforme les déchets marins en ressources grâce au design circulaire et à l’éco-conception, donnant une nouvelle vie à ce qui pollue nos océans. AMARE devient ainsi un objet porteur de sens, de fierté et de transmission, pensé pour protéger la mer dont dépend notre avenir.',
    ],
    gallery: [
      '/img/projets/amare-1.jpg',
      '/img/projets/amare-2.jpg',
      '/img/projets/amare-3.jpg',
      '/img/projets/amare-4.jpg',
    ],
  },
  {
    id: 'bauhaus-109',
    name: 'BAUHAUS by Le 109',
    offer: 'supports',
    discipline: 'Supports de Communication Visuelle',
    summary:
      'Conception d\'une campagne de communication visuelle à l’occasion des 109 ans du 109, à Nice',
    image: '/img/projets/bauhaus-109.jpg',
    context:
      'À l’occasion des 109 ans du Le 109, une campagne de communication visuelle est à concevoir en lien avec l’héritage du Bauhaus. Le projet vise à proposer une réponse graphique contemporaine, conceptuelle et expérimentale, inspirée des principes du Bauhaus (rigueur, abstraction, typographie), tout en restant accessible à un public large.',
    client: 'École du Bauhaus x Le 109 La Station',
    role: 'Graphiste & DA',
    year: '2026',
    deliverables: 'Affichage & Goodies',
    narrative: [
      'Ma proposition envisage la fête du Bauhaus comme un moment de rassemblement festif, tout en restant fidèle à ses principes fondateurs : rigueur, fonctionnalité et langage formel.',
      'Une approche qui repose sur un décalage maîtrisé entre l’univers de la fête (gâteau, cocktail, célébration) et une traduction graphique minimaliste et structurée, inspirée des codes modernistes. L’humour s’exprime à travers des jeux de mots et des métaphores visuelles, traités de manière sobre et conceptuelle.',
    ],
    gallery: [
      '/img/projets/bauhaus-109-1.jpg',
      '/img/projets/bauhaus-109-2.jpg',
      '/img/projets/bauhaus-109-3.jpg',
      '/img/projets/bauhaus-109-4.jpg',
    ],
  },
  {
    id: 'la-doyenne',
    name: 'La Doyenne',
    offer: 'supports',
    discipline: 'Print',
    summary:
      'Conception d\'un dépliant-affiche illustré portant sur l\'expérience d\'alternant à Condé Nice.',
    image: '/img/projets/la-doyenne.jpg',
    context:
      'Dans le cadre de sa stratégie de communication interne, l’École CONDÉ souhaite mieux accompagner les étudiants en Bachelor qui s’apprêtent à entrer en alternance. Afin de rendre ce sujet plus accessible, attractif et rassurant, l’école de Condé a souhaité produire un support illustré, vivant et ludique, basé sur l’expérience réelle des étudiants de Master 2, déjà passés par une année complète d’alternance.',
    client: 'École de Condé Nice',
    role: 'Graphiste',
    year: '2026',
    deliverables: 'Graphiste & DA',
    narrative: [
      'Pour porter ce concept j’ai crée “La Doyenne”.',
      'Un personnage féminin, une muse, dessinée de manière faussement naïve. Toujours reconnaissable grâce à ses traits reprennant légèrement les miens, afin d’injecter une part de moi dans ce travail qui m’est très personnel grâce à : de longs cheveux ondulés, un grain de beauté au nez, des piercings à l’oreille.',
      'Selon les scènes, La Doyenne est… trop vieille (dans sa tête), perdue, doute, progresse, ou trouve sa place.',
      'Un guide du survie illustré aux couleurs méditerranéennes, entre illustrations à la Picasso, Matisse et Persepolis pour un côté plus éditorial et contemporain. Le recours au faux naïf vise ici à évoquer avec honnêteté un parcours atypique avec légèreté, humour et clarté.',
    ],
    gallery: [
      '/img/projets/la-doyenne-1.jpg',
      '/img/projets/la-doyenne-2.jpg',
      '/img/projets/la-doyenne-3.jpg',
    ],
  },
]

/** Le peu de texte propre aux pages de prestation. */
export const serviceUi = {
  back: 'Retour',
  empty: 'Les projets de cette prestation arrivent bientôt.',
}

/** Le peu de texte propre aux pages de projet. */
export const projectUi = {
  back: 'Retour',
  client: 'Client',
  role: 'Rôle',
  year: 'Année',
  deliverables: 'Livrables',
  offer: 'Prestation',
  siblings: 'Dans la même prestation',
}

/** Les projets d'une prestation, dans l'ordre de la liste principale. */
export function projectsOf(offerId: string): Project[] {
  return projects.filter((project) => project.offer === offerId)
}

/**
 * Un travail par prestation, dans l'ordre des prestations.
 *
 * C'est ce que montre la page d'accueil : quatre travaux qui disent chacun une
 * discipline, plutôt que les neuf à la suite. Le premier de chaque liste, donc
 * réordonner `projects` change la vitrine sans toucher au code.
 *
 * Les cinq autres ne sont pas perdus : chaque bloc renvoie à la page de sa
 * prestation, qui les porte tous.
 */
export function featuredProjects(): Project[] {
  return offers
    .map((offer) => projects.find((project) => project.offer === offer.id))
    .filter((project): project is Project => Boolean(project))
}

/** L'avis qui parle de ce projet, s'il y en a un. */
export function voiceFor(projectId: string): Voice | undefined {
  return socialProof.voices.find((voice) => voice.project === projectId)
}

/** Le projet portant cet identifiant, s'il existe. */
export function projectById(projectId: string): Project | undefined {
  return projects.find((project) => project.id === projectId)
}

/** Les autres projets de la même prestation, sans celui qu'on regarde. */
export function siblingsOf(project: Project): Project[] {
  return projects.filter((p) => p.offer === project.offer && p.id !== project.id)
}

/** La prestation portant cet identifiant, si elle existe. */
export function offerById(offerId: string): Offer | undefined {
  return offers.find((offer) => offer.id === offerId)
}

/**
 * Le pied de page, sur toutes les pages.
 *
 * Il porte le contact, les pages du site et le nom en très grand. C'est lui qui
 * fait l'appel au rendez-vous partout : un bandeau séparé aurait dit deux fois
 * la même chose sur la même page.
 */
export const footer: FooterContent = {
  eyebrow: 'Ocean Eye Studio',
  title: 'Contact',
  lede: 'Dites-moi ce que vous avez en tête : votre marque, ce qu’elle doit devenir, et ce qui vous en empêche aujourd’hui.',
  reachTitle: 'Me joindre',
  availability: 'Du lundi au vendredi, à Nice',
  wordmark: 'OCEANEYE',
  legal: '© Ocean Eye Studio',
  form: {
    name: 'Votre nom',
    email: 'Votre adresse',
    phone: 'Votre téléphone',
    message: 'Votre message',
    optional: 'facultatif',
    submit: 'Envoyer',
    sending: 'Envoi en cours…',
    sentTitle: 'Message envoyé',
    sentBody: 'Je reviens vers vous sous 48 heures ouvrées.',
    notDelivered:
      'L’envoi n’est pas encore activé de mon côté. Sans nouvelles, écrivez-moi directement à oceaneye.studio@gmail.com.',
    errorRequired: 'Votre nom et votre adresse sont nécessaires pour vous répondre.',
    errorEmail: 'Cette adresse ne semble pas valide.',
    errorSend:
      'Le message n’a pas pu partir. Écrivez-moi à oceaneye.studio@gmail.com, je prends le relais.',
  },
}

/** Repris tels quels du site actuel : ce sont ses vraies coordonnées. */
export const contact: Contact = {
  email: 'oceaneye.studio@gmail.com',
  phone: '07 86 93 91 64',
  instagram: '@oceaneye.studio',
  instagramUrl: 'https://www.instagram.com/oceaneye.studio/',
  // Le numéro en format international, sans espaces ni signe : wa.me n'accepte
  // que des chiffres, et le 0 initial du format français doit sauter.
  whatsapp: {
    label: 'Discuter avec Océane',
    url: 'https://wa.me/33786939164',
  },
}

/** Le titre et la description de chaque page, pour les moteurs. */
export const pageMeta: Record<string, PageMeta> = {
  services: {
    title: 'Services · Ocean Eye Studio',
    description:
      'Identité visuelle, direction artistique, packaging et supports de communication. Ce que comprend chaque prestation, en combien de temps, et à quel tarif.',
  },
  projets: {
    title: 'Projets · Ocean Eye Studio',
    description:
      'Neuf marques que j’ai accompagnées, de l’identité visuelle au packaging : Satiné, Conciergerie Riviera, Les Bobines de l’Étrange, Thelma & Rose et les autres.',
  },
  about: {
    title: 'Le studio · Ocean Eye Studio',
    description:
      'Océane, graphiste et directrice artistique à Nice. Huit ans de pratique, neuf marques livrées, et ce que leurs fondateurs en disent.',
  },
  contact: {
    title: 'Contact · Ocean Eye Studio',
    description:
      'M’écrire, et les réponses aux questions qu’on me pose avant de commencer.',
  },
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
