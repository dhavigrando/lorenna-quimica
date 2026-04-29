import Link from 'next/link'
import type { ConceptIndex } from '@/lib/types'
import { ArrowRight } from 'lucide-react'

export function Connections({ related }: { related: ConceptIndex[] }) {
  if (!related.length) return null
  return (
    <div>
      <h3 className="font-display text-base font-semibold text-ink mb-3">🔗 Conceitos Relacionados</h3>
      <div className="flex flex-wrap gap-2">
        {related.map(r => (
          <Link
            key={r.slug}
            href={`/conceito/${r.slug}`}
            className="group flex items-center gap-1.5 bg-rose-50 border border-rose-100 text-rose-700 text-xs font-medium px-3 py-1.5 rounded-pill hover:bg-rose-100 hover:border-rose-300 transition-all"
          >
            {r.title}
            <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
          </Link>
        ))}
      </div>
    </div>
  )
}
