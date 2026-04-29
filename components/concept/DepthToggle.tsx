'use client'

import { useState, useEffect } from 'react'
import { Sparkles, Brain, BookOpen, FileText } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'

type Depth = 'simples' | 'intuicao' | 'profundo' | 'resumo'

interface Props {
  variacoes: { simples: string; intuicao: string; profundo: string; resumo: string }
  slug: string
}

const tabs: { key: Depth; label: string; icon: React.ElementType; desc: string }[] = [
  { key: 'simples',  label: 'Não entendi',   icon: Sparkles, desc: 'Versão bem simples' },
  { key: 'intuicao', label: 'Normal',        icon: BookOpen, desc: 'Explicação padrão'  },
  { key: 'profundo', label: 'Mais profundo', icon: Brain,    desc: 'Nível avançado'     },
  { key: 'resumo',   label: 'Resumo',        icon: FileText, desc: 'Versão curta'       },
]

export function DepthToggle({ variacoes, slug }: Props) {
  const storageKey = `depth-${slug}`
  const [depth, setDepth] = useState<Depth>('intuicao')

  useEffect(() => {
    const saved = localStorage.getItem(storageKey) as Depth | null
    if (saved && variacoes[saved]) setDepth(saved)
  }, [slug, storageKey, variacoes])

  function choose(d: Depth) {
    setDepth(d)
    localStorage.setItem(storageKey, d)
  }

  return (
    <div className="mb-6">
      <div className="flex flex-wrap gap-2 mb-4">
        {tabs.map(tab => (
          <button
            key={tab.key}
            onClick={() => choose(tab.key)}
            className={cn(
              'flex items-center gap-1.5 px-3 py-1.5 rounded-pill text-xs font-medium transition-all',
              depth === tab.key
                ? 'bg-rose-500 text-white shadow-soft'
                : 'bg-rose-50 text-rose-600 border border-rose-100 hover:bg-rose-100'
            )}
          >
            <tab.icon className="w-3.5 h-3.5" />
            {tab.label}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={depth}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.18 }}
          className="prose prose-sm max-w-none text-ink leading-relaxed"
          dangerouslySetInnerHTML={{ __html: variacoes[depth] }}
        />
      </AnimatePresence>
    </div>
  )
}
