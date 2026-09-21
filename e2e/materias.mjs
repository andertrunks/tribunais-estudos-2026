import { chromium } from "@playwright/test";
import assert from "node:assert/strict";
import fs from "node:fs";
const base = process.argv[2] || "http://127.0.0.1:4173/tribunais-estudos-2026/";
const out = process.argv[3] || "test-results/materias";
fs.mkdirSync(out, {recursive:true});
const browser = await chromium.launch({channel:"msedge",headless:true});
const context = await browser.newContext({viewport:{width:1440,height:1000}});
const page = await context.newPage();
const errors=[];
page.on("pageerror",e=>errors.push(e.message));
page.on("console",m=>{if(m.type()==="error") errors.push(m.text());});
page.on("response",r=>{if(r.url().startsWith(base)&&r.status()>=400) errors.push(`${r.status()} ${r.url()}`);});
async function route(path) {
  await page.goto(base+"#/"+path);
  await page.locator("main h1").waitFor();
}
try {
  await route("materias");
  const cards = await page.locator(".subject-card").evaluateAll(nodes=>nodes.map(n=>({href:n.getAttribute("href"),title:n.querySelector("h3").textContent,text:n.textContent})));
  assert.equal(cards.length,39);
  assert.equal(new Set(cards.map(c=>c.title)).size,cards.length);
  assert.ok(cards.every(c=>!c.text.includes("0 tópicos")));
  await page.screenshot({path:out+"/desktop.png"});
  for(const card of cards) {
    await route(card.href.slice(2));
    assert.equal(await page.locator("main h1").textContent(),card.title);
    assert.ok(await page.locator('.topic-list a[href^="#/aulas/"]').count()>0);
  }
  const ids=["portugues","administrativo","bancos-dados","dados-bi","programacao-web","seguranca","redes","redacao-oficial"];
  for(const id of ids) {
    await route("materias/"+id);
    await page.locator('.topic-list a[href^="#/aulas/"]').first().click();
    await page.locator(".lesson h1").waitFor();
    await page.getByRole("button",{name:"Marcar aula como concluída",exact:true}).click();
    await page.reload();
    await page.getByRole("button",{name:"Concluída · desfazer",exact:true}).waitFor();
    await route("materias/"+id);
    assert.match(await page.locator(".subject-summary").textContent(),/1 aulas concluídas/);
  }
  await route("materias/matematica-basica");
  assert.match(await page.locator(".notice.gold").textContent(),/Trilha pedagógica suplementar/);
  await route("materias/civil");
  assert.match(await page.locator(".page-heading").textContent(),/não confirmada/);
  assert.equal(await page.getByText("Vínculo documental",{exact:true}).count(),0);
  for(const id of ["sql","engenharia-dados","data-warehouse","etl","ciencia-dados","ia","desenvolvimento","cloud","infraestrutura","lingua-portuguesa"]) {
    await route("materias/"+id);
    assert.ok(await page.locator(".topic-row").count()>0);
  }
  for(const id of ["ti","legislacao","python"]) {
    await route("materias/"+id);
    assert.equal(await page.locator(".subject-card").count(),39);
  }
  await route("materias/portugues");
  await page.locator('a[href="#/aulas/interpretacao"]').click();
  await page.getByText("DEMONSTRAÇÃO · REVISÃO PENDENTE",{exact:true}).waitFor();
  await route("progresso");
  assert.equal(await page.locator(".progress-row").count(),39);
  const progress = await page.evaluate(()=>JSON.parse(localStorage.getItem("tribunais-estudos:v1")));
  assert.equal(progress.aulas.length,8);
  await route("materias");
  assert.equal(await page.locator('.subject-card [role="progressbar"]').evaluateAll(ns=>ns.filter(n=>Number(n.getAttribute("aria-valuenow"))>0).length),8);
  await page.getByRole("textbox",{name:"Buscar matéria"}).fill("SQL");
  assert.equal(await page.locator(".subject-card").count(),1);
  await page.getByRole("textbox",{name:"Buscar matéria"}).fill("");
  await page.setViewportSize({width:390,height:844});
  await page.screenshot({path:out+"/mobile.png",fullPage:true});
  assert.ok(await page.locator("body").evaluate(n=>n.scrollWidth<=innerWidth));
  await route("materias/redacao-oficial");
  assert.ok(await page.locator("body").evaluate(n=>n.scrollWidth<=innerWidth));
  assert.deepEqual(errors,[]);
  console.log("OK: 39 cartões/rotas, 8 aulas/progresso/reload, aliases, demonstração, busca, mobile; zero erros de console/assets.");
} finally {await browser.close();}
