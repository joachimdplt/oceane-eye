#!/bin/sh
# Mise à jour : récupère le code, reconstruit, republie la route.
#
# La reconstruction est systématique : le rendu serveur et le bundle client sont
# produits au build, un redémarrage seul ne changerait rien au contenu servi.
set -eu

ENV_FILE=${ENV_FILE:-.env.deploy}
COMPOSE="docker compose -f docker-compose.prod.yml --env-file $ENV_FILE"

git pull --ff-only
$COMPOSE build web
$COMPOSE up -d web
ENV_FILE="$ENV_FILE" ./deploy/install-site.sh
$COMPOSE ps
