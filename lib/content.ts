import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import type { ConceptFrontmatter, ConceptIndex, GraphData } from './types'

const CONTENT_DIR = path.join(process.cwd(), 'content', 'conceitos')
const INDEX_FILE  = path.join(process.cwd(), 'content', 'index.json')

export function loadConcept(slug: string): { data: ConceptFrontmatter; content: string } | null {
  const filePath = path.join(CONTENT_DIR, `${slug}.mdx`)
  if (!fs.existsSync(filePath)) return null
  const raw = fs.readFileSync(filePath, 'utf-8')
  const { data, content } = matter(raw)
  return { data: data as ConceptFrontmatter, content }
}

export function loadIndex(): ConceptIndex[] {
  if (!fs.existsSync(INDEX_FILE)) return []
  return JSON.parse(fs.readFileSync(INDEX_FILE, 'utf-8')) as ConceptIndex[]
}

export function getRelated(slug: string, count = 5): ConceptIndex[] {
  const index = loadIndex()
  const concept = index.find(c => c.slug === slug)
  if (!concept) return []
  return concept.related
    .map(r => index.find(c => c.slug === r))
    .filter(Boolean)
    .slice(0, count) as ConceptIndex[]
}

export function getAllSlugs(): string[] {
  if (!fs.existsSync(CONTENT_DIR)) return []
  return fs
    .readdirSync(CONTENT_DIR)
    .filter(f => f.endsWith('.mdx'))
    .map(f => f.replace('.mdx', ''))
}

export function buildGraphData(index: ConceptIndex[]): GraphData {
  const slugSet = new Set(index.map(c => c.slug))
  const nodes = index.map(c => ({
    id:          c.slug,
    label:       c.title,
    materia:     c.materia,
    materiaSlug: c.materiaSlug,
    val:         1 + c.related.filter(r => slugSet.has(r)).length,
  }))
  const linkSet = new Set<string>()
  const links: { source: string; target: string }[] = []
  for (const c of index) {
    for (const r of c.related) {
      if (!slugSet.has(r)) continue
      const key = [c.slug, r].sort().join('--')
      if (linkSet.has(key)) continue
      linkSet.add(key)
      links.push({ source: c.slug, target: r })
    }
  }
  return { nodes, links }
}
