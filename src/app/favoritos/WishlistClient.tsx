"use client";

import Link from "next/link";
import { Heart } from "lucide-react";
import type { Product } from "@/lib/types";
import ProductCard from "@/components/ProductCard";
import { useCartStore } from "@/store/cart";
import { useHydrated } from "@/lib/use-hydrated";

export function WishlistClient({ products }: { products: Product[] }) {
  const ids = useCartStore((s) => s.wishlist);
  const hydrated = useHydrated();
  const list = hydrated ? products.filter((p) => ids.includes(p.id)) : [];
  return (
    <div className="mx-auto min-h-[70vh] max-w-[1500px] px-6 py-16 md:px-16">
      <h1 className="mb-12 font-bold text-5xl md:text-7xl">Favoritos</h1>
      {list.length === 0 ? (
        <div className="flex flex-col items-center gap-6 py-24 text-center">
          <Heart className="h-12 w-12 text-gold-500" strokeWidth={1} />
          <p className="text-warm-100">Ainda não guardou nenhuma peça.</p>
          <Link href="/produtos" className="bg-gold-400 px-10 py-4 text-[11px] font-bold uppercase tracking-[0.2em] text-noir-950">Explorar coleção</Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-x-5 gap-y-12 md:grid-cols-4 md:gap-x-8">
          {list.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
        </div>
      )}
    </div>
  );
}
