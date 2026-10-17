# Tribunais Estudos 2026 — checkpoint operacional

## Reconciliação 17/10/2026 — lote recuperado

Base: 0d63dd70ebc9c369c137c112ccc012f70430f98d. Os 29 IDs novos do rascunho de 25/09 já estão na main; não foram duplicados. Quatro corpos integrais estavam mais completos na fonte atual: GSTI-001, SI-001, RED-001 e LP-001. Recuperados novamente dos Google Docs nativos, incluindo três imagens embutidas. Preservados IDs, arquitetura, progresso e status editorial (LP-001 permanece em produção; as outras três, produzido — mídia concluída).

TypeScript, lint, 19 testes e build/PWA aprovados. Navegador local Edge conferiu 2.164 parágrafos não vazios dos quatro documentos, três imagens, desktop e 390 px, sem erro de execução ou asset. Inventário mantém 316 IDs únicos. Commit/push/deploy e verificação pública devem ser conferidos no recibo da execução; esta entrada registra o estado pré-envio. Rascunhos antigos e stash de outros projetos preservados.

## Publicação editorial 2026-10-16
Base main 2335113be25936c56ed90447c11dcbcd4341f446; publicação anterior comprovada no controle ESTADO_ATUAL!271. Checkpoint canônico E71 PASS, PW-017 revisado e homologado. Importação integral: 33.294 caracteres, 30 flashcards, 20 questões autorais e 10 treinos; IDs/cargos/fontes e progresso preservados. Catálogo 316 canônicas. Arquivos PW-017.ts/JSON, inventário e este checkpoint. TypeScript/lint/18 testes aprovados; build em validação. Push/deploy ainda pendentes. Próxima ação exata: conferir build final, igualdade de árvores Git, enviar lote PW-017 e verificar Actions e hashes HTTP do index e asset PW-017; registrar recibo final no controle. E72 JSF é próximo editorial, não criar nesta rotina. ES-003 segue pendente de reimportação preservando versão Word.

## Publicação editorial 2026-10-15
Base main: 2fa1e1d0afa19b299e5794e327fbb7dc7bda6af3. O lote anterior está comprovadamente publicado: run38567297310 SUCCESS e 45 hashes HTTP iguais, recibo ESTADO_ATUAL!261.
Fonte atual: checkpoint canônico E70 PASS. Importados integralmente PW-010–PW-016 (sete novos) e IA-004 (revisão), preservando IDs, fontes, cargos, limites de edital e questões autorais/real separadas. Catálogo 315 aulas canônicas.
Arquivos: oito pares TS/JSON, inventário e este checkpoint. TypeScript, lint, 18 testes e build/PWA aprovados localmente. Progresso do aluno não alterado. Sem teste Edge.
Push/deploy/HTTP ainda pendentes nesta entrada. Próxima ação exata: enviar árvore validada com verificação de igualdade local/remota, acompanhar Actions e comparar nove assets HTTP (oito aulas + index); registrar recibo no controle canônico. ES-003 segue pendente de reimportação com preservação da versão Word; não recriar aula.


Lote Excel — 09/10/2026: INF-006 e INF-007 homologadas em fonte primária
TJSP2503, Edital 02/2025, Anexo VI, Informática, página impressa 44.
INF-008 recuperada do novo documento revisado na mesma pasta canônica.
Três textos integrais importados com igualdade fonte/importado 3/3;
90 questões inéditas em modo leitura, sem falsa atribuição à VUNESP.
Catálogo: 291 aulas canônicas + 1 demonstração = 292 aulas exibidas,
40 matérias. INF-006/007 preservam status concluido, INF-008 revisado.
O lote cobre estrutura/tabelas/gráficos, fórmulas e funções essenciais;
não encerra o bloco formal inteiro de Excel. Macros, impressão, objetos,
campos, quebras/paginação e dados externos mantêm suas pendências.
Receipt de CI, merge, deploy e smoke no checkpoint canônico após verificação.
Próxima produção: obedecer à rotação intercalada do Drive; não avançar
automaticamente para INF-009. Nenhuma arquitetura cloud alterada.

