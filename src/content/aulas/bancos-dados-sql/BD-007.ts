import type { Aula } from "../../../types";

// Cópia estrutural do documento canônico; não editar o conteúdo editorial aqui.
export default {
  "id": "BD-007",
  "titulo": "BD-007 — SQL DML compartilhada e DQL (SELECT) como extensão formal do Analista TRF3/2023",
  "materiaId": "bancos-dados",
  "cargoIds": [
    "trf3_tj_ti",
    "trf3_aj_ti"
  ],
  "editalRefs": [
    "TRF3 / Fundação VUNESP / Edital nº 01/2023 / Anexo II / Técnico Judiciário – Apoio Especializado – Informática / conhecimentos específicos / Banco de Dados / item 9.3: “Comandos SQL: DML, DDL e DCL”. Vínculo formal desta aula: DML. SELECT é apoio necessário à leitura/checagem dos dados, não item DQL nominal adicional do Técnico.",
    "TRF3 / Fundação VUNESP / mesmo edital / Analista Judiciário – Apoio Especializado – Informática / conhecimentos específicos / Banco de Dados / itens 4.3.1: “DML – Linguagem de Manipulação de Dados” e 4.3.2: “DQL – Linguagem de Consulta de Dados”. Dois subitens formais atendidos por um único documento com seções distinguíveis."
  ],
  "sourceRefs": [
    "SRC-TRF3-2023: edital oficial VUNESP, https://documento.vunesp.com.br/documento/stream/NDQwMDU0OA%3D%3D",
    "Técnico Informática item 9.3 e Analista Informática itens 4.3.1/4.3.2",
    "matrizes C2/D2 da Auditoria 1:1.",
    "BD-002: modelo relacional",
    "BD-003: Modelo Entidade-Relacionamento",
    "BD-004: mapeamento para o relacional",
    "BD-005: normalização",
    "BD-006: DDL, já existente e concluído.",
    "Documentação técnica oficial de PostgreSQL, capítulos “Data Manipulation” e “Queries” (apoio conceitual",
    "não substitui versões nominalmente exigidas): https://www.postgresql.org/docs/current/dml.html e https://www.postgresql.org/docs/current/queries.html .",
    "Checkpoint e Auditoria Global do projeto."
  ],
  "status": "revisado",
  "statusEditorialOriginal": "revisado",
  "topicoId": "BD-007",
  "tipo": "especifico",
  "demonstracao": false,
  "secoes": [],
  "extensoes": [],
  "documentoArquivo": "bancos-dados-sql/BD-007.json",
  "materiaEditorial": "Bancos de Dados e SQL",
  "classificacaoEditorial": "núcleo técnico compartilhado DML + extensão específica DQL",
  "documentoUrl": "https://docs.google.com/document/d/1HbjUVjW1HKiSBkahaV125taxFUesP50UgIPbmisiruM/edit?usp=drivesdk"
} satisfies Aula;
