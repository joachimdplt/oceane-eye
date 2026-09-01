# Gabarit de route pour un front SSR SEUL (site public, sans API propre).
#
# À recopier dans le deploy/ de l'application sous le nom `site.caddy.tpl`.
#
# La cible est le process Node de rendu, sur son port applicatif (3000), et non
# un Caddy interne comme pour une SPA statique.

# ── Redirection www (optionnelle) ────────────────────────────────────────────
# À DÉCOMMENTER seulement si un enregistrement DNS `www` pointe sur le VPS :
# sans lui, Caddy échoue en boucle sur le challenge et brûle le quota
# hebdomadaire Let's Encrypt pour un nom qui ne résout pas.
#
# Un site public gagne à n'avoir qu'une seule adresse canonique — deux URL
# servant le même contenu divisent le signal SEO.
#
# www.__APP_DOMAIN__ {
# 	redir https://__APP_DOMAIN__{uri} permanent
# }

__APP_DOMAIN__ {
	encode zstd gzip
	reverse_proxy __STACK__-web:3000

	header {
		X-Content-Type-Options nosniff
		Referrer-Policy strict-origin-when-cross-origin
		Strict-Transport-Security "max-age=31536000; includeSubDomains"
		-Server
		# Ni X-Robots-Tag, ni X-Frame-Options DENY : ce site existe POUR être
		# indexé. C'est toute la raison d'être du rendu serveur ici.
	}

	log {
		output file /data/access-__STACK__-web.log
	}
}
