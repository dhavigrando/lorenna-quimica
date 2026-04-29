import { notFound } from 'next/navigation'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { taxonomy } from '@/lib/taxonomy'
import type { Metadata } from 'next'

const labSubject = taxonomy.find(s => s.slug === 'laboratorio')
const experiments = labSubject?.topics[0]?.concepts ?? []

interface Props { params: Promise<{ experimento: string }> }

export function generateStaticParams() {
  return experiments.map(e => ({ experimento: e.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { experimento } = await params
  const exp = experiments.find(e => e.slug === experimento)
  return { title: exp ? `${exp.title} — Laboratório` : 'Experimento' }
}

export default async function ExperimentoPage({ params }: Props) {
  const { experimento } = await params
  const exp = experiments.find(e => e.slug === experimento)
  if (!exp) notFound()

  const filePath = path.join(process.cwd(), 'content', 'experimentos', `${experimento}.mdx`)
  if (!fs.existsSync(filePath)) {
    return (
      <div className="max-w-3xl mx-auto px-6 py-10">
        <h1 className="font-display text-3xl font-semibold text-ink mb-4">🔬 {exp.title}</h1>
        <div className="p-6 bg-rose-50 border border-rose-200 rounded-soft text-center">
          <p className="text-rose-600 font-medium mb-1">Experimento ainda não gerado</p>
          <p className="text-sm text-ink-muted">
            Execute <code className="bg-rose-100 px-1.5 py-0.5 rounded text-rose-700">npm run gen</code> para gerar o conteúdo.
          </p>
        </div>
      </div>
    )
  }

  const raw = fs.readFileSync(filePath, 'utf-8')
  const { data, content } = matter(raw)

  return (
    <div className="max-w-3xl mx-auto px-6 py-10">
      <div className="mb-6">
        <p className="text-xs text-ink-muted uppercase tracking-widest mb-1">Laboratório</p>
        <h1 className="font-display text-3xl font-semibold text-ink">{data.title || exp.title}</h1>
        {data.descricao && <p className="text-ink-muted mt-2">{data.descricao}</p>}
      </div>

      {data.materiais && (
        <section className="mb-6">
          <h2 className="font-display text-lg font-semibold text-ink mb-3">🧰 Materiais</h2>
          <ul className="space-y-1">
            {(data.materiais as string[]).map((m: string, i: number) => (
              <li key={i} className="flex items-center gap-2 text-sm text-ink">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-400 shrink-0" />
                {m}
              </li>
            ))}
          </ul>
        </section>
      )}

      {data.passos && (
        <section className="mb-6">
          <h2 className="font-display text-lg font-semibold text-ink mb-3">📋 Passo a Passo</h2>
          <ol className="space-y-3">
            {(data.passos as string[]).map((p: string, i: number) => (
              <li key={i} className="flex gap-3 text-sm text-ink">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-rose-100 text-rose-600 text-xs font-bold flex items-center justify-center">
                  {i + 1}
                </span>
                <span className="pt-0.5">{p}</span>
              </li>
            ))}
          </ol>
        </section>
      )}

      {data.errosComuns && (
        <section className="mb-6">
          <h2 className="font-display text-lg font-semibold text-ink mb-3">⚠️ Erros Comuns</h2>
          <ul className="space-y-1">
            {(data.errosComuns as string[]).map((e: string, i: number) => (
              <li key={i} className="flex items-start gap-2 text-sm text-ink">
                <span className="text-amber-500 shrink-0 mt-0.5">▲</span>
                {e}
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  )
}
