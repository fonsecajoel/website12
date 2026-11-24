import { NextResponse } from "next/server";
import { z } from "zod";
import { createPublicClient } from "@/lib/supabase/server";

export async function POST(request: Request) {
  const parsed = z.object({ email: z.email() }).safeParse(await request.json());
  if (!parsed.success) return NextResponse.json({ error: "E-mail inválido" }, { status: 400 });
  const db = createPublicClient();
  if (db) await db.from("newsletter").insert({ email: parsed.data.email.toLowerCase() });
  return NextResponse.json({ ok: true });
}
