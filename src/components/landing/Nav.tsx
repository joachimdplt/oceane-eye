/**
 * La barre fixe, faite des noms de blocs.
 *
 * Elle se fabrique à partir de `blockTitles`, dont les clés sont les ancres :
 * il n'y a donc pas de seconde liste de liens à tenir à jour, et réordonner les
 * blocs réordonne la barre.
 *
 * De vraies ancres et non des gestionnaires de clic : un lien se copie, s'ouvre
 * dans un onglet, et fonctionne avant que le JavaScript ait chargé.
 */
export function Nav({ items }: { items: Record<string, string> }) {
  return (
    <nav
      aria-label="Sections de la page"
      className="fixed top-0 left-0 right-0 z-50 px-6 md:px-gutter py-5"
    >
      <ul className="w-full max-w-page xl:max-w-wide mx-auto flex flex-wrap items-center justify-center gap-x-6 gap-y-2 md:gap-x-10">
        {Object.entries(items).map(([id, title]) => (
          <li key={id}>
            <a
              href={`#${id}`}
              className="font-dm text-ink text-eyebrow-lg md:text-sm font-medium no-underline hover:opacity-70 transition-opacity motion-reduce:transition-none"
            >
              {title}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
