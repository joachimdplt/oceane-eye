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

```
src/
├── components/landing/
│   ├── Hero.tsx        # l'écran, et le seul
│   └── GrowText.tsx    # une ligne qui arrive lettre par lettre
├── data/
│   └── content.ts      # ⚠ TOUT le texte visible est ici
├── routes/
│   ├── __root.tsx
│   └── index.tsx       # la page : <Hero />
├── styles/app.css
└── utils/seo.ts        # SITE_URL : l'adresse du site, en un seul endroit
```

Aucun composant ne porte ses propres mots : le texte visible vit dans
`src/data/content.ts`, y compris le titre et la description de la page.
Voir CONVENTIONS.md § 3.

## Les deux documents à lire avant d'écrire quoi que ce soit

- **[COPYWRITING.md](COPYWRITING.md)** — les règles d'écriture : le proverbe de
  fin de panneau, « on » contre « nous », la typographie française, ce qui a le
  droit d'être en capitales.
- **[CONVENTIONS.md](CONVENTIONS.md)** — les règles de code : ce qu'un
  commentaire doit dire, où vit le texte, l'état dans l'URL, ce que le serveur
  n'a pas le droit de croire, et les pièges déjà payés une fois.

Les deux ont été extraits de la version précédente du produit. Ils ne sont pas
décoratifs : la plus grande partie du code restant les applique déjà.

## Changer d'identité

- La page est en **noir sur blanc**, sans aucune couleur : le fond est déclaré
  une seule fois, sur `html, body` (`src/styles/app.css`). Le rebond du
  défilement montre le fond du document et non celui de la section — les deux
  doivent rester le même blanc.
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

- [ ] Les favicons de `public/` sont encore ceux de l'ancienne marque.
- [ ] Pas d'image de partage : `seo()` n'émet `og:image` que si on lui en donne
      une.