Histórico dos lotes anteriores preservado abaixo.

Atualização de acervo — 09/10/2026: segundo lote integral do Drive com
MC-001, MC-002, MC-007, MC-008, MC-009, MC-010, MC-012 e EST-001.
MC-012 é uma aula nova no site, recuperada de documento já produzido e
revisado; sete aulas existentes recebem a versão revisada completa.
Igualdade de texto fonte/importado 8/8; catálogo passa a 290 canônicas
+ 1 demonstração. Vínculos por cargo e limites históricos permanecem
explícitos na fonte; não transformar extensões em itens de edital.
TypeScript, lint e 18/18 testes locais PASS; publicação usa o workflow
obrigatório de PR e main. O receipt final de CI/deploy/smoke deste lote
é registrado no mesmo checkpoint canônico do Drive após a verificação.



Estado verificado em 09/10/2026: INF-001–INF-005 importadas integralmente dos
documentos canônicos revisados, com Edital nº 02/2025/TJSP2503 e cargo
tjsp_escrevente. Catálogo: 289 aulas canônicas + 1 demonstração, 40 matérias.
PR: https://github.com/andertrunks/tribunais-estudos-2026/pull/1
Candidate: 17039337248d7206f085442269213fc3e8a209ee.
Merge/deploy: de74da03b676330d5f16c8efdec409f39f69a63c.
CI PR 37974349200 e deploy main 37974835516: PASS.
Windows: instalação limpa, typecheck, lint, 18/18 testes, build/PWA PASS.
Cinco aulas verificadas no site público com status revisado e referências
corretas; conclusão persistiu após reload, mobile 390px sem overflow, zero
pageerrors/assets HTTP >=400 nas páginas verificadas.
Validação de PR agora automática; deploy continua em main.
Os sete itens adiados foram relidos: LP-001/002 e GSTI-004 em_producao;
GSTI-002 em_auditoria_incremental; GSTI-001/RED-001/SI-001 agora vinculados
a CRBio/SETEC no documento compartilhado, sem habilitação editorial para
substituir o vínculo de Tribunais. Não propagar esses cargos automaticamente.
Próxima ação: concluir homologação documental de INF-006/007 (Excel) no
Drive e importar apenas a versão apta, preservando texto integral e IDs.

O histórico abaixo permanece como evidência das execuções anteriores.

Atualizado: 20/09/2026. Leia este arquivo primeiro; depois status/diff e somente
arquivos afetados. Auditoria inicial concluída; não repetir sem mudança estrutural.

- Objetivo: estudo gratuito por matéria → tópico → aula, reutilizado entre cargos.
- Stack: React 18/TS/Vite, hash routes, PWA e estudo local com login opcional.
- Conteúdo canônico: Drive / Tribunais Estudos 2026 — Conteúdo Mestre /
  01_Materias_Consolidadas. Não reescrever; importar completo em lotes de 5–10.
- Aulas: default export `Aula` em `src/content/aulas/<materia>/*.ts`.
  `src/data/aulas.ts` descobre por `import.meta.glob`; NÃO cadastrar em catalogo
  ou manter `aulaIds`. Relações derivadas de `materiaId`/`topicoId`.
- Dados: `src/data/catalogo.ts` (cargos/matérias/tópicos/questões/fontes/editais),
  `src/types/index.ts` (modelos), `src/pages/index.tsx`, `src/components/ui.tsx`.
  Aula preserva id/titulo/materiaId/topicoId/cargoIds/editalRefs/sourceRefs/status/
  tipo/demonstracao/secoes/extensoes. Questão pode ter aulaId; real exige origem.
  Nunca inventar metadados; MB-* é suplementar, fora da cobertura formal.
- Progresso: `src/hooks/useProgresso.ts`, `src/services/storage.ts` e cloudSync.
  Visitante: `tribunais-estudos:v1`; conta: `...:user:<id>`, baseline separado.
  Importa visitante uma vez por conta, mantendo original; botão permite repetir.
