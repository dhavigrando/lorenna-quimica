# CLAUDE.md — Lorenna Engenharia Química

Site educacional pessoal para estudar Engenharia Química. Funciona como um "Obsidian automático": conceitos interligados, exercícios, laboratório e mapa visual de grafo.

## Stack

- **Next.js 15** (App Router, `output: 'export'` — exportação 100% estática)
- **TypeScript** + **Tailwind CSS 4** (paleta rosa customizada)
- **Framer Motion** — animações e transições
- **react-force-graph-2d** — mapa de grafo (carregado via `next/dynamic` com `ssr: false`)
- **Fuse.js** — busca fuzzy informal ("negócio da difusão" → match)
- **KaTeX** — equações químicas/matemáticas (via `rehype-katex` + `remark-math`)
- **next-mdx-remote** — renderização de MDX em rotas dinâmicas
- **gray-matter** — leitura de frontmatter dos arquivos MDX
- **@anthropic-ai/sdk** — geração de conteúdo via Claude API (só nos scripts, nunca em runtime)
- **Zod** — validação do JSON retornado pela Claude API

## Hospedagem

GitHub Pages via GitHub Actions (`.github/workflows/deploy.yml`).
Repositório: `https://github.com/dhavigrando/lorenna-quimica`
URL pública: `https://dhavigrando.github.io/lorenna-quimica/`

O `basePath` é `/lorenna-quimica` apenas em produção (`NODE_ENV === 'production'`).
Em desenvolvimento (`npm run dev`) o site roda em `http://localhost:3000` sem basePath.

## Estrutura de pastas

```
app/                          # Rotas Next.js (App Router)
  page.tsx                    # Home
  layout.tsx                  # Layout global (Sidebar + TopBar)
  conceito/[slug]/page.tsx    # Página dinâmica de conceito
  materias/page.tsx           # Lista de matérias
  materias/[materia]/page.tsx # Tópicos de uma matéria
  mapa/page.tsx               # Mapa de grafo (server) + MapClient.tsx (client)
  laboratorio/page.tsx        # Hub de experimentos
  laboratorio/[experimento]/page.tsx

components/
  concept/                    # ConceptPage, DepthToggle, ExerciseCard, Connections
  graph/                      # ConceptGraph (react-force-graph-2d)
  layout/                     # Sidebar, TopBar
  ui/                         # Button, Card (primitivos com Tailwind)

content/
  conceitos/*.mdx             # Um arquivo MDX por conceito (frontmatter JSON)
  experimentos/*.mdx          # Experimentos de laboratório
  index.json                  # Índice gerado por `npm run build:index`

lib/
  taxonomy.ts                 # FONTE DA VERDADE: lista de matérias → tópicos → conceitos
  content.ts                  # loadConcept(), getAllSlugs(), loadIndex(), buildGraphData()
  search.ts                   # Fuse.js com sinônimos e normalização de acentos
  types.ts                    # Interfaces TypeScript (ConceptFrontmatter, ConceptIndex, etc.)
  utils.ts                    # cn() (clsx + tailwind-merge)
  slug.ts                     # slugify() para português com acentos

scripts/
  generate.ts                 # Geração de conceitos via Claude API (claude-opus-4-7)
  buildIndex.ts               # Lê todos os MDX e gera content/index.json
  schema.ts                   # Zod schema do frontmatter de conceito
  prompts/concept.ts          # System prompt + user prompt para geração

public/
  content/index.json          # Cópia do index.json para busca client-side (fetch via TopBar)
```

## Modelo de dados (frontmatter MDX)

Cada `content/conceitos/<slug>.mdx` tem frontmatter em JSON (não YAML) com esta estrutura:

```json
{
  "title": "Nome do Conceito",
  "slug": "nome-do-conceito",
  "materia": "Nome da Matéria",
  "materiaSlug": "slug-da-materia",
  "topico": "Nome do Tópico",
  "topicoSlug": "slug-do-topico",
  "keywords": ["termos", "que viram links automáticos"],
  "related": ["slug-conceito-1", "slug-conceito-2"],
  "miniResumo": "1-2 frases curtas",
  "variacoes": {
    "simples": "markdown — versão bem simples",
    "intuicao": "markdown — explicação padrão com intuição",
    "profundo": "markdown — nível avançado",
    "resumo": "markdown — bullet points"
  },
  "matematica": "markdown com KaTeX — passo a passo",
  "exemploResolvido": "markdown com KaTeX — exemplo numérico",
  "aplicacao": [
    { "tipo": "prova", "descricao": "..." },
    { "tipo": "laboratorio", "descricao": "..." },
    { "tipo": "industria", "descricao": "..." }
  ],
  "exercicios": [
    { "enunciado": "...", "solucao": "...", "nivel": "iniciante" }
  ]
}
```

## Design

Tema feminino/soft com paleta rosa definida em `tailwind.config.ts`:
- Fundo: `#FFFBF7` (`cream`)
- Cor principal: `#F26D90` (`rose-500`)
- Texto: `#3D2A33` (`ink`), `#7B5C68` (`ink-muted`)
- Cards: `bg-white/80 backdrop-blur`, `rounded-soft` (1.25rem), `shadow-soft`
- Fontes: **Fraunces** (headings serif elegante) + **Inter** (body)
- Animações: Framer Motion em transições de conteúdo e hover

## Comandos principais

```bash
npm run dev           # Dev local em localhost:3000
npm run build         # Build estático para ./out
npm run build:index   # Reconstrói content/index.json a partir dos MDX

# Geração de conteúdo (requer .env.local com ANTHROPIC_API_KEY)
npm run gen                                  # Gera todos os conceitos faltantes
npm run gen -- --materia "Química Geral"     # Só uma matéria
npm run gen -- --only difusao                # Só um conceito específico
```

## Fluxo para adicionar conteúdo

1. Adicionar o conceito em `lib/taxonomy.ts` (se ainda não estiver lá)
2. Rodar `npm run gen -- --only <slug>` (com API key) **ou** criar o MDX manualmente
3. Rodar `npm run build:index`
4. `git add . && git commit -m "..." && git push` → deploy automático

## Variáveis de ambiente

`.env.local` (nunca commitado, não está no GitHub):
```
ANTHROPIC_API_KEY=sk-ant-api03-...
```

## Conceitos de demo (já gerados manualmente)

- `content/conceitos/difusao.mdx` — Difusão Molecular
- `content/conceitos/lei-de-fick.mdx` — Lei de Fick
- `content/conceitos/concentracao-molar.mdx` — Concentração Molar

## Observações importantes

- `react-force-graph-2d` DEVE ser carregado com `next/dynamic + ssr: false` (usa browser APIs)
- O frontmatter dos MDX é JSON (não YAML) — gray-matter trata os dois, mas todos os arquivos usam JSON
- `public/content/index.json` e `content/index.json` são sempre iguais — o script `buildIndex.ts` grava nos dois. O arquivo em `public/` é para o fetch client-side da busca no TopBar
- Com `output: 'export'`, todas as rotas dinâmicas precisam de `generateStaticParams()` retornando ao menos um item
- O `.claude/settings.local.json` está no `.gitignore` — não commitar
