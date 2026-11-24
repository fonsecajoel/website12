"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import type { Product } from "@/lib/types";
import ProductCard from "@/components/ProductCard";

const TABS = [
  { key: "novos", label: "Novidades", filter: (p: Product) => !!p.isNew },
  { key: "promo", label: "Promoções", filter: (p: Product) => !!p.isPromo },
  { key: "top", label: "Mais amados", filter: (p: Product) => p.rating >= 4.7 },
] as const;

export function ProductShowcase({ products }: { products: Product[] }) {
  const [tab, setTab] = useState<(typeof TABS)[number]["key"]>("novos");
  const current = TABS.find((t) => t.key === tab) ?? TABS[0];
  const list = products.filter(current.filter).slice(0, 8);

  return (
    <section className="mx-auto w-full max-w-[1500px] px-6 py-24 md:px-16">
      <div className="mb-14 flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
        <div>
          <p className="mb-3 text-[11px] uppercase tracking-[0.35em] text-gold-400">A seleção</p>
          <h2 className="font-bold text-5xl leading-none text-warm-100 md:text-6xl">
            Peças que <span className="italic text-gold-300">falam</span> por si.
          </h2>
        </div>
        <div className="no-scrollbar relative flex max-w-full shrink-0 gap-1 overflow-x-auto rounded-full border border-noir-600 p-1">
          {TABS.map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`relative z-10 whitespace-nowrap rounded-full px-2.5 py-2.5 text-[10px] uppercase tracking-[0.1em] transition-colors sm:px-5 sm:text-[11px] sm:tracking-[0.2em] ${tab === t.key ? "text-noir-950" : "text-warm-100 hover:text-gold-400"}`}
            >
              {tab === t.key && (
                <motion.span layoutId="tab-pill" className="absolute inset-0 -z-10 rounded-full bg-gold-400" transition={{ type: "spring", bounce: 0.25, duration: 0.6 }} />
              )}
              {t.label}
            </button>
          ))}
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={tab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4 }}
          className="grid grid-cols-2 gap-x-5 gap-y-12 md:grid-cols-4 md:gap-x-8"
        >
          {list.map((p, i) => (
            <ProductCard key={p.id} product={p} index={i} />
          ))}
        </motion.div>
      </AnimatePresence>

      <div className="mt-16 flex justify-center">
        <Link href="/produtos" className="border-b border-gold-500 pb-1 text-[11px] uppercase tracking-[0.3em] text-gold-300 transition-colors hover:text-gold-100">
          Ver toda a coleção
        </Link>
      </div>
    </section>
  );
}
