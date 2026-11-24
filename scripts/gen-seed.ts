// Gera supabase/seed.sql a partir de src/lib/data.ts — `node scripts/gen-seed.ts`
import { writeFileSync } from "node:fs";
import { products } from "../src/lib/data.ts";

const q = (v: string): string => `'${v.replace(/'/g, "''")}'`;
const arr = (v: string[]): string => `array[${v.map(q).join(",")}]::text[]`;

const rows = products.map((p) =>
  `(${[q(p.id), q(p.name), q(p.slug), p.price, p.originalPrice ?? "null", arr(p.images), q(p.category), q(p.subcategory), arr(p.sizes), `${q(JSON.stringify(p.colors))}::jsonb`, q(p.description), p.stock, p.rating, p.reviews, !!p.isNew, !!p.isPromo, !!p.isFeatured].join(", ")})`,
);

writeFileSync(
  "supabase/seed.sql",
  `insert into public.products (id, name, slug, price, original_price, images, category, subcategory, sizes, colors, description, stock, rating, reviews, is_new, is_promo, is_featured) values\n${rows.join(",\n")}\non conflict (id) do nothing;\n`,
);
console.log(`seed.sql: ${rows.length} produtos`);
