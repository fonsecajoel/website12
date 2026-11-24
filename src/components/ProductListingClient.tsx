"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronRight, LayoutGrid, Rows3, Search, SlidersHorizontal, X } from "lucide-react";
import type { Product } from "@/lib/types";
import ProductCard from "./ProductCard";
import { formatPrice } from "@/lib/format";

type Sort = "relevancia" | "menor" | "maior" | "novidades" | "avaliacao";

interface Props {
  initialProducts: Product[];
  title: string;
  initialCategory?: string;
  initialFilter?: string;
  initialQuery?: string;
}

const LABELS: Record<string, string> = {
  vestidos: "Vestidos", conjuntos: "Conjuntos", saias: "Saias", sapatos: "Sapatos", bolsas: "Bolsas",
  bijuteria: "Bijuteria", blusas: "Blusas", blazers: "Blazers", "t-shirts": "T-shirts", "calças": "Calças",
  tricot: "Tricot", bodys: "Bodys", "macacões": "Macacões",
};
const label = (s: string): string => LABELS[s] ?? s.charAt(0).toUpperCase() + s.slice(1);

export default function ProductListingClient({ initialProducts, title, initialCategory, initialFilter, initialQuery }: Props) {
  const [query, setQuery] = useState(initialQuery ?? "");
  const [cats, setCats] = useState<string[]>(initialCategory ? [initialCategory] : []);
  const [sizes, setSizes] = useState<string[]>([]);
  const [colors, setColors] = useState<string[]>([]);
  const [maxPrice, setMaxPrice] = useState<number>(() => Math.ceil(Math.max(...initialProducts.map((p) => p.price), 0)));
  const [filter, setFilter] = useState<string | undefined>(initialFilter);
  const [sort, setSort] = useState<Sort>("relevancia");
  const [cols, setCols] = useState<3 | 4>(4);
  const [panel, setPanel] = useState(false);

  const priceCeil = Math.ceil(Math.max(...initialProducts.map((p) => p.price), 0));
  const allCats = useMemo(() => [...new Set(initialProducts.map((p) => p.subcategory))], [initialProducts]);
  const allSizes = useMemo(() => [...new Set(initialProducts.flatMap((p) => p.sizes))], [initialProducts]);
  const allColors = useMemo(() => {
    const m = new Map<string, string>();
    initialProducts.forEach((p) => p.colors.forEach((c) => m.set(c.name, c.hex)));
    return [...m.entries()];
  }, [initialProducts]);

  const list = useMemo(() => {
    const q = query.trim().toLowerCase();
    const out = initialProducts.filter(
      (p) =>
        (!q || `${p.name} ${p.description} ${p.subcategory}`.toLowerCase().includes(q)) &&
        (cats.length === 0 || cats.includes(p.subcategory)) &&
        (sizes.length === 0 || p.sizes.some((s) => sizes.includes(s))) &&
        (colors.length === 0 || p.colors.some((c) => colors.includes(c.name))) &&
        p.price <= maxPrice &&
        (filter !== "novos" || p.isNew) &&
        (filter !== "promo" || p.isPromo),
    );
    const sorters: Record<Sort, (a: Product, b: Product) => number> = {
      relevancia: () => 0,
      menor: (a, b) => a.price - b.price,
      maior: (a, b) => b.price - a.price,
      novidades: (a, b) => Number(!!b.isNew) - Number(!!a.isNew),
      avaliacao: (a, b) => b.rating - a.rating,
    };
    return [...out].sort(sorters[sort]);
  }, [initialProducts, query, cats, sizes, colors, maxPrice, filter, sort]);

  const toggle = (arr: string[], set: (v: string[]) => void, v: string) => set(arr.includes(v) ? arr.filter((x) => x !== v) : [...arr, v]);
  const chips = [
    ...cats.map((c) => ({ k: `c-${c}`, t: label(c), clear: () => toggle(cats, setCats, c) })),
    ...sizes.map((s) => ({ k: `s-${s}`, t: `Tam. ${s}`, clear: () => toggle(sizes, setSizes, s) })),
    ...colors.map((c) => ({ k: `k-${c}`, t: c, clear: () => toggle(colors, setColors, c) })),
    ...(filter ? [{ k: "f", t: filter === "novos" ? "Novidades" : "Promoções", clear: () => setFilter(undefined) }] : []),
    ...(maxPrice < priceCeil ? [{ k: "p", t: `Até ${formatPrice(maxPrice)}`, clear: () => setMaxPrice(priceCeil) }] : []),
  ];
  const clearAll = () => { setCats([]); setSizes([]); setColors([]); setFilter(undefined); setMaxPrice(priceCeil); setQuery(""); };

  const Filters = (
    <div className="flex flex-col gap-10">
      <div>
        <h3 className="mb-4 text-[11px] uppercase tracking-[0.25em] text-gold-400">Categorias</h3>
        <div className="flex flex-wrap gap-2">
          {allCats.map((c) => (
            <button key={c} onClick={() => toggle(cats, setCats, c)} className={`border px-3 py-1.5 text-xs transition-colors ${cats.includes(c) ? "border-gold-400 bg-gold-400 text-noir-950" : "border-noir-600 text-warm-300 hover:border-gold-500"}`}>
              {label(c)}
            </button>
          ))}
        </div>
      </div>
      <div>
        <h3 className="mb-4 text-[11px] uppercase tracking-[0.25em] text-gold-400">Tamanho</h3>
        <div className="flex flex-wrap gap-2">
          {allSizes.map((s) => (
            <button key={s} onClick={() => toggle(sizes, setSizes, s)} className={`min-w-10 border px-2 py-2 text-xs transition-colors ${sizes.includes(s) ? "border-gold-400 bg-gold-400 text-noir-950" : "border-noir-600 text-warm-300 hover:border-gold-500"}`}>
              {s}
            </button>
          ))}
        </div>
      </div>
      <div>
        <h3 className="mb-4 text-[11px] uppercase tracking-[0.25em] text-gold-400">Cor</h3>
        <div className="flex flex-wrap gap-3">
          {allColors.map(([name, hex]) => (
            <button key={name} title={name} aria-label={name} onClick={() => toggle(colors, setColors, name)} className={`h-7 w-7 rounded-full border-2 transition-transform hover:scale-110 ${colors.includes(name) ? "border-gold-400 scale-110" : "border-noir-600"}`} style={{ backgroundColor: hex }} />
          ))}
        </div>
      </div>
      <div>
        <h3 className="mb-4 flex justify-between text-[11px] uppercase tracking-[0.25em] text-gold-400">
          Preço máximo <span className="text-warm-200">{formatPrice(maxPrice)}</span>
        </h3>
        <input type="range" min={0} max={priceCeil} value={maxPrice} onChange={(e) => setMaxPrice(Number(e.target.value))} className="w-full accent-[var(--color-gold-400)]" />
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-noir-950">
      <div className="mx-auto max-w-[1500px] px-6 pt-12 md:px-16">
        <nav className="mb-6 flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-warm-400">
          <Link href="/" className="hover:text-gold-400">Início</Link>
          <ChevronRight className="h-3 w-3" />
          <span className="text-warm-200">{title}</span>
        </nav>
        <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="font-serif text-5xl text-warm-100 md:text-7xl">
          {title}
        </motion.h1>
        <p className="mt-3 text-sm text-warm-400">{list.length} {list.length === 1 ? "peça" : "peças"}</p>

        <div className="sticky top-[calc(4rem+1px)] z-30 -mx-6 mt-8 flex flex-wrap items-center gap-3 border-y border-noir-700 bg-noir-950/90 px-6 py-3 backdrop-blur md:-mx-16 md:px-16 lg:top-[7.5rem]">
          <button onClick={() => setPanel(true)} className="flex items-center gap-2 border border-noir-600 px-4 py-2 text-[11px] uppercase tracking-[0.2em] text-warm-200 hover:border-gold-500 lg:hidden">
            <SlidersHorizontal className="h-4 w-4" /> Filtros
          </button>
          <div className="relative flex-1 min-w-[180px] max-w-sm">
            <Search className="absolute left-0 top-1/2 h-4 w-4 -translate-y-1/2 text-warm-400" />
            <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Buscar na coleção…" className="w-full border-b border-noir-600 bg-transparent py-2 pl-7 text-sm text-warm-100 outline-none placeholder:text-warm-500 focus:border-gold-400" />
          </div>
          <select value={sort} onChange={(e) => setSort(e.target.value as Sort)} className="border border-noir-600 bg-noir-900 px-3 py-2 text-xs text-warm-200 outline-none focus:border-gold-400">
            <option value="relevancia">Relevância</option>
            <option value="novidades">Novidades</option>
            <option value="menor">Menor preço</option>
            <option value="maior">Maior preço</option>
            <option value="avaliacao">Mais bem avaliados</option>
          </select>
          <div className="hidden gap-1 md:flex">
            <button aria-label="3 colunas" onClick={() => setCols(3)} className={`p-2 ${cols === 3 ? "text-gold-400" : "text-warm-500"}`}><Rows3 className="h-4 w-4" /></button>
            <button aria-label="4 colunas" onClick={() => setCols(4)} className={`p-2 ${cols === 4 ? "text-gold-400" : "text-warm-500"}`}><LayoutGrid className="h-4 w-4" /></button>
          </div>
        </div>

        <AnimatePresence>
          {chips.length > 0 && (
            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="flex flex-wrap items-center gap-2 overflow-hidden pt-4">
              {chips.map((c) => (
                <motion.button layout key={c.k} onClick={c.clear} className="flex items-center gap-1.5 rounded-full bg-noir-800 px-3 py-1 text-xs text-warm-200 hover:bg-noir-700">
                  {c.t} <X className="h-3 w-3" />
                </motion.button>
              ))}
              <button onClick={clearAll} className="text-xs text-gold-400 underline underline-offset-4">Limpar tudo</button>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex gap-12 py-10">
          <aside className="hidden w-60 shrink-0 lg:block">{Filters}</aside>
          <div className="flex-1">
            {list.length === 0 ? (
              <div className="flex flex-col items-center py-32 text-center">
                <p className="mb-4 font-serif text-3xl text-warm-100">Nenhuma peça encontrada</p>
                <button onClick={clearAll} className="border border-gold-500 px-8 py-3 text-[11px] uppercase tracking-[0.2em] text-gold-300 hover:bg-gold-400 hover:text-noir-950">Limpar filtros</button>
              </div>
            ) : (
              <motion.div layout className={`grid grid-cols-2 gap-x-5 gap-y-12 md:gap-x-8 ${cols === 3 ? "md:grid-cols-3" : "md:grid-cols-3 xl:grid-cols-4"}`}>
                {list.map((p, i) => (
                  <ProductCard key={p.id} product={p} index={i} />
                ))}
              </motion.div>
            )}
          </div>
        </div>
      </div>

      <AnimatePresence>
        {panel && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[60] bg-noir-950/80 backdrop-blur-sm lg:hidden" onClick={() => setPanel(false)}>
            <motion.div initial={{ x: "-100%" }} animate={{ x: 0 }} exit={{ x: "-100%" }} transition={{ type: "spring", damping: 30, stiffness: 300 }} onClick={(e) => e.stopPropagation()} className="h-full w-[85%] max-w-sm overflow-y-auto bg-noir-900 p-6">
              <div className="mb-8 flex items-center justify-between">
                <h2 className="font-serif text-2xl">Filtros</h2>
                <button onClick={() => setPanel(false)} aria-label="Fechar"><X className="h-5 w-5" /></button>
              </div>
              {Filters}
              <button onClick={() => setPanel(false)} className="mt-10 w-full bg-gold-400 py-4 text-[11px] font-bold uppercase tracking-[0.2em] text-noir-950">Ver {list.length} peças</button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
