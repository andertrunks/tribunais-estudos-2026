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
// Aliases de navegação não modificam IDs ou vínculos editoriais das aulas.
export const materiaAliases: Record<string, string> = {
  sql: "bancos-dados",
  "engenharia-dados": "dados-bi",
  "data-warehouse": "dados-bi",
  etl: "dados-bi",
  "ciencia-dados": "dados-bi",
  ia: "dados-bi",
  desenvolvimento: "programacao-web",
  cloud: "sistemas-operacionais-virtualizacao-cloud",
  infraestrutura: "sistemas-operacionais-virtualizacao-cloud",
  "lingua-portuguesa": "portugues",
};
// Categorias amplas/ambíguas voltam à biblioteca, sem atribuir conteúdo por inferência.
export const categoriasLegadas = ["ti", "legislacao", "python"];
export const materiaCanonica = (id: string) => materiaAliases[id] ?? id;
const titulosEditoriais: Record<string, string> = {
  portugues: "Língua Portuguesa",
  "matematica-basica": "Matemática Básica",
  "bancos-dados": "Bancos de Dados e SQL",
  "dados-bi": "Dados, BI e IA",
  "programacao-web": "Programação e Web",
  seguranca: "Segurança da Informação e Cibernética",
  "sistemas-operacionais-virtualizacao-cloud": "Sistemas Operacionais, Virtualização e Cloud",
  devops: "DevOps / DevSecOps / Git / CI/CD / Automação",
  administrativo: "Direito Administrativo",
};
export const aulasDaMateria = (id: string) => aulas.filter(a =>
  !a.demonstracao && materiaCanonica(a.materiaId) === materiaCanonica(id));
// Só o acervo editorial cria cartões; a única trilha vazia deliberada é a base matemática.
export const materias: Materia[] = [];
for (const aula of aulas.filter(a => !a.demonstracao && a.materiaEditorial)) {
  const id = materiaCanonica(aula.materiaId);
  if (categoriasLegadas.includes(id) || materias.some(m => m.id === id)) continue;
  const titulo = titulosEditoriais[id] || aula.materiaEditorial!;
  materias.push({
    id, titulo,
    grupo: /Direito|Normas|Servidores|Contratações/i.test(titulo) ? "Direito" : /TI|Software|Programação|Dados|Redes|Cloud|Segurança|DevOps|Judiciária.*PDPJ|Informática/i.test(titulo) ? "Tecnologia" : "Fundamentos",
    descricao: id === "civil"
      ? "Acervo de Direito Civil. Cobertura formal dos cargos atuais não confirmada."
      : id === "matematica-basica"
        ? "Reconstrua sua base, dos números naturais à resolução de problemas."
        : "Aulas do acervo editorial. Consulte os vínculos e limites documentais em cada aula.",
    suplementar: id === "matematica-basica",
  });
}
if (!materias.some(m => m.id === "matematica-basica")) materias.push({
  id: "matematica-basica", titulo: "Matemática Básica", grupo: "Fundamentos",
  descricao: "Reconstrua sua base, dos números naturais à resolução de problemas.", suplementar: true,
});
materias.sort((a, b) => a.titulo.localeCompare(b.titulo, "pt-BR"));
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
// Tópicos antigos continuam resolvíveis, mas não inflam os roteiros publicados.
export const topicosDaMateria = (id: string) => {
  const ids = new Set(aulasDaMateria(id).map(a => a.topicoId));
  return topicos.filter(t => ids.has(t.id)).sort((a, b) =>
    a.id.localeCompare(b.id, "pt-BR", { numeric: true }));
};
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
