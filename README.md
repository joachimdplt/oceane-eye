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
    landing/        → Hero (l'arche qui s'ouvre en plein écran au défilement)
  routes/           → Couche 5, assemblage seul (TanStack Router)
  utils/seo.ts      → SITE_URL : l'adresse du site, en un seul endroit
  styles/app.css    → les tokens du thème, et rien d'arbitraire ailleurs
```

Le sens de lecture : **la route lit `data/` et passe le contenu en props ; aucun
composant ne va rien chercher lui-même** (§ 5 et § 8).

## Changer d'identité

- Tout descend du bloc `@theme` de `src/styles/app.css` : couleurs (`--color-ink`,
  `--color-paper`), police, tailles, mesures. Aucune valeur arbitraire dans le
  JSX — c'est le § 9, et la commande d'audit du § 12 le vérifie.
- Le texte, l'image et le film : `src/data/content.ts`.
- `--color-ground` (#ffffff), `--color-ink` (#0a0a0a, le texte),
  `--color-accent` (#FFDE59, gardé pour ce qui n'a pas à être lu).
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

## ⚠ Les prix ne sont pas validés

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
