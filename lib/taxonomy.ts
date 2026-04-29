export interface ConceptSeed {
  slug: string
  title: string
  keywords: string[]
}

export interface Topic {
  slug: string
  title: string
  concepts: ConceptSeed[]
}

export interface Subject {
  slug: string
  title: string
  emoji: string
  color: string
  topics: Topic[]
}

export const taxonomy: Subject[] = [
  {
    slug: 'quimica-geral',
    title: 'Química Geral',
    emoji: '⚗️',
    color: 'rose',
    topics: [
      {
        slug: 'estrutura-atomica',
        title: 'Estrutura Atômica',
        concepts: [
          { slug: 'modelo-atomico', title: 'Modelo Atômico', keywords: ['átomo', 'modelo atômico', 'elétron', 'próton', 'nêutron'] },
          { slug: 'numeros-quanticos', title: 'Números Quânticos', keywords: ['números quânticos', 'orbital', 'spin', 'quantum'] },
          { slug: 'configuracao-eletronica', title: 'Configuração Eletrônica', keywords: ['configuração eletrônica', 'camada', 'subcamada', 'aufbau'] },
          { slug: 'tabela-periodica', title: 'Tabela Periódica', keywords: ['tabela periódica', 'período', 'grupo', 'elemento'] },
          { slug: 'propriedades-periodicas', title: 'Propriedades Periódicas', keywords: ['eletronegatividade', 'raio atômico', 'energia de ionização', 'afinidade eletrônica'] },
        ],
      },
      {
        slug: 'ligacoes-quimicas',
        title: 'Ligações Químicas',
        concepts: [
          { slug: 'ligacao-ionica', title: 'Ligação Iônica', keywords: ['ligação iônica', 'íon', 'cátion', 'ânion', 'sal'] },
          { slug: 'ligacao-covalente', title: 'Ligação Covalente', keywords: ['ligação covalente', 'elétrons compartilhados', 'molécula', 'par eletrônico'] },
          { slug: 'geometria-molecular', title: 'Geometria Molecular', keywords: ['geometria molecular', 'VSEPR', 'ângulo de ligação', 'forma molecular'] },
          { slug: 'polaridade', title: 'Polaridade e Momento Dipolo', keywords: ['polaridade', 'dipolo', 'molécula polar', 'molécula apolar'] },
          { slug: 'forcas-intermoleculares', title: 'Forças Intermoleculares', keywords: ['forças intermoleculares', 'van der Waals', 'ligação de hidrogênio', 'dipolo-dipolo'] },
        ],
      },
      {
        slug: 'estequiometria',
        title: 'Estequiometria',
        concepts: [
          { slug: 'mol-e-massa-molar', title: 'Mol e Massa Molar', keywords: ['mol', 'massa molar', 'número de Avogadro', 'quantidade de matéria'] },
          { slug: 'balanceamento', title: 'Balanceamento de Equações', keywords: ['balanceamento', 'equação química', 'coeficiente', 'conservação de massa'] },
          { slug: 'reagente-limitante', title: 'Reagente Limitante', keywords: ['reagente limitante', 'reagente em excesso', 'rendimento', 'conversão'] },
          { slug: 'concentracao-molar', title: 'Concentração Molar', keywords: ['concentração molar', 'molaridade', 'solução', 'mol por litro', 'mol/L'] },
          { slug: 'solucoes', title: 'Soluções e Solubilidade', keywords: ['solução', 'solubilidade', 'soluto', 'solvente', 'dissolução'] },
        ],
      },
      {
        slug: 'termodinamica-basica',
        title: 'Termodinâmica Básica',
        concepts: [
          { slug: 'entalpia', title: 'Entalpia e Calor de Reação', keywords: ['entalpia', 'calor de reação', 'exotérmica', 'endotérmica', 'ΔH'] },
          { slug: 'lei-hess', title: 'Lei de Hess', keywords: ['lei de Hess', 'ciclo de Hess', 'entalpia de formação'] },
          { slug: 'energia-de-gibbs', title: 'Energia de Gibbs', keywords: ['energia de Gibbs', 'ΔG', 'espontaneidade', 'entropia', 'entalpia'] },
          { slug: 'entropia', title: 'Entropia', keywords: ['entropia', 'ΔS', 'desordem', 'segunda lei'] },
        ],
      },
      {
        slug: 'equilibrio-quimico',
        title: 'Equilíbrio Químico',
        concepts: [
          { slug: 'constante-equilibrio', title: 'Constante de Equilíbrio (Kc e Kp)', keywords: ['constante de equilíbrio', 'Kc', 'Kp', 'equilíbrio químico'] },
          { slug: 'principio-le-chatelier', title: 'Princípio de Le Chatelier', keywords: ['Le Chatelier', 'deslocamento de equilíbrio', 'perturbação'] },
          { slug: 'equilibrio-acido-base', title: 'Equilíbrio Ácido-Base', keywords: ['ácido', 'base', 'pH', 'Ka', 'Kb', 'pOH'] },
          { slug: 'solubilidade-kps', title: 'Produto de Solubilidade (Kps)', keywords: ['Kps', 'produto de solubilidade', 'precipitação', 'solubilidade'] },
        ],
      },
    ],
  },
  {
    slug: 'fisico-quimica',
    title: 'Físico-Química',
    emoji: '🔬',
    color: 'pink',
    topics: [
      {
        slug: 'gases',
        title: 'Teoria dos Gases',
        concepts: [
          { slug: 'lei-dos-gases-ideais', title: 'Lei dos Gases Ideais', keywords: ['gás ideal', 'PV=nRT', 'lei dos gases', 'pressão', 'volume', 'temperatura'] },
          { slug: 'teoria-cinetica', title: 'Teoria Cinética dos Gases', keywords: ['teoria cinética', 'velocidade molecular', 'energia cinética', 'distribuição de Maxwell'] },
          { slug: 'gas-real', title: 'Gases Reais – Van der Waals', keywords: ['gás real', 'van der Waals', 'fator de compressibilidade', 'desvio do ideal'] },
        ],
      },
      {
        slug: 'cinetica-quimica',
        title: 'Cinética Química',
        concepts: [
          { slug: 'velocidade-reacao', title: 'Velocidade de Reação', keywords: ['velocidade de reação', 'taxa de reação', 'lei de velocidade'] },
          { slug: 'ordem-reacao', title: 'Ordem de Reação', keywords: ['ordem de reação', 'ordem zero', 'primeira ordem', 'segunda ordem'] },
          { slug: 'energia-ativacao', title: 'Energia de Ativação e Arrhenius', keywords: ['energia de ativação', 'Arrhenius', 'complexo ativado', 'constante de velocidade'] },
          { slug: 'catalise', title: 'Catálise', keywords: ['catalisador', 'catálise', 'catálise homogênea', 'catálise heterogênea', 'enzima'] },
        ],
      },
      {
        slug: 'eletroquimica',
        title: 'Eletroquímica',
        concepts: [
          { slug: 'oxirreducao', title: 'Oxidação-Redução (Redox)', keywords: ['oxirredução', 'redox', 'oxidação', 'redução', 'número de oxidação'] },
          { slug: 'celulas-galvanicas', title: 'Células Galvânicas', keywords: ['célula galvânica', 'célula eletroquímica', 'potencial de eletrodo', 'fem', 'força eletromotriz'] },
          { slug: 'equacao-nernst', title: 'Equação de Nernst', keywords: ['equação de Nernst', 'potencial de célula', 'equilíbrio eletroquímico'] },
          { slug: 'eletrolise', title: 'Eletrólise e Leis de Faraday', keywords: ['eletrólise', 'leis de Faraday', 'eletrodo', 'carga elétrica', 'cátodo', 'ânodo'] },
        ],
      },
    ],
  },
  {
    slug: 'quimica-organica',
    title: 'Química Orgânica',
    emoji: '🌸',
    color: 'fuchsia',
    topics: [
      {
        slug: 'fundamentos-organica',
        title: 'Fundamentos',
        concepts: [
          { slug: 'hibridizacao', title: 'Hibridização do Carbono', keywords: ['hibridização', 'sp3', 'sp2', 'sp', 'carbono', 'orbital híbrido'] },
          { slug: 'grupos-funcionais', title: 'Grupos Funcionais', keywords: ['grupo funcional', 'álcool', 'aldeído', 'cetona', 'ácido carboxílico', 'éster', 'amina', 'amida'] },
          { slug: 'nomenclatura-organica', title: 'Nomenclatura Orgânica (IUPAC)', keywords: ['nomenclatura IUPAC', 'nome orgânico', 'prefixo', 'sufixo', 'cadeia carbônica'] },
          { slug: 'isomeria', title: 'Isomeria', keywords: ['isômero', 'isomeria plana', 'isomeria espacial', 'estereoisomeria', 'enantiômero'] },
        ],
      },
      {
        slug: 'reacoes-organicas',
        title: 'Reações Orgânicas',
        concepts: [
          { slug: 'substituicao-nucleofilica', title: 'Substituição Nucleofílica (SN1 e SN2)', keywords: ['SN1', 'SN2', 'substituição nucleofílica', 'nucleófilo', 'grupo de saída'] },
          { slug: 'eliminacao', title: 'Reações de Eliminação (E1 e E2)', keywords: ['eliminação', 'E1', 'E2', 'desidratação', 'dupla ligação'] },
          { slug: 'adicao-alcenos', title: 'Adição em Alcenos', keywords: ['adição', 'alceno', 'Markovnikov', 'halogenação', 'hidratação'] },
          { slug: 'reacoes-aromaticas', title: 'Substituição Eletrofílica Aromática', keywords: ['benzeno', 'aromaticidade', 'substituição eletrofílica', 'nitração', 'sulfonação'] },
        ],
      },
    ],
  },
  {
    slug: 'fenomenos-transporte',
    title: 'Fenômenos de Transporte',
    emoji: '🌊',
    color: 'sky',
    topics: [
      {
        slug: 'transferencia-massa',
        title: 'Transferência de Massa',
        concepts: [
          { slug: 'difusao', title: 'Difusão Molecular', keywords: ['difusão', 'difusão molecular', 'lei de Fick', 'coeficiente de difusão', 'gradiente de concentração'] },
          { slug: 'lei-de-fick', title: 'Lei de Fick (1ª e 2ª)', keywords: ['lei de Fick', 'primeira lei de Fick', 'segunda lei de Fick', 'fluxo difusivo'] },
          { slug: 'conveccao-mássica', title: 'Transferência de Massa por Convecção', keywords: ['convecção mássica', 'coeficiente convectivo de massa', 'camada limite', 'número de Sherwood'] },
          { slug: 'numero-de-schmidt', title: 'Número de Schmidt', keywords: ['número de Schmidt', 'Sc', 'viscosidade cinemática', 'difusividade'] },
        ],
      },
      {
        slug: 'transferencia-calor',
        title: 'Transferência de Calor',
        concepts: [
          { slug: 'conducao', title: 'Condução de Calor', keywords: ['condução', 'condução de calor', 'lei de Fourier', 'condutividade térmica'] },
          { slug: 'conveccao-térmica', title: 'Convecção Térmica', keywords: ['convecção térmica', 'coeficiente de transferência de calor', 'número de Nusselt', 'número de Prandtl'] },
          { slug: 'radiacao', title: 'Radiação Térmica', keywords: ['radiação', 'emissividade', 'corpo negro', 'lei de Stefan-Boltzmann', 'absorção'] },
        ],
      },
      {
        slug: 'mecanica-fluidos',
        title: 'Mecânica dos Fluidos',
        concepts: [
          { slug: 'viscosidade', title: 'Viscosidade e Lei de Newton', keywords: ['viscosidade', 'lei de Newton dos fluidos', 'fluido newtoniano', 'tensão de cisalhamento'] },
          { slug: 'regime-escoamento', title: 'Regime de Escoamento e Número de Reynolds', keywords: ['número de Reynolds', 'escoamento laminar', 'escoamento turbulento', 'Re'] },
          { slug: 'equacao-bernoulli', title: 'Equação de Bernoulli', keywords: ['Bernoulli', 'equação de Bernoulli', 'pressão dinâmica', 'altura piezométrica'] },
        ],
      },
    ],
  },
  {
    slug: 'balanco-massa-energia',
    title: 'Balanço de Massa e Energia',
    emoji: '⚖️',
    color: 'amber',
    topics: [
      {
        slug: 'balanco-massa',
        title: 'Balanço de Massa',
        concepts: [
          { slug: 'sistema-controle', title: 'Sistema e Volume de Controle', keywords: ['sistema', 'volume de controle', 'fronteira', 'estado estacionário'] },
          { slug: 'grau-liberdade', title: 'Grau de Liberdade', keywords: ['grau de liberdade', 'especificação', 'variáveis', 'equações independentes'] },
          { slug: 'reciclo-purga', title: 'Reciclo e Purga', keywords: ['reciclo', 'purga', 'corrente de reciclo', 'corrente de purga', 'conversão global'] },
          { slug: 'balanco-com-reacao', title: 'Balanço com Reação Química', keywords: ['balanço com reação', 'grau de conversão', 'seletividade', 'rendimento global'] },
        ],
      },
      {
        slug: 'balanco-energia',
        title: 'Balanço de Energia',
        concepts: [
          { slug: 'entalpia-mistura', title: 'Entalpia de Mistura e de Reação', keywords: ['entalpia de mistura', 'entalpia de reação', 'calor de reação padrão'] },
          { slug: 'capacidade-calorífica', title: 'Capacidade Calorífica e Cp', keywords: ['capacidade calorífica', 'Cp', 'Cv', 'calor específico', 'Kirchhoff'] },
          { slug: 'adiabático', title: 'Reator Adiabático e Temperatura Adiabática', keywords: ['adiabático', 'temperatura adiabática', 'temperatura de saída', 'quench'] },
        ],
      },
    ],
  },
  {
    slug: 'termodinamica',
    title: 'Termodinâmica de Processos',
    emoji: '🔥',
    color: 'orange',
    topics: [
      {
        slug: 'leis-termodinamica',
        title: 'Leis da Termodinâmica',
        concepts: [
          { slug: 'primeira-lei', title: 'Primeira Lei da Termodinâmica', keywords: ['primeira lei', 'energia interna', 'trabalho', 'calor', 'balanço de energia'] },
          { slug: 'segunda-lei', title: 'Segunda Lei da Termodinâmica', keywords: ['segunda lei', 'entropia', 'irreversibilidade', 'ciclo de Carnot', 'eficiência'] },
          { slug: 'funcoes-termodinamicas', title: 'Funções Termodinâmicas (G, A, H, S)', keywords: ['energia de Gibbs', 'energia de Helmholtz', 'entalpia', 'entropia', 'potencial químico'] },
        ],
      },
      {
        slug: 'equilibrio-fases',
        title: 'Equilíbrio de Fases',
        concepts: [
          { slug: 'regra-fases', title: 'Regra das Fases de Gibbs', keywords: ['regra das fases', 'graus de liberdade', 'componentes', 'fases', 'ponto triplo'] },
          { slug: 'equilibrio-liquido-vapor', title: 'Equilíbrio Líquido-Vapor', keywords: ['equilíbrio LV', 'pressão de vapor', 'lei de Raoult', 'lei de Henry', 'VLE'] },
          { slug: 'diagrama-fases', title: 'Diagrama de Fases', keywords: ['diagrama de fases', 'diagrama PT', 'diagrama Txy', 'diagrama Pxy', 'ponto de bolha', 'ponto de orvalho'] },
        ],
      },
    ],
  },
  {
    slug: 'cinetica-reatores',
    title: 'Cinética de Reatores',
    emoji: '⚙️',
    color: 'violet',
    topics: [
      {
        slug: 'tipos-reatores',
        title: 'Tipos de Reatores',
        concepts: [
          { slug: 'reator-cstr', title: 'Reator CSTR', keywords: ['CSTR', 'reator de tanque agitado', 'reator contínuo', 'estado estacionário', 'mistura perfeita'] },
          { slug: 'reator-pfr', title: 'Reator PFR (Tubular)', keywords: ['PFR', 'reator tubular', 'plug flow', 'escoamento pistão', 'perfil de concentração'] },
          { slug: 'reator-batelada', title: 'Reator Batelada (Batch)', keywords: ['reator batelada', 'batch', 'operação em batelada', 'tempo de reação'] },
          { slug: 'equacao-projeto-reator', title: 'Equação de Projeto do Reator', keywords: ['equação de projeto', 'volume do reator', 'conversão', 'lei de velocidade', 'design equation'] },
        ],
      },
      {
        slug: 'analise-cinetica',
        title: 'Análise Cinética',
        concepts: [
          { slug: 'mecanismo-reacao', title: 'Mecanismo de Reação e Etapa Determinante', keywords: ['mecanismo', 'etapa determinante', 'intermediário', 'estado de transição'] },
          { slug: 'reacoes-multiplas', title: 'Reações Múltiplas e Seletividade', keywords: ['reações em série', 'reações em paralelo', 'seletividade', 'rendimento de produto'] },
        ],
      },
    ],
  },
  {
    slug: 'laboratorio',
    title: 'Laboratório',
    emoji: '🧪',
    color: 'teal',
    topics: [
      {
        slug: 'tecnicas-analiticas',
        title: 'Técnicas Analíticas',
        concepts: [
          { slug: 'titulacao', title: 'Titulação', keywords: ['titulação', 'titulante', 'analito', 'ponto de equivalência', 'indicador', 'bureta'] },
          { slug: 'espectrofotometria', title: 'Espectrofotometria – Lei de Beer-Lambert', keywords: ['espectrofotometria', 'lei de Beer-Lambert', 'absorbância', 'transmitância', 'comprimento de onda'] },
          { slug: 'cromatografia', title: 'Cromatografia', keywords: ['cromatografia', 'cromatografia em coluna', 'HPLC', 'CG', 'fase estacionária', 'fase móvel'] },
          { slug: 'filtracao', title: 'Filtração e Separação de Sólidos', keywords: ['filtração', 'filtro', 'papel de filtro', 'filtração a vácuo', 'sólido suspenso'] },
          { slug: 'precipitacao', title: 'Precipitação e Centrifugação', keywords: ['precipitação', 'precipitado', 'centrifugação', 'sobrenadante', 'decantação'] },
        ],
      },
    ],
  },
]

