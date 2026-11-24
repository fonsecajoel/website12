import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProduct, getProducts } from "@/lib/catalog";
import ProductDetail from "./ProductDetail";

type Params = Promise<{ slug: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const product = await getProduct((await params).slug);
  return product ? { title: `${product.name} | Aela.`, description: product.description } : {};
}

export default async function ProductPage({ params }: { params: Params }) {
  const { slug } = await params;
  const all = await getProducts();
  const product = all.find((p) => p.slug === slug);
  if (!product) notFound();
  const related = all.filter((p) => p.id !== product.id && (p.subcategory === product.subcategory || p.category === product.category)).slice(0, 4);
  return <ProductDetail product={product} related={related} />;
}
