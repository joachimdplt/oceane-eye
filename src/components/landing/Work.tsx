import type { Project } from '~/types'
import { Block } from './Block'
import { BlockTitle } from './BlockTitle'
import { WorkBlock } from './WorkBlock'

/** Les travaux : un écran d'annonce, puis un écran par projet. */
export function Work({ title, projects }: { title: string; projects: Project[] }) {
  return (
    <>
      <Block id="travaux" title={<BlockTitle>{title}</BlockTitle>} />
      {projects.map((project) => (
        <WorkBlock key={project.id} project={project} heading="h3" />
      ))}
    </>
  )
}
