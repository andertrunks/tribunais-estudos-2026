import { useEffect, useState } from "react";
import {
  BookOpen,
  House,
  Library,
  BriefcaseBusiness,
  ChartNoAxesCombined,
  NotebookPen,
  RotateCcw,
  ListChecks,
  Files,
  Info,
  Menu,
  X,
  Download,
  ChevronRight,
  Cloud,
  CloudOff,
  LogIn,
  UserRound,
} from "lucide-react";
import { aulas } from "./data/aulas";
import { useProgresso } from "./hooks/useProgresso";
import { Empty } from "./components/ui";
import { AuthModal } from "./auth/AuthModal";
import { AccountModal } from "./auth/AccountModal";
import { useAuth } from "./auth/useAuth";
import {
  Home,
  Subjects,
  Subject,
  Lesson,
  Careers,
  Progress,
  Errors,
  Reviews,
  Simulados,
  Sources,
  About,
} from "./pages";
const nav = [
  ["", "Início", House],
  ["materias", "Matérias", Library],
  ["cargos", "Cargos e Editais", BriefcaseBusiness],
  ["progresso", "Meu Progresso", ChartNoAxesCombined],
  ["erros", "Caderno de Erros", NotebookPen],
  ["revisoes", "Revisões", RotateCcw],
  ["simulados", "Simulados", ListChecks],
  ["fontes", "Fontes", Files],
  ["sobre", "Sobre o Projeto", Info],
] as const;
interface InstallPrompt extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: string }>;
}
export default function App() {
  const [route, setRoute] = useState(location.hash.startsWith("#/") ? location.hash.slice(2) : "");
  const [menu, setMenu] = useState(false);
  const [install, setInstall] = useState<InstallPrompt | null>(null);
  const [authOpen, setAuthOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const { user, loading: authLoading, authError } = useAuth();
  const store = useProgresso();
  useEffect(() => {
    if (user) setAuthOpen(false);
    else setAccountOpen(false);
  }, [user]);
  useEffect(() => {
    function change() {
      setRoute(location.hash.startsWith("#/") ? location.hash.slice(2) : "");
      setMenu(false);
      window.scrollTo(0, 0);
      document.getElementById("conteudo")?.focus();
    }
    function before(e: Event) {
      e.preventDefault();
      setInstall(e as InstallPrompt);
    }
    window.addEventListener("hashchange", change);
    window.addEventListener("beforeinstallprompt", before);
    return () => {
      window.removeEventListener("hashchange", change);
      window.removeEventListener("beforeinstallprompt", before);
    };
  }, []);
  const [page, id] = route.split("/");
  useEffect(() => {
    document.title = `${page === "aulas" ? aulas.find((a) => a.id === id)?.titulo || "Aula" : nav.find((n) => n[0] === page)?.[1] || "Página"} — Tribunais Estudos 2026`;
  }, [page, id]);
  return (
    <>
      <a
        className="skip"
        href="#conteudo"
        onClick={(e) => {
          e.preventDefault();
          document.getElementById("conteudo")?.focus();
        }}
      >
        Pular para o conteúdo
      </a>
      <aside className={`sidebar ${menu ? "open" : ""}`}>
        <a className="brand" href="#/">
          <span className="brand-symbol">
            <BookOpen size={25} />
          </span>
          <span>
            TRIBUNAIS<span>ESTUDOS 2026</span>
          </span>
        </a>
        <button
          className="close-menu icon-button"
          aria-label="Fechar menu"
          onClick={() => setMenu(false)}
        >
          <X />
        </button>
        <div className="sidebar-label">SEU ESPAÇO DE ESTUDOS</div>
        <nav aria-label="Menu principal">
          {nav.map(([url, label, Icon]) => (
            <a
              key={url}
              href={`#/${url}`}
              className={
                page === url || (page === "aulas" && url === "materias")
                  ? "active"
                  : ""
              }
              aria-current={page === url ? "page" : undefined}
            >
              <Icon size={19} />
              {label}
              {page === url && <span className="active-dot" />}
            </a>
          ))}
        </nav>
        <div className="sidebar-bottom">
          <div className="free">
            <span className="dot" /> Gratuito. Feito para aprender.
          </div>
          <p>
            Uma base de conhecimento.
            <br />
            Muitos caminhos possíveis.
          </p>
          {user ? (
            <button
              className={`storage-note ${store.syncStatus}`}
              onClick={() => setAccountOpen(true)}
            >
              {store.syncStatus === "synced" ? (
                <Cloud size={17} />
              ) : (
                <CloudOff size={17} />
              )}
              <span>
                <strong>
                  {store.syncStatus === "synced"
                    ? "Sincronizado"
                    : "Salvo no dispositivo"}
                </strong>
                <small>{store.syncMessage}</small>
              </span>
            </button>
          ) : (
            <button className="storage-note" onClick={() => setAuthOpen(true)}>
              <CloudOff size={17} />
              <span>
                <strong>Salvo neste dispositivo</strong>
                <small>Criar conta grátis e sincronizar</small>
              </span>
            </button>
          )}
          <span className="version">CONTEÚDO MESTRE · V1.0</span>
        </div>
      </aside>
      {menu && (
        <button
          className="overlay"
          aria-label="Fechar navegação"
          onClick={() => setMenu(false)}
        />
      )}
      <div className="workspace">
        <header className="topbar">
          <button
            className="mobile-menu icon-button"
            aria-label="Abrir menu"
            aria-expanded={menu}
            onClick={() => setMenu(!menu)}
          >
            <Menu />
          </button>
          <span className="breadcrumb">
            Conteúdo Mestre <ChevronRight size={14} />{" "}
            <strong>{nav.find((n) => n[0] === page)?.[1] || "Leitura"}</strong>
          </span>
          <div className="topbar-right">
            <span className="edition">EDIÇÃO 2026</span>
            {install && (
              <button
                className="small-button"
                onClick={async () => {
                  await install.prompt();
                  const result = await install.userChoice;
                  if (result.outcome === "accepted") setInstall(null);
                }}
              >
                <Download size={15} /> Instalar
              </button>
            )}
            {authLoading ? (
              <span
                className="auth-loading"
                aria-label="Verificando sua conta"
              />
            ) : user ? (
              <button
                className="account-button"
                onClick={() => setAccountOpen(true)}
                aria-label="Minha conta"
              >
                <UserRound size={17} />
                <span>Minha conta</span>
              </button>
            ) : (
              <button
                className="account-button"
                onClick={() => setAuthOpen(true)}
                aria-label="Entrar"
              >
                <LogIn size={17} />
                <span>Entrar</span>
              </button>
            )}
          </div>
        </header>
        <main id="conteudo" tabIndex={-1}>
          {authError && <div className="notice" role="alert">{authError}</div>}
          {store.erroStorage && (
            <div role="alert" className="notice">
              Não foi possível salvar neste navegador. Mantenha esta página
              aberta para preservar a sessão.
            </div>
          )}
          {page === "" ? (
            <Home s={store} />
          ) : page === "materias" ? (
            id ? (
              <Subject id={id} s={store} />
            ) : (
              <Subjects s={store} />
            )
          ) : page === "aulas" ? (
            <Lesson id={id} s={store} />
          ) : page === "cargos" ? (
            <Careers id={id} />
          ) : page === "progresso" ? (
            <Progress s={store} />
          ) : page === "erros" ? (
            <Errors s={store} />
          ) : page === "revisoes" ? (
            <Reviews s={store} />
          ) : page === "simulados" ? (
            <Simulados s={store} />
          ) : page === "fontes" ? (
            <Sources />
          ) : page === "sobre" ? (
            <About />
          ) : (
            <Empty title="Página não encontrada">
              <a href="#/">Voltar ao início</a>
            </Empty>
          )}
        </main>
        <footer>
          TRIBUNAIS ESTUDOS 2026{" "}
          <span>
            Conteúdo em construção · Seu progresso fica neste navegador.
          </span>
        </footer>
      </div>
      <AuthModal open={authOpen} onClose={() => setAuthOpen(false)} />
      <AccountModal
        onImport={store.importGuest}
        open={accountOpen}
        onClose={() => setAccountOpen(false)}
        syncStatus={store.syncStatus}
        syncMessage={store.syncMessage}
        onSync={store.syncNow}
      />
    </>
  );
}
