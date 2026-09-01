# Règles de code

Extraites du code de Somekind, avant remise à zéro. Chaque règle était
effectivement tenue dans le produit ; la référence entre parenthèses indique où
elle se lisait.

---

## Le commentaire

### 1. Un commentaire dit POURQUOI, et le plus souvent CONTRE QUOI

C'est la signature de ce code : presque chaque commentaire enregistre la
régression qu'il empêche. Il ne paraphrase jamais la ligne au-dessus.

```ts
// `-s ../client` et non `dist/client` : srvx résout le dossier statique
// relativement au FICHIER D'ENTRÉE, pas au dossier courant. Un chemin qui
// semble juste depuis /app pointe en réalité sur dist/server/dist/client, et
// le serveur démarre quand même : il rend les pages et renvoie 404 sur chaque
// feuille.
```

```ts
// Not rendered at all when idle. Pushing it off-screen with a transform left a
// black band showing on mobile the moment the browser chrome retracted.
```

```ts
// A real box, not `display: contents`: an element without a box is never seen
// by an intersection observer, so the letters never got released.
```

**Règle** : si le commentaire peut être déduit du code, il ne s'écrit pas. S'il
raconte un bug déjà payé une fois, il s'écrit toujours.

### 2. Un correctif se documente à l'endroit du correctif

Le `canonical` en est l'exemple type : la fonction `seo()` explique en tête
pourquoi le canonical n'y est pas.

> *Rendu dans `meta`, il sortait en `<meta rel="canonical">`, que rien ne lit.
> Un canonical est un `<link>`.*

---

## L'architecture

### 3. Le texte visible vit dans `src/data/`, jamais dans le composant

Les composants ne contiennent aucune chaîne destinée à l'écran. Elles vivent
dans des objets typés `L<T> = Record<Locale, T>`, clos par
`satisfies Record<string, unknown>`.

### 4. Ajouter une offre est un changement de DONNÉE, pas de code

```ts
export const TRACKS: Track[] = [ecommerceTrack, webAppTrack, mobileAppTrack]
export const availableTracks = () => TRACKS.filter((t) => t.available)
```

> *Adding a second one is a matter of dropping another `Track` in here. The page
> picks up the selector on its own as soon as more than one track is available.*

De même : `STEPS.length` était la seule chose qui savait combien d'écrans
existaient, et le premier choix du questionnaire nommait lui-même sa piste.

### 5. L'état est dans l'URL

Le tunnel portait son écran dans `?step=&q=`.

> *The screen lives in the URL, so Back goes to the previous step instead of
> leaving the configurator, and a step can be linked to directly.*

Corollaire tenu partout : la navigation se fait par de vrais `<Link>`, jamais
par des boutons qui poussent un état. Un écran est partageable ou il n'existe
pas.

### 6. Séparer ce qui est déduit de ce qui est choisi à la main

`selectionFromAnswers()` (ce que les réponses impliquent) et `overrides` (ce que
le visiteur a corrigé) restaient deux objets distincts, fusionnés seulement dans
`effectiveSelection()`.

> *Keeping the two apart is what lets someone untick a line the questions turned
> on.*

---

## La sécurité

### 7. Le serveur ne croit rien de ce que dit le client

> *Only the selection is taken from the request; every figure is recomputed
> server-side from it.*

Et pas seulement les montants : seules les réponses aux questions réellement
posées étaient retenues, et seulement parmi les valeurs que ces questions
offraient.

### 8. Tout ce qui entre dans du HTML est échappé, sans exception

`escapeHtml()` était appliqué à chaque interpolation des e-mails, y compris aux
chaînes venant de nos propres données.

### 9. Ce qui entre dans un sujet perd ses caractères de contrôle

```ts
// Newlines and control characters there are how header injection starts, and
// none of these fields need them.
```

### 10. Un lien fourni par un inconnu ne devient jamais une ancre

> *A URL supplied by a stranger and rendered as an anchor in our own mail is a
> phishing vector, so it travels as text and gets copied by hand.*

### 11. Tout plafond s'applique deux fois

