# Front SSR TanStack Start.
#
# ÉCART ASSUMÉ au gabarit `templates/ssr-seul/Dockerfile` du socle : celui-ci
# lance `node .output/server/index.mjs`, la sortie de Nitro. La version de
# TanStack Start utilisée ici ne produit pas `.output/` mais `dist/`, servi par
# `srvx` — vérifié à chaque build. Le gabarit donnerait un conteneur qui ne
# démarre pas.
#
# S'y ajoutent trois choses que le gabarit n'a pas : tini pour que les signaux
# atteignent Node, un utilisateur non privilégié, et un contrôle de santé qui
# interroge aussi une feuille de style.
#
# ── Étape 1 : build ──────────────────────────────────────────────────────────
FROM node:20-alpine AS build
WORKDIR /app

# Les dépendances d'abord : cette couche ne se reconstruit que si le lock change.
COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

# Puis on retire les devDependencies : srvx, qui sert l'application, est une
# dépendance de @tanstack/react-start et survit donc à l'élagage.
RUN npm prune --omit=dev

# ── Étape 2 : exécution ──────────────────────────────────────────────────────
FROM node:20-alpine AS runtime
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=3000

# tini : pour que les signaux atteignent Node. Sans lui, un `docker stop` tue le
# process sans le laisser fermer ses connexions.
RUN apk add --no-cache tini

COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist
COPY --from=build /app/package.json ./

USER node
EXPOSE 3000
# Le contrôle interroge la racine ET un fichier statique : une racine qui répond
# ne prouve pas que les feuilles de style sont servies.
HEALTHCHECK --interval=30s --timeout=5s --start-period=20s --retries=3 \
  CMD node -e "Promise.all([fetch('http://127.0.0.1:3000/'),fetch('http://127.0.0.1:3000/favicon.ico')]).then(([a,b])=>process.exit(a.status<500&&b.ok?0:1)).catch(()=>process.exit(1))"

# `-s ../client` et non `dist/client` : srvx résout le dossier statique
# relativement au FICHIER D'ENTRÉE, pas au dossier courant. Un chemin qui semble
# juste depuis /app pointe en réalité sur dist/server/dist/client, et le serveur
# démarre quand même : il rend les pages et renvoie 404 sur chaque feuille.
#
# Le binaire local plutôt que `npx` : celui-ci irait interroger le registre npm
# au démarrage, ce qu'un conteneur en production n'a pas à faire.
ENTRYPOINT ["/sbin/tini", "--"]
CMD ["node_modules/.bin/srvx", "--prod", "-s", "../client", "dist/server/server.js"]
