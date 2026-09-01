/**
 * Deux fonds, et l'encre que chacun prend.
 *
 * Le premier est la couleur de la maison, avec du noir dessus. Tout ce qui
 * suit retourne la paire : fond noir, type coloré. Pas de troisième couleur,
 * et aucun presque-blanc nulle part — la page a exactement deux valeurs.
 *
 * Changer l'identité tient donc en une ligne ici, et une dans `@theme`
 * (src/styles/app.css).
 */
export interface Tone {
  bg: string
  fg: string
  accent: string
}

export const TONES: Tone[] = [
  { bg: '#0E7C86', fg: '#0a0a0a', accent: '#0a0a0a' },
  { bg: '#0a0a0a', fg: '#0E7C86', accent: '#0E7C86' },
]

export const toneAt = (i: number): Tone => TONES[((i % TONES.length) + TONES.length) % TONES.length]
