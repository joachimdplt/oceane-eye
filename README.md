# Ocean Eye

Site public en [TanStack Start](https://tanstack.com/start) (React 19, rendu
serveur), Tailwind v4, déployé en Docker derrière un Caddy partagé.

Le site d'Ocean Eye Studio — identité visuelle, direction artistique,
packaging. Une page, en blocs plein écran : l'ouverture avec son arche, le
studio, les services **avec leurs prix**, les neuf projets, la méthode, le
contact.

Le contenu vient de l'ancien site Framer (`oceaneye-portfolio.com`), avec un
changement de discours assumé : l'ancien disait ce qu'Océane aime faire, celui-ci
dit ce que le studio livre et ce que ça coûte.

## Démarrer

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # build de production + typecheck
npm run preview
```

## Ce qu'il y a dans `src`

Le projet suit l'architecture en couches de la maison (`CONVENTIONS.md`). C'est
une vitrine : sans API ni authentification, les couches 1 à 3 (`api/`, `stores/`,
`hooks/`) sont simplement vides. Celles qui restent tiennent leurs règles.

```
src/
  types/            → types du domaine, en barrel
  data/             → transversal : le contenu éditorial, statique
  components/
    ui/             → génériques : GrowText, Reveal, Unfold, LiveTime,
                       NotFound, ErrorState
    landing/        → Hero, About, Offers, Work, Process, Contact, Nav
  routes/           → Couche 5, assemblage seul (TanStack Router)
                       /                       la page
                       /services/$serviceId    une prestation et ses travaux
                       /travaux/$projectId     un travail et ses voisins
  utils/seo.ts      → SITE_URL : l'adresse du site, en un seul endroit
  styles/app.css    → les tokens du thème, et rien d'arbitraire ailleurs
