import { NextResponse } from "next/server";
import QRCode from "qrcode";
import { z } from "zod";
import { getProducts } from "@/lib/catalog";
import { isValidCpf, onlyDigits } from "@/lib/format";
import { STORE, shippingFor } from "@/lib/store-config";
import { buildPixPayload } from "@/lib/payments/pix";
import { sandboxBoleto } from "@/lib/payments/boleto";
import { installmentOptions, pixPrice } from "@/lib/payments/installments";
import { createServiceClient } from "@/lib/supabase/server";
import type { Order, OrderItem, PaymentResult } from "@/lib/types";

const schema = z.object({
  customer: z.object({
    name: z.string().min(3),
    email: z.email(),
    phone: z.string().min(10),
    cpf: z.string().refine(isValidCpf, "CPF inválido"),
  }),
  address: z.object({
    cep: z.string().regex(/^\d{5}-?\d{3}$/),
    street: z.string().min(2),
    number: z.string().min(1),
    complement: z.string().optional(),
    district: z.string().min(2),
    city: z.string().min(2),
    state: z.string().length(2),
  }),
  items: z
    .array(
      z.object({
        productId: z.string(),
        size: z.string(),
        color: z.string(),
        quantity: z.number().int().min(1).max(20),
      }),
    )
    .min(1),
  payment: z.discriminatedUnion("method", [
    z.object({ method: z.literal("pix") }),
    z.object({ method: z.literal("boleto") }),
    z.object({
      method: z.enum(["credito", "debito"]),
      // Os dados completos do cartão nunca chegam ao servidor: só a marca e os últimos 4 dígitos.
      brand: z.string(),
      last4: z.string().regex(/^\d{4}$/),
      installments: z.number().int().min(1).max(12),
    }),
  ]),
});

function orderNumber(): string {
  return `AE${Date.now().toString().slice(-8)}${Math.floor(Math.random() * 90 + 10)}`;
}

export async function POST(request: Request) {
  const parsed = schema.safeParse(await request.json());
  if (!parsed.success) {
    return NextResponse.json({ error: "Dados inválidos", issues: parsed.error.issues }, { status: 400 });
  }
  const input = parsed.data;
  const catalog = await getProducts();

  // Preços recalculados no servidor — o cliente nunca define o valor.
  const items: OrderItem[] = [];
  for (const line of input.items) {
    const product = catalog.find((p) => p.id === line.productId);
    if (!product) return NextResponse.json({ error: "Produto indisponível" }, { status: 409 });
    if (product.stock < line.quantity) {
      return NextResponse.json({ error: `Stock insuficiente: ${product.name}` }, { status: 409 });
    }
    items.push({
      productId: product.id,
      name: product.name,
      image: product.images[0] ?? "",
      size: line.size,
      color: line.color,
      quantity: line.quantity,
      unitPrice: product.price,
    });
  }

  const subtotal = items.reduce((s, i) => s + i.unitPrice * i.quantity, 0);
  const shipping = shippingFor(subtotal);
  const gross = subtotal + shipping;
  const method = input.payment.method;
  const total = method === "pix" ? pixPrice(gross) : Math.round(gross * 100) / 100;
  const discount = Math.round((gross - total) * 100) / 100;
  const number = orderNumber();
  const sandbox = !process.env.PAYMENT_GATEWAY_TOKEN;

  let payment: PaymentResult;
  let installments = 1;
  if (input.payment.method === "pix") {
    const payload = buildPixPayload({
      key: process.env.PIX_KEY ?? "pix@aela.com.br",
      merchantName: process.env.PIX_MERCHANT_NAME ?? "AELA MODA",
      merchantCity: process.env.PIX_MERCHANT_CITY ?? "SAO PAULO",
      amount: total,
      txid: number,
    });
    payment = {
      method: "pix",
      payload,
      qrCodeDataUrl: await QRCode.toDataURL(payload, { margin: 1, width: 320 }),
      expiresAt: new Date(Date.now() + STORE.pixExpiresMinutes * 60000).toISOString(),
    };
  } else if (input.payment.method === "boleto") {
    const due = new Date(Date.now() + STORE.boletoDueDays * 86400000);
    payment = { method: "boleto", ...sandboxBoleto(total, number, due), dueDate: due.toISOString() };
  } else {
    const allowed = input.payment.method === "debito" ? 1 : installmentOptions(total).length;
    installments = Math.min(input.payment.installments, allowed);
    payment = {
      method: input.payment.method,
      brand: input.payment.brand,
      last4: input.payment.last4,
      installments,
      installmentValue: Math.round((total / installments) * 100) / 100,
      authorizationCode: Math.random().toString(36).slice(2, 8).toUpperCase(),
    };
  }

  const status = payment.method === "credito" || payment.method === "debito" ? "pago" : "aguardando_pagamento";
  const order: Order = {
    id: crypto.randomUUID(),
    number,
    createdAt: new Date().toISOString(),
    status,
    customer: { ...input.customer, cpf: onlyDigits(input.customer.cpf) },
    address: input.address,
    items,
    subtotal,
    discount,
    shipping,
    total,
    paymentMethod: method,
    installments,
    payment,
    persisted: false,
    sandbox,
  };

  const db = createServiceClient();
  if (db) {
    const { error } = await db.from("orders").insert({
      id: order.id,
      number,
      status,
      customer: order.customer,
      address: order.address,
      subtotal,
      discount,
      shipping,
      total,
      payment_method: method,
      installments,
      payment: payment.method === "pix" ? { ...payment, qrCodeDataUrl: undefined } : payment,
    });
    if (!error) {
      await db.from("order_items").insert(
        items.map((i) => ({
          order_id: order.id,
          product_id: i.productId,
          name: i.name,
          image: i.image,
          size: i.size,
          color: i.color,
          quantity: i.quantity,
          unit_price: i.unitPrice,
        })),
      );
      await Promise.all(items.map((i) => db.rpc("decrement_stock", { p_id: i.productId, qty: i.quantity })));
      order.persisted = true;
    }
  }

  return NextResponse.json(order);
}
