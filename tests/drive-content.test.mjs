import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import crypto from 'node:crypto';
const inventory = JSON.parse(fs.readFileSync('docs/DRIVE_IMPORT_INVENTORY.json', 'utf8'));
const hash = s => crypto.createHash('sha256').update(s).digest('hex');
function text(bs) {return bs.map(b=>b.tipo==='paragrafo'?b.runs.map(r=>r.texto).join(''):b.linhas.map(row=>row.map(c=>text(c.blocos)).join('\t')).join('\n')).join('');}
test('every inventoried Drive lesson has a complete immutable body and unique ID', () => {
  assert.equal(new Set(inventory.aulas.map(a=>a.id)).size, inventory.total);
  for (const a of inventory.aulas) {
    const raw = fs.readFileSync('src/content/aulas/'+a.documentoArquivo, 'utf8').trimEnd();
    assert.equal(hash(raw), a.sha256Documento, a.id);
    const body = JSON.parse(raw);
    const content = text(body.blocos);
    assert.equal(content.length, a.caracteres, a.id);
    assert.equal(hash(content), a.sha256Texto, a.id);
    assert.ok(content.includes(a.id));
    assert.ok(content.length > 1000, a.id);
    if(a.id.startsWith('MB-')) {assert.equal(a.tipo,'suplementar');assert.deepEqual(a.editalRefs,[]);}
  }
});
test('different source versions of ES-003 remain within a single lesson', () => {
  const a=inventory.aulas.find(a=>a.id==='ES-003');
  const body=JSON.parse(fs.readFileSync('src/content/aulas/'+a.documentoArquivo,'utf8'));
  assert.equal(body.versoes.length,1);
  assert.ok(text(body.versoes[0].blocos).length>30000);
});
