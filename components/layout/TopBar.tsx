'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { Search, X } from 'lucide-react'
import type { ConceptIndex } from '@/lib/types'
import { createSearch } from '@/lib/search'

export function TopBar() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<ConceptIndex[]>([])
  const [index, setIndex] = useState<ConceptIndex[]>([])
  const [open, setOpen] = useState(false)
  const router = useRouter()
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    fetch('/content/index.json')
      .then(r => r.json())
      .then((data: ConceptIndex[]) => setIndex(data))
      .catch(() => {})
  }, [])

  useEffect(() => {
    if (!query.trim() || index.length === 0) { setResults([]); return }
    const search = createSearch(index)
    setResults(search(query).slice(0, 6))
  }, [query, index])

  useEffect(() => {
    function handler(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  function go(slug: string) {
    setQuery('')
    setOpen(false)
    router.push(`/conceito/${slug}`)
  }

  return (
    <header className="h-14 border-b border-rose-100 bg-white/80 backdrop-blur flex items-center px-4 gap-4 shrink-0 z-10">
      <div className="flex-1 flex justify-center">
        <div ref={ref} className="relative w-full max-w-md">
          <div className="flex items-center gap-2 bg-rose-50 border border-rose-100 rounded-pill px-4 py-2 focus-within:border-rose-300 focus-within:bg-white transition-all">
            <Search className="w-4 h-4 text-rose-400 shrink-0" />
            <input
              value={query}
              onChange={e => { setQuery(e.target.value); setOpen(true) }}
              onFocus={() => setOpen(true)}
              placeholder="Buscar conceito… ex: 'negócio da difusão'"
              className="flex-1 bg-transparent text-sm text-ink placeholder-ink-muted outline-none"
            />
            {query && (
              <button onClick={() => { setQuery(''); setOpen(false) }}>
                <X className="w-3.5 h-3.5 text-rose-400 hover:text-rose-600" />
              </button>
            )}
          </div>

          {open && results.length > 0 && (
            <div className="absolute top-full mt-2 w-full bg-white border border-rose-100 rounded-soft shadow-medium overflow-hidden z-50">
              {results.map(r => (
                <button
                  key={r.slug}
                  onClick={() => go(r.slug)}
                  className="w-full text-left px-4 py-2.5 hover:bg-rose-50 transition-colors border-b border-rose-50 last:border-0"
                >
                  <p className="text-sm font-medium text-ink">{r.title}</p>
                  <p className="text-xs text-ink-muted mt-0.5">{r.materia} · {r.topico}</p>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
