# Ocean Eye

Site public en [TanStack Start](https://tanstack.com/start) (React 19, rendu
serveur), Tailwind v4, déployé en Docker derrière un Caddy partagé.

Base repartie de zéro : il ne reste que la **barre fixe** et la **couche
animée**. Tout le reste — l'ancien configurateur de devis, les études de cas,
les pages légales — a été retiré.

## Démarrer

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # build de production + typecheck
npm run preview
```

## Ce qu'il y a dans `src`

```
src/
├── components/
│   ├── landing/
│   │   ├── FixedNav.tsx      # la barre : le nom, et le sélecteur de langue
│   │   ├── ScrollLayers.tsx  # LA couche animée : un écran épinglé sur une
│   │   │                     #   piste haute, le texte défile, le compteur monte
│   │   ├── GrowText.tsx      # une ligne qui arrive lettre par lettre
│   │   └── Reveal.tsx        # tient les lettres jusqu'à ce qu'on les voie
│   └── ui/
│       ├── LocaleToggle.tsx
│       └── tones.ts          # les deux valeurs de la page, et rien d'autre
├── data/
│   └── layers.ts             # ⚠ TOUT le texte visible est ici
├── routes/
│   ├── __root.tsx
│   └── index.tsx             # la page : <FixedNav /> + <ScrollLayers />
├── stores/useLocaleStore.ts
├── styles/app.css
└── utils/seo.ts              # SITE_URL : l'adresse du site, en un seul endroit
```

## Les deux documents à lire avant d'écrire quoi que ce soit

- **[COPYWRITING.md](COPYWRITING.md)** — les règles d'écriture : le proverbe de
  fin de panneau, « on » contre « nous », la typographie française, ce qui a le
  droit d'être en capitales.
- **[CONVENTIONS.md](CONVENTIONS.md)** — les règles de code : ce qu'un
  commentaire doit dire, où vit le texte, l'état dans l'URL, ce que le serveur
  n'a pas le droit de croire, et les pièges déjà payés une fois.

Les deux ont été extraits de la version précédente du produit. Ils ne sont pas
décoratifs : la plus grande partie du code restant les applique déjà.

## Ajouter un panneau à la couche animée

Un panneau est une entrée dans `LAYERS` (`src/data/layers.ts`). La piste de
défilement, la barre de progression et le compteur se règlent seuls sur
`LAYERS.length` — il n'y a rien à toucher dans le composant.

## Changer d'identité

- La couleur : une ligne dans `src/components/ui/tones.ts`, une dans `@theme`
  (`src/styles/app.css`). La page n'a que **deux valeurs**, pas trois.
- Le nom : `site.name` dans `src/data/layers.ts`.
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

## À finir

- [ ] Le texte de `src/data/layers.ts` est un texte de départ : la structure est
      bonne, les mots sont à écrire.
- [ ] Les favicons de `public/` sont encore ceux de l'ancienne marque.
- [ ] Pas d'image de partage : `seo()` n'émet `og:image` que si on lui en donne
      une.
