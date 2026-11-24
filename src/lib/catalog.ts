import "server-only";
import { products as localProducts, categories as localCategories } from "@/lib/data";
import type { Category, Product } from "@/lib/types";
import { createPublicClient } from "@/lib/supabase/server";

interface ProductRow {
  id: string;
  name: string;
  slug: string;
  price: number | string;
  original_price: number | string | null;
  images: string[] | null;
  category: string;
  subcategory: string;
  sizes: string[] | null;
  colors: Product["colors"] | null;
  description: string | null;
  details: string[] | null;
  stock: number;
  rating: number | string | null;
  reviews: number | null;
  is_new: boolean;
  is_promo: boolean;
  is_featured: boolean;
  active: boolean;
}

export function rowToProduct(r: ProductRow): Product {
  return {
    id: r.id,
    name: r.name,
    slug: r.slug,
    price: Number(r.price),
    originalPrice: r.original_price === null ? undefined : Number(r.original_price),
    images: r.images ?? [],
    category: r.category,
    subcategory: r.subcategory,
    sizes: r.sizes ?? [],
    colors: r.colors ?? [],
    description: r.description ?? "",
    details: r.details ?? undefined,
    stock: r.stock,
    rating: Number(r.rating ?? 5),
    reviews: r.reviews ?? 0,
    isNew: r.is_new,
    isPromo: r.is_promo,
    isFeatured: r.is_featured,
    active: r.active,
  };
}

/** Lê o catálogo do Supabase; se não estiver configurado (ou falhar), usa os dados locais. */
export async function getProducts(): Promise<Product[]> {
  const supabase = createPublicClient();
  if (!supabase) return localProducts;
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("active", true)
    .order("created_at", { ascending: false });
  if (error || !data || data.length === 0) return localProducts;
  return (data as ProductRow[]).map(rowToProduct);
}

export async function getProduct(slug: string): Promise<Product | undefined> {
  const all = await getProducts();
  return all.find((p) => p.slug === slug);
}

export async function getCategories(): Promise<Category[]> {
  return localCategories;
}
