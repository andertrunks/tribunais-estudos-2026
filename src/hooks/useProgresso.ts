import { useCallback, useEffect, useRef, useState } from "react";
import { useAuth } from "../auth/useAuth";
import { supabase } from "../lib/supabase";
import {
  mergeProgress,
  pullProgress,
  pushProgress,
} from "../services/cloudSync";
import { ler, salvar, progressKey, vazio } from "../services/storage";
import type { Progresso, Questao } from "../types";
export function useProgresso() {
  const [p, setP] = useState(() => ler());
  const [erroStorage, setErroStorage] = useState(false);
  const [syncStatus, setSyncStatus] = useState<
    "guest" | "syncing" | "synced" | "error"
  >("guest");
  const [syncMessage, setSyncMessage] = useState(
    "Entre para sincronizar em outros dispositivos",
  );
  const { user, loading: authLoading } = useAuth();
  const account = useRef<string | null>(null);
  const current = useRef(p);
  const baseline = useRef<Progresso | undefined>();
  const generation = useRef(0);
  const running = useRef(false);
  const requested = useRef(false);

  const syncNow = useCallback(
    async () => {
      const client = supabase;
      const userId = account.current;
      if (!client || !userId) return;
      requested.current = true;
      if (running.current) return;
      running.current = true;
      const epoch = generation.current;
      setSyncStatus("syncing");
      setSyncMessage("Sincronizando seu progresso…");
      try {
        let attempts = 0;
        while (requested.current && epoch === generation.current) {
          if (++attempts > 8) throw new Error("O progresso mudou em outro dispositivo. Tente sincronizar novamente.");
          requested.current = false;
          const remote = await pullProgress(client, userId);
          if (epoch !== generation.current) return;
          const snapshot = current.current;
          const merged = mergeProgress(snapshot, remote?.data ?? vazio, baseline.current);
          if (!await pushProgress(client, userId, merged, remote)) {
            requested.current = true;
            continue;
          }
          if (epoch !== generation.current) return;
          // Keep edits made while the network request was running.
          const next = mergeProgress(current.current, merged, snapshot);
          baseline.current = merged;
          const storageKey = progressKey(userId);
          const saved = salvar(next, storageKey) && salvar(merged, `${storageKey}:baseline`);
          setErroStorage(!saved);
          if (JSON.stringify(current.current) !== JSON.stringify(next)) {
            current.current = next;
            setP(next);
          }
          if (JSON.stringify(next) !== JSON.stringify(merged)) requested.current = true;
        }
        if (epoch !== generation.current) return;
        setSyncStatus("synced");
        setSyncMessage("Progresso sincronizado");
      } catch (cause) {
        if (epoch !== generation.current) return;
        setSyncStatus("error");
        setSyncMessage(
          cause instanceof Error
            ? cause.message
            : "Não foi possível sincronizar agora",
        );
      } finally {
        running.current = false;
      }
    },
    [],
  );

  useEffect(() => {
    if (authLoading) return;
    generation.current += 1;
    account.current = user?.id ?? null;
    const storageKey = progressKey(account.current);
    baseline.current = undefined;
    if (user) {
      try {
        if (localStorage.getItem(`${storageKey}:baseline`)) baseline.current = ler(`${storageKey}:baseline`);
      } catch { /* Local study remains available if storage is blocked. */ }
    }
    let next = ler(storageKey);
    if (user) {
      try {
        if (!localStorage.getItem(`${storageKey}:guest-imported`)) {
          next = mergeProgress(ler(), next);
          if (salvar(next, storageKey)) localStorage.setItem(`${storageKey}:guest-imported`, "1");
        }
      } catch { /* Never clear the visitor cache. */ }
    }
    current.current = next;
    setP(next);
    if (!user) {
      setSyncStatus("guest");
      setSyncMessage("Entre para sincronizar em outros dispositivos");
      return;
    }
    const timer = window.setInterval(() => {
      if (!running.current) { window.clearInterval(timer); void syncNow(); }
    }, 100);
    return () => window.clearInterval(timer);
  }, [authLoading, user?.id, syncNow]);

  useEffect(() => {
    if (!user || account.current !== user.id) return;
    const timer = window.setTimeout(() => void syncNow(), 650);
    return () => window.clearTimeout(timer);
  }, [p, syncNow, user]);

  useEffect(() => {
    const reconnect = () => void syncNow();
    window.addEventListener("online", reconnect);
    return () => window.removeEventListener("online", reconnect);
  }, [syncNow]);

  function atualizar(fn: (p: Progresso) => Progresso) {
    const next = fn(current.current);
    current.current = next;
    setErroStorage(!salvar(next, progressKey(account.current)));
    setP(next);
  }
  return {
    p,
    erroStorage,
    syncStatus,
    syncMessage,
    syncNow,
    importGuest: () => {
      if (!account.current) return;
      atualizar(old => mergeProgress(ler(), old));
      void syncNow();
    },
    atualizar,
    concluir: (id: string) =>
      atualizar((old) => ({
        ...old,
        aulas: old.aulas.includes(id)
          ? old.aulas.filter((a) => a !== id)
          : [...old.aulas, id],
      })),
    responder: (q: Questao, n: number) =>
      atualizar((old) => ({
        ...old,
        respostas: { ...old.respostas, [q.id]: n },
        erros:
          n === q.correta || old.erros.some((e) => e.questaoId === q.id)
            ? old.erros
            : [
                ...old.erros,
                {
                  id: q.id,
                  materiaId: q.materiaId,
                  topicoId: q.topicoId,
                  questaoId: q.id,
                  erro: q.alternativas[n],
                  correta: q.alternativas[q.correta],
                  explicacao: q.explicacao,
                  observacao: "",
                  revisar: true,
                },
              ],
      })),
    agendar: (id: string) =>
      atualizar((old) => ({
        ...old,
        revisoes: old.revisoes.some((r) => r.aulaId === id && !r.revisadaEm)
          ? old.revisoes
          : [
              ...old.revisoes.filter((r) => r.aulaId !== id),
              { aulaId: id, data: new Date().toISOString() },
            ],
      })),
  };
}
