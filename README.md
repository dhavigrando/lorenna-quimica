# Lorenna — Engenharia Química 🌸

Sistema de estudo pessoal para Engenharia Química: conceitos interligados, exercícios resolvidos, laboratório e mapa visual de conhecimento.

## Rodar localmente

```bash
npm install
npm run dev
# Abrir http://localhost:3000
```

## Gerar conteúdo com IA

1. Copiar o arquivo de exemplo:
   ```bash
   cp .env.local.example .env.local
   ```

2. Editar `.env.local` e colocar sua chave da Anthropic:
   ```
   ANTHROPIC_API_KEY=sk-ant-api03-...
   ```

3. Gerar conceitos:
   ```bash
   # Todas as matérias (pode demorar e custa créditos)
   npm run gen

   # Só uma matéria
   npm run gen -- --materia "Química Geral"

   # Só um conceito específico
   npm run gen -- --only difusao

   # Depois de gerar, reconstruir o índice
   npm run build:index
   ```

## Build e deploy

```bash
# Build estático
npm run build

# Testar o export localmente
npx serve out
```

O site faz deploy automático no GitHub Pages a cada push na branch `main` (via `.github/workflows/deploy.yml`).

## Estrutura de conteúdo

```
content/
├── conceitos/        # Um arquivo .mdx por conceito
├── experimentos/     # Experimentos de laboratório
└── index.json        # Gerado automaticamente por npm run build:index
```

## Adicionar conceito manualmente

Criar `content/conceitos/meu-conceito.mdx` seguindo a estrutura dos existentes (ex: `difusao.mdx`), depois rodar `npm run build:index`.
