'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { ChevronDown, ChevronRight } from 'lucide-react'
import { taxonomy } from '@/lib/taxonomy'
import { cn } from '@/lib/utils'

export function Sidebar() {
  const pathname = usePathname()
  const [open, setOpen] = useState<string | null>(null)

  return (
    <aside className="w-64 shrink-0 h-full border-r border-rose-100 bg-white/70 backdrop-blur overflow-y-auto">
      <div className="p-4">
        <Link href="/" className="flex items-center gap-2 mb-6 group">
          <span className="text-2xl">🌸</span>
          <div>
            <p className="font-display font-semibold text-rose-600 text-base leading-tight group-hover:text-rose-500 transition-colors">Lorenna</p>
            <p className="text-xs text-ink-muted">Eng. Química</p>
          </div>
        </Link>

        <nav className="space-y-1">
          <Link
            href="/mapa"
            className={cn(
              'flex items-center gap-2 px-3 py-2 rounded-soft text-sm transition-all',
              pathname === '/mapa'
                ? 'bg-rose-100 text-rose-700 font-medium'
                : 'text-ink-muted hover:bg-rose-50 hover:text-ink'
            )}
          >
            <span>🗺️</span> Mapa de Conceitos
          </Link>
          <Link
            href="/laboratorio"
            className={cn(
              'flex items-center gap-2 px-3 py-2 rounded-soft text-sm transition-all',
              pathname.startsWith('/laboratorio')
                ? 'bg-rose-100 text-rose-700 font-medium'
                : 'text-ink-muted hover:bg-rose-50 hover:text-ink'
            )}
          >
            <span>🧪</span> Laboratório
          </Link>
        </nav>

        <div className="mt-4 mb-2">
          <p className="text-xs font-semibold uppercase tracking-widest text-ink-muted px-3">Matérias</p>
        </div>

        <nav className="space-y-0.5">
          {taxonomy.map(subject => (
            <div key={subject.slug}>
              <button
                onClick={() => setOpen(open === subject.slug ? null : subject.slug)}
                className={cn(
                  'w-full flex items-center justify-between px-3 py-2 rounded-soft text-sm transition-all',
                  pathname.includes(subject.slug)
                    ? 'bg-rose-100 text-rose-700 font-medium'
                    : 'text-ink hover:bg-rose-50'
                )}
              >
                <span className="flex items-center gap-2">
                  <span>{subject.emoji}</span>
                  <span className="text-left">{subject.title}</span>
                </span>
                {open === subject.slug
                  ? <ChevronDown className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                  : <ChevronRight className="w-3.5 h-3.5 text-rose-300 shrink-0" />
                }
              </button>

              {open === subject.slug && (
                <div className="ml-3 pl-3 border-l border-rose-100 mt-0.5 space-y-0.5">
                  {subject.topics.map(topic => (
                    <div key={topic.slug}>
                      <p className="text-xs text-ink-muted font-medium px-2 py-1 mt-1">{topic.title}</p>
                      {topic.concepts.map(concept => (
                        <Link
                          key={concept.slug}
                          href={`/conceito/${concept.slug}`}
                          className={cn(
                            'block px-2 py-1 text-xs rounded-lg transition-all',
                            pathname === `/conceito/${concept.slug}`
                              ? 'bg-rose-200 text-rose-800 font-medium'
                              : 'text-ink-muted hover:bg-rose-50 hover:text-ink'
                          )}
                        >
                          {concept.title}
                        </Link>
                      ))}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>
      </div>
    </aside>
  )
}
