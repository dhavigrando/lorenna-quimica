import Link from 'next/link'
import { Card, CardTitle } from '@/components/ui/card'
import { taxonomy } from '@/lib/taxonomy'

export default function MateriasPage() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-10">
      <h1 className="font-display text-3xl font-semibold text-ink mb-2">Matérias</h1>
      <p className="text-ink-muted mb-8">Escolha uma matéria para explorar os tópicos e conceitos.</p>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {taxonomy.map(subject => (
          <Link key={subject.slug} href={`/materias/${subject.slug}`}>
            <Card className="p-5 hover:shadow-medium hover:scale-[1.02] cursor-pointer transition-all">
              <p className="text-3xl mb-2">{subject.emoji}</p>
              <CardTitle className="text-base">{subject.title}</CardTitle>
              <p className="text-xs text-ink-muted mt-1">
                {subject.topics.length} tópicos ·{' '}
                {subject.topics.reduce((acc, t) => acc + t.concepts.length, 0)} conceitos
              </p>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}
