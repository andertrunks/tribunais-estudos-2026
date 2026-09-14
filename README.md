# Tribunais Estudos 2026

Plataforma gratuita, sem backend, com React 18, TypeScript, Vite e PWA.

## Desenvolvimento

Node 22. Execute `npm ci`, `npm run dev`. Validações: `npm run typecheck`, `npm run lint`, `npm test`, `npm run build`.

## Estrutura

- `src/types`: modelos editoriais e de progresso.
- `src/data`: catálogo independente da interface.
- `src/components`: elementos reutilizáveis.
- `src/hooks` e `src/services`: progresso e armazenamento local versionado.
- `src/App.tsx`: composição e páginas.

Uma aula é vinculada a vários cargos pelo mesmo ID. Extensões específicas pertencem à aula. Os vínculos iniciais são demonstrativos. Nenhum edital foi confirmado. A trilha suplementar não entra em cobertura oficial. O progresso mede aulas disponíveis e últimas respostas, não cobertura de edital.

## Publicação

GitHub Pages por Actions, branch main. Base `/tribunais-estudos-2026/`. Rotas hash permitem refresh e links diretos sem regras de servidor. Manifest e service worker usam a mesma base. O primeiro acesso deve ocorrer online para o cache ser preenchido.

## Limitações

Uma aula e uma questão inédita demonstrativas, produzidas por IA e pendentes de revisão. Sem questões reais ou auditoria documental. Armazenamento apenas no navegador; limpar dados remove histórico. As revisões são manuais. Simulados são treinos de demonstração com banco inicial de uma questão.
