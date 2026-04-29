import { notFound } from 'next/navigation'
import Link from 'next/link'
import { taxonomy } from '@/lib/taxonomy'
import { Card, CardTitle } from '@/components/ui/card'
import type { Metadata } from 'next'

interface Props { params: Promise<{ materia: string }> }

export function generateStaticParams() {
  return taxonomy.map(s => ({ materia: s.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { materia } = await params
  const subject = taxonomy.find(s => s.slug === materia)
  return { title: subject ? `${subject.title} — Lorenna` : 'Matéria' }
}

export default async function MateriaPage({ params }: Props) {
  const { materia } = await params
  const subject = taxonomy.find(s => s.slug === materia)
  if (!subject) notFound()

  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      <div className="flex items-center gap-3 mb-2">
        <span className="text-4xl">{subject.emoji}</span>
        <div>
          <p className="text-xs text-ink-muted uppercase tracking-widest">Matéria</p>
          <h1 className="font-display text-3xl font-semibold text-ink">{subject.title}</h1>
        </div>
      </div>
      <p className="text-ink-muted mb-8">
        {subject.topics.length} tópicos · {subject.topics.reduce((a, t) => a + t.concepts.length, 0)} conceitos
      </p>

      <div className="space-y-6">
        {subject.topics.map(topic => (
          <div key={topic.slug}>
            <h2 className="font-display text-lg font-semibold text-ink mb-3">{topic.title}</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {topic.concepts.map(concept => (
                <Link key={concept.slug} href={`/conceito/${concept.slug}`}>
                  <Card className="p-4 hover:shadow-medium hover:scale-[1.02] cursor-pointer transition-all">
                    <CardTitle className="text-sm leading-snug">{concept.title}</CardTitle>
                    <p className="text-xs text-ink-muted mt-1 line-clamp-1">{concept.keywords.slice(0, 2).join(', ')}</p>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