Trois fichiers, 5 Mo, six extensions : appliqués dans le navigateur pour le
confort, et **réappliqués sur le serveur** parce que le premier contrôle est
facultatif.

> *A hand-made request would otherwise post a hundred megabytes.*

### 12. Les données personnelles vont en `sessionStorage`

> *These are someone's email and phone number, and there is no reason for them
> to outlive the visit that volunteered them.*

`localStorage` restait pour la langue, qui n'engage personne.

### 13. Les secrets sont lus à l'usage, jamais inlinés

Lus dans `process.env` au moment de l'envoi : les changer demande un
redémarrage, pas une reconstruction. Aucun n'atteint le bundle client.

---

## L'accessibilité et le mouvement

### 14. `prefers-reduced-motion` est honoré partout où quelque chose bouge

Sans exception : le rideau d'étape, les lettres qui poussent, la vidéo qui
s'arrête sur sa première image, le mot qui se réécrit sur une horloge.

> *A line that rewrites itself every two seconds cannot be paused.*

### 15. Une animation décorative est `aria-hidden`, et rend sa chaîne entière en `aria-label`

> *A screen reader must hear a sentence, not a spelling.*

### 16. `aria-live` n'existe que quand il doit être lu

> *Rendered only when it should be read. Translating it off-screen still left
> `aria-live` announcing the price during the questions.*

### 17. Après un changement d'écran : haut de page, et le focus sur le titre

`scrollTo({ top: 0 })` puis `headingRef.focus({ preventScroll: true })`.

---

## Le rendu et le style

### 18. Premier rendu toujours en français

Le store démarre en français et n'apprend le choix du visiteur que dans un
effet. Servir l'anglais sous un `<html lang="fr">` faisait se réécrire la page à
l'hydratation.

```ts
const locale: Locale = hydrated ? storedLocale : 'fr'
```

### 19. Deux valeurs, pas trois

```ts
export const TONES: Tone[] = [
  { bg: '#DF2522', fg: '#0a0a0a', accent: '#0a0a0a' },
  { bg: '#0a0a0a', fg: '#DF2522', accent: '#DF2522' },
]
```

> *No third colour, and no near-white anywhere — the page has exactly two
> values.* Et donc : pas de fondu, *« because a half-faded black is still a
> lighter black, and the page only has the one »*.

### 20. Empiler dans une cellule de grille, pas en absolu

> *The panels are stacked in one grid cell rather than positioned absolutely, so
> the screen is as tall as its tallest layer and nothing is ever clipped.*

### ⚠ 21. Le piège à ne pas reproduire : l'ordre des `@import` CSS

Dans `src/styles/app.css`, l'import Google Fonts était placé **après**
`@import 'tailwindcss'`, donc après des règles. Vite l'avertissait au build et
le **supprimait silencieusement** du CSS final : tout le site déclarait
`IBM Plex Sans` et tombait en réalité sur `system-ui`, en production, sans
erreur visible.

**Règle** : tout `@import` en tête de fichier, avant `@import 'tailwindcss'`.
Et vérifier dans `dist/` que la police y est réellement.

---

## Le déploiement

### 22. Un fichier d'environnement se LIT, ne s'EXÉCUTE pas

```sh
# `. .env.deploy` semblait plus court, mais ADMIN_NAME=Joachim Duplat est une
# valeur valide pour docker compose --env-file, alors que la sourcer fait
# tenter au shell d'exécuter « Duplat ».
```

### 23. Déploiement par surveillance, pas par webhook

Le serveur regarde si la branche a bougé, toutes les deux minutes, via un timer
systemd.

> *Rien ne le pousse, donc rien à ouvrir vers l'extérieur et aucune clé privée à
> confier à un service tiers.*

### 24. Valider avant de recharger, toujours

`caddy validate` avant `caddy reload` : une configuration invalide ne doit
jamais atteindre le proxy qui sert toutes les applications de la machine. Et
deux contrôles sur le gabarit rendu : aucun jeton `__NOM__` non résolu, aucun
bloc de site sans domaine.

### 25. Le contrôle de santé interroge une feuille, pas seulement la racine

> *Une racine qui répond ne prouve pas que les feuilles de style sont servies.*
