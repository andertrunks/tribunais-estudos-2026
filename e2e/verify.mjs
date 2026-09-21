import { chromium } from "@playwright/test";
import assert from "node:assert/strict";
import fs from "node:fs";
const base = process.argv[2] || "http://127.0.0.1:4173/tribunais-estudos-2026/";
const out = process.argv[3] || "../../";
fs.mkdirSync(out, { recursive: true });
const browser = await chromium.launch({ channel: "chrome", headless: true, args: ["--disable-gpu"] });
const context = await browser.newContext({
  viewport: { width: 1440, height: 1000 },
});
const page = await context.newPage();
const errors = [],
  badAssets = [];
page.on("pageerror", (e) => errors.push(e.message));
page.on("console", (m) => {
  if (m.type() === "error") errors.push(m.text());
});
page.on("response", (r) => {
  if (r.url().startsWith(base) && r.status() >= 400)
    badAssets.push(`${r.status()} ${r.url()}`);
});
const checks = [];
async function route(path, title) {
  await page.goto(base + "#/" + path);
  await page
    .getByRole("heading", { name: title, exact: true, level: 1 })
    .waitFor();
  assert.equal(
    await page.locator("body").evaluate((e) => e.scrollWidth <= innerWidth),
    true,
    `overflow ${path}`,
  );
  checks.push("Rota: " + (path || "início"));
  console.log("OK", path || "início");
}
try {
  await route("", "Estude uma vez. Avance em vários concursos.");
  await page.screenshot({ path: out + "/desktop.png", fullPage: true });
  await route("materias", "Matérias");
  await page.getByRole("textbox", { name: "Buscar matéria" }).fill("SQL");
  assert.equal(await page.locator(".subject-card").count(), 1);
  await route("materias/portugues", "Língua Portuguesa");
  await page.locator('a[href="#/aulas/interpretacao"]').click();
  await page
    .getByRole("heading", {
      name: "Compreensão e interpretação de textos",
      level: 1,
      exact: true,
    })
    .waitFor();
  await page.getByRole("button", { name: /TOQUE PARA VIRAR/ }).click();
  await page
    .getByText("É uma conclusão sustentada por pistas do texto.", {
      exact: true,
    })
    .waitFor();
  await page.getByRole("radio").nth(0).check();
  await page.getByText("Vamos revisar este ponto.", { exact: true }).waitFor();
  await page
    .getByRole("button", { name: "Marcar aula como concluída" })
    .click();
  await page.getByRole("button", { name: "Revisar depois" }).click();
  await page.reload();
  await page.getByRole("button", { name: "Concluída · desfazer" }).waitFor();
  assert.equal(await page.getByRole("radio").nth(0).isChecked(), true);
  checks.push(
    "Aula: flashcard, resposta incorreta, conclusão, revisão e persistência",
  );
  await route("erros", "Caderno de Erros");
  await page
    .getByRole("textbox", { name: "Observação pessoal" })
    .fill("Rever o significado de principalmente.");
  await page.reload();
  assert.equal(
    await page
      .getByRole("textbox", { name: "Observação pessoal" })
      .inputValue(),
    "Rever o significado de principalmente.",
  );
  await page
    .getByRole("combobox", { name: "Filtrar erros por matéria" })
    .selectOption("sql");
  await page
    .getByRole("heading", { name: "Nenhum erro registrado por aqui" })
    .waitFor();
  checks.push("Caderno: registro automático, observação persistente e filtro");
  await route("revisoes", "Revisões");
  await page.getByRole("button", { name: "Marcar revisada" }).click();
  assert.equal(
    await page.getByRole("button", { name: "Marcar revisada" }).count(),
    0,
  );
  await route("progresso", "Meu Progresso");
  await page.getByText("100%", { exact: true }).waitFor();
  await route("cargos", "Cargos e Editais");
  assert.equal(await page.locator(".career-card").count(), 8);
  await page.locator(".career-card").first().click();
  await page.getByRole("heading", { name: "Referência documental" }).waitFor();
  assert.equal(
    await page
      .getByText("Aguardando confirmação documental", { exact: true })
      .count(),
    5,
  );
  await route("simulados", "Simulados");
  await page
    .getByRole("button", { name: "Questões reais comprovadas", exact: true })
    .click();
  assert.equal(
    await page.getByRole("button", { name: "Iniciar treino" }).isDisabled(),
    true,
  );
  await page
    .getByRole("button", { name: "Erros anteriores", exact: true })
    .click();
  await page.getByRole("button", { name: "Iniciar treino" }).click();
  await page.getByRole("radio").nth(1).check();
  await page.getByText("Resposta correta!", { exact: true }).waitFor();
  checks.push("Simulado: filtros, banco real vazio e resposta correta");
  await route("fontes", "Fontes");
  assert.equal(await page.locator(".source-card").count(), 8);
  await route("sobre", "Sobre o Projeto");
  await route("materias/matematica-basica", "Matemática Básica");
  assert.equal(await page.locator(".topic-row").count(), 19);
  await page.setViewportSize({ width: 390, height: 844 });
  for (const [path, title] of [
    ["", "Estude uma vez. Avance em vários concursos."],
    ["materias", "Matérias"],
    ["aulas/interpretacao", "Compreensão e interpretação de textos"],
    ["cargos", "Cargos e Editais"],
    ["progresso", "Meu Progresso"],
    ["erros", "Caderno de Erros"],
    ["revisoes", "Revisões"],
    ["simulados", "Simulados"],
    ["fontes", "Fontes"],
  ])
    await route(path, title);
  await page.goto(base + "#/");
  await page.getByRole("button", { name: "Abrir menu" }).click();
  await page
    .getByRole("navigation", { name: "Menu principal" })
    .getByRole("link", { name: "Matérias", exact: true })
    .click();
  await page
    .getByRole("heading", { name: "Matérias", level: 1, exact: true })
    .waitFor();
  assert.equal(
    await page
      .getByRole("button", { name: "Abrir menu" })
      .getAttribute("aria-expanded"),
    "false",
  );
  await page.goto(base + "#/");
  await page.screenshot({ path: out + "/mobile.png", fullPage: true });
  checks.push("Mobile 390px: menu e nove telas sem rolagem horizontal");
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto(base + "#/aulas/interpretacao");
  await page.screenshot({ path: out + "/aula.png", fullPage: true });
  const manifestResponse = await page.request.get(
    base + "manifest.webmanifest",
  );
  assert.equal(manifestResponse.status(), 200);
  const manifest = await manifestResponse.json();
  assert.equal(manifest.start_url, "/tribunais-estudos-2026/#/");
  for (const icon of manifest.icons) {
    const response = await page.request.get(base + icon.src);
    assert.equal(response.status(), 200);
    assert.ok((await response.body()).length > 500);
  }
  await page.evaluate(() => navigator.serviceWorker.ready);
  await page.reload();
  await page.waitForFunction(() => !!navigator.serviceWorker.controller);
  checks.push("PWA: manifest, ícones e service worker ativo");
  assert.deepEqual(badAssets, []);
  assert.deepEqual(errors, []);
  await context.setOffline(true);
  await page.reload();
  await page
    .getByRole("heading", {
      name: "Compreensão e interpretação de textos",
      exact: true,
      level: 1,
    })
    .waitFor();
  await page.getByRole("link", { name: "Meu Progresso", exact: true }).click();
  await page
    .getByRole("heading", { name: "Meu Progresso", exact: true, level: 1 })
    .waitFor();
  checks.push("Offline: recarga da aula e navegação para progresso");
  await context.setOffline(false);
  const result = {
    url: base,
    checks,
    consoleErrors: errors,
    assetErrors: badAssets,
    date: new Date().toISOString(),
  };
  fs.writeFileSync(out + "/validacao.json", JSON.stringify(result, null, 2));
  console.log(JSON.stringify(result, null, 2));
} finally {
  await browser.close();
}
