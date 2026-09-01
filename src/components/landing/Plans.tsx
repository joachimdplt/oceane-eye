import type { PlansContent } from '~/types'
import { GrowText } from '~/components/ui/GrowText'
import { Reveal } from '~/components/ui/Reveal'

/** `1 800 €`, jamais `1800€` : l'espace insécable, et le symbole après. */
function euros(amount: number) {
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 0,
  })
    .format(amount)
    // fr-FR sépare les milliers par une espace FINE insécable (U+202F), qui se
    // lit comme un artefact dans certaines polices. On la remplace par une
    // insécable ordinaire — en l'écrivant en échappement, parce qu'une espace
    // invisible dans un littéral ne se relit pas.
    .replace(/[  ]/g, ' ')
}

/**
 * Les tarifs : deux formules encadrant une image.
 *
 * Chaque formule dit ce qu'elle comprend AVANT de dire son prix, et le montant
 * se lit en bas de carte : un chiffre posé avant son périmètre ne se compare à
 * rien, et c'est ce qui fait écrire « sur devis » à tout le monde.
 *
 * Le « dès » subsiste, en petit, devant le montant : ce sont des planchers, et
 * un chiffre nu vaudrait engagement sur un périmètre qu'on n'a pas encore lu.
 *
 * L'image tient la colonne du milieu, sans texte. Elle n'est pas décorative au
 * sens où on pourrait la retirer : c'est elle qui empêche les deux cartes de se
 * lire comme un comparatif à cocher.
 *
 * Sous `md`, elle passe en dernier plutôt qu'entre les deux cartes : à une
 * colonne, elle séparerait deux choses qu'on veut justement comparer.
 */
export function Plans({ title, plans }: { title: string; plans: PlansContent }) {
  return (
    <section
      id="tarifs"
      className="relative isolate min-h-svh flex flex-col justify-center gap-12 md:gap-16 px-6 md:px-gutter py-24 bg-ground overflow-hidden"
    >
      <span aria-hidden="true" className="grain absolute inset-0" />

      <div className="relative w-full max-w-page xl:max-w-wide mx-auto flex flex-col gap-8">
        <p className="label text-ink uppercase tracking-eyebrow">{plans.eyebrow}</p>

        <h2 className="title2 title-block text-ink">
          <Reveal>
            <GrowText text={title} delay={0} spread={520} />
          </Reveal>
        </h2>

        {/* Le chapô à deux valeurs : la phrase qui annonce en pleine encre, la
            précision en retrait. Voir README, « Le retrait est une couleur ». */}
        <p className="body-text md:self-end md:max-w-2xl">
          <span className="text-ink">{plans.lede}</span>{' '}
          <span className="text-muted">{plans.rest}</span>
        </p>
      </div>

      {/* Trois colonnes de même hauteur : les deux formules se lisent l'une en
          face de l'autre, ligne à ligne, et l'image tient le milieu. */}
      <div className="relative w-full max-w-page xl:max-w-wide mx-auto grid gap-4 md:grid-cols-3 md:items-stretch">
        {plans.plans.map((plan, i) => (
          <div
            key={plan.id}
            className={`flex flex-col border border-rule rounded-card p-6 md:p-8 ${
              i === 0 ? '' : 'md:order-last'
            }`}
          >
            <h3 className="title2 title-panel text-ink pb-5">{plan.name}</h3>

            <ul className="flex flex-col">
              {plan.features.map((feature) => (
                <li key={feature} className="body-text text-muted py-3 border-t border-rule">
                  {feature}
                </li>
              ))}
            </ul>

            {/* `mt-auto` pousse le prix au bas de la carte quelle que soit la
                longueur de la liste : les deux montants se lisent alors sur une
                même ligne, d'un bord à l'autre du bloc. */}
            <div className="mt-auto pt-16 flex flex-col gap-4 items-start">
              <p className="flex flex-wrap items-baseline gap-x-2">
                {/* « dès » reste, en petit : ces montants sont des planchers, et
                    un chiffre nu vaudrait engagement. */}
                <span className="label text-muted">dès</span>
                <span className="title1 text-ink leading-none">{euros(plan.from)}</span>
                <span className="label text-muted">{plan.unit}</span>
              </p>

              <p className="body-text text-muted max-w-xs">{plan.note}</p>

              <a href={plans.cta.href} className="pill label text-ink">
                {plans.cta.label}
              </a>
            </div>
          </div>
        ))}

        <img
          src={plans.image}
          alt=""
          loading="lazy"
          decoding="async"
          className="rounded-card w-full h-full min-h-72 object-cover"
        />
      </div>
    </section>
  )
}
