import { aulas } from "./aulas";
import type {
  Cargo,
  Materia,
  Topico,
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
// Discover subject/topic navigation from the lesson metadata, without manual lesson arrays.
for (const aula of aulas) {
  if (!materias.some(m => m.id === aula.materiaId)) {
    materias.push({
      id: aula.materiaId,
      titulo: aula.materiaEditorial || aula.materiaId,
      grupo: /Direito|Normas|Servidores|Contratações|Judiciária/i.test(aula.materiaEditorial || "") ? "Direito" : /TI|Software|Programação|Dados|Redes|Cloud|Segurança|DevOps/i.test(aula.materiaEditorial || "") ? "Tecnologia" : "Fundamentos",
      descricao: "Aulas do acervo editorial. Consulte os vínculos e limites documentais em cada aula.",
      suplementar: aula.materiaId === "matematica-basica",
    });
  }
}
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
  })),
];
for (const aula of aulas) {
  if (!topicos.some(t => t.id === aula.topicoId)) {
    topicos.push({id:aula.topicoId, titulo:aula.titulo, materiaId:aula.materiaId, cargoIds:aula.cargoIds, editalRefs:aula.editalRefs, sourceRefs:aula.sourceRefs, status:aula.status, tipo:aula.tipo});
  }
}
export const questoes: Questao[] = [
  {
    id: "q1",
    aulaId: "interpretacao",
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
