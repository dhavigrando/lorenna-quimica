export interface ConceptVariations {
  simples: string
  intuicao: string
  profundo: string
  resumo: string
}

export interface ConceptExercise {
  enunciado: string
  solucao: string
  nivel: 'iniciante' | 'intermediario' | 'avancado'
}

export interface ConceptAplicacao {
  tipo: 'prova' | 'laboratorio' | 'industria'
  descricao: string
}

export interface ConceptFrontmatter {
  title: string
  slug: string
  materia: string
  materiaSlug: string
  topico: string
  topicoSlug: string
  keywords: string[]
  related: string[]
  miniResumo: string
  variacoes: ConceptVariations
  matematica?: string
  exemploResolvido?: string
  aplicacao: ConceptAplicacao[]
  exercicios: ConceptExercise[]
}

export interface ConceptIndex {
  slug: string
  title: string
  materia: string
  materiaSlug: string
  topico: string
  topicoSlug: string
  keywords: string[]
  related: string[]
  miniResumo: string
}

export interface GraphNode {
  id: string
  label: string
  materia: string
  materiaSlug: string
  val?: number
}

export interface GraphLink {
  source: string
  target: string
}

export interface GraphData {
  nodes: GraphNode[]
  links: GraphLink[]
}
