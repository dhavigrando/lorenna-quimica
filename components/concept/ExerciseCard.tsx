'use client'

import { useState } from 'react'
import { ChevronDown, ChevronUp, Trophy } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'
import type { ConceptExercise } from '@/lib/types'

const levelColor: Record<string, string> = {
  iniciante:     'bg-emerald-50 text-emerald-700 border-emerald-200',
  intermediario: 'bg-amber-50  text-amber-700  border-amber-200',
  avancado:      'bg-rose-50   text-rose-700   border-rose-200',
}

const levelLabel: Record<string, string> = {
  iniciante:     'Iniciante',
  intermediario: 'Intermediário',
  avancado:      'Avançado',
}

export function ExerciseCard({ exercise, index }: { exercise: ConceptExercise; index: number }) {
  const [open, setOpen] = useState(false)

  return (
    <div className="border border-rose-100 rounded-soft overflow-hidden bg-white/70">
      <div className="px-5 py-4">
        <div className="flex items-start justify-between gap-3 mb-2">
          <div className="flex items-center gap-2">
            <Trophy className="w-4 h-4 text-rose-400 shrink-0" />
            <span className="text-xs font-semibold text-ink-muted">Exercício {index + 1}</span>
          </div>
          <span className={cn('text-xs px-2 py-0.5 rounded-pill border font-medium', levelColor[exercise.nivel])}>
            {levelLabel[exercise.nivel]}
          </span>
        </div>
        <p className="text-sm text-ink leading-relaxed">{exercise.enunciado}</p>
      </div>

      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-center gap-2 py-2 bg-rose-50 border-t border-rose-100 text-xs text-rose-600 font-medium hover:bg-rose-100 transition-colors"
      >
        {open ? <><ChevronUp className="w-3.5 h-3.5" /> Esconder solução</> : <><ChevronDown className="w-3.5 h-3.5" /> Ver solução</>}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22 }}
            className="overflow-hidden"
          >
            <div
              className="px-5 py-4 bg-rose-50/50 border-t border-rose-100 prose prose-sm max-w-none text-ink"
              dangerouslySetInnerHTML={{ __html: exercise.solucao }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