- Supabase: `src/auth`, `src/lib/supabase.ts`, configuração pública em src/config.
  Google/PKCE, sessão persistente, storage auth próprio, logout scope local.
  Env: VITE_SUPABASE_URL + VITE_SUPABASE_PUBLISHABLE_KEY (ou ANON_KEY pública).
  Nenhum .env/secreto deve ser commitado.
- Banco exclusivo: public.tribunais_progress, user_id PK/FK, data JSONB, updated_at.
  Migração 20260914223033 já aplicada pelo Work e preservada. RLS ENABLE/FORCE,
  quatro operações apenas do dono autenticado. Google ativo; anon HTTP 401.
  Não consultar novamente se schema/config não mudarem.
- Merge: primeiro união conservadora; depois local/remoto/baseline, aplicando
  alterações locais e preservando demais remotas. CAS updated_at, repetição em
  conflito, fila e geração de conta; edições recentes/resultado atrasado protegidos.
  Detalhes: docs/autenticacao.md. Offline mantém cache; reconexão tenta sincronizar.
- Deploy: origin andertrunks/tribunais-estudos-2026, main; .github/workflows/deploy.yml
  → GitHub Pages, base/scope /tribunais-estudos-2026/, hash refresh e cache de assets.
  URL: https://andertrunks.github.io/tribunais-estudos-2026/#/
- Autenticação publicada: 870bc7d07afa21ba2258ad2876d3b36c2f37debd em main.
  Feature ec3a6d9; merge preserva 55a31f5/Copilot, árvore validada idêntica, sem force.
  Actions 35144115486: success. Checkpoint pós-deploy versionado em commit docs
  com [skip ci]. Acervo inicial publicado em `16bc8e9` (19/09): 148 aulas canônicas.
  Lote de 20/09: +22 aulas, DA-005/RLM-003 atualizadas; 170 canônicas + 1 demo.
  Inventário atual e hashes: docs/DRIVE_IMPORT_INVENTORY.json. Histórico e
  discrepâncias: docs/DRIVE_IMPORT.md. 39 matérias com conteúdo.
- Pendentes de implementação: nenhum da base auth. Histórico inicial preservado
  em docs/recuperacao-work.md; backup fora do repo ../integration-backup-20260916.
- Validação: npm.cmd run typecheck; npm.cmd run lint; npm.cmd test; npm.cmd run build.
  Testes visuais específicos: node e2e/auth.mjs; regressão/PWA: node e2e/verify.mjs.
- Resultados: typecheck/lint/build OK, 13 testes unitários OK, auth E2E simulado OK
  (10 verificações, zero pageerrors). PWA gerado, 22 assets em precache.
  Regressão local/PWA: 26 verificações OK, desktop/mobile 390px, hash/refresh,
  manifest/ícones/SW/offline. Google REAL local e público OK: callback à aula,
  sessão/reload, nome/email/foto, sync, importação, visitante/conta e logout.
  Público: Home/Matérias/aula/progresso/conta/menu mobile 390px OK, sem overflow,
  zero erros console, CSS e assets confirmados. Preview local porta 4173.
- Conteúdo: metadados *.ts e corpo integral *.json; DocumentoAula.tsx carrega
  JSON por glob lazy. Matérias/tópicos derivados automaticamente. Importação local:
  node scripts/import-drive.mjs <captura-Drive> --incremental. Não ler aulas antigas.
- Limitações: questões importadas em modo leitura; divergências do Drive registradas.
  Em PWA previamente aberto,
  primeira recarga instala update; próxima carrega nova versão, sem limpar progresso.
- Próxima tarefa: nas atualizações, comparar IDs/datas na árvore autorizada com o
  inventário existente; ler somente documentos novos ou alterados. Não criar aulas.

