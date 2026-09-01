# Conventions — architecture en couches

## 1. Vue d'ensemble

Le principe central : **chaque couche a une seule responsabilité et ne connaît
que la couche du dessous**. Le flux des données monte
(Service → State → Hook → Composant) ; le flux des événements descend
(clic → handler du hook → mutation → service).

```
┌──────────────────────────────────────────────────────────────────────────────┐
│  Couche 5 — Pages          (pages/)       Assemblage seul. Zéro logique.      │
├──────────────────────────────────────────────────────────────────────────────┤
│  Couche 4 — Composants UI  (components/)  Props in / events out. Ni store ni API. │
├──────────────────────────────────────────────────────────────────────────────┤
│  Couche 3 — Feature Hooks  (hooks/)       Orchestration : state + services → props. │
├──────────────────────────────────────────────────────────────────────────────┤
│  Couche 2 — State          (stores/ + TanStack Query)  Zustand (client) + Query (serveur). │
├──────────────────────────────────────────────────────────────────────────────┤
│  Couche 1 — Services / API (api/)         HTTP isolé. Aucun composant n'appelle fetch. │
└──────────────────────────────────────────────────────────────────────────────┘
        ┊ transversal : guards/ · layouts/ · types/ · utils/ · data/
```

### Stack

| Domaine | Outil |
|---|---|
| Framework | React 19 + TypeScript + Vite |
| Routing | react-router (saas-manager) · TanStack Router (public-fluffy) |
| State serveur | TanStack Query (`@tanstack/react-query`) |
| State client | Zustand (+ middleware `persist`) |
| HTTP | Axios (client unique avec intercepteurs) |
| Formulaires | react-hook-form |
| Styles | Tailwind CSS v4 |
| Icônes | lucide-react |

---

## 2. Couche 1 — Services / API

Dossier : `src/api/`

**Règle d'or** : un composant ne fait JAMAIS de `fetch`, `axios` ou `api()`
directement. Tout passe par cette couche.

### 2.1 Client HTTP unique — `api/client.ts`

