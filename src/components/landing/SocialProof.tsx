import type { SocialProofContent } from '~/types'

/**
 * La preuve par les clients : un bandeau de mots, puis leurs avis.
 *
 * Le bandeau est rendu DEUX FOIS et glisse de la moitié de sa largeur : c'est
 * ce qui rend la boucle sans couture. Une seule copie laisserait un blanc à
 * chaque tour.
 *
 * Des citations et non des étoiles. Aucun de ces clients n'a donné de note, et
 * une étoile inventée sous une phrase authentique jetterait le doute sur la
 * phrase — qui vaut de toute façon mieux qu'une étoile.
 *
 * Pas de portrait non plus : on n'a la photo d'aucune de ces personnes, et
 * poser l'image d'un projet derrière une citation laisserait croire que l'auteur
 * y figure.
 *
 * Le balisage dit ce que c'est : `<blockquote>` pour la parole rapportée,
 * `<figcaption>` pour qui l'a dite. Un lecteur d'écran annonce alors une
 * citation, pas un paragraphe de plus.
 */
export function SocialProof({ title, proof }: { title: string; proof: SocialProofContent }) {
  return (
    <section
      id="confiance"
      className="relative isolate min-h-svh flex flex-col justify-center gap-12 md:gap-16 py-24 bg-ground overflow-hidden"
    >
      <span aria-hidden="true" className="grain absolute inset-0" />

      {/* Le bandeau sort de la colonne : il doit toucher les deux bords. */}
      <div className="relative marquee" aria-hidden="true">
        <div className="marquee-track flex items-baseline">
          {[0, 1].map((copie) => (
            <div key={copie} className="flex items-baseline shrink-0">
              {proof.words.map((word) => (
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

      <div className="relative w-full max-w-page xl:max-w-wide mx-auto px-6 md:px-gutter flex flex-col gap-10">
        <h2 className="title2 title-block text-ink">{title}</h2>

        <ul className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {proof.voices.map((voice) => (
            <li key={voice.id}>
              <figure className="h-full flex flex-col gap-6 border border-rule rounded-card p-6 md:p-8">
                <blockquote className="body-text text-ink">« {voice.quote} »</blockquote>

                <figcaption className="mt-auto flex flex-col gap-1">
                  <span className="border-text-xl text-ink">{voice.name}</span>
                  <span className="label text-muted">{voice.role}</span>
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
