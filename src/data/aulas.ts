/// <reference types="vite/client" />

import type { Aula } from "../types";

const modules = import.meta.glob("../content/aulas/**/*.ts", {
  eager: true,
  import: "default",
}) as Record<string, Aula>;

export const aulas: Aula[] = Object.values(modules).sort((a, b) =>
  a.id.localeCompare(b.id, "pt-BR", { numeric: true }),
);
