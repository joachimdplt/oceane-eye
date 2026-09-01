/**
 * L'adresse du site, en un seul endroit.
 *
 * Tout ce qui est absolu — canonical, og:url, images de partage, sitemap — en
 * descend. Changer de domaine est donc une ligne, pas une chasse.
 */
export const SITE_URL = 'https://ocean-eye.fr'
export const SITE_NAME = 'Ocean Eye'

/**
 * Les balises de tête d'une page.
 *
 * Le canonical n'est PAS ici : rendu dans `meta`, il sortait en
 * `<meta rel="canonical">`, que rien ne lit. Un canonical est un `<link>`, il
 * passe donc par `canonical()` et va dans le tableau `links` de la route.
 */
export const seo = ({
  title,
  description,
  keywords,
  image,
  url,
}: {
  title: string
  description?: string
  image?: string
  keywords?: string
  url?: string
}) => {
  // Aucune image par défaut : une balise qui pointe un fichier absent est pire
  // que pas de balise du tout. Voir COPYWRITING.md § 6.
  return [
    { title },
    { name: 'description', content: description },
    // Omis quand la route n'en fournit pas : un `<meta name="keywords">` sans
    // contenu traînait sur la moitié des pages.
    ...(keywords ? [{ name: 'keywords', content: keywords }] : []),
    { name: 'twitter:title', content: title },
    { name: 'twitter:description', content: description },
    ...(image ? [{ name: 'twitter:card', content: 'summary_large_image' }] : []),
    { property: 'og:type', content: 'website' },
    { property: 'og:title', content: title },
    { property: 'og:description', content: description },
    { property: 'og:locale', content: 'fr_FR' },
    { property: 'og:site_name', content: SITE_NAME },
    ...(image ? [{ name: 'twitter:image', content: image }] : []),
    ...(image ? [{ property: 'og:image', content: image }] : []),
    ...(url ? [{ property: 'og:url', content: url }] : []),
  ]
}

/**
 * L'adresse de référence de la page, à mettre dans `links`.
 *
 * Une seule par page : la racine n'en déclare aucune, sinon chaque page en
 * porterait deux, la sienne et celle de l'accueil.
 */
export const canonical = (url: string) => ({ rel: 'canonical' as const, href: url })
