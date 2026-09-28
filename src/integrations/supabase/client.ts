import { createClient } from "@supabase/supabase-js";
import type { Database } from "./types";

function env(name: string, viteName: "VITE_SUPABASE_URL" | "VITE_SUPABASE_PUBLISHABLE_KEY") {
  const viteValue = import.meta.env[viteName];
  if (viteValue) return viteValue;

  if (typeof process !== "undefined") {
    const serverValue = process.env[name];
    if (serverValue) return serverValue;
  }

  return undefined;
}

function createSupabaseClient() {
  const supabaseUrl = env("SUPABASE_URL", "VITE_SUPABASE_URL");
  const supabasePublishableKey = env(
    "SUPABASE_PUBLISHABLE_KEY",
    "VITE_SUPABASE_PUBLISHABLE_KEY",
  );

  if (!supabaseUrl || !supabasePublishableKey) {
    const missing = [
      ...(!supabaseUrl ? ["SUPABASE_URL"] : []),
      ...(!supabasePublishableKey ? ["SUPABASE_PUBLISHABLE_KEY"] : []),
    ];
    const message =
      `Missing Supabase environment variable(s): ${missing.join(", ")}. Configure the Supabase project URL and publishable key in the deployment environment.`;
    console.error(`[Supabase] ${message}`);
    throw new Error(message);
  }

  return createClient<Database>(supabaseUrl, supabasePublishableKey, {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,
    },
  });
}

let client: ReturnType<typeof createSupabaseClient> | undefined;

export const supabase = new Proxy({} as ReturnType<typeof createSupabaseClient>, {
  get(_, prop, receiver) {
    if (!client) client = createSupabaseClient();
    return Reflect.get(client, prop, receiver);
  },
});
