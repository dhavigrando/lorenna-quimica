'use client'

import Fuse from 'fuse.js'
import type { ConceptIndex } from './types'

const SYNONYMS: Record<string, string[]> = {
  vapor:         ['evaporação', 'ebulição', 'fase gasosa'],
  concentracao:  ['molaridade', 'mol por litro', 'quantidade'],
  difusao:       ['difusivo', 'diffusion', 'transporte mássico'],
  calor:         ['entalpia', 'temperatura', 'energia térmica'],
  velocidade:    ['taxa', 'cinética', 'rate'],
  equilibrio:    ['constante', 'K', 'reversível'],
  ligacao:       ['ligação', 'bond', 'interação'],
}

function stripAccents(s: string) {
  return s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase()
}

function normalize(s: string) {
  const stopwords = ['o', 'a', 'os', 'as', 'de', 'da', 'do', 'negocio', 'coisa', 'parte', 'sobre', 'tipo']
  return stripAccents(s)
    .split(/\s+/)
    .filter(w => !stopwords.includes(w) && w.length > 1)
    .join(' ')
}

function expandQuery(q: string): string {
  const norm = normalize(q)
  const extra: string[] = []
  for (const [key, syns] of Object.entries(SYNONYMS)) {
    if (norm.includes(key)) extra.push(...syns)
  }
  return [norm, ...extra].join(' ')
}

export function createSearch(index: ConceptIndex[]) {
  const fuse = new Fuse(index, {
    keys: [
      { name: 'title',     weight: 0.6 },
      { name: 'keywords',  weight: 0.25 },
      { name: 'miniResumo', weight: 0.15 },
    ],
    threshold:     0.4,
    ignoreLocation: true,
    includeScore:  true,
    getFn: (obj, path) => {
      const val = Fuse.config.getFn(obj, path)
      if (typeof val === 'string') return stripAccents(val)
      if (Array.isArray(val)) return val.map(v => typeof v === 'string' ? stripAccents(v) : String(v))
      return val
    },
  })

  return function search(query: string): ConceptIndex[] {
    if (!query.trim()) return []
    const expanded = expandQuery(query)
    return fuse.search(expanded).map(r => r.item)
  }
}
