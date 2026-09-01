import type { Step } from '~/types'
import { Block } from './Block'
import { BlockTitle } from './BlockTitle'

/**
 * La méthode, numérotée.
 *
 * Le numéro est décoratif et sort donc du flux de lecture : la liste ordonnée
 * dit déjà le rang à qui écoute la page, et l'entendre deux fois n'aide
 * personne.
 */
export function Process({ title, steps }: { title: string; steps: Step[] }) {
  return (
    <Block id="methode" title={<BlockTitle>{title}</BlockTitle>}>
      <ol className="flex flex-col">
        {steps.map((step, i) => (
          <li
            key={step.id}
            className="grid md:grid-cols-[auto_1fr] gap-x-8 gap-y-3 py-8 border-t border-ink/15"
          >
            <p className="title2 text-ink" aria-hidden="true">
              {String(i + 1).padStart(2, '0')}
            </p>
            <div className="flex flex-col gap-3">
              <h3 className="border-text-xl text-ink">{step.name}</h3>
              <p className="body-text text-ink max-w-3xl">
                {step.detail}
              </p>
            </div>
          </li>
        ))}
      </ol>
    </Block>
  )
}