Une seule instance Axios, partagée. Elle gère l'injection automatique du Bearer
token (lu depuis le store persisté `auth-storage`) et le refresh automatique sur
401 (avec file d'attente des requêtes pendant le refresh, puis rejeu).

```ts
// api/client.ts
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? "http://localhost:3001/api",
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
})

apiClient.interceptors.request.use((config) => {
  const raw = localStorage.getItem("auth-storage")
  if (raw) {
    const { state } = JSON.parse(raw)
    if (state?.accessToken) config.headers.Authorization = `Bearer ${state.accessToken}`
  }
  return config
})
// + interceptor de réponse : 401 → POST /auth/refresh → rejeu de la requête.
```

La base URL vient **toujours** de `VITE_API_URL`, jamais d'une URL en dur dans le
code métier.

### 2.2 Services par domaine — `api/<domaine>.api.ts`

Des fonctions pures qui parlent à l'API et renvoient des données typées. Aucune
logique métier ici.

```ts
// api/animals.api.ts
export async function fetchAnimals(): Promise<Animal[]> {
  const { data } = await apiClient.get<Animal[]>("/animals")
  return data
}
export async function createAnimal(payload: Partial<Animal>): Promise<Animal> {
  const { data } = await apiClient.post<Animal>("/animals", payload)
  return data
}
```

**Règle** : le service ne connaît ni React, ni le store, ni les composants. Il
sait seulement faire un appel HTTP et renvoyer un type du domaine.

---

## 3. Couche 2 — State

Deux natures d'état, deux outils. Ne jamais mettre du state serveur dans
Zustand, ni dupliquer dans Zustand ce que TanStack Query cache déjà.

| Nature | Outil | Exemples Fluffy |
|---|---|---|
| **State serveur** (vient de l'API, partagé, mis en cache) | TanStack Query | animaux, documents, sessions, membres |
| **State client / UI** (local à la session, pas dans la DB) | Zustand | auth (user + token), onglets, filtres, wizard d'onboarding |

### 3.1 TanStack Query (state serveur)

- `QueryClientProvider` est monté **une fois** dans `main.tsx`.
- Le cache est la **source de vérité** des données serveur ; on ne les recopie
  pas ailleurs.
- Invalidation après mutation pour rafraîchir.

### 3.2 Zustand (state client) — `stores/`

```ts
// stores/auth.store.ts
export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      accessToken: null,
      login: (user, accessToken) => set({ user, accessToken }),
      logout: () => set({ user: null, accessToken: null }),
      setRole: (role) => set((s) => ({ user: s.user ? { ...s.user, role } : null })),
    }),
    { name: "auth-storage" }, // persisté dans localStorage
  ),
)
```

**Règles Zustand :**

- Le store **ne fait pas d'appel API** — il stocke un résultat. C'est le hook
  (Couche 3) qui appelle le service puis `login()` / `setUser()`.
- **Sélection ciblée** pour limiter les re-renders : `useAuthStore((s) => s.user)`
  plutôt que `useAuthStore()`. Un composant qui ne lit que `accessToken` ne
  re-render pas quand `user.role` change.
- `persist` pour ce qui doit survivre au reload (auth) ; sans `persist` pour
  l'éphémère.

---

## 4. Couche 3 — Feature Hooks

Dossier : `src/hooks/`

C'est ici que vit **toute la logique d'orchestration** : appeler un service,
mettre à jour un store, dériver des valeurs, gérer les handlers. Le hook
transforme « state + services » en props prêtes à consommer.

### 4.1 Hooks de service (state serveur)

Chaque domaine expose ses hooks Query/Mutation. Les composants ne touchent
jamais le service directement, ils passent par ces hooks.

```ts
// hooks/useAnimals.ts
export function useAnimals() {
  return useQuery({ queryKey: ["animals"], queryFn: fetchAnimals })
}
export function useCreateAnimal() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: createAnimal,
    onSuccess: () => qc.invalidateQueries({ queryKey: ["animals"] }), // refetch auto
  })
}
```

### 4.2 Hooks de feature (orchestration)

Connectent state (Couche 2) et UI (Couche 4) ; contiennent les enchaînements
métier.

```ts
// hooks/useShelterAnimalProfile.ts (extrait)
export function useShelterAnimalProfile() {
  const { animalId } = useParams()
  const { data: animal } = useAnimal(animalId!)
  const updateMut = useUpdateAnimal()

  const togglePublished = () =>
    updateMut.mutate({ id: animalId!, data: { published: !animal?.published } })

  return { animal, togglePublished /* … */ }
}
```

**Règle** : si tu écris « appeler un service puis mettre à jour le store/cache »,
ça vit dans un hook — jamais dans un composant ou une page.

---

## 5. Couche 4 — Composants UI

Dossier : `src/components/` (sous-dossiers par feature + `ui/` pour le générique)

Purement présentationnels. **Props in, events out.** Ils ne connaissent ni le
store, ni l'API, ni les hooks de feature.

```tsx
// components/shelter/AddAnimalForm.tsx (forme)
type Props = { open: boolean; onClose: () => void; onSubmit: (data: AnimalCreatePayload) => void }
export default function AddAnimalForm({ open, onClose, onSubmit }: Props) {
  // UI pure + state local de formulaire ; pas de store, pas d'API
}
```

```
components/
  ui/        → génériques : Button, Card, ConfirmDialog, ProgressBar…
  shelter/   → AddAnimalForm, IntakeEditor, ShelterAnimalSidebar…
  nav/       → Navbar, Sidebar…
  …          → un dossier par domaine
```

**Règle** : si un composant importe un store (`stores/`) ou un service (`api/`),
il est au mauvais endroit. Les types métier (`Animal`, `ShelterDocument`…)
arrivent **en props**, ils ne sont pas câblés depuis le composant.

---

## 6. Couche 5 — Pages

Dossier : `src/pages/`

**Assemblage uniquement** : instancie les hooks et passe les props aux
composants. Zéro logique métier.

```tsx
// pages/base/Animals.page.tsx (esprit)
export default function AnimalsPage() {
  const { animals, addAnimal /* … */ } = useShelterAnimalList()
  const [showAdd, setShowAdd] = useState(false)
  return (
    <>
      {/* … grille de <ShelterAnimalCard /> … */}
      {showAdd && <AddAnimalForm open onClose={() => setShowAdd(false)} onSubmit={addAnimal} />}
    </>
  )
}
```

**Règle** : un `if` complexe, un calcul, un `try/catch`, un appel API dans une
page → ça doit déménager dans un hook (Couche 3). Vise **< 100 lignes** par page.

---

## 7. Pattern Guard + Layout (auth, rôles, navigation)

Le routing compose trois briques : **guards** (qui a le droit), **layouts** (le
châssis visuel), **pages** (le contenu).

### 7.1 Guard — `guards/PrivateRoute.tsx`

Vérifie le token et, optionnellement, le rôle. Redirige sinon.

```tsx
export default function PrivateRoute({ allowedRoles }: { allowedRoles?: string[] }) {
  const accessToken = useAuthStore((s) => s.accessToken)
  const user = useAuthStore((s) => s.user)
  if (!accessToken) return <Navigate to="/signin" />
  if (allowedRoles && (!user || !allowedRoles.includes(user.role)))
    return <Navigate to="/unauthorized" />
  return <Outlet />
}
```

### 7.2 Layouts — `layouts/`

- **PublicLayout** — pages non authentifiées (signin, onboarding).
- **PrivateLayout** — châssis authentifié (Navbar/Sidebar + `<Outlet />`).
- **RoleBasedLayout** (pattern cible) — choisit dynamiquement le layout selon le
  rôle :

```tsx
// layouts/RoleBasedLayout.tsx
export default function RoleBasedLayout({ layouts }: { layouts: Record<string, ComponentType> }) {
  const user = useAuthStore((s) => s.user)
  const Layout = user ? layouts[user.role] : undefined
  return Layout ? <Layout /> : <Outlet />
}
```

### 7.3 Composition dans `App.tsx`

```tsx
<Routes>
  <Route element={<PublicLayout />}>
    <Route path="/signin" element={<SigninPage />} />
  </Route>

  <Route element={<PrivateRoute />}>
    <Route element={<PrivateLayout />}>
      <Route path="/" element={<DashboardPage />} />
      <Route path="/animals" element={<AnimalsPage />} />
    </Route>
  </Route>

  {/* Routes réservées à certains rôles + layout selon le rôle */}
  <Route element={<PrivateRoute allowedRoles={["fondateur"]} />}>
    <Route element={<RoleBasedLayout layouts={{ fondateur: AdminLayout }} />}>
      <Route path="/management" element={<ManagementPage />} />
    </Route>
  </Route>

  <Route path="/unauthorized" element={<UnauthorizedPage />} />
  <Route path="*" element={<NotFoundPage />} />
</Routes>
```

---

## 8. Règles d'imports par couche

| Un fichier dans… | peut importer de… | ne doit pas importer de… |
|---|---|---|
| `pages/` (C5) | `hooks/`, `components/`, `layouts/`, `types/`, constants | `api/`, `stores/` (passer par un hook) |
| `components/` (C4) | `components/ui/`, `types/`, constants | `stores/`, `api/`, `hooks/` de feature |
| `hooks/` (C3) | `stores/`, `api/`, `utils/`, `types/` | `components/`, `pages/` |
| `stores/` (C2) | `utils/`, `types/` | `components/`, `hooks/`, `pages/`, `api/` |
| `api/` (C1) | `api/client`, `types/` | tout le reste |

**Exceptions assumées** : lecture triviale du rôle/auth dans une page, ou écrans
d'onboarding standardisés via leur layout, peuvent lire `useAuthStore`
directement. Toute autre dérogation doit être justifiée.

---

## 9. Styles & tokens

Tailwind v4 est la base. Pour rester cohérent :

- Couleurs de marque, rayons, espacements → définis dans le **thème Tailwind**
  (et/ou un fichier de tokens partagé), pas en hexadécimal arbitraire au fil du
  code.
- Éviter les valeurs arbitraires type `bg-[#FDB141]` ; préférer une classe de
  thème (`bg-brand`, `text-muted`…).
- Un composant `ui/` ne porte pas de couleur « one-shot » : il expose des
  variantes.

---

## 10. Structure des dossiers (front)

```
src/
  api/          → Couche 1 : client.ts (axios + token + refresh) + <domaine>.api.ts
  stores/       → Couche 2 : stores Zustand (auth, UI…)
  hooks/        → Couche 3 : hooks de service (Query/Mutation) + hooks de feature
  components/   → Couche 4 : UI pure (ui/ générique + sous-dossiers par feature)
  pages/        → Couche 5 : assemblage (auth/, base/, admin/…)
  layouts/      → châssis (PublicLayout, PrivateLayout, RoleBasedLayout…)
  guards/       → contrôle d'accès (PrivateRoute)
  types/        → types du domaine (barrel index.ts)
  utils/        → logique pure réutilisable (format, transitions, calculs)
  data/         → données statiques / fallback
```

`public-fluffy` suit les mêmes principes ; seul le routing diffère (TanStack
Router, dossier `routes/` au lieu de `App.tsx` + react-router). Guards et layouts
s'expriment alors via les routes parentes (`beforeLoad`, layout routes).

---

## 11. Checklist — nouvel écran

- [ ] La page (`pages/`) fait < 100 lignes et ne fait aucun fetch/axios/appel HTTP.
- [ ] La page n'importe pas `api/` ; toute la logique est dans un hook `hooks/use-*.ts`.
- [ ] Les composants (`components/`) sont présentationnels : pas de `stores/`, pas de `api/`.
- [ ] Les données serveur passent par un hook TanStack Query ; l'état client par Zustand (sélection ciblée).
- [ ] Les mutations invalident les bonnes `queryKey`.
- [ ] Les types métier sont passés en props, pas importés dans les composants UI.
- [ ] Aucune couleur/police en dur ; styles via le thème Tailwind.
- [ ] L'accès est protégé par `PrivateRoute` (+ `allowedRoles` si besoin).

---

## 12. Checklist — review / audit

```bash
# Pages qui importent un store (violation C5) — hors exceptions onboarding
grep -rn "stores" saas-manager/src/pages --include="*.tsx" | grep -i import | grep -v onboarding

# Composants qui importent un store ou l'API (violation C4)
grep -rEn "from .*(stores|api/)" saas-manager/src/components --include="*.tsx"

# Appels HTTP hors de la couche api/ (violation C1)
grep -rEn "axios|fetch\(|apiClient" saas-manager/src/{pages,components,stores} --include="*.tsx"

# Couleurs hardcodées (hex) hors thème
grep -rn "#[0-9A-Fa-f]\{6\}" saas-manager/src --include="*.tsx" | grep -v node_modules

# URL d'API en dur (doit venir de VITE_API_URL)
grep -rn "http://localhost" saas-manager/src --include="*.ts" --include="*.tsx" | grep -v "client.ts"
```

---

## 13. Cycles de vie (rappel)

**Composant React** : mount (init `useState`, abonnement `useQuery`,
`useEffect`) → update (re-render sur changement de prop/state/store/cache) →
unmount (cleanup, désabonnement query → inactive → purge après `gcTime`).

**Donnée serveur (TanStack Query)** : idle → fetching → success (sous `queryKey`)
→ stale (après `staleTime`) → refetch auto (focus/reconnect/remount) ; sans
abonné → inactive → garbage-collected après `gcTime` (5 min par défaut). Une
mutation `invalidateQueries` repasse la query en stale → refetch → UI à jour.

**Auth / Zustand persist** : au démarrage, `persist` réhydrate depuis
`localStorage` (`auth-storage`) → `PrivateRoute` lit le store et décide
`Navigate`/`Outlet` → `login`/`setRole`/`logout` font un `set()` qui re-render
uniquement les abonnés concernés et mettent à jour `localStorage`.

| Objet | Créé | Détruit | Persisté ? |
|---|---|---|---|
| `useState` local | mount | unmount | non |
| Cache Query | 1er `useQuery` | `gcTime` après dernier abonné | non (mémoire) |
| Store Zustand | import du module | fin de session | oui via `persist` (localStorage) |
| `accessToken` | `login()` | `logout()` / 401 refresh échoué | oui (`auth-storage`) |

---

*Source de référence : projet `react-tanstack-query` (branches `zustand`,
`tanstack-query`, `guard-layout`). Cette doc est la version adaptée et appliquée
au monorepo Fluffy.*
