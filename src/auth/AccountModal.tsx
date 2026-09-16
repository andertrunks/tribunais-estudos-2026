import { useState } from "react";
import { useDialog } from "./useDialog";
import {
  Cloud,
  CloudOff,
  LogOut,
  RefreshCcw,
  UserRound,
  X,
} from "lucide-react";
import { useAuth } from "./useAuth";

type Props = {
  open: boolean;
  onClose: () => void;
  syncStatus: "guest" | "syncing" | "synced" | "error";
  syncMessage: string;
  onSync: () => Promise<void>;
  onImport: () => void;
};

export function AccountModal({
  open,
  onClose,
  syncStatus,
  syncMessage,
  onSync,
  onImport,
}: Props) {
  const { user, signOut } = useAuth();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [failedPhoto, setFailedPhoto] = useState<string | null>(null);
  const dialog = useDialog(open && Boolean(user), onClose);

  if (!open || !user) return null;
  const name =
    typeof user.user_metadata?.full_name === "string"
      ? user.user_metadata.full_name
      : "Estudante";
  const avatar = user.user_metadata?.avatar_url;
  const photo = typeof avatar === "string" && avatar.startsWith("https://") && avatar !== failedPhoto ? avatar : null;

  async function logout() {
    setBusy(true);
    setError("");
    try {
      await signOut();
      onClose();
    } catch {
      setError("Não foi possível sair. Tente novamente quando estiver conectado.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="modal-backdrop" role="presentation" onMouseDown={onClose}>
      <section
        ref={dialog}
        className="auth-modal account-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="account-title"
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
          {photo ? <img className="account-photo" src={photo} alt="Foto do perfil" referrerPolicy="no-referrer" onError={() => setFailedPhoto(photo)} /> : <UserRound size={26} />}
        </span>
        <span className="eyebrow">MINHA CONTA</span>
        <h2 id="account-title">Olá, {name}</h2>
        <p className="account-email">{user.email}</p>
        <div className={`cloud-status ${syncStatus}`}>
          {syncStatus === "synced" ? (
            <Cloud size={20} />
          ) : (
            <CloudOff size={20} />
          )}
          <span>
            <strong>
              {syncStatus === "syncing"
                ? "Sincronizando"
                : syncStatus === "synced"
                  ? "Tudo sincronizado"
                  : "Salvo neste dispositivo"}
            </strong>
            <small>{syncMessage}</small>
          </span>
        </div>
        <div className="account-actions">
          <button disabled={busy || syncStatus === "syncing"} onClick={onImport}>
            Adicionar progresso de visitante
          </button>
          <button
            disabled={busy || syncStatus === "syncing"}
            onClick={() => void onSync()}
          >
            <RefreshCcw size={18} /> Sincronizar agora
          </button>
          <button disabled={busy} onClick={() => void logout()}>
            <LogOut size={18} /> Sair
          </button>
        </div>
        <small>
          {error && <span role="alert">{error}</span>}
          Sair não apaga seu progresso salvo na nuvem ou neste dispositivo.
        </small>
      </section>
    </div>
  );
}
