/** Learner activity history. Independent of editorial coverage and mastery. */
export type GuidedKind = 'aula' | 'questões' | 'revisão' | 'simulado';
export interface GuidedActivity { id:string; kind:GuidedKind; topicIds:string[]; title:string }
export interface GuidedState {
  active?:GuidedActivity;
  completed:Record<string,string>;
  drafts:Record<string,Record<string,string>>;
  checked:Record<string,boolean>;
  recovery?:Record<string,string[]>;
  updatedAt:string;
}
export interface GuidedTopic {id:string;title:string;subject:string;prerequisites:string[];questions:number}
export const emptyGuided=():GuidedState=>({completed:{},drafts:{},checked:{},updatedAt:new Date().toISOString()});
export function validGuided(value:unknown):value is GuidedState {
  if(!value||typeof value!=='object')return false;
  const s=value as GuidedState;
  const record=(v:unknown)=>Boolean(v&&typeof v==='object'&&!Array.isArray(v));
  return record(s.completed)&&Object.values(s.completed).every(v=>typeof v==='string'&&Number.isFinite(Date.parse(v)))
    &&record(s.drafts)&&Object.values(s.drafts).every(d=>record(d)&&Object.values(d).every(v=>typeof v==='string'))
    &&record(s.checked)&&Object.values(s.checked).every(v=>typeof v==='boolean')&&typeof s.updatedAt==='string'
    &&(s.recovery===undefined||(record(s.recovery)&&Object.values(s.recovery).every(ids=>Array.isArray(ids)&&ids.every(id=>typeof id==='string'))))
    &&(!s.active||(typeof s.active.id==='string'&&['aula','questões','revisão','simulado'].includes(s.active.kind)&&Array.isArray(s.active.topicIds)&&s.active.topicIds.every(id=>typeof id==='string')&&typeof s.active.title==='string'));
}
export function mergeGuided(a?:GuidedState,b?:GuidedState):GuidedState|undefined {
  if(!a)return b;if(!b)return a;
  const [old,next]=a.updatedAt>b.updatedAt?[b,a]:[a,b];
  const completed={...old.completed,...next.completed};
  const drafts={...old.drafts};
  for(const [id,answers] of Object.entries(next.drafts))drafts[id]={...drafts[id],...answers};
  return {...next,completed,drafts,recovery:{...old.recovery,...next.recovery},checked:{...old.checked,...next.checked},active:next.active&&!completed[next.active.id]?next.active:undefined};
}
export function nextGuided(topics:GuidedTopic[],s:GuidedState,known:string[]=[],now=new Date(),simulationEvery=3):GuidedActivity|undefined {
  if(s.active&&s.active.topicIds.every(id=>topics.some(t=>t.id===id))&&!s.completed[s.active.id])return s.active;
  const read=(id:string)=>Boolean(s.completed[`aula:${id}`]||known.includes(id));
  const studied=topics.filter(t=>read(t.id));
  const history=Object.entries(s.completed).sort((a,b)=>b[1].localeCompare(a[1])||a[0].localeCompare(b[0]));
  const recoveryRun=history.findIndex(([id])=>!id.startsWith('revisão:'));
  const pending=studied.find(t=>t.questions>0&&!s.completed[`questões:${t.id}`]);
  const ready=topics.filter(t=>!read(t.id)&&t.prerequisites.every(read));
  const lastRead=history.find(([id])=>id.startsWith('aula:'))?.[0].slice(5);
  const lastSubject=topics.find(t=>t.id===lastRead)?.subject;
  const lesson=ready.find(t=>t.subject!==lastSubject)||ready[0];
  if((recoveryRun<0?history.length:recoveryRun)<2||!lesson) {
    for(const [activityId,ids] of Object.entries(s.recovery??{}))for(const topicId of ids){
      const topic=topics.find(t=>t.id===topicId),id=`revisão:recuperação:${activityId}:${topicId}`;
      if(topic&&!s.completed[id])return {id,kind:'revisão',topicIds:[topicId],title:`Retome a dificuldade: ${topic.title}`};
    }
    for(const [id] of history) {
      const topic=id.startsWith('questões:')?topics.find(t=>t.id===id.slice(9)):undefined;
      const reviewId=`revisão:erro:${id}`;
      if(topic&&!s.recovery?.[id]&&s.checked[id]===false&&!s.completed[reviewId])return {id:reviewId,kind:'revisão',topicIds:[topic.id],title:`Retome a dificuldade: ${topic.title}`};
    }
    for(const t of studied) {
      const start=s.completed[`aula:${t.id}`];if(!start)continue;
      for(const day of [1,7,21]) {
        const id=`revisão:${t.id}:${day}`;
        if(!s.completed[id]&&Date.parse(start)+day*86400000<=now.getTime())return {id,kind:'revisão',topicIds:[t.id],title:`Revisão de ${t.title} · ${day} dias`};
      }
    }
  }
  if(pending)return {id:`questões:${pending.id}`,kind:'questões',topicIds:[pending.id],title:`Pratique: ${pending.title}`};
  const practiced=studied.filter(t=>s.completed[`questões:${t.id}`]&&t.questions>0);
  const cycle=Math.floor(practiced.length/simulationEvery);
  if(cycle>0&&!s.completed[`simulado:${cycle}`])return {id:`simulado:${cycle}`,kind:'simulado',topicIds:practiced.map(t=>t.id),title:`Simulado de revisão ${cycle}`};
  if(lesson)return {id:`aula:${lesson.id}`,kind:'aula',topicIds:[lesson.id],title:lesson.title};
  return undefined;
}
export function finishGuided(s:GuidedState,a:GuidedActivity,now=new Date()):GuidedState {
  return {...s,active:undefined,completed:{...s.completed,[a.id]:now.toISOString()},updatedAt:now.toISOString()};
}
