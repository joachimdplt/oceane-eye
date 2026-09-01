#!/bin/sh
# Mise à jour d'un front seul : récupère le code, reconstruit, republie la route.
#
#   ./deploy/update.sh
#
# Appelé par l'autodeploy à chaque nouveau commit sur la branche suivie.
# Idempotent : relançable sans risque.
set -eu

cd "$(dirname "$0")/.."

ENV_FILE=${ENV_FILE:-.env.deploy}
COMPOSE="docker compose -f docker-compose.prod.yml --env-file $ENV_FILE"

[ -f "$ENV_FILE" ] || { echo "$ENV_FILE introuvable." >&2; exit 1; }

git pull --ff-only

# Toujours reconstruire : VITE_API_URL est inlinée dans le bundle au build, un
# restart ne la changerait pas.
$COMPOSE build web
$COMPOSE up -d web

# Republier la route est sans risque et rattrape un changement de domaine.
./deploy/install-site.sh

$COMPOSE ps
