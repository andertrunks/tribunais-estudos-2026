import { useState } from "react";
import {
  BookOpen,
  Library,
  BriefcaseBusiness,
  ListChecks,
  Files,
  ArrowRight,
  Check,
  Bookmark,
  Scale,
  ChevronRight,
  RotateCcw,
} from "lucide-react";
import {
  materias,
  topicos,
  cargos,
  questoes,
  categoriasFontes,
  fontes,
} from "../data/catalogo";
import { aulas } from "../data/aulas";
import { useProgresso } from "../hooks/useProgresso";
import {
  Badge,
  Notice,
  Empty,
  Heading,
  MateriaCard,
  Meter,
  nomeMateria,
} from "../components/ui";
import { statusLabels, type Questao } from "../types";
type Store = ReturnType<typeof useProgresso>;
export function Home({ s }: { s: Store }) {
  const done = aulas.filter(a => s.p.aulas.includes(a.id)).length;
  return (
    <>
      <div className="welcome-line">
        <span className="eyebrow">SEU PRÓXIMO PASSO COMEÇA AQUI</span>
        <Badge>Conteúdo inicial</Badge>
      </div>
      <section className="hero">
        <div>
          <h1>
            Estude uma vez.
            <br />
            <em>Avance em vários concursos.</em>
          </h1>
          <p>
            Conteúdo Mestre para Concursos de Tribunais.
            <br />
            Matérias conectadas, estudo organizado e cada avanço no seu ritmo.
          </p>
          <a href="#/aulas/interpretacao" className="button">
            {done ? "Revisitar a primeira aula" : "Começar a estudar"}{" "}
            <ArrowRight size={18} />
          </a>
          <a href="#/materias" className="hero-secondary">
            Explorar matérias <ChevronRight size={16} />
          </a>
        </div>
        <div className="hero-art" aria-hidden="true">
          <div className="orbit" />
          <div className="book-spine book-one">CONHECER</div>
          <div className="book-spine book-two">COMPREENDER</div>
          <div className="book-spine book-three">AVANÇAR</div>
          <div className="art-seal">
            <Scale size={33} />
          </div>
          <span className="art-caption">
            UMA BASE. MÚLTIPLAS POSSIBILIDADES.
          </span>
        </div>
      </section>
      <section className="stats" aria-label="Indicadores">
        <div>
          <Library size={20} />
          <strong>{materias.length}</strong>
          <span>matérias no catálogo</span>
          <small>1 com aula disponível</small>
        </div>
        <div>
          <BriefcaseBusiness size={20} />
          <strong>{cargos.length}</strong>
          <span>cargos contemplados</span>
          <small>Vínculos a confirmar</small>
        </div>
        <div>
          <ListChecks size={20} />
          <strong>{topicos.length}</strong>
          <span>tópicos cadastrados</span>
          <small>Estrutura inicial</small>
        </div>
        <div>
          <Files size={20} />
          <strong className="text-stat">Em auditoria</strong>
          <span>cobertura dos editais</span>
          <small>Sem percentual confirmado</small>
        </div>
      </section>
      <div className="home-columns">
        <section>
          <div className="section-heading">
            <div>
              <span className="eyebrow">SUA BIBLIOTECA</span>
              <h2>Conhecimento que se conecta</h2>
            </div>
            <a href="#/materias">
              Ver todas <ArrowRight size={16} />
            </a>
          </div>
          <div className="subject-grid home-subjects">
            {[materias[0], materias[4], materias[12], materias[1]].map((m) => (
              <MateriaCard key={m.id} m={m} p={s.p} />
            ))}
          </div>
        </section>
        <aside className="study-aside">
          <div className="personal-card">
            <div className="section-heading">
              <h3>Meu caminho</h3>
              <Bookmark size={19} />
            </div>
            <div className="progress-number">
              {(done / aulas.length) * 100}
              <span>%</span>
            </div>
            <p>das aulas disponíveis concluídas</p>
            <Meter
              value={(done / aulas.length) * 100}
              label="Progresso pessoal"
            />
            <div className="personal-details">
              <span>
                {done} de {aulas.length} aula
              </span>
              <span>No seu ritmo</span>
            </div>
            <a href="#/progresso">
              Acompanhar meu progresso <ArrowRight size={16} />
            </a>
          </div>
          <div className="editorial-note">
            <span className="eyebrow">TRANSPARÊNCIA EM PRIMEIRO LUGAR</span>
            <h3>
              Seu estudo merece
              <br />
              fontes confiáveis.
            </h3>
            <p>
              Os editais estão em auditoria. Conteúdos demonstrativos e trilhas
              suplementares são identificados com clareza.
            </p>
            <a href="#/fontes">
              Conhecer as fontes <ArrowRight size={16} />
            </a>
          </div>
        </aside>
      </div>
      <Notice />
    </>
  );
}
export function Subjects({ s }: { s: Store }) {
  const [query, setQuery] = useState("");
  const [group, setGroup] = useState("Todas");
  const filtered = materias.filter(
    (m) =>
      m.titulo
        .toLocaleLowerCase("pt-BR")
        .includes(query.toLocaleLowerCase("pt-BR")) &&
      (group === "Todas" || m.grupo === group),
  );
  return (
    <>
      <Heading eyebrow="SUA BIBLIOTECA" title="Matérias">
        Um conteúdo central, compartilhado entre cargos. Escolha por onde
        começar.
      </Heading>
      <Notice />
      <div className="filters">
        <input
          aria-label="Buscar matéria"
          placeholder="Buscar matéria…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <div className="tabs">
          {["Todas", "Fundamentos", "Direito", "Tecnologia"].map((g) => (
            <button
              key={g}
              aria-pressed={g === group}
              className={g === group ? "selected" : ""}
              onClick={() => setGroup(g)}
            >
              {g}
            </button>
          ))}
        </div>
      </div>
      <div className="subject-grid">
        {filtered.map((m) => (
          <MateriaCard key={m.id} m={m} p={s.p} />
        ))}
      </div>
      {!filtered.length && (
        <Empty title="Nenhuma matéria encontrada">
          Experimente outro termo.
        </Empty>
      )}
    </>
  );
}
export function Subject({ id, s }: { id: string; s: Store }) {
  const m = materias.find((m) => m.id === id);
  if (!m)
    return (
      <Empty title="Matéria não encontrada">
        <a href="#/materias">Ver matérias</a>
      </Empty>
    );
  const ts = topicos.filter((t) => t.materiaId === id);
  const available = aulas.filter((a) => a.materiaId === id);
  const done = available.filter((a) => s.p.aulas.includes(a.id)).length;
  const cs = [...new Set(ts.flatMap((t) => t.cargoIds))];
  return (
    <>
      <a className="back" href="#/materias">
        ← Todas as matérias
      </a>
      <Heading eyebrow={m.grupo.toUpperCase()} title={m.titulo}>
        {m.descricao}
      </Heading>
      {m.suplementar ? (
        <div className="notice gold">
          Trilha pedagógica suplementar — não aumenta a cobertura do edital sem
          exigência formal confirmada.
        </div>
      ) : (
        <Notice />
      )}
      <div className="subject-summary">
        <span>
          <strong>{ts.length}</strong> tópicos
        </span>
        <span>
          <strong>{available.length}</strong> aulas disponíveis
        </span>
        <span>
          <strong>{done}</strong> aulas concluídas
        </span>
        <Badge tone={m.suplementar ? "gold" : ""}>
          {m.suplementar ? "Suplementar" : "Estrutura demonstrativa"}
        </Badge>
      </div>
      <div className="badge-list">
        {cs.map((c) => (
          <a href={`#/cargos/${c}`} key={c}>
            <Badge>
              {cargos.find((x) => x.id === c)?.tribunal} ·{" "}
              {cargos.find((x) => x.id === c)?.titulo}
            </Badge>
          </a>
        ))}
      </div>
      <h2>Seu roteiro de estudo</h2>
      <div className="topic-list">
        {ts.map((t, i) => {
          const topicAulas = aulas.filter((a) => a.topicoId === t.id);
          return (
            <div className="topic-row" key={t.id}>
              <span className="topic-number">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <h3>{t.titulo}</h3>
                <div className="badge-list">
                  <Badge tone={t.tipo === "suplementar" ? "gold" : ""}>
                    {t.tipo === "compartilhado"
                      ? "Compartilhado · demonstração"
                      : "Suplementar"}
                  </Badge>
                  <span className="muted">{statusLabels[t.status]}</span>
                  {topicAulas.some((a) => s.p.aulas.includes(a.id)) && (
                    <Badge>Estudado por você</Badge>
                  )}
                </div>
              </div>
              {topicAulas.length ? (
                <div className="badge-list">
                  {topicAulas.map((aula) => (
                    <a
                      className="small-button"
                      href={`#/aulas/${aula.id}`}
                      key={aula.id}
                    >
                      Abrir aula <ArrowRight size={16} />
                    </a>
                  ))}
                </div>
              ) : (
                <span className="muted">Em construção</span>
              )}
            </div>
          );
        })}
      </div>
      {!ts.length && (
        <Empty title="O roteiro está sendo preparado">
          Os tópicos serão cadastrados após a auditoria documental. Explore a
          aula demonstrativa de{" "}
          <a href="#/materias/portugues">Língua Portuguesa</a>.
        </Empty>
      )}
    </>
  );
}
function Question({ q, s }: { q: Questao; s: Store }) {
  const chosen = s.p.respostas[q.id];
  return (
    <div className="question">
      <Badge tone={q.tipo === "real" ? "blue" : "gold"}>
        {q.tipo === "real"
          ? "QUESTÃO REAL"
          : "QUESTÃO INÉDITA — ESTILO DA BANCA"}
      </Badge>
      <p className="muted">
        DEMONSTRAÇÃO · Estilo genérico, sem atribuição a uma banca.
      </p>
      <h3>{q.enunciado}</h3>
      <fieldset>
        <legend className="sr-only">Escolha uma alternativa</legend>
        {q.alternativas.map((a, i) => (
          <label key={a} className={`option ${chosen === i ? "chosen" : ""}`}>
            <input
              type="radio"
              name={q.id}
              checked={chosen === i}
              onChange={() => s.responder(q, i)}
            />
            <strong>{String.fromCharCode(65 + i)}</strong>
            <span>{a}</span>
          </label>
        ))}
      </fieldset>
      {chosen !== undefined && (
        <div
          className={`answer ${chosen === q.correta ? "correct" : ""}`}
          role="status"
        >
          <strong>
            {chosen === q.correta
              ? "Resposta correta!"
              : "Vamos revisar este ponto."}
          </strong>
          <p>{q.explicacao}</p>
          {chosen !== q.correta && (
            <a href="#/erros">Questão registrada no Caderno de Erros →</a>
          )}
        </div>
      )}
    </div>
  );
}
export function Lesson({ id, s }: { id: string; s: Store }) {
  const a = aulas.find((a) => a.id === id);
  const lessonQuestions = questoes.filter((q) => q.aulaId === id);
  const [flipped, setFlipped] = useState(false);
  const [size, setSize] = useState(18);
  if (!a)
    return (
      <Empty title="Aula não encontrada">
        <a href="#/materias">Ver matérias</a>
      </Empty>
    );
  return (
    <>
      <a href={`#/materias/${a.materiaId}`} className="back">
        ← Língua Portuguesa / Tópico 1
      </a>
      <div className="lesson-layout">
        <article className="lesson" style={{ fontSize: size }}>
          <Badge tone="gold">DEMONSTRAÇÃO · REVISÃO PENDENTE</Badge>
          <Heading eyebrow="AULA 01 · CONTEÚDO COMPARTILHADO" title={a.titulo}>
            Leia as palavras. Entenda as relações. Encontre a evidência.
          </Heading>
          <div className="reading-toolbar">
            <span>Leitura no seu ritmo</span>
            <div>
              <button
                className="small-button"
                aria-label="Diminuir fonte"
                disabled={size <= 16}
                onClick={() => setSize((v) => v - 2)}
              >
                A−
              </button>
              <button
                className="small-button"
                aria-label="Aumentar fonte"
                disabled={size >= 24}
                onClick={() => setSize((v) => v + 2)}
              >
                A+
              </button>
            </div>
          </div>
          <Notice />
          {a.secoes.map((sec, i) => (
            <section id={`sec-${i}`} key={sec.titulo}>
              <span className="section-number">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h2>{sec.titulo}</h2>
              <p>{sec.texto}</p>
              {i === 7 && (
                <blockquote>
                  Uma boa interpretação consegue mostrar de onde veio a
                  conclusão.
                </blockquote>
              )}
              {i === 12 && (
                <button
                  className="flashcard"
                  onClick={() => setFlipped(!flipped)}
                  aria-expanded={flipped}
                >
                  <span className="eyebrow">
                    FLASHCARD 01 · TOQUE PARA VIRAR
                  </span>
                  <strong>
                    {flipped
                      ? "É uma conclusão sustentada por pistas do texto."
                      : "O que é uma inferência autorizada?"}
                  </strong>
                  <span>
                    {flipped ? "Ocultar resposta" : "Revelar resposta"}{" "}
                    <RotateCcw size={15} />
                  </span>
                </button>
              )}
              {i === 13 &&
                lessonQuestions.map((question) => (
                  <Question key={question.id} q={question} s={s} />
                ))}
            </section>
          ))}
          <div className="lesson-actions">
            <button className="button" onClick={() => s.concluir(a.id)}>
              <Check size={18} />
              {s.p.aulas.includes(a.id)
                ? "Concluída · desfazer"
                : "Marcar aula como concluída"}
            </button>
            <button className="small-button" onClick={() => s.agendar(a.id)}>
              <Bookmark size={17} />
              {s.p.revisoes.some((r) => r.aulaId === a.id && !r.revisadaEm)
                ? "Revisão agendada"
                : "Revisar depois"}
            </button>
          </div>
        </article>
        <aside className="lesson-index">
          <span className="eyebrow">NESTA AULA</span>
          {a.secoes.map((sec, i) => (
            <button
              key={sec.titulo}
              onClick={() =>
                document
                  .getElementById(`sec-${i}`)
                  ?.scrollIntoView({ behavior: "smooth", block: "start" })
              }
            >
              {String(i + 1).padStart(2, "0")} <span>{sec.titulo}</span>
            </button>
          ))}
          <p>
            Seu progresso é pessoal.
            <br />A cobertura documental segue em auditoria.
          </p>
        </aside>
      </div>
    </>
  );
}
export function Careers({ id }: { id?: string }) {
  const c = cargos.find((c) => c.id === id);
  if (id && !c)
    return (
      <Empty title="Cargo não encontrado">
        <a href="#/cargos">Ver cargos</a>
      </Empty>
    );
  return (
    <>
      <Heading
        eyebrow="UM CONTEÚDO, VÁRIOS CAMINHOS"
        title={c ? `${c.tribunal} — ${c.titulo}` : "Cargos e Editais"}
      >
        {c
          ? c.especialidade
          : "Oito cargos iniciais. A organização do estudo continua sendo matéria → tópico → aula."}
      </Heading>
      <Notice />
      {c ? (
        <>
          <a className="back" href="#/cargos">
            ← Todos os cargos
          </a>
          <div className="panel">
            <h2>Referência documental</h2>
            <dl className="document-fields">
              {[
                "Edital utilizado",
                "Data / versão",
                "Banca",
                "Retificações",
                "Cobertura documental",
              ].map((f) => (
                <div key={f}>
                  <dt>{f}</dt>
                  <dd>Aguardando confirmação documental</dd>
                </div>
              ))}
            </dl>
          </div>
          <h2>Conteúdo compartilhado · demonstração</h2>
          {aulas
            .filter((a) => a.cargoIds.includes(c.id))
            .map((a) => (
              <a key={a.id} className="topic-row" href={`#/aulas/${a.id}`}>
                <BookOpen />
                <div>
                  <h3>{a.titulo}</h3>
                  <p>
                    Língua Portuguesa · 1 tópico · Uma única aula para vários
                    cargos
                  </p>
                </div>
                <ArrowRight />
              </a>
            ))}
          {!aulas.some((a) => a.cargoIds.includes(c.id)) && (
            <Empty title="Vínculos em preparação">
              Matérias, tópicos e extensões específicas serão associados após a
              auditoria.
            </Empty>
          )}
        </>
      ) : (
        <div className="career-grid">
          {cargos.map((c) => (
            <a href={`#/cargos/${c.id}`} className="career-card" key={c.id}>
              <div className="card-top">
                <Badge>{c.tribunal}</Badge>
                <ArrowUpIcon />
              </div>
              <h2>{c.titulo}</h2>
              <p>{c.especialidade}</p>
              <div className="divider" />
              <span className="muted">Edital e banca</span>
              <p className="confirmation">Aguardando confirmação documental</p>
            </a>
          ))}
        </div>
      )}
    </>
  );
}
function ArrowUpIcon() {
  return <ArrowRight size={18} />;
}
export function Progress({ s }: { s: Store }) {
  const done = aulas.filter(a => s.p.aulas.includes(a.id)).length;
  const answered = Object.entries(s.p.respostas).filter(([id]) =>
    questoes.some((q) => q.id === id),
  );
  const hits = answered.filter(
    ([id, n]) => questoes.find((q) => q.id === id)?.correta === n,
  ).length;
  const doneTopics = topicos.filter((t) => {
    const topicAulas = aulas.filter((aula) => aula.topicoId === t.id);
    return (
      topicAulas.length > 0 &&
      topicAulas.every((aula) => s.p.aulas.includes(aula.id))
    );
  }).length;
  return (
    <>
      <Heading eyebrow="CADA ETAPA CONTA" title="Meu Progresso">
        Seu histórico de estudo neste navegador. Cobertura de edital é um
        indicador independente.
      </Heading>
      <section className="stats">
        <div>
          <strong>{aulas.length ? Math.round((done / aulas.length) * 100) : 0}%</strong>
          <span>das aulas disponíveis</span>
          <small>
            {done} de {aulas.length} concluída
          </small>
        </div>
        <div>
          <strong>
            {doneTopics} / {topicos.length}
          </strong>
          <span>tópicos estudados</span>
          <small>
            {topicos.length - doneTopics} pendentes · inclui estrutura futura
          </small>
        </div>
        <div>
          <strong>{answered.length}</strong>
          <span>questões respondidas</span>
          <small>
            {hits} acertos · {answered.length - hits} erros (última resposta)
          </small>
        </div>
        <div>
          <strong>{s.p.revisoes.filter((r) => !r.revisadaEm).length}</strong>
          <span>revisões pendentes</span>
          <small>Agendadas por você</small>
        </div>
      </section>
      <div className="panel">
        <h2>Progresso por matéria</h2>
        {materias.map((m) => {
          const list = aulas.filter((a) => a.materiaId === m.id);
          const n = list.filter((a) => s.p.aulas.includes(a.id)).length;
          return (
            <div className="progress-row" key={m.id}>
              <a href={`#/materias/${m.id}`}>{m.titulo}</a>
              <span>
                {list.length
                  ? `${n} de ${list.length} aula`
                  : "Sem aulas publicadas"}
              </span>
              <Meter
                label={m.titulo}
                value={list.length ? (n / list.length) * 100 : 0}
              />
            </div>
          );
        })}
      </div>
      <Notice />
    </>
  );
}
export function Errors({ s }: { s: Store }) {
  const [filter, setFilter] = useState("");
  return (
    <>
      <Heading
        eyebrow="TRANSFORME ERROS EM APRENDIZADO"
        title="Caderno de Erros"
      >
        As respostas incorretas são registradas automaticamente. Acrescente suas
        observações e retome o conteúdo.
      </Heading>
      <div className="filters">
        <select
          aria-label="Filtrar erros por matéria"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="">Todas as matérias</option>
          {materias.map((m) => (
            <option value={m.id} key={m.id}>
              {m.titulo}
            </option>
          ))}
        </select>
      </div>
      {s.p.erros
        .filter((e) => !filter || e.materiaId === filter)
        .map((e) => (
          <div key={e.id} className="panel">
            <Badge>{nomeMateria(e.materiaId)}</Badge>
            <h2>{topicos.find((t) => t.id === e.topicoId)?.titulo}</h2>
            <p>{questoes.find((q) => q.id === e.questaoId)?.enunciado}</p>
            <p>
              <strong>Sua resposta:</strong> {e.erro}
            </p>
            <p>
              <strong>Resposta correta:</strong> {e.correta}
            </p>
            <p>{e.explicacao}</p>
            <label className="field">
              Observação pessoal
              <textarea
                value={e.observacao}
                placeholder="O que fez você escolher essa alternativa?"
                onChange={(event) =>
                  s.atualizar((p) => ({
                    ...p,
                    erros: p.erros.map((x) =>
                      x.id === e.id
                        ? { ...x, observacao: event.target.value }
                        : x,
                    ),
                  }))
                }
              />
            </label>
            <label className="checkbox">
              <input
                type="checkbox"
                checked={e.revisar}
                onChange={(event) =>
                  s.atualizar((p) => ({
                    ...p,
                    erros: p.erros.map((x) =>
                      x.id === e.id
                        ? { ...x, revisar: event.target.checked }
                        : x,
                    ),
                  }))
                }
              />{" "}
              Preciso revisar este ponto
            </label>
            <a href="#/aulas/interpretacao">Retomar a aula →</a>
          </div>
        ))}
      {!s.p.erros.filter((e) => !filter || e.materiaId === filter).length && (
        <Empty title="Nenhum erro registrado por aqui">
          Ao errar uma questão, você poderá revisar a explicação e anotar o que
          aprendeu. <a href="#/aulas/interpretacao">Experimentar a aula</a>.
        </Empty>
      )}
    </>
  );
}
export function Reviews({ s }: { s: Store }) {
  const today = new Date().toLocaleDateString("sv-SE");
  const pending = s.p.revisoes.filter((r) => !r.revisadaEm);
  return (
    <>
      <Heading eyebrow="APRENDER TAMBÉM É RETOMAR" title="Revisões">
        Use “Revisar depois” ao final de uma aula para adicioná-la à sua lista.
      </Heading>
      {["Revisar hoje", "Revisões pendentes", "Revisado recentemente"].map(
        (title, i) => {
          const list =
            i === 2
              ? s.p.revisoes.filter((r) => r.revisadaEm)
              : i === 0
                ? pending.filter(
                    (r) =>
                      new Date(r.data).toLocaleDateString("sv-SE") === today,
                  )
                : pending.filter(
                    (r) =>
                      new Date(r.data).toLocaleDateString("sv-SE") !== today,
                  );
          return (
            <section className="panel" key={title}>
              <h2>
                {title} <Badge>{list.length}</Badge>
              </h2>
              {list.length ? (
                list.map((r) => (
                  <div className="topic-row" key={r.aulaId}>
                    <a href={`#/aulas/${r.aulaId}`}>
                      {aulas.find((a) => a.id === r.aulaId)?.titulo}
                    </a>
                    {!r.revisadaEm ? (
                      <button
                        className="small-button"
                        onClick={() =>
                          s.atualizar((p) => ({
                            ...p,
                            revisoes: p.revisoes.map((x) =>
                              x.aulaId === r.aulaId
                                ? { ...x, revisadaEm: new Date().toISOString() }
                                : x,
                            ),
                          }))
                        }
                      >
                        Marcar revisada <Check size={16} />
                      </button>
                    ) : (
                      <span>
                        {new Date(r.revisadaEm).toLocaleDateString("pt-BR")}
                      </span>
                    )}
                  </div>
                ))
              ) : (
                <p className="muted">Nenhuma revisão nesta lista.</p>
              )}
            </section>
          );
        },
      )}
    </>
  );
}
export function Simulados({ s }: { s: Store }) {
  const [mode, setMode] = useState("Por matéria");
  const [subject, setSubject] = useState("portugues");
  const [career, setCareer] = useState(cargos[0].id);
  const [started, setStarted] = useState(false);
  const list = questoes.filter((q) =>
    mode === "Questões reais comprovadas"
      ? q.tipo === "real"
      : mode === "Erros anteriores"
        ? s.p.erros.some((e) => e.questaoId === q.id)
        : mode === "Por matéria"
          ? q.materiaId === subject
          : mode === "Por cargo"
            ? q.cargoIds.includes(career)
            : q.tipo === "inedita",
  );
  return (
    <>
      <Heading eyebrow="PRÁTICA COM PROPÓSITO" title="Simulados">
        Treino demonstrativo com 1 questão inédita. Ainda não representa uma
        prova completa.
      </Heading>
      <div className="panel">
        <h2>Como você quer praticar?</h2>
        <div className="mode-grid">
          {[
            "Por matéria",
            "Por cargo",
            "Misto",
            "Erros anteriores",
            "Questões inéditas",
            "Questões reais comprovadas",
          ].map((m) => (
            <button
              className={mode === m ? "selected" : ""}
              aria-pressed={mode === m}
              key={m}
              onClick={() => {
                setMode(m);
                setStarted(false);
              }}
            >
              <ListChecks size={20} />
              {m}
            </button>
          ))}
        </div>
        {mode === "Por matéria" && (
          <label className="field">
            Matéria
            <select
              value={subject}
              onChange={(e) => {
                setSubject(e.target.value);
                setStarted(false);
              }}
            >
              {materias.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.titulo}
                </option>
              ))}
            </select>
          </label>
        )}
        {mode === "Por cargo" && (
          <label className="field">
            Cargo · vínculos demonstrativos
            <select
              value={career}
              onChange={(e) => {
                setCareer(e.target.value);
                setStarted(false);
              }}
            >
              {cargos.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.tribunal} — {c.titulo} — {c.especialidade}
                </option>
              ))}
            </select>
          </label>
        )}
        <p>{list.length} questão disponível para esta seleção.</p>
        <button
          className="button"
          disabled={!list.length}
          onClick={() => setStarted(true)}
        >
          Iniciar treino <ArrowRight size={17} />
        </button>
      </div>
      {started && list.map((q) => <Question key={q.id} q={q} s={s} />)}
      {!list.length && (
        <Empty title="Ainda não há questões nesta seleção">
          Questões reais só serão publicadas com banca, ano, órgão, cargo, prova
          e fonte comprováveis.
        </Empty>
      )}
      <div className="panel real-placeholder">
        <Badge tone="blue">QUESTÃO REAL · MODELO DE IDENTIFICAÇÃO</Badge>
        <p>Banca · Ano · Órgão · Cargo · Prova · Fonte</p>
        <span className="muted">
          Aguardando origem comprovável. Nenhuma questão real cadastrada.
        </span>
      </div>
    </>
  );
}
export function Sources() {
  return (
    <>
      <Heading eyebrow="TRANSPARÊNCIA EDITORIAL" title="Fontes">
        Cada conteúdo deverá apontar para sua origem. Nenhum edital foi validado
        nesta primeira versão.
      </Heading>
      <div className="hierarchy">
        Edital / retificação do cargo <ChevronRight /> Fonte oficial vigente{" "}
        <ChevronRight /> Prova oficial da banca <ChevronRight /> Fonte
        pedagógica confiável <ChevronRight /> Conteúdo produzido por IA
      </div>
      <div className="career-grid">
        {categoriasFontes.map((cat, i) => (
          <section className="panel source-card" key={cat}>
            <span className="overline">{String(i + 1).padStart(2, "0")}</span>
            <h2>{cat}</h2>
            {fontes.filter((f) => f.categoria === cat).length ? (
              fontes
                .filter((f) => f.categoria === cat)
                .map((f) => <p key={f.id}>{f.titulo}</p>)
            ) : (
              <p className="muted">Aguardando confirmação documental.</p>
            )}
            <Badge>
              {cat === "Outras referências" ? "Demonstração" : "Em auditoria"}
            </Badge>
          </section>
        ))}
      </div>
    </>
  );
}
export function About() {
  return (
    <>
      <Heading eyebrow="CONHECIMENTO COMPARTILHADO" title="Sobre o Projeto">
        Plataforma gratuita de estudos para concursos de tribunais.
      </Heading>
      <div className="panel prose">
        <h2>Estude uma vez. Aproveite em vários concursos.</h2>
        <p>
          O Conteúdo Mestre organiza o aprendizado por matéria, tópico e aula.
          Uma aula pode apoiar vários cargos, com extensões específicas quando
          necessário. A lista inicial não é uma declaração das exigências dos
          editais.
        </p>
        <h2>Compromisso com a origem</h2>
        <p>
          Conteúdo oficial, compartilhado, específico e suplementar possui
          identificação própria. Dados de editais só serão confirmados com
          documentação. A demonstração atual foi produzida por IA e aguarda
          revisão.
        </p>
        <h2>Seu progresso, no seu dispositivo</h2>
        <p>
          Aulas concluídas, respostas, erros e revisões ficam armazenados neste
          navegador. O login com Google é opcional e permite sincronizar com sua
          conta. O progresso de visitante é preservado e cada conta tem um
          armazenamento separado. Limpar os dados do navegador remove as cópias
          locais; somente dados já sincronizados podem ser recuperados da nuvem.
        </p>
        <h2>Estudar também sem conexão</h2>
        <p>
          Após o primeiro acesso online, as telas e o conteúdo inicial podem ser
          consultados offline. Para instalar, use a opção de instalação do
          navegador; no iPhone, use Compartilhar → Adicionar à Tela de Início. A
          disponibilidade depende do navegador.
        </p>
        <h2>Próximos capítulos</h2>
        <p>
          Auditoria de editais, revisão das aulas e inclusão de fontes e
          questões comprovadas. A estrutura permite novos tribunais e cargos,
          incluindo TRE-SP e TRT-2.
        </p>
      </div>
    </>
  );
}
