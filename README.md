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
    ui/             → génériques : GrowText, NotFound, ErrorState
    landing/        → Hero
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
- Le texte : `src/data/content.ts`.
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
