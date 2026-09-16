import { useState } from "react";
import { useDialog } from "./useDialog";
import { LogIn, ShieldCheck, UserPlus, X } from "lucide-react";
import { useAuth } from "./useAuth";

export function AuthModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const { configured, signInWithGoogle } = useAuth();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const dialog = useDialog(open, onClose);

  if (!open) return null;

  async function authenticate() {
    setBusy(true);
    setError("");
    try {
      await signInWithGoogle();
    } catch (cause) {
      setError(
        cause instanceof Error
          ? cause.message
          : "Não foi possível iniciar o login.",
      );
      setBusy(false);
    }
  }

  return (
    <div className="modal-backdrop" role="presentation" onMouseDown={onClose}>
      <section
        ref={dialog}
        className="auth-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="auth-title"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <button
          className="modal-close"
          onClick={onClose}
          aria-label="Fechar"
        >
          <X size={19} />
        </button>
        <span className="auth-icon">
          <ShieldCheck size={26} />
        </span>
        <span className="eyebrow">CONTA OPCIONAL</span>
        <h2 id="auth-title">Seu estudo, em todos os dispositivos</h2>
        <p>
          Entre para sincronizar aulas concluídas, respostas, erros e revisões.
          Você também pode continuar estudando sem cadastro.
          Na primeira entrada em cada conta, o progresso de visitante deste dispositivo será copiado, sem apagar o original.
        </p>
        {configured ? (
          <div className="auth-options">
            <button disabled={busy} onClick={authenticate}>
              <LogIn size={18} /> Entrar com Google
            </button>
            <button disabled={busy} onClick={authenticate}>
              <UserPlus size={18} /> Criar conta grátis com Google
            </button>
          </div>
        ) : (
          <div className="notice">
            O login ainda não está configurado. O estudo como visitante continua
            funcionando.
          </div>
        )}
        {error && (
          <div className="notice gold" role="alert">
            {error}
          </div>
        )}
        <button className="continue-guest" onClick={onClose}>
          Continuar sem cadastro
        </button>
        <small>
          Usamos somente os dados necessários para autenticação e sincronização
          do progresso.
        </small>
      </section>
    </div>
  );
}
