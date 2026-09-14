import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import ts from "typescript";
const src = fs.readFileSync("src/data/catalogo.ts", "utf8");
const js = ts.transpileModule(src, {
  compilerOptions: {
    module: ts.ModuleKind.ESNext,
    target: ts.ScriptTarget.ES2022,
  },
}).outputText;
const { aulas, topicos, cargos, materias, questoes, editais } = await import(
  "data:text/javascript;base64," + Buffer.from(js).toString("base64")
);
test("shared lessons reference valid entities without duplication", () => {
  assert.equal(new Set(aulas.map((a) => a.id)).size, aulas.length);
  assert.equal(cargos.length, 8);
  for (const a of aulas) {
    assert.ok(materias.some((m) => m.id === a.materiaId));
    assert.ok(topicos.some((t) => t.id === a.topicoId));
    assert.ok(a.cargoIds.every((id) => cargos.some((c) => c.id === id)));
  }
  assert.ok(aulas[0].cargoIds.length > 1);
});
test("supplementary track is explicit and has no asserted edital coverage", () => {
  const ts = topicos.filter((t) => t.materiaId === "matematica-basica");
  assert.equal(ts.length, 19);
  assert.ok(
    ts.every((t) => t.tipo === "suplementar" && t.editalRefs.length === 0),
  );
  assert.equal(editais.length, 0);
});
test("questions have valid keys and real questions require provenance", () => {
  for (const q of questoes) {
    assert.ok(q.correta >= 0 && q.correta < q.alternativas.length);
    if (q.tipo === "real")
      for (const field of ["banca", "ano", "orgao", "cargo", "prova", "fonte"])
        assert.ok(q[field]);
  }
});
