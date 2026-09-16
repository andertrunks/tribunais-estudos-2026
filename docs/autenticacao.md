# Conta e sincronização

Google via Supabase Auth, fluxo PKCE, sessão persistente e renovação automática.
O estudo sem login continua disponível. Logout usa `scope: local`, sem encerrar
sessões do Rincão ou de outros dispositivos. Nenhuma API privada entra no cache PWA.

## Configuração pública

`VITE_SUPABASE_URL` e `VITE_SUPABASE_PUBLISHABLE_KEY` (ou
`VITE_SUPABASE_ANON_KEY` para a chave pública legada). O Work deixou um fallback
público em `src/config/supabase.public.ts`. Não é necessário inventar valores.
Nunca usar service_role, segredo OAuth ou chave secreta no frontend. `.env*` está
ignorado. Valores do Vite são incorporados ao build e são públicos.

No Supabase, confirmar Google habilitado e permitir o retorno para
`https://andertrunks.github.io/tribunais-estudos-2026/`. Para testes locais,
permitir `http://127.0.0.1:4173/tribunais-estudos-2026/` e a porta de desenvolvimento
utilizada. O segredo do Google pertence exclusivamente ao painel do provedor.

## Dados e isolamento

Migração preservada: `supabase/migrations/20260914223033_tribunais_progress_sync.sql`.
Tabela exclusiva `public.tribunais_progress`; nenhuma tabela do Rincão é utilizada.
RLS habilitado e forçado, acesso apenas de usuários autenticados com `auth.uid()`
igual a `user_id` para SELECT, INSERT, UPDATE e DELETE.

Visitante continua na chave `tribunais-estudos:v1`. Conta usa
`tribunais-estudos:v1:user:<id>`; baseline e marcador de importação são separados.
A sessão usa `tribunais-estudos-auth`. Ao sair, a interface retorna ao histórico
de visitante. O cache da conta permanece para a próxima entrada nessa conta.

## Regra de merge

Na primeira entrada em cada conta neste navegador, copia-se o histórico de
visitante uma vez, mantendo o original. É informado na tela de login.
Estudos de visitante feitos depois podem ser adicionados pelo botão da conta
“Adicionar progresso de visitante”, também sem apagar o original.
Na primeira sincronização sem baseline, a união preserva aulas, respostas,
erros e revisões de ambos os lados. Em conflitos de respostas, prevalece a cópia
local; observação remota não vazia e revisão concluída são preservadas quando a
cópia local está vazia ou pendente.

Depois, o merge compara três versões: baseline da última sincronização, local e
remota. Somente mudanças locais desde o baseline substituem os mesmos itens
remotos; os demais itens acompanham o remoto. Isso permite desfazer conclusão
ou editar observações sem ressuscitar estados antigos. Em conflito simultâneo
no mesmo item, a mudança local prevalece; itens distintos são mantidos.

Gravações remotas comparam `updated_at` e repetem a leitura quando outro
dispositivo gravou primeiro. Sincronizações locais são serializadas. Edições
durante uma requisição são reaplicadas antes de atualizar a tela. Respostas
atrasadas de uma conta anterior são ignoradas. Falhas preservam o cache; nova
conexão ou o botão da conta permite tentar novamente.

## Antes de publicar

Validar OAuth real com uma conta Google e a lista de URLs de retorno no painel.
Não confundir testes com provedor simulado com autenticação real. OAuth real
local validado em 16/09/2026: retorno à aula, sessão/reload, importação,
sincronização, isolamento de visitante/conta e logout. Produção deve ser
conferida após deploy. Publicação depende da autorização vigente da sessão.
