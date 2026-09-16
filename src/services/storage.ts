import type { Progresso } from "../types";
export const key = "tribunais-estudos:v1";
export const vazio: Progresso = {
  aulas: [],
  respostas: {},
  erros: [],
  revisoes: [],
};
export function progressKey(userId?: string | null) {
  return userId ? `${key}:user:${userId}` : key;
}
export function ler(storageKey = key): Progresso {
  try {
    const p = JSON.parse(localStorage.getItem(storageKey) || "null");
    if (
      !p ||
      !Array.isArray(p.aulas) ||
      !p.respostas ||
      typeof p.respostas !== "object" ||
      !Array.isArray(p.erros) ||
      !Array.isArray(p.revisoes)
    )
      return vazio;
    return p;
  } catch {
    return vazio;
  }
}
export function salvar(p: Progresso, storageKey = key): boolean {
  try {
    localStorage.setItem(storageKey, JSON.stringify(p));
    return true;
  } catch {
    return false;
  }
}
