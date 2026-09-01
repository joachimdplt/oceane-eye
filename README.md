# Ocean Eye

Site public en [TanStack Start](https://tanstack.com/start) (React 19, rendu
serveur), Tailwind v4, déployé en Docker derrière un Caddy partagé.

Une page, un écran : le portfolio d'Océane, graphiste — identité visuelle,
branding et direction artistique.

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
    ui/             → génériques : GrowText, LiveTime, NotFound, ErrorState
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
- Deux couleurs dans `@theme`, pas trois : `--color-ground` (#647179, le fond)
  et `--color-accent` (#FFDE59, le texte). Le fond porte un **grain** (classe
  `.grain`) : un aplat se lirait comme un trou à côté d'une photo argentique.
  Son seul réglage est l'opacité — 0.32 reproduit l'écart-type mesuré sur la
  référence, 8,6 niveaux sur 255. Le texte porte la même couleur sur le
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
- ⚠ **Contraste** : `#FFDE59` sur le gris du fond donne **3,79:1** — bon pour un
  grand titre (seuil 3:1), juste pour un corps de texte (seuil 4,5:1). Une fois
  l'arche ouverte, les textes sont posés sur la photo : **1,45:1** à gauche et
  **1,69:1** à droite, la mer étant claire à cette hauteur. Voir « À finir ».
- Le domaine : `SITE_URL` dans `src/utils/seo.ts`, puis `public/robots.txt`,
  `public/sitemap.xml` et `APP_DOMAIN` dans `.env.deploy`.

## Déployer

```bash
cp .env.deploy.example .env.deploy   # sur le VPS, puis renseigner APP_DOMAIN
docker compose -f docker-compose.prod.yml --env-file .env.deploy up -d --build
./deploy/install-site.sh             # publie la route dans le proxy partagé
```

Ensuite le déploiement se fait tout seul, par **surveillance** et non par
webhook : un timer systemd regarde toutes les deux minutes si la branche a
bougé, et reconstruit le cas échéant.

```bash
systemctl enable --now ocean-eye-autodeploy@ocean-eye.timer
```

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

## À finir

- [ ] Les textes restent affichés après l'ouverture de l'arche, donc par-dessus
      la photo, où ils tombent à 1,45:1 et 1,69:1 : illisibles. Trois issues, au
      choix — un voile sombre sur la photo, un fond plein derrière chaque bloc
      de texte, ou descendre les flancs sur la dune (10,60:1 là).
- [ ] Les favicons de `public/` sont encore ceux de l'ancienne marque.
- [ ] Pas d'image de partage : `seo()` n'émet `og:image` que si on lui en donne
      une.
