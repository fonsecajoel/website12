import { redirect } from "next/navigation";
import { createSessionClient } from "@/lib/supabase/server";
import { rowToProduct } from "@/lib/catalog";
import { formatPrice } from "@/lib/format";
import { createProduct, signOut, updateOrderStatus, updateProduct } from "./actions";

export const dynamic = "force-dynamic";

export const metadata = { title: "Painel | Aela." };

const STATUS_LABEL: Record<string, string> = {
  aguardando_pagamento: "Aguardando pagamento",
  pago: "Pago",
  em_separacao: "Em separação",
  enviado: "Enviado",
  entregue: "Entregue",
  cancelado: "Cancelado",
};
const METHOD_LABEL: Record<string, string> = { pix: "Pix", credito: "Crédito", debito: "Débito", boleto: "Boleto" };

interface OrderRow {
  id: string;
  number: string;
  status: string;
  customer: { name: string; email: string };
  total: number | string;
  payment_method: string;
  installments: number;
  created_at: string;
}

const input = "border border-noir-600 bg-noir-950 px-2 py-1.5 text-sm outline-none focus:border-gold-400";

export default async function AdminPage() {
  const supabase = await createSessionClient();
  if (!supabase) {
    return (
      <div className="mx-auto max-w-2xl px-6 py-24 text-warm-300">
        <h1 className="mb-4 font-serif text-4xl text-warm-100">Painel indisponível</h1>
        <p>Defina as variáveis do Supabase no <code>.env.local</code> (ver README).</p>
      </div>
    );
  }
  const { data: auth } = await supabase.auth.getUser();
  if (!auth.user) redirect("/admin/login");
  const { data: isAdmin } = await supabase.rpc("is_admin");
  if (!isAdmin) {
    return (
      <div className="mx-auto max-w-2xl px-6 py-24 text-warm-300">
        <h1 className="mb-4 font-serif text-4xl text-warm-100">Sem acesso</h1>
        <p className="mb-4">Adicione este utilizador como administrador no SQL Editor do Supabase:</p>
        <pre className="overflow-x-auto bg-noir-900 p-4 text-xs">insert into public.admins (user_id) values (&apos;{auth.user.id}&apos;);</pre>
      </div>
    );
  }

  const [{ data: orders }, { data: productRows }, { count: subscribers }] = await Promise.all([
    supabase.from("orders").select("id, number, status, customer, total, payment_method, installments, created_at").order("created_at", { ascending: false }).limit(100),
    supabase.from("products").select("*").order("created_at", { ascending: false }),
    supabase.from("newsletter").select("*", { count: "exact", head: true }),
  ]);
  const list = (orders ?? []) as OrderRow[];
  const products = (productRows ?? []).map(rowToProduct);
  const paid = list.filter((o) => !["aguardando_pagamento", "cancelado"].includes(o.status));
  const revenue = paid.reduce((s, o) => s + Number(o.total), 0);

  const kpis = [
    ["Faturamento", formatPrice(revenue)],
    ["Pedidos", String(list.length)],
    ["Ticket médio", formatPrice(paid.length ? revenue / paid.length : 0)],
    ["Aguardando pagamento", String(list.filter((o) => o.status === "aguardando_pagamento").length)],
    ["Produtos ativos", String(products.filter((p) => p.active).length)],
    ["Newsletter", String(subscribers ?? 0)],
  ];

  return (
    <div className="mx-auto max-w-[1500px] px-6 py-12 md:px-12">
      <div className="mb-10 flex items-center justify-between">
        <h1 className="font-serif text-4xl md:text-5xl">Painel</h1>
        <form action={signOut}><button className="text-[11px] uppercase tracking-[0.2em] text-warm-400 hover:text-gold-400">Sair</button></form>
      </div>

      <div className="mb-14 grid grid-cols-2 gap-3 md:grid-cols-6">
        {kpis.map(([label, value]) => (
          <div key={label} className="border border-noir-700 bg-noir-900 p-5">
            <p className="text-[10px] uppercase tracking-[0.2em] text-warm-400">{label}</p>
            <p className="mt-2 font-serif text-2xl text-gold-300">{value}</p>
          </div>
        ))}
      </div>

      <section className="mb-16">
        <h2 className="mb-4 font-serif text-3xl">Pedidos</h2>
        <div className="overflow-x-auto border border-noir-700">
          <table className="w-full text-left text-sm">
            <thead className="bg-noir-900 text-[10px] uppercase tracking-[0.2em] text-warm-400">
              <tr><th className="p-3">Nº</th><th className="p-3">Data</th><th className="p-3">Cliente</th><th className="p-3">Pagamento</th><th className="p-3">Total</th><th className="p-3">Estado</th></tr>
            </thead>
            <tbody>
              {list.length === 0 && <tr><td colSpan={6} className="p-6 text-center text-warm-500">Ainda sem pedidos.</td></tr>}
              {list.map((o) => (
                <tr key={o.id} className="border-t border-noir-700">
                  <td className="p-3 font-mono text-xs">{o.number}</td>
                  <td className="p-3 text-warm-400">{new Date(o.created_at).toLocaleString("pt-BR")}</td>
                  <td className="p-3">{o.customer.name}<br /><span className="text-xs text-warm-500">{o.customer.email}</span></td>
                  <td className="p-3">{METHOD_LABEL[o.payment_method]}{o.installments > 1 ? ` ${o.installments}x` : ""}</td>
                  <td className="p-3 text-gold-300">{formatPrice(Number(o.total))}</td>
                  <td className="p-3">
                    <form action={updateOrderStatus} className="flex gap-2">
                      <input type="hidden" name="id" value={o.id} />
                      <select name="status" defaultValue={o.status} className={input}>
                        {Object.entries(STATUS_LABEL).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
                      </select>
                      <button className="border border-gold-500 px-3 text-xs text-gold-300 hover:bg-gold-400 hover:text-noir-950">OK</button>
                    </form>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mb-16">
        <h2 className="mb-4 font-serif text-3xl">Produtos</h2>
        <div className="overflow-x-auto border border-noir-700">
          <table className="w-full text-left text-sm">
            <thead className="bg-noir-900 text-[10px] uppercase tracking-[0.2em] text-warm-400">
              <tr><th className="p-3">Produto</th><th className="p-3">Categoria</th><th className="p-3">Preço</th><th className="p-3">Stock</th><th className="p-3">Ativo</th><th className="p-3" /></tr>
            </thead>
            <tbody>
              {products.length === 0 && <tr><td colSpan={6} className="p-6 text-center text-warm-500">Sem produtos — corra supabase/seed.sql.</td></tr>}
              {products.map((p) => (
                <tr key={p.id} className="border-t border-noir-700">
                  <td className="p-3">{p.name}</td>
                  <td className="p-3 capitalize text-warm-400">{p.subcategory}</td>
                  <td className="p-3" colSpan={4}>
                    <form action={updateProduct} className="flex items-center gap-3">
                      <input type="hidden" name="id" value={p.id} />
                      <input name="price" type="number" step="0.01" defaultValue={p.price} className={`${input} w-28`} />
                      <input name="stock" type="number" defaultValue={p.stock} className={`${input} w-20 ${p.stock <= 5 ? "border-danger" : ""}`} />
                      <input name="active" type="checkbox" defaultChecked={p.active} className="h-4 w-4 accent-[var(--color-gold-400)]" />
                      <button className="border border-gold-500 px-3 py-1 text-xs text-gold-300 hover:bg-gold-400 hover:text-noir-950">Guardar</button>
                    </form>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h2 className="mb-4 font-serif text-3xl">Novo produto</h2>
        <form action={createProduct} className="grid gap-3 border border-noir-700 bg-noir-900 p-6 md:grid-cols-4">
          <input name="name" required placeholder="Nome" className={`${input} md:col-span-2`} />
          <input name="subcategory" required placeholder="Categoria (ex: vestidos)" className={input} />
          <input name="sizes" required placeholder="Tamanhos: P, M, G" className={input} />
          <input name="price" type="number" step="0.01" required placeholder="Preço" className={input} />
          <input name="originalPrice" type="number" step="0.01" placeholder="Preço original (opcional)" className={input} />
          <input name="stock" type="number" required placeholder="Stock" className={input} />
          <span />
          <input name="image1" type="url" required placeholder="URL imagem principal" className={`${input} md:col-span-2`} />
          <input name="image2" type="url" placeholder="URL imagem secundária" className={`${input} md:col-span-2`} />
          <textarea name="description" placeholder="Descrição" className={`${input} md:col-span-4`} rows={3} />
          <button className="bg-gold-400 py-3 text-[11px] font-bold uppercase tracking-[0.2em] text-noir-950 md:col-span-4">Criar produto</button>
        </form>
      </section>
    </div>
  );
}
