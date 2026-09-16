# Tribunais Estudos 2026

Plataforma gratuita com React 18, TypeScript, Vite e PWA. Estudo local sem conta e autenticação/sincronização opcionais via Supabase.

## Desenvolvimento

Node 22. Execute `npm ci`, `npm run dev`. Validações: `npm run typecheck`, `npm run lint`, `npm test`, `npm run build`.

## Estrutura

- `src/types`: modelos editoriais e de progresso.
- `src/data`: catálogo independente da interface.
- `src/components`: elementos reutilizáveis.
- `src/hooks` e `src/services`: progresso e armazenamento local versionado.
- `src/App.tsx`: composição e páginas.

Uma aula é vinculada a vários cargos pelo mesmo ID. Extensões específicas pertencem à aula. Os vínculos iniciais são demonstrativos. Nenhum edital foi confirmado. A trilha suplementar não entra em cobertura oficial. O progresso mede aulas disponíveis e últimas respostas, não cobertura de edital.

## Como adicionar uma nova aula

1. Crie um arquivo TypeScript em `src/content/aulas/<materia>/`.
2. Exporte uma aula compatível com `Aula` como export default.
3. Preencha `materiaId`, `topicoId`, `cargoIds`, `editalRefs`, `sourceRefs`, `status` e o conteúdo de `secoes` usando IDs existentes.
4. Execute `npm.cmd run typecheck`, `npm.cmd run lint`, `npm.cmd test` e `npm.cmd run build`.
5. Faça commit e push depois das validações.

Exemplo mínimo:

```ts
import type { Aula } from "../../../types";

const aula: Aula = {
  id: "portugues-002-tipologia",
  titulo: "Tipologia textual",
  materiaId: "portugues",
  topicoId: "portugues-2",
  cargoIds: [],
  editalRefs: [],
  sourceRefs: [],
  status: "nao_iniciado",
  tipo: "compartilhado",
  demonstracao: false,
  extensoes: [],
  secoes: [],
};

export default aula;
```

O carregador em `src/data/aulas.ts` usa `import.meta.glob` para descobrir os arquivos durante o build. Não é necessário editar `catalogo.ts`, componentes React, `aulaIds` ou um índice manual.

## Publicação

GitHub Pages por Actions, branch main. Base `/tribunais-estudos-2026/`. Rotas hash permitem refresh e links diretos sem regras de servidor. Manifest e service worker usam a mesma base. O primeiro acesso deve ocorrer online para o cache ser preenchido.

## Limitações

Uma aula e uma questão inédita demonstrativas, produzidas por IA e pendentes de revisão. Sem questões reais ou auditoria documental. Limpar dados remove histórico ainda não sincronizado. As revisões são manuais. Simulados são treinos de demonstração com banco inicial de uma questão.

## Autenticação opcional

Veja [configuração, isolamento e regra de merge](docs/autenticacao.md). No Windows, use `npm.cmd` para os comandos de desenvolvimento e validação.
