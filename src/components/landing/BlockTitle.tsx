import { GrowText } from '~/components/ui/GrowText'
import { Reveal } from '~/components/ui/Reveal'

/** Le titre d'un bloc : les lettres poussent quand il entre dans le champ. */
export function BlockTitle({ children }: { children: string }) {
  return (
    <h2 className="title2 title-block text-ink">
      <Reveal>
        <GrowText text={children} delay={0} spread={520} />
      </Reveal>
    </h2>
  )
}
