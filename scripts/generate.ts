import Anthropic from '@anthropic-ai/sdk'
import fs from 'fs'
import path from 'path'
import { taxonomy } from '../lib/taxonomy'
import { conceptSchema } from './schema'
import { systemPrompt, userPrompt } from './prompts/concept'

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

const CONTENT_DIR = path.join(process.cwd(), 'content', 'conceitos')

const args        = process.argv.slice(2)
const onlySlug    = getArg('--only')
const onlyMateria = getArg('--materia')

function getArg(flag: string): string | null {
  const idx = args.indexOf(flag)
  return idx !== -1 ? args[idx + 1] : null
}

function conceptPath(slug: string) {
  return path.join(CONTENT_DIR, `${slug}.mdx`)
}

function toMdx(data: ReturnType<typeof conceptSchema.parse>): string {
  const fm = {
    title:            data.title,
    slug:             data.slug,
    materia:          data.materia,
    materiaSlug:      data.materiaSlug,
    topico:           data.topico,
    topicoSlug:       data.topicoSlug,
    keywords:         data.keywords,
    related:          data.related,
    miniResumo:       data.miniResumo,
    variacoes:        data.variacoes,
    matematica:       data.matematica ?? null,
    exemploResolvido: data.exemploResolvido ?? null,
    aplicacao:        data.aplicacao,
    exercicios:       data.exercicios,
  }
  return `---\n${JSON.stringify(fm, null, 2)}\n---\n`
}

async function generateConcept(
  subject: typeof taxonomy[0],
  topic: typeof taxonomy[0]['topics'][0],
  concept: typeof taxonomy[0]['topics'][0]['concepts'][0],
  allSlugsInSubject: string[]
): Promise<void> {
  const filePath = conceptPath(concept.slug)
  if (fs.existsSync(filePath) && !onlySlug) {
    console.log(`  ⏭  Já existe: ${concept.slug}`)
    return
  }

  console.log(`  🌸 Gerando: ${concept.title}…`)

  const sys = systemPrompt()
  const usr = userPrompt(subject, topic, concept, allSlugsInSubject)

  let attempts = 0
  while (attempts < 3) {
    attempts++
    try {
      const msg = await client.messages.create({
        model: 'claude-opus-4-7',
        max_tokens: 4096,
        system: [
          {
            type: 'text',
            text: sys,
            cache_control: { type: 'ephemeral' },
          },
        ],
        messages: [{ role: 'user', content: usr }],
      })

      const raw = (msg.content[0] as { text: string }).text.trim()
      const json = JSON.parse(raw)
      const validated = conceptSchema.parse(json)
      fs.writeFileSync(filePath, toMdx(validated), 'utf-8')
      console.log(`  ✅ Salvo: ${concept.slug}`)
      return
    } catch (err) {
      console.warn(`  ⚠️  Tentativa ${attempts} falhou para ${concept.slug}:`, (err as Error).message.slice(0, 120))
      if (attempts === 3) console.error(`  ❌ Falhou após 3 tentativas: ${concept.slug}`)
      await new Promise(r => setTimeout(r, 1500 * attempts))
    }
  }
}

async function main() {
  fs.mkdirSync(CONTENT_DIR, { recursive: true })

  for (const subject of taxonomy) {
    if (onlyMateria && subject.title !== onlyMateria && subject.slug !== onlyMateria) continue

    const allSlugs = subject.topics.flatMap(t => t.concepts.map(c => c.slug))
    console.log(`\n📚 ${subject.title}`)

    for (const topic of subject.topics) {
      for (const concept of topic.concepts) {
        if (onlySlug && concept.slug !== onlySlug) continue
        await generateConcept(subject, topic, concept, allSlugs)
        await new Promise(r => setTimeout(r, 400))
      }
    }
  }

  console.log('\n🌸 Geração concluída! Rode npm run build:index')
}

main().catch(console.error)
