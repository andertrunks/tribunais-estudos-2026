import type { SupabaseClient } from "@supabase/supabase-js";
import type { Progresso } from "../types";
import { vazio } from "./storage";

export type RemoteRow = { data: Progresso; updated_at: string };

function valid(value: unknown): value is Progresso {
  if (!value || typeof value !== "object") return false;
  const p = value as Partial<Progresso>;
  return (
    Array.isArray(p.aulas) && p.aulas.every(id => typeof id === "string") &&
    !!p.respostas &&
    typeof p.respostas === "object" && !Array.isArray(p.respostas) && Object.values(p.respostas).every(n => Number.isInteger(n)) &&
    Array.isArray(p.erros) && p.erros.every(e => e && [e.id, e.materiaId, e.topicoId, e.questaoId, e.erro, e.correta, e.explicacao, e.observacao].every(v => typeof v === "string") && typeof e.revisar === "boolean") &&
    Array.isArray(p.revisoes) && p.revisoes.every(r => r && typeof r.aulaId === "string" && typeof r.data === "string" && (r.revisadaEm === undefined || typeof r.revisadaEm === "string"))
  );
}

export function mergeProgress(local: Progresso, remote: Progresso, base?: Progresso): Progresso {
  const equal = (a: unknown, b: unknown) => JSON.stringify(a) === JSON.stringify(b);
  function records<T>(l: Record<string, T>, r: Record<string, T>, b?: Record<string, T>) {
    const result = { ...r };
    for (const id of new Set([...Object.keys(l), ...Object.keys(b ?? {})])) {
      if (!b || !equal(l[id], b[id])) {
        if (l[id] === undefined) delete result[id];
        else result[id] = l[id];
      }
    }
    return result;
  }
  const completed = (p: Progresso) => Object.fromEntries(p.aulas.map(id => [id, true]));
  const errors = (p: Progresso) => Object.fromEntries(p.erros.map(e => [e.id, e]));
  const reviews = (p: Progresso) => Object.fromEntries(p.revisoes.map(r => [r.aulaId, r]));
  const erros = records(errors(local), errors(remote), base && errors(base));
  const revisoes = records(reviews(local), reviews(remote), base && reviews(base));
  if (!base) {
    for (const e of remote.erros) {
      if (erros[e.id] && !erros[e.id].observacao && e.observacao) erros[e.id] = { ...erros[e.id], observacao: e.observacao };
    }
    for (const r of remote.revisoes) {
      if (r.revisadaEm && revisoes[r.aulaId] && !revisoes[r.aulaId].revisadaEm) revisoes[r.aulaId] = r;
    }
  }
  return {
    aulas: base ? Object.keys(records(completed(local), completed(remote), completed(base))) : [...new Set([...remote.aulas, ...local.aulas])],
    respostas: records(local.respostas, remote.respostas, base?.respostas),
    erros: Object.values(erros),
    revisoes: Object.values(revisoes),
  };
}

export async function pullProgress(client: SupabaseClient, userId: string) {
  const result = await client
    .from("tribunais_progress")
    .select("data,updated_at")
    .eq("user_id", userId)
    .maybeSingle();
  if (result.error)
    throw new Error(`Leitura do progresso: ${result.error.message}`);
  const row = result.data as RemoteRow | null;
  if (row && !valid(row.data)) throw new Error("Progresso remoto inválido. Os dados locais foram preservados.");
  return row;
}

export async function pushProgress(
  client: SupabaseClient,
  userId: string,
  data: Progresso,
  previous: RemoteRow | null,
) {
  const timestamp = Math.max(Date.now(), previous ? Date.parse(previous.updated_at) + 1 : 0);
  const row = { user_id: userId, data, updated_at: new Date(timestamp).toISOString() };
  if (!previous) {
    const result = await client.from("tribunais_progress").insert(row);
    if (result.error?.code === "23505") return false;
    if (result.error) throw new Error(`Sincronização do progresso: ${result.error.message}`);
    return true;
  }
  const result = await client.from("tribunais_progress").update(row).eq("user_id", userId).eq("updated_at", previous.updated_at).select("user_id");
  if (result.error)
    throw new Error(`Sincronização do progresso: ${result.error.message}`);
  return Boolean(result.data?.length);
}

export { vazio };
