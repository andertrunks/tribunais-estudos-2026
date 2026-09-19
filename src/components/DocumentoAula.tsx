import { useEffect, useState } from "react";
import type { BlocoDocumento, DocumentoAula as Documento } from "../types";

const documentos = import.meta.glob<Documento>("../content/aulas/**/*.json", { import: "default" });
const seguro = (url: string) => /^https?:\/\//i.test(url);
function Blocos({ blocos }: { blocos: BlocoDocumento[] }) {
  return <>{blocos.map((b, i) => {
    if (b.tipo === "tabela") return <div className="document-table" key={i} tabIndex={0} role="region" aria-label="Tabela da aula"><table><tbody>{b.linhas.map((row, r) => <tr key={r}>{row.map((c, j) => <td key={j} colSpan={c.colSpan} rowSpan={c.rowSpan}><Blocos blocos={c.blocos} /></td>)}</tr>)}</tbody></table></div>;
    const text = b.runs.map(r => r.texto).join("");
    if(!text.trim() && b.runs.some(r => r.separador)) return <hr key={i} />;
    const content = b.runs.map((r, j) => <span key={j} style={{fontWeight:r.negrito ? 700:undefined,fontStyle:r.italico ? "italic":undefined,fontFamily:r.codigo ? "monospace":undefined}}>{r.url && seguro(r.url) ? <a href={r.url} target="_blank" rel="noreferrer">{r.texto}</a> : r.texto}</span>);
    const heading = /HEADING|TITLE/.test(b.estilo) || (text.trim().length < 160 && /^\d+\.\s+\p{Lu}/u.test(text) && !/[;]$/.test(text.trim()));
    if (heading) return <h2 key={i}>{content}</h2>;
    if (!text.trim()) return <div key={i} className="document-space" aria-hidden="true" />;
    const question = /QUEST[ÃÕ]O(?:ES)?\s+(?:REAL|REAIS|IN[ÉE]DITA)/i.test(text);
    return <p key={i} className={question ? "document-question" : undefined} style={b.lista !== undefined ? {paddingLeft:`${b.lista + 1}em`}:undefined}>{b.lista !== undefined && <span aria-hidden="true">• </span>}{content}</p>;
  })}</>;
}
export function DocumentoAula({ arquivo }: { arquivo: string }) {
  const [state, setState] = useState<{arquivo:string; documento?:Documento; erro?:boolean}>({arquivo});
  const [retry, setRetry] = useState(0);
  useEffect(() => {
    let active = true;
    const loader = documentos[`../content/aulas/${arquivo}`];
    setState({arquivo});
    (loader ? loader() : Promise.reject(new Error("Documento ausente")))
      .then(documento => { if(active) setState({arquivo, documento}); })
      .catch(() => { if(active) setState({arquivo, erro:true}); });
    return () => { active=false; };
  }, [arquivo, retry]);
  if (state.arquivo !== arquivo || (!state.documento && !state.erro)) return <p role="status">Carregando aula completa…</p>;
  if (state.erro) return <div role="alert"><p>Não foi possível carregar a aula. Confira sua conexão.</p><button onClick={() => setRetry(n=>n+1)}>Tentar novamente</button></div>;
  return <div className="document-content"><Blocos blocos={state.documento!.blocos} />{state.documento!.versoes?.map(v => <details key={v.url}><summary>{v.titulo}</summary><p><a href={v.url} target="_blank" rel="noreferrer">Documento de origem</a></p><Blocos blocos={v.blocos} /></details>)}</div>;
}
