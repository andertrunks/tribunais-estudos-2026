import type { Aula } from "../../../types";

// Cópia estrutural do documento canônico; não editar o conteúdo editorial aqui.
export default {
  "id": "BD-010",
  "titulo": "BD-010 — PostgreSQL 13 compartilhado e PostgreSQL 12 como extensão específica do Analista TRF3/2023",
  "materiaId": "bancos-dados",
  "cargoIds": [
    "trf3_tj_ti",
    "trf3_aj_ti"
  ],
  "editalRefs": [
    "SRC-TRF3-2023, Edital nº 01/2023, Anexo II, Técnico Judiciário – Apoio Especializado – Informática: item 9.5 “PostgreSQL 13”. Somente o núcleo PostgreSQL 13 compõe o vínculo formal nominal deste cargo.",
    "SRC-TRF3-2023, mesmo edital, Analista Judiciário – Apoio Especializado – Informática: item 4.6 “PostgreSQL 12 e 13”. Núcleo comum PostgreSQL 13 e extensão de versão 12 são formais SOMENTE para este cargo em conjunto.",
    "Fonte primária: https://documento.vunesp.com.br/documento/stream/NDQwMDU0OA%3D%3D — Anexo II, PDF índice 51 para Técnico e 67 para Analista, extração textual conferida",
    "a ferramenta de screenshot do PDF retornou erro e não é apresentada como inspeção visual bem-sucedida."
  ],
  "sourceRefs": [
    "Documentação OFICIAL do PostgreSQL 13: https://www.postgresql.org/docs/13/",
    "Tutorial https://www.postgresql.org/docs/13/tutorial.html",
    "psql https://www.postgresql.org/docs/13/app-psql.html",
    "Schemas https://www.postgresql.org/docs/13/ddl-schemas.html",
    "Roles https://www.postgresql.org/docs/13/user-manag.html",
    "JSON https://www.postgresql.org/docs/13/datatype-json.html",
    "MVCC https://www.postgresql.org/docs/13/mvcc.html",
    "EXPLAIN https://www.postgresql.org/docs/13/using-explain.html",
    "Partitioning https://www.postgresql.org/docs/13/ddl-partitioning.html",
    "pg_dump https://www.postgresql.org/docs/13/app-pgdump.html",
    "pg_restore https://www.postgresql.org/docs/13/app-pgrestore.html .",
    "Documentação OFICIAL PostgreSQL 12: https://www.postgresql.org/docs/12/",
    "CREATE TABLE/generated columns https://www.postgresql.org/docs/12/sql-createtable.html .",
    "Release notes oficiais e diferenças: PostgreSQL 12 https://www.postgresql.org/docs/release/12.0/",
    "PostgreSQL 13 https://www.postgresql.org/docs/release/13.0/ .",
    "Aulas internas BD-002 (modelo relacional), BD-005 (normalização), BD-006 (DDL), BD-007 (DML/DQL), BD-008 (DCL e gerência de transações), BD-009 (SQL/PLSQL Oracle). Os documentos têm IDs próprios e não foram duplicados aqui."
  ],
  "status": "revisado",
  "statusEditorialOriginal": "revisado",
  "topicoId": "BD-010",
  "tipo": "especifico",
  "demonstracao": false,
  "secoes": [],
  "extensoes": [],
  "documentoArquivo": "bancos-dados-sql/BD-010.json",
  "materiaEditorial": "Bancos de Dados e SQL",
  "classificacaoEditorial": "núcleo PostgreSQL 13 compartilhado + extensão identificada PostgreSQL 12 para Analista",
  "documentoUrl": "https://docs.google.com/document/d/1m4JFDHpja0LxJ2OEGuHsZt2ATRefbYIa68drhdA2TMg/edit?usp=drivesdk"
} satisfies Aula;
