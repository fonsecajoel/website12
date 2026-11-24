"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Lock } from "lucide-react";
import { createBrowserSupabase } from "@/lib/supabase/browser";
import { isSupabaseConfigured } from "@/lib/supabase/config";

export default function AdminLogin() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    setLoading(true);
    const { error: err } = await createBrowserSupabase().auth.signInWithPassword({
      email: String(f.get("email")),
      password: String(f.get("password")),
    });
    setLoading(false);
    if (err) return setError("Credenciais inválidas");
    router.push("/admin");
    router.refresh();
  }

  if (!isSupabaseConfigured()) {
    return <p className="py-32 text-center text-warm-300">Configure NEXT_PUBLIC_SUPABASE_URL e NEXT_PUBLIC_SUPABASE_ANON_KEY no .env.local.</p>;
  }

  return (
    <div className="flex min-h-[70vh] items-center justify-center px-6">
      <form onSubmit={submit} className="flex w-full max-w-sm flex-col gap-4 border border-noir-700 bg-noir-900 p-8">
        <Lock className="mx-auto h-8 w-8 text-gold-400" strokeWidth={1.2} />
        <h1 className="text-center font-serif text-3xl">Painel Aela.</h1>
        <input name="email" type="email" required placeholder="E-mail" autoComplete="email" className="border border-noir-600 bg-noir-950 px-4 py-3 outline-none focus:border-gold-400" />
        <input name="password" type="password" required placeholder="Senha" autoComplete="current-password" className="border border-noir-600 bg-noir-950 px-4 py-3 outline-none focus:border-gold-400" />
        {error && <p className="text-sm text-danger">{error}</p>}
        <button disabled={loading} className="flex items-center justify-center gap-2 bg-gold-400 py-3 text-[11px] font-bold uppercase tracking-[0.2em] text-noir-950 disabled:opacity-60">
          {loading && <Loader2 className="h-4 w-4 animate-spin" />} Entrar
        </button>
      </form>
    </div>
  );
}
