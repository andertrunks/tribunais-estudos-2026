# Tribunais Estudos 2026 — checkpoint operacional

Atualizado: 16/09/2026. Leia este arquivo primeiro; depois status/diff e somente
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
  com [skip ci], sem mudar aplicação ou repetir deploy. Nenhuma aula importada.
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
- Limitações: 1 aula/questão demo; auditoria editorial pendente; renderizador deverá
  evoluir genericamente se conteúdo completo exigir. Em PWA previamente aberto,
  primeira recarga instala update; próxima carrega nova versão, sem limpar progresso.
- Próxima tarefa: criar inventário único do conteúdo editorial no Drive,
  confrontando IDs existentes. Aguardar próxima execução; não importar nesta.
