import { useEffect, useState } from "react";
import { ler, salvar } from "../services/storage";
import type { Progresso, Questao } from "../types";
export function useProgresso() {
  const [p, setP] = useState(ler);
  const [erroStorage, setErroStorage] = useState(false);
  useEffect(() => {
    setErroStorage(!salvar(p));
  }, [p]);
  function atualizar(fn: (p: Progresso) => Progresso) {
    setP(fn);
  }
  return {
    p,
    erroStorage,
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
