import type { Aula } from "../../../types";

// Cópia estrutural do documento canônico; não editar o conteúdo editorial aqui.
export default {
  "id": "BD-008",
  "titulo": "BD-008 — SQL DCL: GRANT e REVOKE; gerência de transações (extensão formal do Analista TRF3/2023)",
  "materiaId": "bancos-dados",
  "cargoIds": [
    "trf3_tj_ti",
    "trf3_aj_ti"
  ],
  "editalRefs": [
    "TRF3/Fundação VUNESP, Edital de Abertura nº 01/2023, Anexo II, Técnico Judiciário, Apoio Especializado, Informática, Banco de Dados, item 9.3: “Comandos SQL: DML, DDL e DCL”. Este BD-008 atende ao componente DCL desse item. Transações são aprofundamento pedagógico para o Técnico, sem novo vínculo formal autônomo.",
    "TRF3/Fundação VUNESP, mesmo edital, Analista Judiciário, Apoio Especializado, Informática, Banco de Dados, item 4.3.4: “DCL – Linguagem de Controle de Dados”",
    "item 4.4: “Gerência de Transações”. São dois itens formais distintos do Analista cobertos por seções diferenciadas neste único documento."
  ],
  "sourceRefs": [
    "SRC-TRF3-2023: edital oficial VUNESP, https://documento.vunesp.com.br/documento/stream/NDQwMDU0OA%3D%3D",
    "respectivas matrizes documentais C2.TJTI.09 e D2.AJTI.04 da Auditoria 1:1.",
    "PostgreSQL 13, documentação oficial GRANT: https://www.postgresql.org/docs/13/sql-grant.html",
    "PostgreSQL 13, documentação oficial REVOKE: https://www.postgresql.org/docs/13/sql-revoke.html",
    "PostgreSQL 13, tutorial “Transactions”: https://www.postgresql.org/docs/13/tutorial-transactions.html",
    "PostgreSQL 13, “Transaction Isolation”: https://www.postgresql.org/docs/13/transaction-iso.html",
    "PostgreSQL 13, “SAVEPOINT” e “SET TRANSACTION”: https://www.postgresql.org/docs/13/sql-savepoint.html",
    "https://www.postgresql.org/docs/13/sql-set-transaction.html",
    "BD-002 (modelo relacional), BD-005 (normalização), BD-006 (DDL concluído), BD-007 (DML compartilhada + DQL formal do Analista)",
    "Checkpoint e Auditoria Global."
  ],
  "status": "revisado",
  "statusEditorialOriginal": "revisado",
  "topicoId": "BD-008",
  "tipo": "especifico",
  "demonstracao": false,
  "secoes": [],
  "extensoes": [],
  "documentoArquivo": "bancos-dados-sql/BD-008.json",
  "materiaEditorial": "Bancos de Dados e SQL",
  "classificacaoEditorial": "núcleo DCL compartilhado + extensão de gerência de transações específica do Analista",
  "documentoUrl": "https://docs.google.com/document/d/19dmHHxfdYxmhhHvpf_AwGU63AmhprL4ehQ1MiPNL-2E/edit?usp=drivesdk"
} satisfies Aula;
