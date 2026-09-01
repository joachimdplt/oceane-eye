import { Fragment, useEffect, useRef, useState } from 'react'
import { LAYERS, site } from '~/data/layers'
import { useLocaleStore } from '~/stores/useLocaleStore'
import { GrowText } from './GrowText'
import { Reveal } from './Reveal'

/**
 * La couche animée : un seul écran, immobile, dont le contenu change pendant
 * qu'on descend.
 *
 * Plutôt que des panneaux qui glissent les uns sur les autres, la section est
 * une piste de défilement haute contenant un écran épinglé : le nombre monte et
 * le texte défile à mesure qu'on avance dans la piste. Rien ne bouge sauf les
 * mots, ce qui est précisément ce qui rend le décompte lisible.
 *
 * Les panneaux sont empilés dans UNE cellule de grille plutôt que positionnés
 * en absolu : l'écran fait ainsi la hauteur de son panneau le plus haut, et
 * rien n'est jamais rogné.
 */
export function ScrollLayers() {
  const locale = useLocaleStore((s) => s.locale)
  const track = useRef<HTMLElement | null>(null)
  const [active, setActive] = useState(0)

  /**
   * Le mot que le nom attend, changé sur une horloge.
   *
   * Seulement tant que le panneau qui le porte est celui qu'on lit : hors écran
   * il compterait des mots que personne ne regarde. Laissé immobile pour qui a
   * demandé moins de mouvement, puisqu'une ligne qui se réécrit toutes les deux
   * secondes ne peut pas être mise en pause.
   */
  const [named, setNamed] = useState(0)
  useEffect(() => {
    if (active !== 0) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const clock = setInterval(() => setNamed((n) => (n + 1) % site.endings.length), 2200)
    return () => clearInterval(clock)
  }, [active])

  useEffect(() => {
    const node = track.current
    if (!node) return
    let frame = 0
    const read = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        const { top, height } = node.getBoundingClientRect()
        // Distance parcourue dans la piste par l'écran épinglé, de 0 à 1.
        const travelled = -top / Math.max(1, height - window.innerHeight)
        const at = Math.floor(travelled * LAYERS.length)
        setActive(Math.min(LAYERS.length - 1, Math.max(0, at)))
      })
    }
    read()
    window.addEventListener('scroll', read, { passive: true })
    window.addEventListener('resize', read)
    return () => {
      window.removeEventListener('scroll', read)
      window.removeEventListener('resize', read)
      cancelAnimationFrame(frame)
    }
  }, [])

  return (
    <section
      id="layers"
      ref={track}
      className="bg-white text-[#0a0a0a]"
      style={{ height: `${LAYERS.length * 100}svh` }}
    >
      <div className="sticky top-0 h-[100svh] flex items-center px-6 md:px-[6vw] py-12">
        <div className="w-full max-w-[1070px] xl:max-w-[74vw] mx-auto">
          {/* Allumé pour les couches déjà lues, éteint pour celles à venir. */}
          <div className="flex gap-2" aria-hidden="true">
            {LAYERS.map((layer, j) => (
              <span
                key={layer.id}
                className="h-px flex-1 transition-opacity duration-500 motion-reduce:transition-none"
                style={{ background: '#0a0a0a', opacity: j <= active ? 1 : 0.2 }}
              />
            ))}
          </div>

          <div className="grid md:grid-cols-[minmax(0,0.37fr)_minmax(0,1fr)] gap-10 md:gap-14 mt-10 md:mt-12">
            <p
              className="font-plex font-bold leading-[0.85] tracking-[-0.04em] text-[clamp(3rem,7vw,5.5rem)]"
              aria-hidden="true"
            >
              {String(active + 1).padStart(2, '0')}
            </p>

            <div className="grid">
              {LAYERS.map((layer, i) => {
                /**
                 * Tous les panneaux sont montés en même temps, pour que l'écran
                 * fasse la hauteur du plus haut. Les suivants ont donc fini de
                 * pousser, sans être vus, au moment où on les montre : les
                 * blocs animés sont clés sur « est-ce le panneau qu'on lit »,
                 * ce qui les remonte à cet instant et fait repartir les lettres.
                 */
                const run = i === active ? `on-${active}` : 'off'
                const isName = i === 0

                return (
                  <div
                    key={layer.id}
                    className="col-start-1 row-start-1 flex flex-col gap-5 transition-all duration-500 motion-reduce:transition-none"
                    style={{
                      opacity: i === active ? 1 : 0,
                      transform: `translateY(${(i - active) * 44}px)`,
                      pointerEvents: i === active ? 'auto' : 'none',
                    }}
                    aria-hidden={i !== active}
                  >
                    <p className="font-plex text-[11px] md:text-[13px] font-bold uppercase leading-[1.35] tracking-[0.04em]">
                      {layer.discipline[locale]}
                    </p>

                    <h2
                      key={`label-${run}`}
                      className="display text-[clamp(1.75rem,3.8vw,3.5rem)] leading-[0.94]"
                    >
                      {isName ? (
                        /* La formule sur la première ligne, et le mot qu'elle
                           attend sur la seconde : la seule chose de cet écran
                           qui change d'elle-même. Le mot est clé sur lui-même,
                           pour que ses lettres repoussent à chaque changement. */
                        <>
                          <span className="block">
                            <Reveal>
                              <GrowText text={site.formula} delay={0} spread={480} />
                            </Reveal>
                          </span>
                          <span className="block">
                            <Reveal>
                              <GrowText key={named} text={site.endings[named]} delay={0} spread={360} />
                            </Reveal>
                          </span>
                        </>
                      ) : (
                        layer.label[locale].map((line, j) => (
                          <span key={line} className="block">
                            <Reveal>
                              <GrowText text={line} delay={j * 180} spread={420} />
                            </Reveal>
                          </span>
                        ))
                      )}
                    </h2>

                    {/* Le corps est la seule chose ici destinée à se lire comme
                        de la prose : c'est donc la seule qui ne crie pas.
                        Aucune casse ne lui est imposée, ce qui laisse une
                        capitale au milieu d'une phrase vouloir dire quelque
                        chose. Voir COPYWRITING.md § 12. */}
                    <div className="flex flex-col gap-4 font-plex text-[12px] md:text-sm font-bold leading-[1.55] tracking-[0.03em] text-justify hyphens-auto max-w-3xl">
                      {layer.body[locale].map((para) => (
                        /* Un saut de ligne dans un paragraphe est un retour à
                           la ligne, pas un nouveau paragraphe : il pose une
                           phrase sur sa propre ligne sans ouvrir l'espace qui
                           sépare les blocs. */
                        <p key={para}>
                          {para.split('\n').map((line, k) => (
                            <Fragment key={line}>
                              {k > 0 ? <br /> : null}
                              {line}
                            </Fragment>
                          ))}
                        </p>
                      ))}
                    </div>

                    <p
                      key={`headline-${run}`}
                      className="font-plex text-lg md:text-2xl font-bold leading-[1.2] tracking-[-0.02em] max-w-2xl"
                    >
                      <Reveal>
                        <GrowText text={layer.headline[locale]} delay={260} spread={520} />
                      </Reveal>
                    </p>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
