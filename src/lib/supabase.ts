import { createClient } from "@supabase/supabase-js";
import {
  SUPABASE_PUBLIC_URL,
  SUPABASE_PUBLISHABLE_KEY,
} from "../config/supabase.public";

const url = import.meta.env.VITE_SUPABASE_URL || SUPABASE_PUBLIC_URL;
const publishableKey =
  import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY ||
  import.meta.env.VITE_SUPABASE_ANON_KEY || SUPABASE_PUBLISHABLE_KEY;

export const supabaseConfigured = Boolean(url && publishableKey);

export const supabase = supabaseConfigured
  ? createClient(url, publishableKey, {
      auth: {
        flowType: "pkce",
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: true,
        storageKey: "tribunais-estudos-auth",
      },
    })
  : null;