```

Le sens de lecture : **la route lit `data/` et passe le contenu en props ; aucun
composant ne va rien chercher lui-même** (§ 5 et § 8).

`WorkBlock` est la carte d'un travail, **partagée par les trois pages** qui en
montrent. Les cartes **s'empilent** : chacune se colle à une hauteur croissante,
la suivante glisse par-dessus, et le décalage laisse voir le bord haut des
précédentes — donc leur titre, qui est pour cette raison en haut de la carte. Le
retrait latéral se calcule à l'envers du rang, si bien que la dernière est la
plus large et que la pile paraît s'ouvrir.

Les cartes collées ont **toutes le même bas** : leur hauteur décroît avec le
rang. Ce n'est pas qu'une question d'allure — une carte se décolle quand son bas
atteint le bas de la boîte de contenu, donc des bas différents donnent des
décollements décalés, et on voit les cartes se ramasser les unes sur les autres.
Un bas commun, et les quatre repartent d'un bloc, en gardant leur décalage.

⚠ **La réserve sous la pile est un élément, jamais un `padding-bottom`.** La
zone dans laquelle une carte collante peut se déplacer s'arrête à la **boîte de
contenu** de son conteneur : une marge intérieure n'y ajoute rien. Mesuré au
navigateur, avec 495 px de padding, les quatre cartes se décollaient ensemble
avant que la dernière ait atteint sa place. Un bloc vide (`.work-stack-tail`)
occupe le flux, allonge la boîte de contenu, et donne enfin sa course à la
dernière carte.

`--i` et `--n` sont posés par la page : la CSS ne sait pas compter les frères
d'un élément, et une carte qui les compterait irait lire son propre parent. Il a existé en deux exemplaires le temps d'un commit, et les deux
avaient déjà divergé sur la couleur du texte : un bloc dupliqué ne reste jamais
identique très longtemps.

L'accueil ne montre **qu'un travail par prestation** (`featuredProjects()`) :
quatre qui disent chacun une discipline, plutôt que les neuf à la suite. C'est
le premier de chaque liste, donc réordonner `projects` change la vitrine sans
toucher au code. Les cinq autres sont sur les pages de prestation, où mène la
discipline inscrite sur chaque bloc.

Le rattachement d'un travail à sa prestation est une **donnée explicite**
(`project.offer`), jamais un rapprochement sur le libellé de la discipline —
« Identité visuelle et community management » ne s'apparierait pas avec
« Identité visuelle », et le jour où l'un se réécrit le lien casse en silence.

## Changer d'identité

- Tout descend du bloc `@theme` de `src/styles/app.css` : couleurs (`--color-ink`,
  `--color-paper`), police, tailles, mesures. Aucune valeur arbitraire dans le
  JSX — c'est le § 9, et la commande d'audit du § 12 le vérifie.
- Le texte, l'image et le film : `src/data/content.ts`.
- `--color-ground` (#ffffff), `--color-ink` (#0a0a0a, le texte),
  `--color-muted` (#6E6E6E, le texte en retrait), `--color-rule` (#E2E2E2, les
  traits), `--color-accent` (#FFDE59, gardé pour ce qui n'a pas à être lu).
- **Un seul rayon d'angle**, `--radius`, pour toute la page : deux rayons
  différents à l'écran se lisent comme une erreur, pas comme une intention.
  Attention, `RADIUS_OPEN` dans `Hero.tsx` doit lui répondre — le calcul de
  l'arche se fait en JS et ne peut pas lire le token.
- **Le retrait est une couleur, jamais une opacité.** Un noir à 60 % change de
  valeur selon ce qu'il y a derrière ; un gris nommé vaut la même chose partout
  et se vérifie. `--color-muted` donne 4,76:1 sur le fond, donc il se lit
  encore au lieu d'être seulement décoratif.
- Le fond porte un **grain** (classe `.grain`) : un aplat se lirait comme un
  trou à côté d'une photo argentique. Deux réglages qui ne se devinent pas —
  `mix-blend-mode: multiply` et non `overlay`, car **sur du blanc pur la
  formule de l'overlay est neutre** et le grain disparaît ; et un bruit recentré
  près du blanc plutôt que près du gris moyen. Mesuré au rendu : moyenne 247,
  écart-type 8,3 sur 255. `slope` dans le filtre est le bouton.
- Trois familles, chacune pour un emploi :
  - **EB Garamond italique** — `.title1`, les titres.
  - **Space Grotesk** — `.title2` (les noms de projets), `.border-text-xl`.
  - **DM Sans 500** — tout ce qui se lit : `.body-text` (la prose), `.label`
    (les micro-libellés), la nav.
- **Plus une seule capitale forcée sur la page.** La hiérarchie se fait par la
  taille, jamais par la casse — ce qui laisse une capitale au milieu d'une
  phrase vouloir dire quelque chose (COPYWRITING.md § 12). Le texte porte la même couleur sur le
  fond et sur l'image, puisque le titre déborde de l'arche des deux côtés.
- Deux classes de titre, qui disent une **voix** et non une taille : elles se
  composent au même corps et ne diffèrent que par le dessin, ce qui permet de
  poser les deux dans un même titre sans qu'il se lise comme deux niveaux.
  - **`.title1`** — EB Garamond italique.
  - **`.title2`** — Space Grotesk romain.

  `.title2` déclare `font-style: normal` et ce n'est pas redondant : la
  propriété s'hérite, donc imbriquée dans un `.title1` elle prenait son
  italique sans que rien ne le demande.
- **`.border-text-xl`** — les deux blocs posés aux bords de l'écran. Ils
  empruntent la grotesque du titre 2 : la Garalde donne le nom, la grotesque
  donne les faits. En gras et à 24 px, le WCAG les compte comme du grand texte
  (seuil 3:1 au lieu de 4,5:1), ce qui les rend **conformes sur le fond**.
- La Garalde : `--font-garamond`. **Adobe Garamond Pro est sous licence Adobe** —
  elle ne peut être ni servie depuis Google Fonts ni auto-hébergée. La page est
  donc composée en **EB Garamond**, sa reprise libre, dont l'italique est
  réellement dessinée et non calculée. Pour la vraie Adobe Garamond Pro, il faut
  un projet web Adobe Fonts et remplacer l'`@import` par leur balise.
- ⚠ **Le jaune ne porte plus le texte.** Sur ce blanc il donne **1,25:1** là
  où il en faut 4,5 : il était purement invisible. Le texte est passé à l'encre,
  qui donne 18,6:1. Le jaune reste déclaré comme accent.
- Le domaine : `SITE_URL` dans `src/utils/seo.ts`, puis `public/robots.txt`,
  `public/sitemap.xml` et `APP_DOMAIN` dans `.env.deploy`.

## Déployer

Le site est un **front SSR seul** au sens du socle
([VPS-INFRA](https://github.com/joachimdplt/VPS-INFRA), `docs/conventions.md`
§ 11). Les scripts de `deploy/`, le gabarit de route et les unités systemd sont
repris **tels quels** des gabarits du socle — vérifié à l'octet près. Les trois
écarts assumés (domaine de test emprunté, `noindex`, Dockerfile) sont expliqués
dans `apps/oceaneye.md` du dépôt d'infra.


**Prérequis DNS** : un enregistrement `A` pour `oceaneye.somekind.fr` vers
`72.61.101.96`, actif **avant** le premier démarrage — sinon Caddy échoue en
boucle sur le challenge et brûle le quota hebdomadaire Let's Encrypt.

```bash
# sur le VPS
git clone https://github.com/joachimdplt/oceane-eye.git /opt/oceaneye-dev
cd /opt/oceaneye-dev
cp .env.deploy.example .env.deploy          # STACK et APP_DOMAIN y sont déjà bons
docker compose -f docker-compose.prod.yml --env-file .env.deploy up -d --build
./deploy/install-site.sh                     # publie la route dans le proxy partagé

