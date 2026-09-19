export type Status =
  | "nao_iniciado"
  | "em_producao"
  | "revisado"
  | "questoes_adicionadas"
  | "concluido";
export const statusLabels: Record<Status, string> = {
  nao_iniciado: "Não iniciado",
  em_producao: "Em produção",
  revisado: "Revisado",
  questoes_adicionadas: "Questões adicionadas",
  concluido: "Concluído",
};
export type Vinculo =
  | "oficial"
  | "compartilhado"
  | "especifico"
  | "suplementar";
export interface Conteudo {
  id: string;
  titulo: string;
  materiaId: string;
  cargoIds: string[];
  editalRefs: string[];
  sourceRefs: string[];
  status: Status;
}
export interface Cargo {
  id: string;
  tribunal: string;
  titulo: string;
  especialidade: string;
  editalRefs: string[];
}
export interface Materia {
  id: string;
  titulo: string;
  descricao: string;
  grupo: "Fundamentos" | "Direito" | "Tecnologia";
  suplementar?: boolean;
}
export interface Topico extends Conteudo {
  tipo: Vinculo;
}
export interface Aula extends Conteudo {
  documentoArquivo?: string;
  documentoUrl?: string;
  materiaEditorial?: string;
  classificacaoEditorial?: string;
  topicoId: string;
  tipo: Vinculo;
  demonstracao: boolean;
  secoes: { titulo: string; texto: string }[];
  extensoes: { cargoId: string; texto: string }[];
}
export type BlocoDocumento = {
  tipo: "paragrafo";
  runs: { texto: string; separador?: boolean; negrito?: boolean; italico?: boolean; codigo?: boolean; url?: string }[];
  estilo: string;
  lista?: number;
} | {
  tipo: "tabela";
  linhas: { blocos: BlocoDocumento[]; colSpan: number; rowSpan: number }[][];
};
export interface DocumentoAula {
  blocos: BlocoDocumento[];
  versoes?: { titulo: string; url: string; blocos: BlocoDocumento[] }[];
}
export interface EditalReferencia {
  id: string;
  cargoId: string;
  url: string;
  data?: string;
  versao?: string;
  banca?: string;
  retificacoes: string[];
  confirmado: boolean;
}
export interface FonteReferencia {
  id: string;
  titulo: string;
  url?: string;
  categoria: string;
  confirmada: boolean;
}
export interface Questao {
  id: string;
  aulaId?: string;
  materiaId: string;
  topicoId: string;
  tipo: "real" | "inedita";
  enunciado: string;
  alternativas: string[];
  correta: number;
  explicacao: string;
  cargoIds: string[];
  banca?: string;
  ano?: number;
  orgao?: string;
  cargo?: string;
  prova?: string;
  fonte?: string;
}
export interface CadernoErro {
  id: string;
  materiaId: string;
  topicoId: string;
  questaoId: string;
  erro: string;
  correta: string;
  explicacao: string;
  observacao: string;
  revisar: boolean;
}
export interface Progresso {
  aulas: string[];
  respostas: Record<string, number>;
  erros: CadernoErro[];
  revisoes: { aulaId: string; data: string; revisadaEm?: string }[];
}
