import { notFound } from 'next/navigation'
import { loadConcept, getAllSlugs, getRelated } from '@/lib/content'
import { ConceptPage } from '@/components/concept/ConceptPage'
import type { Metadata } from 'next'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return getAllSlugs().map(slug => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const concept = loadConcept(slug)
  if (!concept) return { title: 'Conceito não encontrado' }
  return {
    title: `${concept.data.title} — Lorenna Eng. Química`,
    description: concept.data.miniResumo,
  }
}

export default async function ConceptoPage({ params }: Props) {
  const { slug } = await params
  const concept = loadConcept(slug)
  if (!concept) notFound()

  const related = getRelated(slug)

  return <ConceptPage data={concept.data} related={related} />
}
