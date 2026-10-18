import {test} from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import ts from 'typescript';
const js=ts.transpileModule(fs.readFileSync('src/services/guided.ts','utf8'),{compilerOptions:{module:ts.ModuleKind.ESNext,target:ts.ScriptTarget.ES2022}}).outputText;
const {emptyGuided,nextGuided,finishGuided,mergeGuided}=await import('data:text/javascript;base64,'+Buffer.from(js).toString('base64'));
const day=new Date('2026-10-17T12:00:00Z');
const topics=[{id:'A',title:'A',subject:'MAT',prerequisites:[],questions:5},{id:'B',title:'B',subject:'POR',prerequisites:[],questions:5}];
test('aula, prática e alternância mantêm retomada e simulados apenas de conteúdo estudado',()=>{
 let s=emptyGuided();const first=nextGuided(topics,s,[],day,2);assert.equal(first.id,'aula:A');
 s=finishGuided(s,first,day);assert.equal(nextGuided(topics,s,[],day,2).id,'questões:A');
 s=finishGuided(s,nextGuided(topics,s,[],day,2),day);assert.equal(nextGuided(topics,s,[],day,2).id,'aula:B');
 s=finishGuided(s,nextGuided(topics,s,[],day,2),day);s=finishGuided(s,nextGuided(topics,s,[],day,2),day);
 assert.equal(nextGuided(topics,s,[],day,2).kind,'simulado');
 assert.deepEqual(nextGuided(topics,{...s,active:first},[],day,2).topicIds,['A','B']);
});
test('erros viram revisão e rascunhos de dispositivos distintos são conservados',()=>{
 const s=emptyGuided();s.completed['aula:A']=day.toISOString();s.completed['questões:A']=day.toISOString();s.checked['questões:A']=false;
 assert.equal(nextGuided(topics,s,[],day).id,'revisão:erro:questões:A');
 const other=emptyGuided();other.drafts.sim={q:'B'};s.drafts.sim={p:'A'};
 assert.deepEqual(mergeGuided(s,other).drafts.sim,{p:'A',q:'B'});
});
test('banco mantém IDs únicos, alternativas completas e comentário com origem canônica',()=>{
 const bank=JSON.parse(fs.readFileSync('src/data/guided-questions.json','utf8'));
 assert.equal(new Set(bank.map(q=>q.id)).size,bank.length);assert.ok(bank.length>=24);
 for(const q of bank){assert.equal(q.tipo,'inedita');assert.equal(q.alternativas.length,5);assert.ok(q.correta>=0&&q.correta<5);assert.ok(q.explicacao);assert.ok(q.fonte.includes(q.aulaId));}
});
test('dificuldade no simulado volta à revisão por assunto',()=>{
 const s={...emptyGuided(),recovery:{'simulado:1':['B']}};
 assert.equal(nextGuided(topics,s,[],day).id,'revisão:recuperação:simulado:1:B');
 const done=finishGuided(s,nextGuided(topics,s,[],day),day);
 assert.equal(nextGuided(topics,done,[],day).kind,'aula');
});
