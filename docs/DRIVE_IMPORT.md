# Importação do acervo — 19/09/2026

## Atualização — 20/09/2026

Importadas 22 aulas novas: LP-006, MB-006, BD-005, RLM-004, DC-006, PW-005, INF-006, DA-006, DBI-005, PCD-006, SCJ-005, ES-005, CP-005, AGP-005, SI-005, GP-005, MPL-005, DEV-005, AFO-005, DP-006, SVC-005 e DPP-006. Atualizadas DA-005 e RLM-003 a partir das alterações canônicas. Nenhum ID anterior foi removido.

Total atual: 170 IDs canônicos em 39 matérias, mais a demonstração local (171 aulas). Os 171 documentos do Drive incluem as duas versões de ES-003. Da lista de divergências inicial abaixo, continuam ausentes na árvore: EST-001, SI-003, DPC-006, RED-005, DTRAB-005, PTRAB-005 e GSTI-005.

O importador aceita `--incremental`: preserva o inventário anterior e substitui somente os IDs presentes no lote. Última base publicada antes deste lote: `16bc8e9`.

## Registro da importação inicial

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

## Atualização de 21/09/2026

182 documentos de aula na árvore autorizada, 181 IDs distintos em 39 matérias; ES-003 mantém as duas versões. Importadas 11 aulas novas (DTRAB-005, RED-005, DPC-006, DA-014, DA-013, DA-012, DA-011, DA-010, DA-009, DA-008, DA-007), atualizadas 6 (DA-006, DA-005, DA-003, DA-002, DA-001, DA-004). DPP-006 conferida: texto inalterado. Corpo integral e metadados copiados dos documentos canônicos, inclusive os vínculos revisados de DA-001 a DA-006, sem inferência local. Nenhuma escrita no Drive. Total: 181 aulas canônicas + demonstração legada.

EST-001, SI-003, PTRAB-005 e GSTI-005 continuam ausentes da árvore consultada; nenhum substituto foi criado. DA-014 foi importada pelo documento real, embora o checkpoint ainda a indique como próximo item.

## Auditoria completa — 21/09/2026

186 documentos canônicos lidos (183 Google Docs e 3 Word), correspondentes a 185 IDs em 39 matérias. Comparação integral de texto, estrutura e metadados: 180 aulas sem alteração; DA-014 substituída pela revisão canônica; DA-015, DA-016, DA-017 e DA-018 criadas. Todas as cinco estão concluídas no documento. Nenhuma omitida por incompletude; aulas em produção mantêm seu status explícito. ES-003 preserva as duas versões. Textos Word conferidos integralmente, normalizando somente espaços e a apresentação das tabelas ao final pelo conector.

Matriz: DRIVE_SYNC_AUDIT.json. O checkpoint cita DA-019 como próximo item, sem documento correspondente na árvore atual; não foi fabricado conteúdo. EST-001, SI-003, PTRAB-005 e GSTI-005 permanecem sem documento. Nenhuma aula do site perdeu correspondência no Drive. A ordem por ID editorial e todos os aliases permanecem. Não houve pesquisa jurídica externa nem alteração do Drive.

## Publicação de 22/09/2026

210 documentos encontrados, 209 IDs em 39 matérias. Em relação ao último deploy: 28 aulas novas (incluindo DA-015–018 já preparadas) e 17 revisadas, em 20 matérias. Os documentos modificados foram lidos integralmente; a identificação foi por ID e data de revisão comparada à captura completa anterior. Conteúdo e status canônicos preservados; nenhuma produção editorial local. ES-003 segue com ambas as versões.
