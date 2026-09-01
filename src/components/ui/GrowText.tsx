import { Fragment } from 'react'

/**
 * A line that arrives the way the name does: letter by letter, each one
 * pushing up out of its own baseline.
 *
 * Words are kept whole so the line still wraps between them, and every letter
 * inside a word carries its own delay. The ripple is given a fixed span rather
 * than a fixed step, so a long paragraph takes no longer to arrive than a
 * three-word headline — a per-letter step would have dragged one out over
 * several seconds.
 *
 * The pieces are hidden from assistive tech and the whole string given back as
 * a label: a screen reader must hear a sentence, not a spelling.
 */
export function GrowText({
  text,
  delay,
  spread = 600,
  duration = 850,
}: {
  text: string
  /** When the first letter starts, in ms. */
  delay: number
  /** How long the ripple takes to reach the last letter, in ms. */
  spread?: number
  duration?: number
}) {
  const words = text.split(' ')
  const step = text.length > 1 ? spread / (text.length - 1) : 0
  let seen = 0

  return (
    <span aria-label={text}>
      {words.map((word, w) => {
        const at = seen
        seen += word.length + 1
        return (
          <Fragment key={`${word}-${w}`}>
            <span className="inline-block whitespace-nowrap" aria-hidden="true">
              {word.split('').map((letter, i) => (
                <span
                  key={`${letter}-${i}`}
                  className="grow-letter"
                  style={{
                    animationDelay: `${delay + (at + i) * step}ms`,
                    animationDuration: `${duration}ms`,
                  }}
                >
                  {letter}
                </span>
              ))}
            </span>
            {w < words.length - 1 ? ' ' : null}
          </Fragment>
        )
      })}
    </span>
  )
}
