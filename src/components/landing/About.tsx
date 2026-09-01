import { Block } from './Block'
import { BlockTitle } from './BlockTitle'

/** Ce que le studio est, dit du dehors. */
export function About({ title, lines }: { title: string; lines: string[] }) {
  return (
    <Block id="studio" title={<BlockTitle>{title}</BlockTitle>}>
      <div className="flex flex-col gap-6 max-w-3xl">
        {lines.map((line) => (
          <p key={line} className="border-text-xl text-ink">
            {line}
          </p>
        ))}
      </div>
    </Block>
  )
}
