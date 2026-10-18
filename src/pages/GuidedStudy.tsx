import { useEffect, useState } from 'react';
import { aulas } from '../data/aulas';
import bank from '../data/guided-questions.json';
import { DocumentoAula } from '../components/DocumentoAula';
import { useProgresso } from '../hooks/useProgresso';
import { emptyGuided, finishGuided, nextGuided, type GuidedActivity } from '../services/guided';

type Store=ReturnType<typeof useProgresso>;
const first=['LP-001','MC-001','RLM-001','DC-001','DA-001'];
const topics=[...aulas].sort((a,b)=>(first.includes(a.id)?first.indexOf(a.id):100)-(first.includes(b.id)?first.indexOf(b.id):100)).filter(a=>!a.demonstracao&&a.documentoArquivo&&a.status!=='nao_iniciado')
  .map(a=>({id:a.id,title:a.titulo,subject:a.materiaId,prerequisites:[],questions:bank.filter(q=>q.aulaId===a.id).length}));
export function GuidedStudy({s}:{s:Store}) {
  const g=s.p.guided??emptyGuided();
  const a=nextGuided(topics,g,s.p.aulas);
  if(!a)return <section><h1>Seu estudo está em dia</h1><p>As próximas revisões aparecem automaticamente quando chegar a data. Você pode consultar todo o acervo.</p><a href="#/materias">Explorar matérias</a></section>;
  return <Activity key={a.id} s={s} a={a}/>;
}
function Activity({s,a}:{s:Store;a:GuidedActivity}) {
  const g=s.p.guided??emptyGuided();
  const [feedback,setFeedback]=useState(false);
  useEffect(()=>{if(!g.active)s.atualizar(p=>({...p,guided:{...(p.guided??emptyGuided()),active:a,updatedAt:new Date().toISOString()}}));},[a,g.active,s]);
  const lesson=aulas.find(l=>l.id===a.topicIds[0]);
  const groups=a.topicIds.map(id=>bank.filter(q=>q.aulaId===id).slice(0,a.kind==='simulado'?4:5));
  const questions=a.kind==='simulado'?Array.from({length:4},(_,i)=>groups.flatMap(q=>q[i]?[q[i]]:[])).flat().slice(0,10):groups[0]??[];
  const practicing=a.kind==='questões'||a.kind==='simulado';
  const answers=g.drafts[a.id]??{};
  const allAnswered=questions.length>0&&questions.every(q=>answers[q.id]!==undefined);
  const checked=g.checked[a.id]!==undefined;
  const save=(id:string,value:string)=>s.atualizar(p=>{const old=p.guided??emptyGuided();return {...p,guided:{...old,active:a,drafts:{...old.drafts,[a.id]:{...old.drafts[a.id],[id]:value}},updatedAt:new Date().toISOString()}};});
  function check() {
    if(!allAnswered)return;
    for(const q of questions) {
      const source=aulas.find(l=>l.id===q.aulaId)!;
      s.responder({...q,materiaId:source.materiaId,topicoId:source.topicoId,cargoIds:source.cargoIds,tipo:'inedita'},Number(answers[q.id]));
    }
    s.atualizar(p=>{const old=p.guided??emptyGuided();return {...p,guided:{...old,active:a,recovery:{...old.recovery,[a.id]:[...new Set(questions.filter(q=>Number(answers[q.id])!==q.correta).map(q=>q.aulaId))]},checked:{...old.checked,[a.id]:questions.every(q=>Number(answers[q.id])===q.correta)},updatedAt:new Date().toISOString()}};});
  }
  function advance() {
    s.atualizar(p=>{const next=finishGuided(p.guided??emptyGuided(),a);return {...p,
      aulas:a.kind==='aula'?[...new Set([...p.aulas,...a.topicIds])]:p.aulas,
      guided:{...next,active:nextGuided(topics,next,p.aulas)}};});
    setFeedback(false);window.scrollTo(0,0);
  }
  return <>
    <header><p className="eyebrow">SEU ESTUDO ORGANIZADO · {a.kind.toLocaleUpperCase('pt-BR')}</p><h1>{a.title}</h1>
      <p>Matérias alternadas · questões após a leitura · revisões em 1, 7 e 21 dias · simulado a cada 3 blocos com banco interativo validado.</p>
      <p>Seu avanço registra atividades realizadas. Não altera a cobertura editorial nem certifica domínio.</p>
      <p className="small">Sua atividade é salva para retomar de onde parou.</p>
    </header>
    {practicing?<section aria-label="Resolução de questões"><p>{a.kind==='simulado'?'Simulado de treino com questões autorais já estudadas. Um ponto por acerto, sem penalidade. Gabarito ao finalizar.':'Questões autorais extraídas da aula completa, com os IDs e os comentários da fonte preservados.'}</p>
      {questions.length===0?<p>Esta aula mantém os exercícios no documento completo. Consulte-os antes de continuar.</p>:questions.map((q,i)=><fieldset key={`${a.id}:${q.id}`} disabled={checked}><legend>{i+1}. {q.enunciado}</legend><p className="small">{q.id} · Autoral · <a href={`#/aulas/${q.aulaId}`}>{q.fonte}</a></p>{q.alternativas.map((option,j)=><label key={j} style={{display:'block',padding:'0.6rem'}}><input type="radio" name={`${a.id}:${q.id}`} checked={answers[q.id]===String(j)} onChange={()=>save(q.id,String(j))}/>{String.fromCharCode(65+j)}) {option}</label>)}{checked&&<p><strong>{Number(answers[q.id])===q.correta?'Acertou.':'Revisar.'} Gabarito: {String.fromCharCode(65+q.correta)}.</strong> {q.explicacao}</p>}</fieldset>)}
      {!checked&&questions.length>0&&<button className="button" disabled={!allAnswered||s.erroStorage} onClick={check}>{a.kind==='simulado'?'Finalizar simulado e conferir':'Conferir respostas'}</button>}
      {checked&&<p role="status">{questions.filter(q=>Number(answers[q.id])===q.correta).length} de {questions.length} acertos. Os erros foram enviados ao Caderno de Erros.</p>}
    </section>:<article className="lesson-body">{a.kind==='revisão'&&<p className="notice">Antes de reler, tente explicar o assunto sem consultar. Retome os erros no seu caderno.</p>}{lesson?.documentoArquivo&&<DocumentoAula arquivo={lesson.documentoArquivo}/>}</article>}
    <section className="card"><label><input type="checkbox" checked={feedback} onChange={e=>setFeedback(e.target.checked)}/>{practicing?'Conferi minhas respostas e li os comentários.':'Concluí a leitura e tentei explicar os pontos principais.'}</label><p><button className="button" disabled={!feedback||s.erroStorage||(practicing&&questions.length>0&&!checked)} onClick={advance}>Concluir e continuar →</button></p>{s.erroStorage&&<p role="alert">Não foi possível salvar. Corrija o armazenamento antes de avançar.</p>}<a href="#/erros">Consultar Caderno de Erros</a></section>
  </>;
}
