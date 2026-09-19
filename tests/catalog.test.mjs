import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import ts from "typescript";

const root = process.cwd();
function loadTypeScript(filePath, lessons) {
  const source = fs.readFileSync(filePath, "utf8");
  let js = ts.transpileModule(source, {
    compilerOptions: {
      module: ts.ModuleKind.ESNext,
      target: ts.ScriptTarget.ES2022,
    },
  }).outputText;
  if (lessons) js = js.replace('import { aulas } from "./aulas";', `const aulas = ${JSON.stringify(lessons)};`);
  return import(
    "data:text/javascript;base64," + Buffer.from(js).toString("base64")
  );
}
function filesIn(directory) {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const filePath = path.join(directory, entry.name);
    return entry.isDirectory() ? filesIn(filePath) : [filePath];
  });
}

const aulaDirectory = path.join(root, "src/content/aulas");
const aulaFiles = filesIn(aulaDirectory).filter((filePath) =>
  filePath.endsWith(".ts"),
);
const aulas = (await Promise.all(aulaFiles.map(loadTypeScript))).map(
  (module) => module.default,
);
const catalog = await loadTypeScript(path.join(root, "src/data/catalogo.ts"), aulas);
const { topicos, cargos, materias, questoes, editais, fontes } = catalog;

test("loader discovers TypeScript lessons without a manual index", () => {
  const loader = fs.readFileSync(path.join(root, "src/data/aulas.ts"), "utf8");
  assert.match(
    loader,
    /import\.meta\.glob\("\.\.\/content\/aulas\/\*\*\/\*\.ts"/,
  );
  assert.ok(
    aulaFiles.some((filePath) =>
      filePath.endsWith("portugues-001-interpretacao.ts"),
    ),
  );
  assert.equal(aulas.length, aulaFiles.length);
  assert.ok(aulas.some(a => a.id === "interpretacao"));
});

test("lessons reference valid entities without duplication", () => {
  assert.equal(new Set(aulas.map((aula) => aula.id)).size, aulas.length);
  assert.equal(cargos.length, 8);
  for (const aula of aulas) {
    const materia = materias.find((item) => item.id === aula.materiaId);
    const topico = topicos.find((item) => item.id === aula.topicoId);
    assert.ok(materia);
    assert.ok(topico);
    assert.equal(topico.materiaId, aula.materiaId);
    if (aula.demonstracao) assert.ok(
      aula.cargoIds.every((id) => cargos.some((cargo) => cargo.id === id)),
    );
    if (aula.demonstracao) assert.ok(
      aula.sourceRefs.every((id) => fontes.some((fonte) => fonte.id === id)),
    );
    if (aula.demonstracao) assert.ok(
      aula.editalRefs.every((id) => editais.some((edital) => edital.id === id)),
    );
  }
  assert.ok(aulas.find(a => a.id === "interpretacao").cargoIds.length > 1);
});

test("materias and topicos derive their lessons by IDs", () => {
  const materiaAulas = aulas.filter((aula) => aula.materiaId === "portugues");
  const topicoAulas = aulas.filter((aula) => aula.topicoId === "portugues-1");
  assert.ok(materiaAulas.length > topicoAulas.length);
  assert.ok(materiaAulas.some(a => a.id === "LP-001"));
  assert.equal(topicoAulas[0].id, "interpretacao");
});

test("supplementary track is explicit and has no asserted edital coverage", () => {
  const supplementaryTopics = topicos.filter(
    (topico) => topico.materiaId === "matematica-basica",
  );
  assert.ok(supplementaryTopics.length >= 19);
  assert.ok(
    supplementaryTopics.every(
      (topico) =>
        topico.tipo === "suplementar" && topico.editalRefs.length === 0,
    ),
  );
  assert.equal(editais.length, 0);
});

test("questions have valid keys and optional lesson links", () => {
  for (const question of questoes) {
    assert.ok(
      question.correta >= 0 && question.correta < question.alternativas.length,
    );
    if (question.aulaId)
      assert.ok(aulas.some((aula) => aula.id === question.aulaId));
    if (question.tipo === "real")
      for (const field of ["banca", "ano", "orgao", "cargo", "prova", "fonte"])
        assert.ok(question[field]);
  }
});
