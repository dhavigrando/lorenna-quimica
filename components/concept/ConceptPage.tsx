'use client'

import { DepthToggle } from './DepthToggle'
import { ExerciseCard } from './ExerciseCard'
import { Connections } from './Connections'
import type { ConceptFrontmatter } from '@/lib/types'
import type { ConceptIndex } from '@/lib/types'
import { FlaskConical, Sigma, Lightbulb, Target, BookOpenCheck } from 'lucide-react'

interface Props {
  data: ConceptFrontmatter
  related: ConceptIndex[]
}

const aplicacaoIcon: Record<string, string> = {
  prova:       '📝',
  laboratorio: '🔬',
  industria:   '🏭',
}

const aplicacaoLabel: Record<string, string> = {
  prova:       'Em Provas',
  laboratorio: 'No Laboratório',
  industria:   'Na Indústria',
}

function Section({ icon, title, children }: { icon: React.ReactNode; title: string; children: React.ReactNode }) {
  return (
    <section className="mb-8">
      <h2 className="flex items-center gap-2 font-display text-lg font-semibold text-ink mb-4">
        {icon}
        {title}
      </h2>
      {children}
    </section>
  )
}

export function ConceptPage({ data, related }: Props) {
  return (
    <article className="max-w-3xl mx-auto px-6 py-10">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 text-xs text-ink-muted mb-2">
          <span>{data.materia}</span>
          <span>·</span>
          <span>{data.topico}</span>
        </div>
        <h1 className="font-display text-4xl font-semibold text-ink leading-tight mb-3">{data.title}</h1>
        <p className="text-ink-muted text-base leading-relaxed">{data.miniResumo}</p>

        {/* Keywords */}
        <div className="flex flex-wrap gap-1.5 mt-4">
          {data.keywords.slice(0, 6).map(kw => (
            <span key={kw} className="text-xs bg-rose-100 text-rose-700 px-2.5 py-1 rounded-pill">{kw}</span>
          ))}
        </div>
      </div>

      {/* Explicação com depth toggle */}
      <Section icon={<Lightbulb className="w-5 h-5 text-rose-400" />} title="Explicação">
        <DepthToggle variacoes={data.variacoes} slug={data.slug} />
      </Section>

      {/* Matemática */}
      {data.matematica && (
        <Section icon={<Sigma className="w-5 h-5 text-rose-400" />} title="A Parte Matemática">
          <div
            className="bg-rose-50/60 border border-rose-100 rounded-soft p-5 prose prose-sm max-w-none text-ink"
            dangerouslySetInnerHTML={{ __html: data.matematica }}
          />
        </Section>
      )}

      {/* Exemplo Resolvido */}
      {data.exemploResolvido && (
        <Section icon={<FlaskConical className="w-5 h-5 text-rose-400" />} title="Exemplo Resolvido">
          <div
            className="bg-white border border-rose-100 rounded-soft p-5 prose prose-sm max-w-none text-ink"
            dangerouslySetInnerHTML={{ __html: data.exemploResolvido }}
          />
        </Section>
      )}

      {/* Aplicações */}
      {data.aplicacao?.length > 0 && (
        <Section icon={<Target className="w-5 h-5 text-rose-400" />} title="Onde isso aparece?">
          <div className="grid sm:grid-cols-3 gap-3">
            {data.aplicacao.map((ap, i) => (
              <div key={i} className="bg-white border border-rose-100 rounded-soft p-4">
                <p className="text-base mb-1">{aplicacaoIcon[ap.tipo]}</p>
                <p className="text-xs font-semibold text-rose-600 mb-1">{aplicacaoLabel[ap.tipo]}</p>
                <p className="text-xs text-ink-muted leading-relaxed">{ap.descricao}</p>
              </div>
            ))}
          </div>
        </Section>
      )}

      {/* Exercícios */}
      {data.exercicios?.length > 0 && (
        <Section icon={<BookOpenCheck className="w-5 h-5 text-rose-400" />} title="Exercícios">
          <div className="space-y-3">
            {data.exercicios.map((ex, i) => (
              <ExerciseCard key={i} exercise={ex} index={i} />
            ))}
          </div>
        </Section>
      )}

      {/* Conexões */}
      <Connections related={related} />
    </article>
  )
}
