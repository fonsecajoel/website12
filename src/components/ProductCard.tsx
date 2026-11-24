"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Heart, Star } from "lucide-react";
import type { Product } from "@/lib/types";
import { formatPrice } from "@/lib/format";
import { maxInstallment, pixPrice } from "@/lib/payments/installments";
import { useCartStore } from "@/store/cart";
import { useHydrated } from "@/lib/use-hydrated";

export default function ProductCard({ product, index = 0 }: { product: Product; index?: number }) {
  const [hover, setHover] = useState(false);
  const hydrated = useHydrated();
  const addItem = useCartStore((s) => s.addItem);
  const toggleWishlist = useCartStore((s) => s.toggleWishlist);
  const liked = useCartStore((s) => s.wishlist.includes(product.id));
  const inst = maxInstallment(product.price);
  const discount = product.originalPrice ? Math.round((1 - product.price / product.originalPrice) * 100) : 0;

  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay: (index % 4) * 0.08, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className="group relative flex flex-col"
    >
      <div className="relative aspect-[3/4] overflow-hidden bg-noir-800">
        <Link href={`/produto/${product.slug}`} aria-label={product.name}>
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 50vw, 25vw"
            className={`object-cover transition-all duration-[1200ms] ease-out ${hover && product.images[1] ? "opacity-0 scale-110" : "opacity-100 scale-100"}`}
          />
          {product.images[1] && (
            <Image
              src={product.images[1]}
              alt=""
              fill
              sizes="(max-width: 768px) 50vw, 25vw"
              className={`object-cover transition-all duration-[1200ms] ease-out ${hover ? "opacity-100 scale-100" : "opacity-0 scale-105"}`}
            />
          )}
        </Link>

        <div className="pointer-events-none absolute left-3 top-3 flex flex-col gap-1.5">
          {product.isNew && <span className="bg-warm-100 px-2 py-1 text-[9px] font-bold uppercase tracking-[0.2em] text-noir-950">Novo</span>}
          {discount > 0 && <span className="bg-wine-500 px-2 py-1 text-[9px] font-bold uppercase tracking-[0.2em] text-warm-100">-{discount}%</span>}
          {product.stock > 0 && product.stock <= 5 && (
            <span className="bg-noir-950/80 px-2 py-1 text-[9px] uppercase tracking-[0.2em] text-gold-300">Últimas {product.stock}</span>
          )}
        </div>

        <button
          onClick={() => toggleWishlist(product.id)}
          aria-label={liked ? "Remover dos favoritos" : "Adicionar aos favoritos"}
          className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-noir-950/60 backdrop-blur transition-transform hover:scale-110"
        >
          <Heart className={`h-4 w-4 transition-colors ${hydrated && liked ? "fill-gold-400 text-gold-400" : "text-warm-100"}`} strokeWidth={1.5} />
        </button>

        <div className="absolute inset-x-0 bottom-0 translate-y-full bg-noir-950/90 p-3 backdrop-blur transition-transform duration-500 group-hover:translate-y-0">
          <p className="mb-2 text-center text-[9px] uppercase tracking-[0.25em] text-warm-400">Adicionar rápido</p>
          <div className="flex flex-wrap justify-center gap-1.5">
            {product.sizes.map((size) => (
              <button
                key={size}
                onClick={() => addItem(product, size, product.colors[0]?.name ?? "Única")}
                className="min-w-9 border border-noir-500 px-2 py-1.5 text-[11px] text-warm-100 transition-colors hover:border-gold-400 hover:bg-gold-400 hover:text-noir-950"
              >
                {size}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-4 flex flex-col gap-1">
        <div className="flex items-start justify-between gap-2">
          <Link href={`/produto/${product.slug}`} className="font-serif text-lg leading-tight text-warm-100 transition-colors hover:text-gold-300">
            {product.name}
          </Link>
          <span className="flex shrink-0 items-center gap-1 text-[11px] text-warm-400">
            <Star className="h-3 w-3 fill-gold-400 text-gold-400" /> {product.rating.toFixed(1)}
          </span>
        </div>
        <div className="flex items-baseline gap-2">
          <span className="text-base font-medium text-gold-300">{formatPrice(product.price)}</span>
          {product.originalPrice && <span className="text-xs text-warm-500 line-through">{formatPrice(product.originalPrice)}</span>}
        </div>
        <p className="text-[11px] text-warm-400">
          {inst.count > 1 ? `${inst.count}x de ${formatPrice(inst.value)} sem juros` : "à vista"} ·{" "}
          <span className="text-gold-400">{formatPrice(pixPrice(product.price))} no Pix</span>
        </p>
        <div className="mt-1 flex gap-1.5">
          {product.colors.map((c) => (
            <span key={c.name} title={c.name} className="h-3 w-3 rounded-full border border-noir-500" style={{ backgroundColor: c.hex }} />
          ))}
        </div>
      </div>
    </motion.article>
  );
}
