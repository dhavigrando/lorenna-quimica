import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import type { ConceptIndex } from '../lib/types'

const CONTENT_DIR = path.join(process.cwd(), 'content', 'conceitos')
const INDEX_FILE  = path.join(process.cwd(), 'content', 'index.json')
const PUBLIC_FILE = path.join(process.cwd(), 'public', 'content', 'index.json')

fs.mkdirSync(CONTENT_DIR, { recursive: true })
fs.mkdirSync(path.join(process.cwd(), 'public', 'content'), { recursive: true })

const files = fs.existsSync(CONTENT_DIR)
  ? fs.readdirSync(CONTENT_DIR).filter(f => f.endsWith('.mdx'))
  : []

const index: ConceptIndex[] = []

for (const file of files) {
  const raw   = fs.readFileSync(path.join(CONTENT_DIR, file), 'utf-8')
  const { data } = matter(raw)
  index.push({
    slug:        data.slug,
    title:       data.title,
    materia:     data.materia,
    materiaSlug: data.materiaSlug,
    topico:      data.topico,
    topicoSlug:  data.topicoSlug,
    keywords:    data.keywords ?? [],
    related:     data.related ?? [],
    miniResumo:  data.miniResumo ?? '',
  })
}

const json = JSON.stringify(index, null, 2)
fs.writeFileSync(INDEX_FILE, json, 'utf-8')
fs.writeFileSync(PUBLIC_FILE, json, 'utf-8')

console.log(`✅ index.json gerado com ${index.length} conceitos`)
