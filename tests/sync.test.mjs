import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import ts from 'typescript';
function load(path, replacements = {}) {
  let js = ts.transpileModule(fs.readFileSync(path, 'utf8'), { compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 } }).outputText;
  for (const [from, to] of Object.entries(replacements)) js = js.replaceAll(`"${from}"`, JSON.stringify(to));
  return 'data:text/javascript;base64,' + Buffer.from(js).toString('base64');
}
const storageUrl = load('src/services/storage.ts');
const { mergeProgress, pullProgress, pushProgress } = await import(load('src/services/cloudSync.ts', { './storage': storageUrl }));
const { ler, salvar, progressKey } = await import(storageUrl);
const empty = () => ({ aulas: [], respostas: {}, erros: [], revisoes: [] });
const error = { id:'q', materiaId:'pt', topicoId:'t', questaoId:'q', erro:'a', correta:'b', explicacao:'x', observacao:'', revisar:true };

test('initial merge retains both histories and is idempotent', () => {
  const l = { ...empty(), aulas:['a'], respostas:{q:1} }, r = { ...empty(), aulas:['b'], respostas:{r:0} };
  const merged = mergeProgress(l,r);
  assert.deepEqual(new Set(merged.aulas),new Set(['a','b']));
  assert.deepEqual(merged.respostas,{r:0,q:1});
  assert.deepEqual(mergeProgress(merged,r), merged);
  assert.deepEqual(mergeProgress(empty(),l),l);
});
test('empty notes and pending reviews never erase richer initial history', () => {
  const l = { ...empty(), erros:[error], revisoes:[{aulaId:'a',data:'2026-01-01'}] };
  const r = { ...empty(), erros:[{...error,observacao:'guardar'}], revisoes:[{aulaId:'a',data:'2026-01-01',revisadaEm:'2026-01-02'}] };
  const m = mergeProgress(l,r);
  assert.equal(m.erros[0].observacao,'guardar');
  assert.equal(m.revisoes[0].revisadaEm,'2026-01-02');
});
test('three-way merge preserves other device changes and deliberate local undo', () => {
  const b = { ...empty(), aulas:['a'], respostas:{q:0} };
  const l = { ...empty(), respostas:{q:1} };
  const r = { ...b, aulas:['a','b'], respostas:{q:0,r:2} };
  assert.deepEqual(mergeProgress(l,r,b),{ ...empty(), aulas:['b'], respostas:{q:1,r:2} });
});
test('edits made while a request runs survive the returned snapshot', () => {
  const snapshot = { ...empty(), aulas:['a'] };
  const current = { ...snapshot, aulas:['a','c'] };
  const remote = { ...snapshot, aulas:['a','b'] };
  assert.deepEqual(new Set(mergeProgress(current,remote,snapshot).aulas),new Set(['a','b','c']));
});
test('guest and account caches remain isolated and guest data is preserved', () => {
  const data = new Map();
  globalThis.localStorage = { getItem:k=>data.get(k)??null,setItem:(k,v)=>data.set(k,v) };
  const guest = { ...empty(), aulas:['g'] }, a = { ...empty(), aulas:['a'] };
  salvar(guest); salvar(a,progressKey('a'));
  assert.deepEqual(ler(),guest); assert.deepEqual(ler(progressKey('a')),a);
  assert.deepEqual(ler(progressKey('b')),empty());
});
test('invalid remote progress fails without pretending it is empty', async () => {
  const client = { from:()=>({select:()=>({eq:()=>({maybeSingle:async()=>({data:{data:{...empty(),erros:[null]},updated_at:'x'},error:null})})})}) };
  await assert.rejects(pullProgress(client,'a'),/inválido/);
});
test('concurrent insert conflicts are retried instead of upserting another version', async () => {
  const client = { from:()=>({insert:async()=>({error:{code:'23505'}})}) };
  assert.equal(await pushProgress(client,'a',empty(),null),false);
});
test('update compares previous revision and reports conflicts', async () => {
  const conditions = [];
  const query = { eq:(key,value)=>{conditions.push([key,value]);return query;}, select:async()=>({data:[],error:null}) };
  const client = { from:()=>({update:()=>query}) };
  assert.equal(await pushProgress(client,'a',empty(),{data:empty(),updated_at:'2026-01-01T00:00:00Z'}),false);
  assert.deepEqual(conditions,[['user_id','a'],['updated_at','2026-01-01T00:00:00Z']]);
});
