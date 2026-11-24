"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { createSessionClient } from "@/lib/supabase/server";
import { slugify } from "@/lib/format";

async function adminClient() {
  const supabase = await createSessionClient();
  if (!supabase) throw new Error("Supabase não configurado");
  const { data } = await supabase.auth.getUser();
  if (!data.user) redirect("/admin/login");
  const { data: isAdmin } = await supabase.rpc("is_admin");
  if (!isAdmin) throw new Error("Sem permissão de administrador");
  return supabase;
}

const STATUSES = ["aguardando_pagamento", "pago", "em_separacao", "enviado", "entregue", "cancelado"] as const;

export async function updateOrderStatus(formData: FormData): Promise<void> {
  const { id, status } = z.object({ id: z.uuid(), status: z.enum(STATUSES) }).parse(Object.fromEntries(formData));
  const supabase = await adminClient();
  await supabase.from("orders").update({ status }).eq("id", id);
  revalidatePath("/admin");
}

export async function updateProduct(formData: FormData): Promise<void> {
  const data = z
    .object({ id: z.string(), price: z.coerce.number().min(0), stock: z.coerce.number().int().min(0), active: z.string().optional() })
    .parse(Object.fromEntries(formData));
  const supabase = await adminClient();
  await supabase
    .from("products")
    .update({ price: data.price, stock: data.stock, active: data.active === "on", updated_at: new Date().toISOString() })
    .eq("id", data.id);
  revalidatePath("/admin");
  revalidatePath("/", "layout");
}

export async function createProduct(formData: FormData): Promise<void> {
  const d = z
    .object({
      name: z.string().min(2),
      price: z.coerce.number().min(0),
      originalPrice: z.string().optional(),
      subcategory: z.string().min(2),
      sizes: z.string().min(1),
      image1: z.url(),
      image2: z.string().optional(),
      stock: z.coerce.number().int().min(0),
      description: z.string().optional(),
    })
    .parse(Object.fromEntries(formData));
  const supabase = await adminClient();
  await supabase.from("products").insert({
    name: d.name,
    slug: `${slugify(d.name)}-${Date.now().toString(36)}`,
    price: d.price,
    original_price: d.originalPrice ? Number(d.originalPrice) : null,
    subcategory: slugify(d.subcategory),
    sizes: d.sizes.split(",").map((s) => s.trim()).filter(Boolean),
    colors: [{ name: "Única", hex: "#1a1a1a" }],
    images: [d.image1, d.image2].filter((v): v is string => !!v),
    stock: d.stock,
    description: d.description ?? "",
    is_new: true,
  });
  revalidatePath("/admin");
  revalidatePath("/", "layout");
}

export async function signOut(): Promise<void> {
  const supabase = await createSessionClient();
  await supabase?.auth.signOut();
  redirect("/admin/login");
}
