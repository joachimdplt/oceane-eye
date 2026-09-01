#!/bin/sh
# Publie la route de ce stack dans le proxy partagé, puis recharge le proxy.
#
#   ./deploy/install-site.sh
#
# Appelé par init.sh et update.sh, jamais à la main en temps normal.
#
# AGNOSTIQUE DE LA FORME DE L'APPLICATION : il rend deploy/site.caddy.tpl quel
# qu'il soit, en y substituant les valeurs de .env.deploy. Un front seul n'a pas
# d'API_DOMAIN et son gabarit n'en parle pas — c'est le contrôle « aucun jeton
# non résolu » en fin de rendu qui garantit la cohérence, pas une liste figée de
# variables obligatoires.
#
# Idempotent : réécrit le fichier de site et recharge. Le rechargement de Caddy
# est à chaud — les connexions en cours ne sont pas coupées, et une erreur de
# syntaxe laisse l'ancienne configuration en place plutôt que de tout arrêter.
set -eu

PROXY_DIR=${PROXY_DIR:-/opt/infra/proxy}
ENV_FILE=${ENV_FILE:-.env.deploy}

[ -f "$ENV_FILE" ] || { echo "$ENV_FILE introuvable." >&2; exit 1; }

# On LIT le fichier, on ne l'EXÉCUTE pas. `. .env.deploy` semblait plus court,
# mais un fichier d'environnement n'est pas un script shell : la ligne
#
#     ADMIN_NAME=Joachim Duplat
#
# est une valeur parfaitement valide pour docker compose --env-file, alors que
# la sourcer fait tenter au shell d'exécuter « Duplat ». Les deux lecteurs
# doivent voir la même chose, donc on parse comme compose.
lire() {
  valeur=$(grep -E "^[[:space:]]*$1=" "$ENV_FILE" | head -1 | cut -d= -f2-)
  # Retire des guillemets englobants éventuels, comme le fait compose.
  case "$valeur" in
    \"*\") valeur=${valeur#\"}; valeur=${valeur%\"} ;;
    "'"*"'") valeur=${valeur#"'"}; valeur=${valeur%"'"} ;;
  esac
  printf '%s' "$valeur"
}

# Le minimum commun à toutes les formes : un identifiant de stack et un domaine.
STACK=$(lire STACK)
APP_DOMAIN=$(lire APP_DOMAIN)
[ -n "$STACK" ]      || { echo "STACK absent de $ENV_FILE" >&2; exit 1; }
[ -n "$APP_DOMAIN" ] || { echo "APP_DOMAIN absent de $ENV_FILE" >&2; exit 1; }

# Facultatifs : seules les formes qui les utilisent les renseignent.
#   API_DOMAIN — applications qui exposent une API
#   WEB_DOMAIN — applications qui ont un front public SSR
API_DOMAIN=$(lire API_DOMAIN)
WEB_DOMAIN=$(lire WEB_DOMAIN)

[ -d "$PROXY_DIR/sites" ] || {
  echo "$PROXY_DIR/sites introuvable — le proxy partagé n'est pas installé." >&2
  echo "  → git clone .../VPS-INFRA.git /opt/infra && /opt/infra/scripts/bootstrap.sh" >&2
  exit 1
}

RENDU="$PROXY_DIR/sites/$STACK.caddy"
TMP="$RENDU.tmp"

sed -e "s/__STACK__/$STACK/g" \
    -e "s/__APP_DOMAIN__/$APP_DOMAIN/g" \
    -e "s/__API_DOMAIN__/$API_DOMAIN/g" \
    -e "s/__WEB_DOMAIN__/$WEB_DOMAIN/g" \
    deploy/site.caddy.tpl > "$TMP"

# ── Deux contrôles avant de laisser ce fichier approcher le proxy ────────────
# Les commentaires sont exclus des deux : les gabarits se documentent eux-mêmes
# et parlent de leurs propres jetons.
SANS_COMMENTAIRES=$(grep -vE '^[[:space:]]*#' "$TMP" || true)

# 1. Un jeton resté en place = variable absente de .env.deploy. Sans ce contrôle,
#    Caddy recevrait un nom de domaine littéral « __API_DOMAIN__ » et tenterait
#    d'obtenir un certificat pour lui, en brûlant du quota Let's Encrypt.
if printf '%s\n' "$SANS_COMMENTAIRES" | grep -qE '__[A-Z_]+__'; then
  echo "Jeton non résolu dans le gabarit — variable absente de $ENV_FILE :" >&2
  printf '%s\n' "$SANS_COMMENTAIRES" | grep -oE '__[A-Z_]+__' | sort -u | sed 's/^/   /' >&2
  rm -f "$TMP"
  exit 1
fi

# 2. Une variable DÉFINIE MAIS VIDE ne laisse aucun jeton : elle laisse un bloc
#    sans adresse. Caddy le refuserait, mais avec un message obscur — et le
#    gabarit choisi ne correspondrait de toute façon pas à la forme de l'app.
if printf '%s\n' "$SANS_COMMENTAIRES" | grep -qE '^[[:space:]]*\{[[:space:]]*$'; then
  echo "Bloc de site sans domaine dans le rendu — une variable de $ENV_FILE est vide." >&2
  echo "  Le gabarit deploy/site.caddy.tpl attend un domaine qui n'est pas renseigné." >&2
  rm -f "$TMP"
  exit 1
fi

mv "$TMP" "$RENDU"
echo "→ Route publiée : $RENDU"

# Validation AVANT rechargement : une configuration invalide ne doit jamais
# atteindre le proxy qui sert TOUTES les applications de la machine.
docker exec caddy-proxy caddy validate --config /etc/caddy/Caddyfile >/dev/null
docker exec caddy-proxy caddy reload --config /etc/caddy/Caddyfile

echo "✅ Proxy rechargé :"
echo "   https://$APP_DOMAIN"
[ -n "$API_DOMAIN" ] && echo "   https://$API_DOMAIN"
[ -n "$WEB_DOMAIN" ] && echo "   https://$WEB_DOMAIN"
exit 0
