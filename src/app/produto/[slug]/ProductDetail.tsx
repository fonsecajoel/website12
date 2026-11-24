"use client";

import { useState, type MouseEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Check, ChevronDown, ChevronRight, Heart, Minus, Plus, QrCode, RotateCcw, ShieldCheck, Star, Truck } from "lucide-react";
import type { Product } from "@/lib/types";
import { formatPrice } from "@/lib/format";
import { installmentOptions, pixPrice } from "@/lib/payments/installments";
import { STORE } from "@/lib/store-config";
import { useCartStore } from "@/store/cart";
import { useHydrated } from "@/lib/use-hydrated";
import ProductCard from "@/components/ProductCard";

export default function ProductDetail({ product, related }: { product: Product; related: Product[] }) {
  const [image, setImage] = useState(0);
  const [zoom, setZoom] = useState<{ x: number; y: number } | null>(null);
  const [color, setColor] = useState(product.colors[0]?.name ?? "Única");
  const [size, setSize] = useState(product.sizes.length === 1 ? product.sizes[0] : "");
  const [qty, setQty] = useState(1);
  const [sizeError, setSizeError] = useState(false);
  const [added, setAdded] = useState(false);
  const [showInstallments, setShowInstallments] = useState(false);
  const addItem = useCartStore((s) => s.addItem);
  const toggleWishlist = useCartStore((s) => s.toggleWishlist);
  const liked = useCartStore((s) => s.wishlist.includes(product.id));
  const hydrated = useHydrated();
  const options = installmentOptions(product.price);
  const last = options[options.length - 1];

  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    setZoom({ x: ((e.clientX - r.left) / r.width) * 100, y: ((e.clientY - r.top) / r.height) * 100 });
  };

  const add = () => {
    if (!size) {
      setSizeError(true);
      setTimeout(() => setSizeError(false), 600);
      return;
    }
    addItem(product, size, color, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="min-h-screen bg-noir-950 pb-24 pt-10 text-warm-100">
      <div className="mx-auto max-w-[1400px] px-6 md:px-12">
        <nav className="mb-8 flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-warm-400">
          <Link href="/" className="hover:text-gold-400">Início</Link>
          <ChevronRight className="h-3 w-3" />
          <Link href={`/produtos?categoria=${product.subcategory}`} className="capitalize hover:text-gold-400">{product.subcategory}</Link>
          <ChevronRight className="h-3 w-3" />
          <span className="text-warm-200">{product.name}</span>
        </nav>

        <div className="grid gap-12 lg:grid-cols-12">
          <div className="flex flex-col-reverse gap-4 lg:col-span-7 lg:flex-row">
            <div className="flex gap-3 lg:flex-col">
              {product.images.map((src, i) => (
                <button key={src} onClick={() => setImage(i)} className={`relative h-28 w-20 overflow-hidden border transition-all ${image === i ? "border-gold-400" : "border-transparent opacity-50 hover:opacity-100"}`}>
                  <Image src={src} alt="" fill sizes="80px" className="object-cover" />
                </button>
              ))}
            </div>
            <div
              className="relative aspect-[3/4] flex-1 cursor-zoom-in overflow-hidden bg-noir-800"
              onMouseMove={onMove}
              onMouseLeave={() => setZoom(null)}
            >
              <AnimatePresence mode="wait">
                <motion.div key={image} initial={{ opacity: 0, scale: 1.05 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }} className="absolute inset-0">
                  <Image
                    src={product.images[image].replace("w=600&h=800", "w=1200&h=1600")}
                    alt={product.name}
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 55vw"
                    className="object-cover transition-transform duration-200"
                    style={zoom ? { transform: "scale(1.8)", transformOrigin: `${zoom.x}% ${zoom.y}%` } : undefined}
                  />
                </motion.div>
              </AnimatePresence>
              {product.isNew && <span className="absolute left-4 top-4 bg-warm-100 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-noir-950">Novo</span>}
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-36">
              <div className="mb-3 flex items-center gap-2 text-xs text-warm-400">
                <span className="flex">{Array.from({ length: 5 }).map((_, i) => <Star key={i} className={`h-3.5 w-3.5 ${i < Math.round(product.rating) ? "fill-gold-400 text-gold-400" : "text-noir-500"}`} />)}</span>
                {product.rating.toFixed(1)} · {product.reviews} avaliações
              </div>
              <h1 className="mb-6 font-serif text-4xl leading-tight md:text-5xl">{product.name}</h1>

              <div className="mb-2 flex items-baseline gap-3">
                <span className="font-serif text-4xl text-gold-300">{formatPrice(product.price)}</span>
                {product.originalPrice && <span className="text-warm-500 line-through">{formatPrice(product.originalPrice)}</span>}
              </div>
              <p className="flex items-center gap-2 text-sm text-gold-400">
                <QrCode className="h-4 w-4" /> {formatPrice(pixPrice(product.price))} no Pix ({STORE.pixDiscount * 100}% off)
              </p>
              <button onClick={() => setShowInstallments((v) => !v)} className="mt-1 flex items-center gap-1 text-sm text-warm-300 hover:text-warm-100">
                ou {last.count}x de {formatPrice(last.value)} sem juros <ChevronDown className={`h-4 w-4 transition-transform ${showInstallments ? "rotate-180" : ""}`} />
              </button>
              <AnimatePresence>
                {showInstallments && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                    <div className="mt-3 grid grid-cols-2 gap-x-6 gap-y-1 border border-noir-700 p-4 text-xs text-warm-300">
                      {options.map((o) => (
                        <span key={o.count}>{o.count}x de {formatPrice(o.value)} <span className="text-warm-500">sem juros</span></span>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="my-8 h-px bg-noir-700" />

              <p className="mb-3 text-[11px] uppercase tracking-[0.25em] text-warm-400">Cor: <span className="text-warm-100">{color}</span></p>
              <div className="mb-8 flex gap-3">
                {product.colors.map((c) => (
                  <button key={c.name} aria-label={c.name} onClick={() => setColor(c.name)} className={`h-9 w-9 rounded-full border-2 p-0.5 transition-all ${color === c.name ? "border-gold-400" : "border-transparent hover:border-noir-500"}`}>
                    <span className="block h-full w-full rounded-full" style={{ backgroundColor: c.hex }} />
                  </button>
                ))}
              </div>

              <p className="mb-3 text-[11px] uppercase tracking-[0.25em] text-warm-400">Tamanho</p>
              <motion.div animate={sizeError ? { x: [0, -8, 8, -6, 6, 0] } : {}} className="mb-2 flex flex-wrap gap-2">
                {product.sizes.map((s) => (
                  <button key={s} onClick={() => setSize(s)} className={`h-12 min-w-12 border px-3 text-sm transition-all ${size === s ? "border-gold-400 bg-gold-400 text-noir-950" : sizeError ? "border-wine-500 text-warm-200" : "border-noir-600 text-warm-200 hover:border-gold-500"}`}>
                    {s}
                  </button>
                ))}
              </motion.div>
              <p className={`mb-6 h-4 text-xs ${sizeError ? "text-wine-500" : "text-warm-500"}`}>
                {sizeError ? "Selecione um tamanho" : product.stock <= 5 ? `Apenas ${product.stock} em stock` : "Em stock — envio em 24h"}
              </p>

              <div className="flex gap-3">
                <div className="flex h-14 items-center border border-noir-600">
                  <button aria-label="Diminuir" onClick={() => setQty((q) => Math.max(1, q - 1))} className="flex h-full w-11 items-center justify-center text-warm-300 hover:text-gold-400"><Minus className="h-4 w-4" /></button>
                  <span className="w-8 text-center">{qty}</span>
                  <button aria-label="Aumentar" onClick={() => setQty((q) => Math.min(product.stock, q + 1))} className="flex h-full w-11 items-center justify-center text-warm-300 hover:text-gold-400"><Plus className="h-4 w-4" /></button>
                </div>
                <button onClick={add} className="relative flex h-14 flex-1 items-center justify-center overflow-hidden bg-gold-400 text-[11px] font-bold uppercase tracking-[0.25em] text-noir-950 transition-colors hover:bg-gold-200">
                  <AnimatePresence mode="wait">
                    {added ? (
                      <motion.span key="ok" initial={{ y: 20 }} animate={{ y: 0 }} exit={{ y: -20 }} className="flex items-center gap-2"><Check className="h-4 w-4" /> Adicionado</motion.span>
                    ) : (
                      <motion.span key="add" initial={{ y: 20 }} animate={{ y: 0 }} exit={{ y: -20 }}>Adicionar à sacola</motion.span>
                    )}
                  </AnimatePresence>
                </button>
                <button onClick={() => toggleWishlist(product.id)} aria-label="Favoritar" className="flex h-14 w-14 items-center justify-center border border-noir-600 hover:border-gold-400">
                  <Heart className={`h-5 w-5 ${hydrated && liked ? "fill-gold-400 text-gold-400" : ""}`} strokeWidth={1.5} />
                </button>
              </div>

              <div className="mt-8 grid grid-cols-3 gap-3 text-center text-[10px] uppercase tracking-[0.15em] text-warm-400">
                <div className="flex flex-col items-center gap-2 border border-noir-700 p-3"><Truck className="h-5 w-5 text-gold-400" strokeWidth={1.3} />Frete grátis acima de {formatPrice(STORE.freeShippingThreshold)}</div>
                <div className="flex flex-col items-center gap-2 border border-noir-700 p-3"><RotateCcw className="h-5 w-5 text-gold-400" strokeWidth={1.3} />Troca grátis em 30 dias</div>
                <div className="flex flex-col items-center gap-2 border border-noir-700 p-3"><ShieldCheck className="h-5 w-5 text-gold-400" strokeWidth={1.3} />Compra 100% segura</div>
              </div>

              <div className="mt-8 border-t border-noir-700 pt-6">
                <h2 className="mb-3 text-[11px] uppercase tracking-[0.25em] text-gold-500">Descrição</h2>
                <p className="leading-relaxed text-warm-300">{product.description}</p>
              </div>
            </div>
          </div>
        </div>

        {related.length > 0 && (
          <section className="mt-32">
            <h2 className="mb-12 font-serif text-4xl md:text-5xl">Complete o <span className="italic text-gold-300">look</span></h2>
            <div className="grid grid-cols-2 gap-x-5 gap-y-12 md:grid-cols-4 md:gap-x-8">
              {related.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
