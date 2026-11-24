import type { Metadata } from "next";
import ProductListingClient from "@/components/ProductListingClient";
import { getProducts } from "@/lib/catalog";

export const metadata: Metadata = { title: "Coleção | Aela." };

type SearchParams = Promise<Record<string, string | string[] | undefined>>;
const one = (v: string | string[] | undefined): string | undefined => (typeof v === "string" ? v : undefined);

export default async function ProdutosPage({ searchParams }: { searchParams: SearchParams }) {
  const sp = await searchParams;
  const products = await getProducts();
  const filtro = one(sp.filtro);
  const title = filtro === "novos" ? "Novidades" : filtro === "promo" ? "Promoções" : "Coleção";
  const categoria = one(sp.categoria);
  const q = one(sp.q);
  return (
    <ProductListingClient
      key={`${categoria}-${filtro}-${q}`}
      initialProducts={products}
      title={title}
      initialCategory={categoria}
      initialFilter={filtro}
      initialQuery={q}
    />
  );
}
