import type { ReactNode } from "react";
import { ArrowUpRight, BookOpen } from "lucide-react";
import { materias, topicos } from "../data/catalogo";
import { aulas } from "../data/aulas";
import type { Materia, Progresso } from "../types";
export function Badge({
  children,
  tone = "",
}: {
  children: ReactNode;
  tone?: string;
}) {
  return <span className={`badge ${tone}`}>{children}</span>;
}
export function Notice() {
  return (
    <div className="notice">
      <span className="dot" /> Consulte o status e os vínculos documentais de cada aula.
      Demonstrações e trilhas suplementares não representam cobertura formal do edital.
    </div>
  );
}
export function Empty({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <div className="empty">
      <BookOpen size={28} />
      <h3>{title}</h3>
      <p>{children}</p>
    </div>
  );
}
export function Heading({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string;
  title: string;
  children?: ReactNode;
}) {
  return (
    <header className="page-heading">
      <span className="eyebrow">{eyebrow}</span>
      <h1>{title}</h1>
      {children && <p>{children}</p>}
    </header>
  );
}
export function Meter({ value, label }: { value: number; label: string }) {
  return (
    <div
      className="meter"
      role="progressbar"
      aria-label={label}
      aria-valuenow={value}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <span style={{ width: `${value}%` }} />
    </div>
  );
}
export function MateriaCard({ m, p }: { m: Materia; p: Progresso }) {
  const ts = topicos.filter((t) => t.materiaId === m.id);
  const as = aulas.filter((a) => a.materiaId === m.id);
  const done = as.filter((a) => p.aulas.includes(a.id)).length;
  return (
    <a className="subject-card" href={`#/materias/${m.id}`}>
      <div className="card-top">
        <span
          className={`subject-icon ${m.grupo === "Tecnologia" ? "blue" : ""}`}
        >
          <BookOpen size={22} />
        </span>
        <ArrowUpRight size={19} />
      </div>
      <span className="overline">{m.grupo}</span>
      <h3>{m.titulo}</h3>
      <p>{m.descricao}</p>
      <div className="card-foot">
        <span>
          {ts.length} tópicos · {as.length} {as.length === 1 ? "aula" : "aulas"}
        </span>
        <Badge tone={m.suplementar ? "gold" : ""}>
          {m.suplementar
            ? "Suplementar"
            : as.length
              ? "Conteúdo inicial"
              : "Em construção"}
        </Badge>
      </div>
      {as.length > 0 && (
        <Meter
          value={(done / as.length) * 100}
          label={`Progresso em ${m.titulo}`}
        />
      )}
    </a>
  );
}
export const nomeMateria = (id: string) =>
  materias.find((m) => m.id === id)?.titulo || id;
