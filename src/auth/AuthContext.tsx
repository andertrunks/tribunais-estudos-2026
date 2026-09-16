import { useEffect, useMemo, useState, type ReactNode } from "react";
import type { Session } from "@supabase/supabase-js";
import { supabase, supabaseConfigured } from "../lib/supabase";
import { AuthContext, type AuthContextValue } from "./auth-context";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(supabaseConfigured);
  const [authError, setAuthError] = useState(() => {
    const params = new URLSearchParams(location.search || location.hash.slice(1));
    return params.has("error") ? "O login não foi concluído. Você pode tentar novamente ou continuar como visitante." : "";
  });

  useEffect(() => {
    if (!supabase) {
      setLoading(false);
      return;
    }
    let active = true;
    void supabase.auth.getSession().then(({ data, error }) => {
      if (active) {
        setSession(data.session);
        setLoading(false);
        if (error) setAuthError("Não foi possível recuperar sua sessão. O progresso local foi preservado.");
      }
    }).catch(() => {
      if (active) { setLoading(false); setAuthError("Não foi possível conectar sua conta. Você pode continuar estudando localmente."); }
    });
    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, nextSession) => {
        if (!active) return;
        setSession(nextSession);
        setLoading(false);
        if (nextSession) {
          setAuthError("");
          try {
            const route = sessionStorage.getItem("tribunais-oauth-route");
            if (route?.startsWith("#/")) location.hash = route;
            sessionStorage.removeItem("tribunais-oauth-route");
          } catch { /* Storage is optional. */ }
        }
      },
    );
    return () => {
      active = false;
      listener.subscription.unsubscribe();
    };
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      configured: supabaseConfigured,
      loading,
      authError,
      session,
      user: session?.user ?? null,
      signInWithGoogle: async () => {
        if (!supabase) throw new Error("O login ainda não está configurado.");
        setAuthError("");
        try { sessionStorage.setItem("tribunais-oauth-route", location.hash.startsWith("#/") ? location.hash : "#/"); } catch { /* Storage is optional. */ }
        const redirectTo = new URL(
          import.meta.env.BASE_URL,
          window.location.origin,
        ).toString();
        const { error } = await supabase.auth.signInWithOAuth({
          provider: "google",
          options: { redirectTo },
        });
        if (error) throw error;
      },
      signOut: async () => {
        if (!supabase) return;
        const { error } = await supabase.auth.signOut({ scope: "local" });
        if (error) throw error;
      },
    }),
    [loading, session, authError],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
