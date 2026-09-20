// Structural import only. Input is a local snapshot from the connected Drive API.
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
const cache = process.argv[2];
if (!cache) throw new Error('Provide the local Drive snapshot directory');
const inventory = JSON.parse(fs.readFileSync(path.join(cache, 'inventory.json'), 'utf8'));
const aliases = {'lingua-portuguesa':'portugues','matematica-concurso':'matematica','raciocinio-logico-matematico':'raciocinio-logico','direito-constitucional':'constitucional','direito-administrativo-administracao-publica':'administrativo','direito-civil':'civil','direito-processual-civil':'processual-civil','direito-penal':'penal','direito-processual-penal':'processual-penal','informatica-escritorio-colaboracao':'informatica','bancos-dados-sql':'bancos-dados','dados-bi-ia':'dados-bi','seguranca-informacao-cibernetica':'seguranca','devops-devsecops-git-cicd-automacao':'devops'};
const report = [];
const incremental = process.argv.includes('--incremental');
const previous = incremental ? JSON.parse(fs.readFileSync('docs/DRIVE_IMPORT_INVENTORY.json', 'utf8')).aulas : [];
function blocks(content = []) {
  return content.flatMap(e => {
    if (e.paragraph) {
      const p = e.paragraph;
      const runs = (p.elements || []).map(r => {
        if (r.horizontalRule) return {texto:'', separador:true};
        if (!r.textRun) throw new Error('Unsupported paragraph element: ' + JSON.stringify(r));
        const s = r.textRun.textStyle || {};
        return {texto:r.textRun.content, ...(s.bold ? {negrito:true}:{}), ...(s.italic ? {italico:true}:{}), ...(s.link?.url ? {url:s.link.url}:{}), ...(s.weightedFontFamily?.fontFamily?.match(/mono|courier|consolas/i) ? {codigo:true}:{})};
      });
      return [{tipo:'paragrafo',runs, estilo:p.paragraphStyle?.namedStyleType || 'NORMAL_TEXT', ...(p.bullet ? {lista:p.bullet.nestingLevel || 0}:{})}];
    }
    if(e.table) return [{tipo:'tabela',linhas:e.table.tableRows.map(row=>row.tableCells.map(cell=>({blocos:blocks(cell.content),colSpan:cell.tableCellStyle?.columnSpan || 1,rowSpan:cell.tableCellStyle?.rowSpan || 1})))}];
    if(e.sectionBreak) return [];
    throw new Error('Unsupported document structure: '+JSON.stringify(e));
  });
}
function plain(bs) {return bs.map(b=>b.tipo==='paragrafo'?b.runs.map(r=>r.texto).join(''):b.linhas.map(row=>row.map(c=>plain(c.blocos)).join('\t')).join('\n')).join('');}
function field(text,key) {
  const lines=text.split('\n'); const i=lines.findIndex(l=>new RegExp('^\\s*'+key+'(?:\\[\\])?\\s*:', 'i').test(l));
  if(i<0) { const j=lines.findIndex(l=>l.trim().toLowerCase()===key.toLowerCase()); return j<0 ? '' : lines.slice(j+1).find(l=>l.trim())?.trim() || ''; }
  let value=lines[i].slice(lines[i].indexOf(':')+1).trim();
  if (!value || (value.startsWith('[') && !value.includes(']'))) {
    for(let j=i+1;j<lines.length;j++) {const l=lines[j];if(!l.trim()||/^\s*[\p{L}][\p{L}\d_ ]*(?:\[\])?\s*:/u.test(l))break;value+='\n'+l; if(value.trimStart().startsWith('[')&&l.includes(']'))break;}
  }
  return value.trim();
}
function refs(value,key) {
  if(!value || /^\[\s*\]/.test(value))return [];
  let v=value.replace(/^\[/,'').replace(/\]\s*$/,'');
  if(key==='cargoIds')return v.split(/[,;]/).map(s=>s.trim().replace(/^['"]|['"]$/g,'')).filter(Boolean);
  return v.split(/\n(?=[—–•-])|;\s*/).map(s=>s.replace(/^[—–•-]\s*/,'').trim()).filter(Boolean);
}
const ids=new Set();
for(const f of inventory) {
  const fileId=f.title.match(/^[A-Z0-9]+-\d+/)[0];
  const doc=JSON.parse(fs.readFileSync(path.join(cache,fileId+'.json'),'utf8'));
  const bs=doc.tabs.flatMap(t=>blocks(t.body?.content));
  const text=plain(bs);
  const id=field(text,'id') || fileId;
  if(id!==fileId || ids.has(id)) throw new Error('Duplicate/mismatching ID '+id);
  ids.add(id);
  const status=field(text,'status');
  if(!['nao_iniciado','em_producao','revisado','questoes_adicionadas','concluido'].includes(status))throw new Error('Invalid status '+id+': '+status);
  const materia=field(text,'matéria') || field(text,'materia');
  const classificacao=field(text,'tipo');
  const cargoIds=refs(field(text,'cargoIds'),'cargoIds');
  const editalRefs=refs(field(text,'editalRefs'),'editalRefs');
  const sourceRefs=refs(field(text,'sourceRefs'),'sourceRefs');
  const tipo=id.startsWith('MB-')||/suplementar/i.test(classificacao)?'suplementar':/extensão/i.test(classificacao)?'especifico':editalRefs.length&&cargoIds.length?'oficial':'compartilhado';
  const materiaId=aliases[f.folder] || f.folder;
  const dir=path.join('src/content/aulas',f.folder);fs.mkdirSync(dir,{recursive:true});
  const documentoArquivo=`${f.folder}/${id}.json`;
  const aula={id,titulo:f.type.includes('wordprocessingml') ? text.split('\n')[0] : f.title,materiaId,cargoIds,editalRefs,sourceRefs,status,topicoId:id,tipo,demonstracao:false,secoes:[],extensoes:[],documentoArquivo,materiaEditorial:materia,classificacaoEditorial:classificacao,documentoUrl:f.url};
  const versoes = id === 'ES-003' ? [{titulo:'Versão Word existente no acervo — mesmo ID editorial', url:'https://drive.google.com/file/d/1jxNao-QqR8YrU_OYf_xEEkxO5-Mt_-Tw/view', blocos:JSON.parse(fs.readFileSync(path.join(cache,'ES-003-word.json'),'utf8')).tabs.flatMap(t=>blocks(t.body?.content))}] : undefined;
  const body=JSON.stringify({blocos:bs,...(versoes ? {versoes}:{})});
  fs.writeFileSync(path.join(dir,id+'.json'),body+'\n');
  fs.writeFileSync(path.join(dir,id+'.ts'),'import type { Aula } from "../../../types";\n\n// Cópia estrutural do documento canônico; não editar o conteúdo editorial aqui.\nexport default '+JSON.stringify(aula,null,2)+' satisfies Aula;\n');
  report.push({...aula,caracteres:text.length,sha256Texto:crypto.createHash('sha256').update(text).digest('hex'),sha256Documento:crypto.createHash('sha256').update(body).digest('hex')});
}
fs.mkdirSync('docs',{recursive:true});
const combined = [...previous.filter(a => !ids.has(a.id)), ...report];
fs.writeFileSync('docs/DRIVE_IMPORT_INVENTORY.json',JSON.stringify({origem:'01_Materias_Consolidadas',data:new Date().toISOString().slice(0,10),total:combined.length,materias:new Set(combined.map(x=>x.materiaId)).size,aulas:combined},null,2)+'\n');
console.log(JSON.stringify({processadas:report.length,aulas:combined.length,materias:new Set(combined.map(x=>x.materiaId)).size,semMateria:report.filter(x=>!x.materiaEditorial).map(x=>x.id)}));
