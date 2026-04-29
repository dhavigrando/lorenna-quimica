'use client'

import dynamic from 'next/dynamic'
import type { GraphData } from '@/lib/types'

const ConceptGraph = dynamic(
  () => import('@/components/graph/ConceptGraph').then(m => m.ConceptGraph),
  { ssr: false, loading: () => <div className="flex-1 flex items-center justify-center text-ink-muted text-sm">Carregando mapa…</div> }
)

export function MapClient({ graphData, total }: { graphData: GraphData; total: number }) {
  return (
    <div className="flex flex-col h-full">
      <div className="px-6 pt-6 pb-3 shrink-0">
        <h1 className="font-display text-2xl font-semibold text-ink mb-1">🗺️ Mapa de Conceitos</h1>
        <p className="text-sm text-ink-muted">
          {total} conceitos interligados · arraste, zoom e clique para navegar
        </p>
      </div>
      <div className="flex-1 mx-6 mb-6 rounded-soft border border-rose-100 overflow-hidden bg-cream shadow-soft">
        {total === 0 ? (
          <div className="flex items-center justify-center h-full text-ink-muted text-sm">
            <p>Nenhum conceito gerado ainda. Execute <code className="bg-rose-100 text-rose-700 px-1.5 py-0.5 rounded">npm run gen</code></p>
          </div>
        ) : (
          <ConceptGraph initialData={graphData} />
        )}
      </div>
    </div>
  )
}
