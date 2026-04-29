import Link from 'next/link'
import { Card, CardHeader, CardTitle, CardBody } from '@/components/ui/card'
import { taxonomy } from '@/lib/taxonomy'
import { loadIndex } from '@/lib/content'

export default function Home() {
  const index = loadIndex()
  const total = index.length

  return (
    <div className="max-w-5xl mx-auto px-6 py-10">
      {/* Hero */}
      <div className="mb-10">
        <p className="text-rose-400 text-sm font-medium uppercase tracking-widest mb-2">Bem-vinda de volta 🌸</p>
        <h1 className="font-display text-4xl font-semibold text-ink leading-tight mb-3">
          Seu cérebro digital de<br />
          <span className="text-rose-500">Engenharia Química</span>
        </h1>
        <p className="text-ink-muted text-lg max-w-xl">
          Conceitos interligados, exercícios resolvidos, laboratório e um mapa visual de todo o conhecimento — tudo num lugar só.
        </p>
        <div className="flex items-center gap-3 mt-5">
          <Link
            href="/mapa"
            className="inline-flex items-center gap-2 bg-rose-500 text-white px-5 py-2.5 rounded-pill text-sm font-medium shadow-soft hover:bg-rose-600 hover:shadow-medium transition-all"
          >
            🗺️ Ver Mapa de Conceitos
          </Link>
          <Link
            href="/laboratorio"
            className="inline-flex items-center gap-2 border border-rose-200 text-rose-600 px-5 py-2.5 rounded-pill text-sm font-medium hover:bg-rose-50 transition-all"
          >
            🧪 Laboratório
          </Link>
        </div>
      </div>

      {/* Stats */}
      {total > 0 && (
        <div className="grid grid-cols-3 gap-4 mb-10">
          {[
            { label: 'Conceitos', value: total, emoji: '📚' },
            { label: 'Matérias', value: taxonomy.length, emoji: '🎓' },
            { label: 'Experimentos', value: taxonomy.find(s => s.slug === 'laboratorio')?.topics[0]?.concepts.length ?? 0, emoji: '🔬' },
          ].map(stat => (
            <Card key={stat.label} className="text-center py-5">
              <p className="text-2xl mb-1">{stat.emoji}</p>
              <p className="font-display text-3xl font-semibold text-rose-500">{stat.value}</p>
              <p className="text-xs text-ink-muted mt-1">{stat.label}</p>
            </Card>
          ))}
        </div>
      )}

      {/* Matérias */}
      <h2 className="font-display text-xl font-semibold text-ink mb-4">Matérias</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {taxonomy.filter(s => s.slug !== 'laboratorio').map(subject => (
          <Link key={subject.slug} href={`/materias/${subject.slug}`}>
            <Card className="p-5 hover:shadow-medium hover:scale-[1.02] cursor-pointer transition-all">
              <p className="text-3xl mb-2">{subject.emoji}</p>
              <CardTitle className="text-base">{subject.title}</CardTitle>
              <p className="text-xs text-ink-muted mt-1">
                {subject.topics.reduce((acc, t) => acc + t.concepts.length, 0)} conceitos
              </p>
            </Card>
          </Link>
        ))}
      </div>

      {total === 0 && (
        <div className="mt-8 p-6 bg-rose-50 border border-rose-200 rounded-soft text-center">
          <p className="text-rose-600 font-medium mb-1">Conteúdo ainda não gerado</p>
          <p className="text-sm text-ink-muted">
            Execute <code className="bg-rose-100 px-1.5 py-0.5 rounded text-rose-700">npm run gen</code> para gerar os conceitos via Claude API.
          </p>
        </div>
      )}
    </div>
  )
}
