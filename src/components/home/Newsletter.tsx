"use client";

import { useState, type FormEvent } from "react";
import { Check } from "lucide-react";

export function Newsletter() {
  const [state, setState] = useState<"idle" | "loading" | "done" | "error">("idle");

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const email = new FormData(e.currentTarget).get("email");
    setState("loading");
    const res = await fetch("/api/newsletter", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email }) });
    setState(res.ok ? "done" : "error");
  }

  return (
    <section className="grain relative overflow-hidden bg-gold-400 px-6 py-28 text-noir-950">
      <div className="relative mx-auto max-w-2xl text-center">
        <h2 className="mb-4 font-black text-5xl leading-none md:text-7xl">Ganhe 10% off</h2>
        <p className="mb-10 text-sm text-noir-950">Na primeira compra + acesso antecipado às novas coleções.</p>
        {state === "done" ? (
          <p className="flex items-center justify-center gap-2 text-sm font-semibold uppercase tracking-[0.2em]">
            <Check className="h-5 w-5" /> Cupom BEMVINDA10 enviado!
          </p>
        ) : (
          <form onSubmit={submit} className="flex flex-col gap-3 sm:flex-row">
            <input name="email" type="email" required placeholder="Seu melhor e-mail" className="flex-1 border-b-2 border-noir-950 bg-transparent px-2 py-3 text-noir-950 outline-none placeholder:text-noir-950/75" />
            <button disabled={state === "loading"} className="bg-noir-950 px-10 py-4 text-[11px] font-bold uppercase tracking-[0.25em] text-gold-300 transition-transform hover:scale-105 disabled:opacity-60">
              {state === "loading" ? "Enviando…" : "Quero meu cupom"}
            </button>
          </form>
        )}
        {state === "error" && <p className="mt-3 text-sm font-semibold text-noir-950">Não foi possível subscrever. Tente novamente.</p>}
      </div>
    </section>
  );
}
