# Route de ce stack dans le proxy PARTAGÉ du VPS (/opt/infra/proxy/sites/).
#
# Rendue par deploy/install-site.sh à partir de .env.deploy. Ne pas éditer le
# fichier rendu sur le serveur : il serait écrasé au prochain déploiement.
#
# La cible est désignée par ALIAS DE STACK (__STACK__-web) : plusieurs stacks de
# la machine déclarent un service « web », et un alias ambigu ferait tomber le
# trafic sur le site d'une autre application.

www.__APP_DOMAIN__ {
	redir https://__APP_DOMAIN__{uri} permanent
}

__APP_DOMAIN__ {
	encode zstd gzip
	reverse_proxy __STACK__-web:3000

	header {
		X-Content-Type-Options nosniff
		Referrer-Policy strict-origin-when-cross-origin
		Strict-Transport-Security "max-age=31536000; includeSubDomains"
		-Server
	}

	log {
		output file /data/access-__STACK__.log
	}
}
