import { z } from 'zod'

export const aplicacaoSchema = z.object({
  tipo:      z.enum(['prova', 'laboratorio', 'industria']),
  descricao: z.string(),
})

export const exercicioSchema = z.object({
  enunciado: z.string(),
  solucao:   z.string(),
  nivel:     z.enum(['iniciante', 'intermediario', 'avancado']),
})

export const conceptSchema = z.object({
  title:           z.string(),
  slug:            z.string(),
  materia:         z.string(),
  materiaSlug:     z.string(),
  topico:          z.string(),
  topicoSlug:      z.string(),
  keywords:        z.array(z.string()),
  related:         z.array(z.string()),
  miniResumo:      z.string().max(200),
  variacoes: z.object({
    simples:  z.string(),
    intuicao: z.string(),
    profundo: z.string(),
    resumo:   z.string(),
  }),
  matematica:      z.string().optional(),
  exemploResolvido:z.string().optional(),
  aplicacao:       z.array(aplicacaoSchema),
  exercicios:      z.array(exercicioSchema).min(2).max(4),
})

export type ConceptSchema = z.infer<typeof conceptSchema>
