import Link from 'next/link'
import { taxonomy } from '@/lib/taxonomy'
import { Card, CardTitle } from '@/components/ui/card'

const labSubject = taxonomy.find(s => s.slug === 'laboratorio')
const experiments = labSubject?.topics[0]?.concepts ?? []

export default function LaboratorioPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      <h1 className="font-display text-3xl font-semibold text-ink mb-2">🧪 Laboratório</h1>
      <p className="text-ink-muted mb-8">Técnicas experimentais passo a passo, com materiais, procedimento e erros comuns.</p>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {experiments.map(exp => (
          <Link key={exp.slug} href={`/laboratorio/${exp.slug}`}>
            <Card className="p-5 hover:shadow-medium hover:scale-[1.02] cursor-pointer transition-all">
              <p className="text-2xl mb-2">🔬</p>
              <CardTitle className="text-sm">{exp.title}</CardTitle>
              <p className="text-xs text-ink-muted mt-1 line-clamp-2">{exp.keywords.slice(0, 2).join(', ')}</p>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}
