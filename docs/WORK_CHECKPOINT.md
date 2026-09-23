# Tribunais Estudos 2026 — checkpoint operacional

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