- Ajuste de Matérias publicado (20/09): 39 cartões derivados de
  aulas canônicas com materiaEditorial; única exceção vazia deliberada: MB.
  catalogo.ts centraliza materiaCanonica/aulasDaMateria/topicosDaMateria.
  Aliases preservam SQL, subdivisões de Dados, desenvolvimento, cloud/infraestrutura;
  TI/Legislação/Python abrem biblioteca. Demo Português acessível separadamente.
  IDs/metadados/progresso e conteúdo Drive intactos; Civil sem cobertura confirmada.
  Typecheck/lint/build OK, 18 testes OK; e2e/materias.mjs: 39 rotas, 8 aulas,
  progresso/reload, aliases e mobile OK, zero erros console/assets.
  Deploy: bf58980bfe7639d9f1a8dedfd2e953df142be9dd; Actions 35546935598 OK.
  Público: mesmos 39 cartões/rotas, 8 aulas/progresso, desktop/mobile; zero erros.
  Quatro assets principais idênticos ao build local por SHA-256.
  Próxima ação: atualizações editoriais incrementais, quando solicitadas.

- Lote 21/09 publicado: 11 aulas novas (DA-007–014, DPC-006, RED-005, DTRAB-005),
  6 revisadas (DA-001–006). 181 canônicas + demo, 39 matérias. Captura incremental
  em output/drive-update-20260921 (fora do repo); inventário/hashes atualizados.
  Validação do lote: 18 testes OK, build/TypeScript/PWA OK; 17 textos completos
  conferidos no navegador local, 4 matérias, desktop/mobile e zero erros.
  Deploy b5105c804257d39629da7c2087f3aea63b2bf06c; Actions 35587494736 OK.
  Público: 17 textos integrais/4 matérias/39 cartões, desktop/mobile OK, zero erros.

- Auditoria completa de 21/09: 186 documentos relidos, 185 IDs canônicos, 39 matérias.
  Matriz em docs/DRIVE_SYNC_AUDIT.json; 180 sem alterações, DA-014 revisada,
  DA-015–018 novas (todas concluídas). Demais matérias conferidas sem diferenças.
  Captura completa: output/drive-audit-20260921, fora do repo. Word conferido por
  texto integral (conector move tabelas ao final); ES-003 mantém duas versões.
  Próximos tópicos sem documento não são publicados. Questões/flashcards importados
  continuam em leitura; não há botões dedicados anterior/próxima aula.

- Lote 22/09: 28 novas e 17 revisadas em 20 matérias; 209 canônicas + demo,
  39 cartões. Captura: output/drive-publish-20260922; inventário/hashes atualizados.
  Auditoria ortográfica global solicitada ainda pendente; não confundir com sync.
  Validação 23/09: TypeScript/lint/18 testes/build/PWA OK; 45 textos completos,
  20 matérias, 39 cartões, desktop/mobile e zero erros locais.
  Publicado em 23/09: 0eac80199e27503a26e4ac8d91ed376744fec8ae; Actions 35902061209 OK.
  Público: 45 textos integrais, 20 matérias, desktop/mobile OK, zero erros.


## Publicação editorial 2026-10-14
Base main: 38e328ab8d0ab3a2f580bc1ca845b17d6c051710. CI anterior 38401972276 FAIL: inventário JSON truncado no transporte. Restaurado do snapshot completo preservado; nenhum conteúdo/progresso apagado.
Integrados integralmente PW-004/PW-006 revisados e PW-007/PW-008/PW-009 novos, fontes nativas Google Drive e gate E63. Catálogo: 308 IDs canônicos.
TypeScript/lint/18 testes/build/PWA PASS. Não executado Edge. Lote anterior de 39 aulas ainda aguardava deploy após primeiro lote de 10. Este commit recupera a publicação dessas 39 e acrescenta 5; não contar as 10 anteriores novamente.
Arquivos: inventário e TS/JSON das cinco PW; este checkpoint. Push/deploy/verificação HTTP pendentes nesta entrada.
Próxima ação exata: acompanhar Actions do novo commit; comparar SHA256 de dist/assets com os assets HTTP e registrar recibo em ESTADO_ATUAL da planilha canônica. Pendências editoriais: ES-003 preservar versão Word; ES-002/AGP-005/RLM-003 em produção; MC-014/015/016 vinculados à Central, pendentes de pacote próprio.
