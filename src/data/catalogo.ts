import type {
  Cargo,
  Materia,
  Topico,
  Aula,
  Questao,
  FonteReferencia,
  EditalReferencia,
} from "../types";
export const cargos: Cargo[] = [
  [
    "tjsp-escrevente",
    "TJ-SP",
    "Escrevente Técnico Judiciário",
    "Administrativa",
  ],
  ["trf3-analista-adm", "TRF3", "Analista Judiciário", "Área Administrativa"],
  ["trf3-tecnico-adm", "TRF3", "Técnico Judiciário", "Área Administrativa"],
  [
    "tjsp-analista-ti",
    "TJ-SP",
    "Analista de Sistemas Judiciário",
    "Tecnologia da Informação",
  ],
  [
    "trf3-analista-ti",
    "TRF3",
    "Analista Judiciário",
    "Apoio Especializado — Tecnologia da Informação",
  ],
  [
    "trf3-tecnico-ti",
    "TRF3",
    "Técnico Judiciário",
    "Apoio Especializado — Tecnologia da Informação",
  ],
  [
    "trt15-analista-ti",
    "TRT-15",
    "Analista Judiciário",
    "Apoio Especializado — Tecnologia da Informação",
  ],
  [
    "trt15-tecnico-ti",
    "TRT-15",
    "Técnico Judiciário",
    "Apoio Especializado — Tecnologia da Informação",
  ],
].map(([id, tribunal, titulo, especialidade]) => ({
  id,
  tribunal,
  titulo,
  especialidade,
  editalRefs: [],
}));
const nomes = [
  "Língua Portuguesa",
  "Matemática Básica",
  "Matemática",
  "Raciocínio Lógico",
  "Direito Constitucional",
  "Direito Administrativo",
  "Direito Civil",
  "Direito Processual Civil",
  "Direito Penal",
  "Direito Processual Penal",
  "Legislação",
  "Informática",
  "Tecnologia da Informação",
  "Bancos de Dados",
  "SQL",
  "Dados e BI",
  "Engenharia de Dados",
  "Data Warehouse",
  "ETL/ELT",
  "Python",
  "Ciência de Dados",
  "Inteligência Artificial e Machine Learning",
  "Desenvolvimento de Sistemas",
  "Segurança da Informação",
  "Redes",
  "Cloud",
  "DevOps",
  "Infraestrutura",
];
const ids = [
  "portugues",
  "matematica-basica",
  "matematica",
  "raciocinio-logico",
  "constitucional",
  "administrativo",
  "civil",
  "processual-civil",
  "penal",
  "processual-penal",
  "legislacao",
  "informatica",
  "ti",
  "bancos-dados",
  "sql",
  "dados-bi",
  "engenharia-dados",
  "data-warehouse",
  "etl",
  "python",
  "ciencia-dados",
  "ia",
  "desenvolvimento",
  "seguranca",
  "redes",
  "cloud",
  "devops",
  "infraestrutura",
];
export const materias: Materia[] = nomes.map((titulo, i) => ({
  id: ids[i],
  titulo,
  grupo: i < 4 ? "Fundamentos" : i < 11 ? "Direito" : "Tecnologia",
  suplementar: i === 1,
  descricao:
    i === 0
      ? "Leia com atenção, reconheça ideias e construa interpretações apoiadas no texto."
      : i === 1
        ? "Reconstrua sua base, dos números naturais à resolução de problemas."
        : "Estrutura inicial para organizar conteúdos compartilhados. Exigência nos editais ainda não confirmada.",
}));
const base = [
  "Números naturais",
  "Quatro operações",
  "Números inteiros",
  "Divisibilidade",
  "Frações",
  "Decimais",
  "Potências",
  "Raízes",
  "Razão",
  "Proporção",
  "Regra de três",
  "Porcentagem",
  "Médias",
  "Juros simples",
  "Equações",
  "Medidas",
  "Geometria",
  "Tabelas e gráficos",
  "Resolução de problemas",
];
export const topicos: Topico[] = [
  ...[
    "Compreensão e interpretação de textos",
    "Tipologia textual",
    "Ortografia",
  ].map((titulo, i) => ({
    id: `portugues-${i + 1}`,
    titulo,
    materiaId: "portugues",
    cargoIds: cargos.slice(0, 3).map((c) => c.id),
    editalRefs: [],
    sourceRefs: [],
    status: i === 0 ? ("em_producao" as const) : ("nao_iniciado" as const),
    tipo: "compartilhado" as const,
    aulaIds: i === 0 ? ["interpretacao"] : [],
  })),
  ...base.map((titulo, i) => ({
    id: `base-${i + 1}`,
    titulo,
    materiaId: "matematica-basica",
    cargoIds: [],
    editalRefs: [],
    sourceRefs: [],
    status: "nao_iniciado" as const,
    tipo: "suplementar" as const,
    aulaIds: [],
  })),
];
export const aulas: Aula[] = [
  {
    id: "interpretacao",
    titulo: "Compreensão e interpretação de textos",
    materiaId: "portugues",
    topicoId: "portugues-1",
    cargoIds: cargos.slice(0, 3).map((c) => c.id),
    editalRefs: [],
    sourceRefs: ["autoral"],
    status: "em_producao",
    tipo: "compartilhado",
    demonstracao: true,
    extensoes: [],
    secoes: [
      {
        titulo: "Identificação",
        texto:
          "Aula 01 • Língua Portuguesa • Tópico 1. Conteúdo demonstrativo produzido por IA para avaliação da plataforma; revisão editorial pendente.",
      },
      {
        titulo: "Editais e cargos atendidos",
        texto:
          "Associação demonstrativa: TJ-SP — Escrevente; TRF3 — Técnico e Analista da Área Administrativa. A mesma aula é reutilizada sem cópias. A confirmação documental está pendente.",
      },
      {
        titulo: "O que os editais cobram",
        texto:
          "Aguardando confirmação documental. Esta aula não representa uma matriz oficial de nenhum dos cargos.",
      },
      {
        titulo: "Objetivos",
        texto:
          "Distinguir informação explícita de inferência; identificar a ideia central; justificar uma resposta com evidências do texto.",
      },
      {
        titulo: "Pré-requisitos",
        texto:
          "Leitura de frases e parágrafos curtos. Você pode começar sem conhecimento de nomenclatura gramatical.",
      },
      {
        titulo: "Explicação completa",
        texto:
          "Compreender é reconhecer o que o texto diz. Interpretar envolve relacionar informações e chegar a conclusões sustentadas por pistas. O conhecimento de mundo pode ajudar, mas não autoriza acrescentar fatos que o texto não sustenta. Primeiro leia o comando; depois identifique o trecho que fundamenta cada alternativa.",
      },
      {
        titulo: "Conceitos e regras",
        texto:
          "Informação explícita aparece diretamente. Inferência é uma conclusão apoiada em indícios. Extrapolação acrescenta uma afirmação sem apoio suficiente. Uma opinião plausível pode, ainda assim, ser uma resposta inadequada ao texto.",
      },
      {
        titulo: "Exemplos resolvidos",
        texto:
          "Texto autoral: “A biblioteca passou a abrir aos sábados. No primeiro mês, os empréstimos aumentaram, principalmente entre leitores que trabalhavam durante a semana.” É explícito que os empréstimos aumentaram. É razoável inferir que o novo horário facilitou o acesso de parte dos leitores. Não é possível afirmar que todos os trabalhadores passaram a frequentar a biblioteca.",
      },
      {
        titulo: "Como a banca cobra",
        texto:
          "Exemplo genérico de treinamento, sem atribuição a uma banca: o comando pode pedir uma informação expressa, uma inferência autorizada ou a ideia central. Identifique qual dessas tarefas foi solicitada antes de escolher a alternativa.",
      },
      {
        titulo: "Pegadinhas e erros comuns",
        texto:
          "Cuidado com “todos”, “nunca” e “somente” quando o texto diz “parte”, “às vezes” ou “principalmente”. Não confunda uma relação temporal com prova de causa. Volte ao trecho antes de concluir.",
      },
      {
        titulo: "Resumo",
        texto:
          "Compreensão: localizar. Interpretação: relacionar. Justificativa: apontar a evidência. Evite respostas mais amplas do que o texto permite.",
      },
      {
        titulo: "Revisão rápida",
        texto:
          "O que está escrito? O que posso inferir? Que palavra limita a afirmação? Qual trecho sustenta minha resposta?",
      },
      {
        titulo: "Flashcards",
        texto: "Teste a memória antes de revelar a resposta.",
      },
      {
        titulo: "Questões",
        texto:
          "Pratique com uma questão inédita, criada apenas para esta demonstração.",
      },
      {
        titulo: "Gabarito comentado",
        texto:
          "Após responder, a explicação aparece abaixo da questão. Seu resultado fica salvo neste navegador.",
      },
      {
        titulo: "Fontes",
        texto:
          "Texto e questão autorais produzidos por IA, sem reprodução de prova oficial. Validação pedagógica e documental pendentes. Nenhuma fonte oficial é atribuída a esta demonstração.",
      },
    ],
  },
];
export const questoes: Questao[] = [
  {
    id: "q1",
    materiaId: "portugues",
    topicoId: "portugues-1",
    tipo: "inedita",
    cargoIds: cargos.slice(0, 3).map((c) => c.id),
    enunciado:
      "“A biblioteca passou a abrir aos sábados. No primeiro mês, os empréstimos aumentaram, principalmente entre leitores que trabalhavam durante a semana.” Qual conclusão encontra apoio no texto?",
    alternativas: [
      "Todos os leitores trabalham durante a semana.",
      "A abertura aos sábados pode ter facilitado o acesso de parte dos leitores.",
      "A biblioteca deixou de abrir nos dias úteis.",
      "O aumento dos empréstimos ocorreu exclusivamente entre trabalhadores.",
    ],
    correta: 1,
    explicacao:
      "A alternativa B apresenta uma inferência compatível com o novo horário e o perfil mencionado. “Principalmente” não significa “exclusivamente”. As outras alternativas acrescentam informações não sustentadas.",
  },
];
export const editais: EditalReferencia[] = [];
export const fontes: FonteReferencia[] = [
  {
    id: "autoral",
    titulo: "Aula e questão demonstrativas — produção por IA, revisão pendente",
    categoria: "Outras referências",
    confirmada: false,
  },
];
export const categoriasFontes = [
  "Editais oficiais",
  "Retificações",
  "Leis e normas oficiais",
  "Provas oficiais",
  "Gabaritos",
  "Recursos",
  "Fontes pedagógicas",
  "Outras referências",
];
