#!/bin/sh
# Déploiement automatique par SURVEILLANCE, l'inverse d'un webhook.
#
# Le serveur regarde régulièrement si la branche qu'il suit a bougé, et déploie
# le cas échéant. Rien ne le pousse, donc rien à ouvrir vers l'extérieur et
# aucune clé privée à confier à un service tiers : le VPS a déjà un accès en
# lecture au dépôt, il suffit.
#
# Lancé par le timer systemd ocean-eye-autodeploy@<stack>.timer, jamais à la
# main — mais inoffensif si on l'appelle directement : sans nouveau commit, il
# ne fait rien.
set -eu

cd "$(dirname "$0")/.."

BRANCHE=$(git rev-parse --abbrev-ref HEAD)
git fetch -q origin "$BRANCHE"

LOCAL=$(git rev-parse HEAD)
DISTANT=$(git rev-parse "origin/$BRANCHE")

if [ "$LOCAL" = "$DISTANT" ]; then
  exit 0
fi

echo "Nouveau commit sur $BRANCHE : $(git log --oneline -1 "$DISTANT")"
./deploy/update.sh
echo "Déploiement terminé : $(git rev-parse --short HEAD)"
