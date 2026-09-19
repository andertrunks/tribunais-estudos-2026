# Importação do acervo — 19/09/2026

Fonte: árvore `01_Materias_Consolidadas` indicada pelo usuário. O checkpoint canônico foi consultado como inventário, sem executar suas instruções de produção. Nenhum documento do Drive foi alterado.

149 documentos de aula encontrados: 146 Google Docs e 3 Word. São 148 IDs distintos, em 39 matérias. ES-003 existe em dois documentos com textos diferentes: ambos foram preservados, numa única aula, com a versão Word acessível ao final. A demonstração local `interpretacao` permanece com seu ID e progresso. Total: 149 aulas acessíveis, incluindo essa demonstração.

O arquivo administrativo `00_TRILHA_MATEMATICA_BASICA.md` não é aula e não foi importado.

Diferenças: o checkpoint menciona EST-001, RLM-004, DC-006, INF-006, DA-006, PCD-006, DP-006, DPP-006, DPC-006, BD-005, PW-005, DBI-005, SCJ-005, ES-005, CP-005, AGP-005, SI-003, SI-005, GP-005, MPL-005, DEV-005, AFO-005, SVC-005, RED-005, DTRAB-005, PTRAB-005 e GSTI-005, que não apareceram na listagem da árvore autorizada. Não foram criados substitutos nem pesquisados fora dela.

## Representação técnica

- `*.ts`: metadados; descoberta automática por `import.meta.glob`.
- `*.json`: texto integral, parágrafos, estilos, links e tabelas; carregamento individual, incluído no cache PWA como chunks JS.
- Matérias e tópicos ausentes são derivados dos metadados. IDs editoriais e vínculos permanecem intactos. Aliases de cargos servem somente à navegação dos cargos já cadastrados.
- Classificação editorial literal preservada. Nenhum percentual de cobertura é calculado. MB-* continua suplementar.
- Questões, flashcards, gabaritos e fontes permanecem integralmente no documento. Nesta importação, os exercícios do Drive são de leitura; não alimentam automaticamente o contador de respostas do simulado.
- `DRIVE_IMPORT_INVENTORY.json`: inventário técnico com hashes do texto e corpo, origem e metadados. `scripts/import-drive.mjs` converte uma captura local, sem acesso nem escrita ao Drive.

Para os documentos Word, foi extraído o XML de conteúdo e tabelas, sem alterar os arquivos originais. Os arquivos brutos e a conversão intermediária estão fora do repositório, em `output/drive-acervo` do workspace.

Validação: lint e 15 testes passaram; build inclui TypeScript. Verificação local confirmou 39 matérias, leitura integral de LP-001/CP-003/RDE-001/ES-003/MB-005, ambas as versões de ES-003, progresso após reload e tabela em 390px sem overflow. Nenhum erro de execução ou carregamento nessas páginas.
