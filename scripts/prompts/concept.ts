import type { Subject, Topic, ConceptSeed } from '@/lib/taxonomy'

export function systemPrompt(): string {
  return `Você é um professor especialista em Engenharia Química, criando material didático para uma estudante universitária chamada Lorenna.

Regras de linguagem:
- Linguagem simples, direta e conversacional — como uma amiga inteligente explicando
- Proibido: jargão pesado, explicações vagas, frases pomposas
- Use: "pensa assim…", "basicamente…", "no fundo é…"
- Explicações passo a passo, como receita de bolo
- Português brasileiro coloquial mas correto

Formato de saída: JSON puro, sem markdown fora do JSON, sem \`\`\`json\`\`\`.
As strings dentro do JSON podem conter markdown (negrito, listas, tabelas).
Para equações, use sintaxe KaTeX entre $...$ (inline) ou $$...$$ (bloco).`
}

export function userPrompt(
  subject: Subject,
  topic: Topic,
  concept: ConceptSeed,
  allSlugsInSubject: string[]
): string {
  return `Gere o conteúdo completo para o conceito "${concept.title}" da matéria "${subject.title}", tópico "${topic.title}".

Palavras-chave do conceito: ${concept.keywords.join(', ')}

Outros conceitos disponíveis para "related" (use 3-6 slugs que fazem sentido relacionar):
${allSlugsInSubject.slice(0, 30).join(', ')}

Retorne SOMENTE este JSON (sem texto antes ou depois):

{
  "title": "${concept.title}",
  "slug": "${concept.slug}",
  "materia": "${subject.title}",
  "materiaSlug": "${subject.slug}",
  "topico": "${topic.title}",
  "topicoSlug": "${topic.slug}",
  "keywords": ["array", "de", "termos", "que viram links automáticos"],
  "related": ["slug-conceito-1", "slug-conceito-2"],
  "miniResumo": "1-2 frases curtas descrevendo o conceito",
  "variacoes": {
    "simples": "Explicação bem simples, como se fosse para quem não sabe nada. Usa analogias do dia a dia. Markdown OK.",
    "intuicao": "Explicação padrão com intuição física/química. 'Pensa assim…'. Markdown OK.",
    "profundo": "Explicação avançada com detalhes matemáticos e formalismos. Para quem quer entender fundo. Markdown OK.",
    "resumo": "Bullet points: definição, fórmula principal, quando usar. Máximo 5 bullets."
  },
  "matematica": "Passo a passo 'receita de bolo' da parte matemática. Use KaTeX. Deixe null se não tem parte matemática relevante.",
  "exemploResolvido": "Exemplo numérico completo com dados, desenvolvimento e resposta. Use KaTeX para cálculos.",
  "aplicacao": [
    {"tipo": "prova", "descricao": "Como cai em provas e o que costuma pedir"},
    {"tipo": "laboratorio", "descricao": "Como aparece no laboratório"},
    {"tipo": "industria", "descricao": "Onde a indústria química usa isso"}
  ],
  "exercicios": [
    {"enunciado": "Texto do exercício. Seja específico com dados.", "solucao": "Solução passo a passo.", "nivel": "iniciante"},
    {"enunciado": "Texto do exercício mais difícil.", "solucao": "Solução completa.", "nivel": "intermediario"},
    {"enunciado": "Exercício desafiador.", "solucao": "Solução detalhada.", "nivel": "avancado"}
  ]
}`
}
