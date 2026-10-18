import fs from 'node:fs';
import path from 'node:path';
// Index existing authored exercises; never generate statements, options or keys.
function files(dir){return fs.readdirSync(dir,{withFileTypes:true}).flatMap(e=>e.isDirectory()?files(path.join(dir,e.name)):[path.join(dir,e.name)]);}
function flatten(blocks){return blocks.flatMap(b=>b.tipo==='tabela'?b.linhas.flatMap(row=>row.flatMap(c=>flatten(c.blocos))):[b.runs.map(r=>r.texto??'').join('').trim()]).filter(Boolean);}
const output=[];
for(const file of files('src/content/aulas').filter(f=>f.endsWith('.json'))){
 const lesson=path.basename(file,'.json'),lines=flatten(JSON.parse(fs.readFileSync(file,'utf8')).blocos??[]);
 const ids=new Set();
 for(let i=0;i<lines.length;i++){
  const permanent=lines[i].match(/^(Q-[A-Z0-9-]+)\s*[—–-]\s*Questão inédita\b/i);
  const numbered=lines[i].match(/^Questão (\d+)$/i);
  if(!permanent&&!numbered)continue;
  if(numbered){
   const heading=lines.slice(0,i).findLast(t=>/questões (?:inéditas|reais)|gabarito comentado/i.test(t));
   if(!heading||!/questões inéditas/i.test(heading))continue;
  }
  const id=permanent?.[1]??`${lesson}-AUT-${numbered[1].padStart(3,'0')}`;
  if(ids.has(id))continue;
  const block=[];
  for(const text of lines.slice(i+1)){
   if(/^(?:Q-|Questão \d+|Gabarito|Flashcard|Treino|\d+\. )/.test(text))break;
   block.push(text);if(/^E\)/.test(text))break;
  }
  const options=block.filter(t=>/^[A-E]\)/.test(t)).map(t=>t.replace(/^[A-E]\)\s*/,''));
  const label=permanent?permanent[1]:`Questão ${numbered[1]}`;
  const escaped=label.replace(/[.*+?^${}()|[\]\\]/g,'\\$&');
  const keyPattern=new RegExp(`^${escaped}\\s*[—–-]\\s*([A-E])\\.\\s*$`,'i');
  const at=lines.findIndex((t,j)=>j>i&&keyPattern.test(t));
  if(options.length!==5||new Set(options).size!==5||at<0||!lines[at+1])continue;
  const statement=block.filter(t=>! /^[A-E]\)/.test(t)).join('\n');
  if(!statement)continue;
  const comment=[];
  for(const t of lines.slice(at+1)){
   if(/^(?:Q-|Questão \d+|\d+\.\s|Gabarito|Treinos|Flashcards)/.test(t))break;
   comment.push(t);
  }
  if(!comment.length)continue;
  output.push({id,aulaId:lesson,enunciado:statement,alternativas:options,correta:keyPattern.exec(lines[at])[1].toUpperCase().charCodeAt(0)-65,explicacao:comment.join('\n'),fonte:`Aula canônica ${lesson} · ${label}`,tipo:'inedita'});
  ids.add(id);
 }
}
fs.writeFileSync('src/data/guided-questions.json',JSON.stringify(output,null,2)+'\n');
console.log(`${output.length} questões autorais indexadas em ${new Set(output.map(q=>q.aulaId)).size} aulas. Textos originais preservados.`);
