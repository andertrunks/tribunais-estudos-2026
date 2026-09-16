# Continuidade do projeto

Leia primeiro `docs/WORK_CHECKPOINT.md`, depois status/diff do Git e somente
arquivos relacionados à tarefa. Faça nova auditoria ampla apenas se mudanças
estruturais relevantes tornarem o checkpoint obsoleto. Atualize-o ao terminar.

Google Drive é a fonte editorial canônica. Não reescreva aulas existentes.
Importe conteúdo completo em lotes de 5–10, sem inventar metadados. Preserve
`src/content/aulas/<materia>/*.ts`, descoberta automática e relações por IDs.
Matemática Básica/MB-* é suplementar e não aumenta cobertura do edital.

Use `npm.cmd` no Windows. Conteúdo: typecheck/test/build; lint se código ou CI
exigir. Teste visual só das telas afetadas. Não repita E2E, consultas Supabase,
pesquisa web ou leituras amplas sem mudança que justifique. Sem refatoração
preventiva, troca de framework/banco/hospedagem, force push ou secrets.

Deploy principal: GitHub Actions → Pages, main. Respeite a autorização vigente
da sessão para commit/push/deploy. Não publicar sem autorização vigente.
