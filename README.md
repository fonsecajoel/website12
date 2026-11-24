# Aela. — loja de moda feminina

Next.js 16 · Tailwind 4 · Framer Motion · Supabase · Zustand

## Arrancar
```bash
pnpm install
cp .env.example .env.local   # preencher chaves do Supabase e Pix
pnpm dev
```

## Supabase
1. No SQL Editor, correr `supabase/migrations/0001_loja.sql` (tabelas + RLS) e `supabase/seed.sql` (produtos).
2. Criar um utilizador em Authentication e torná-lo admin:
   `insert into public.admins (user_id) values ('<uuid>');`
3. Painel em `/admin` (pedidos, estados, preços, stock, novos produtos, KPIs).

Sem variáveis do Supabase o site usa o catálogo local (`src/lib/data.ts`).

## Pagamentos
- **Pix** — BR Code real (copia-e-cola + QR) com `PIX_KEY`, 5% de desconto.
- **Cartão de crédito** — até 12x sem juros (parcela mínima R$ 20).
- **Cartão de débito** — à vista.
- **Boleto** — à vista, vencimento em 3 dias.

Os preços são recalculados no servidor (`/api/checkout`). Os dados completos do cartão nunca chegam ao servidor.
Cartão e boleto correm em **modo sandbox** até ligar um gateway (Mercado Pago, Pagar.me…) via `PAYMENT_GATEWAY_TOKEN`.

## Scripts
`pnpm test` · `pnpm lint` · `pnpm typecheck` · `pnpm build` · `pnpm seed:sql`
