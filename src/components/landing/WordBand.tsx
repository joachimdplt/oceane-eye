/**
 * Le bandeau de mots qui défile.
 *
 * La piste est rendue DEUX FOIS et glisse de la moitié de sa largeur : c'est ce
 * qui rend la boucle sans couture. Une seule copie laisserait un blanc à chaque
 * tour.
 *
 * Décoratif, donc masqué aux lecteurs d'écran : ces mots sont dits ailleurs sur
 * la page, en prestations et en disciplines. Les faire entendre une troisième
 * fois, en boucle, n'aiderait personne.
 *
 * Il ne porte pas de titre et sort de la colonne : il doit toucher les deux
 * bords, sans quoi on lit un encadré plutôt qu'un défilement.
 */
export function WordBand({ words }: { words: string[] }) {
  return (
    <section
      aria-hidden="true"
      className="relative isolate py-10 md:py-14 bg-ground overflow-hidden"
    >
      <span className="grain absolute inset-0" />

      <div className="relative marquee">
        <div className="marquee-track flex items-baseline">
          {[0, 1].map((copie) => (
            <div key={copie} className="flex items-baseline shrink-0">
              {words.map((word) => (
                <span
                  key={word}
                  className="title2 title-block text-ink px-6 md:px-10 whitespace-nowrap"
                >
                  {word}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