# puis le déploiement continu
cp deploy/systemd/oceaneye-autodeploy@.* /etc/systemd/system/
systemctl daemon-reload
systemctl enable --now oceaneye-autodeploy@oceaneye-dev.timer
```

Ensuite tout se fait seul, par **surveillance** et non par webhook : le timer
regarde toutes les deux minutes si la branche a bougé, et reconstruit le cas
échéant. Rien n'est ouvert vers l'extérieur, aucune clé n'est confiée à un tiers.

## La nav

Elle se fabrique à partir de `blockTitles` (`src/data/content.ts`), **dont les
clés sont les ancres**. Il n'y a donc pas de seconde liste de liens à tenir à
jour : réordonner cet objet réordonne la barre, et renommer un bloc le renomme
partout. Ce sont de vraies ancres, pas des gestionnaires de clic — un lien se
copie, s'ouvre dans un onglet, et fonctionne avant que le JavaScript ait chargé.

La barre étant fixe, les blocs portent un `scroll-margin-top` : sans lui, une
ancre déposerait le haut du bloc sous la barre et son titre serait caché.

## Les blocs empilés

L'écran d'ouverture et sa piste de défilement sont **frères**, pas imbriqués :
un élément collant se décroche au bout de son conteneur, donc enfermé dans sa
propre piste le hero remontait de lui-même et le bloc suivant arrivait à sa
suite. Côte à côte, ils ont `<main>` pour conteneur — le hero reste épinglé
aussi longtemps qu'il est recouvert, et les blocs suivants lui glissent dessus.

C'est aussi pour cela que la mesure du défilement lit la piste et non le hero :
la piste suit immédiatement un écran d'exactement une hauteur d'écran, donc son
haut est à `innerHeight` au repos. La position ne dépend ni de la hauteur de la
page ni de l'endroit où le hero se trouve dedans.

## L'arche

Le fond occupe l'écran en permanence ; ce qui grandit au défilement est la
**fenêtre découpée dedans** (`clip-path: inset(… round …)`). Rien n'est mis à
l'échelle : l'image ne se déforme pas, et la mise en page n'est jamais
recalculée. La géométrie au repos et la longueur de la piste sont les deux
constantes en tête de `Hero.tsx`.

Pour passer de l'image au film, dans `src/data/content.ts` :

```ts
media: { kind: 'video', src: '/video/hero.mp4', poster: '/img/hero.jpg', alt: '' }
```

Le film porte toujours une affiche : c'est elle qu'on montre à qui a demandé
moins de mouvement, et elle qui tient l'écran le temps du chargement.

## ⚠ Les prix ne s'affichent qu'à un seul endroit

Le bloc **Tarifs flexibles** (`plans`) porte les deux seuls montants visibles du
site. Les prestations n'en montrent aucun : un tarif au milieu d'une page qui
cherche encore à convaincre fait trier avant d'avoir donné envie, alors qu'un
bloc qui s'annonce comme tel est consulté par quelqu'un qui a déjà décidé de
regarder.

Les quatre planchers de `offers` restent dans les données sans être affichés,
avec `pitch` et `deliverables` : ils sont la seule trace écrite de ce que chaque
prestation coûte.

## Les avis sont authentiques, et cités

Les six avis viennent des publications d'Océane (`Posts Instagram.pdf`), repris
**mot pour mot**. Les coupes portent des points de suspension ; rien n'est
réécrit, rien n'est arrangé. `quote` est une citation : elle se coupe, jamais
elle ne se réécrit.

**Aucune note sur cinq**, parce qu'aucun de ces clients n'en a donné. Une étoile
inventée sous une phrase authentique jetterait le doute sur la phrase — qui vaut
de toute façon mieux qu'une étoile.

**Aucun portrait** non plus : on n'a la photo d'aucune de ces personnes, et poser
l'image d'un projet derrière une citation laisserait croire que son auteur y
figure.

⚠ À vérifier avec Océane : que ces personnes acceptent de voir leur avis sur le
site, et pas seulement sur son compte.

## ⚠ Les réponses de la FAQ sont des engagements

Elles sont construites sur ce que le site dit déjà — les délais des prestations,
les quatre étapes de la méthode, la différence entre la formule au projet et
celle au mois. Mais chacune engage Océane, et **aucune ne vient d'elle**.

## ⚠ Et les prix ne sont pas validés

`offers` dans `src/data/content.ts` porte quatre planchers — 2 400, 3 200,
1 800 et 900 € — **calés sur le marché français d'un studio indépendant de ce
niveau d'expérience, pas sur une grille existante**. Personne d'autre qu'Océane
ne peut les arrêter. Ils sont là pour que la page tienne debout, pas pour être
publiés tels quels.

Le choix du plancher (« dès ») plutôt que du tarif est délibéré : il écarte les
demandes hors budget sans engager sur un périmètre qu'on n'a pas encore lu. Et
chaque prix est posé à côté de ce qu'il achète — un montant seul ne se compare
à rien, ce qui est exactement pourquoi tout le monde écrit « sur devis ».

## À finir

- [ ] Dans l'ouverture, les flancs et la barre de nav restent posés à même la
      photo une fois l'arche ouverte : 1,45:1 et 1,69:1. Le même voile que sur
      les blocs de projets réglerait les deux d'un coup.
- [ ] Les favicons de `public/` sont encore ceux de l'ancienne marque.
- [ ] Pas d'image de partage : `seo()` n'émet `og:image` que si on lui en donne
      une.
