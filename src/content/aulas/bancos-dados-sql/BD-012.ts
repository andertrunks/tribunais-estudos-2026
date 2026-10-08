import type { Aula } from "../../../types";

// Cópia estrutural do documento canônico; não editar o conteúdo editorial aqui.
export default {
  "id": "BD-012",
  "titulo": "BD-012 — Microsoft SQL Server e T-SQL: produto, consultas, transações, segurança e administração (TRF3 Analista 4.8)",
  "materiaId": "bancos-dados",
  "cargoIds": [
    "trf3_aj_ti"
  ],
  "editalRefs": [
    "SRC-TRF3-2023: Fundação VUNESP, Edital de Abertura TRF3 nº 01/2023, Anexo II, ANALISTA JUDICIÁRIO – APOIO ESPECIALIZADO – INFORMÁTICA, Banco de Dados, 4.8: “SQL Server”. PDF índice 67, impresso 68. A numeração do item e o nome do produto são os dados formais efetivamente demonstrados.",
    "Técnico Informática NÃO possui item SQL Server nominal na respectiva lista de Banco de Dados do mesmo edital. O Técnico não entra em cargoIds nem recebe “9.7” fictício."
  ],
  "sourceRefs": [
    "Edital oficial: https://documento.vunesp.com.br/documento/stream/NDQwMDU0OA%3D%3D , Anexo II",
    "auditorias C2/D2 e checkpoint E5e.",
    "Microsoft Learn, SQL Server Technical Documentation: https://learn.microsoft.com/en-us/sql/sql-server/sql-server-technical-documentation .",
    "TOP (Transact-SQL): https://learn.microsoft.com/en-us/sql/t-sql/queries/top-transact-sql .",
    "ORDER BY/OFFSET-FETCH: https://learn.microsoft.com/en-us/sql/t-sql/queries/select-order-by-clause-transact-sql .",
    "IDENTITY: https://learn.microsoft.com/en-us/sql/t-sql/statements/create-table-transact-sql-identity-property .",
    "@@IDENTITY e SCOPE_IDENTITY: https://learn.microsoft.com/en-us/sql/t-sql/functions/identity-transact-sql",
    "https://learn.microsoft.com/en-us/sql/t-sql/functions/scope-identity-transact-sql .",
    "OUTPUT clause: https://learn.microsoft.com/en-us/sql/t-sql/queries/output-clause-transact-sql .",
    "@@ROWCOUNT: https://learn.microsoft.com/en-us/sql/t-sql/functions/rowcount-transact-sql .",
    "TRY...CATCH e XACT_STATE: https://learn.microsoft.com/en-us/sql/t-sql/language-elements/try-catch-transact-sql",
    "https://learn.microsoft.com/en-us/sql/t-sql/functions/xact-state-transact-sql .",
    "SAVE TRANSACTION e @@TRANCOUNT: https://learn.microsoft.com/en-us/sql/t-sql/language-elements/save-transaction-transact-sql",
    "https://learn.microsoft.com/en-us/sql/t-sql/functions/trancount-transact-sql .",
    "Index Architecture and Design Guide e Execution Plan Overview: https://learn.microsoft.com/en-us/sql/relational-databases/sql-server-index-design-guide",
    "https://learn.microsoft.com/en-us/sql/relational-databases/performance/execution-plans .",
    "Backup Overview e Recovery Models: https://learn.microsoft.com/en-us/sql/relational-databases/backup-restore/backup-overview-sql-server",
    "https://learn.microsoft.com/en-us/sql/relational-databases/backup-restore/recovery-models-sql-server .",
    "BD-002 e BD-005–011: acervo pedagógico prévio, sem duplicar núcleos SQL e materiais específicos PostgreSQL/Oracle."
  ],
  "status": "revisado",
  "statusEditorialOriginal": "revisado",
  "topicoId": "BD-012",
  "tipo": "especifico",
  "demonstracao": false,
  "secoes": [],
  "extensoes": [],
  "documentoArquivo": "bancos-dados-sql/BD-012.json",
  "materiaEditorial": "Bancos de Dados e SQL",
  "classificacaoEditorial": "aula específica de produto — Microsoft SQL Server; sem extensão fictícia do Técnico",
  "documentoUrl": "https://docs.google.com/document/d/1Q__gzZ0G4F2dKLm7Jcvg_OwKXaDkNpyI7JzvdDkzcG8/edit?usp=drivesdk"
} satisfies Aula;
