-- Aela. — esquema da loja (catálogo, pedidos, newsletter, administradores)
create extension if not exists "pgcrypto";

create table if not exists public.products (
  id text primary key default gen_random_uuid()::text,
  name text not null,
  slug text not null unique,
  price numeric(10,2) not null check (price >= 0),
  original_price numeric(10,2),
  images text[] not null default '{}',
  category text not null default 'feminino',
  subcategory text not null default '',
  sizes text[] not null default '{}',
  colors jsonb not null default '[]',
  description text,
  details text[],
  stock integer not null default 0 check (stock >= 0),
  rating numeric(2,1) default 5,
  reviews integer default 0,
  is_new boolean not null default false,
  is_promo boolean not null default false,
  is_featured boolean not null default false,
  active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  number text not null unique,
  status text not null default 'aguardando_pagamento'
    check (status in ('aguardando_pagamento','pago','em_separacao','enviado','entregue','cancelado')),
  customer jsonb not null,
  address jsonb not null,
  subtotal numeric(10,2) not null,
  discount numeric(10,2) not null default 0,
  shipping numeric(10,2) not null default 0,
  total numeric(10,2) not null,
  payment_method text not null check (payment_method in ('pix','debito','credito','boleto')),
  installments integer not null default 1 check (installments between 1 and 12),
  payment jsonb not null default '{}',
  created_at timestamptz not null default now()
);

create table if not exists public.order_items (
  id bigint generated always as identity primary key,
  order_id uuid not null references public.orders(id) on delete cascade,
  product_id text references public.products(id) on delete set null,
  name text not null,
  image text,
  size text,
  color text,
  quantity integer not null check (quantity > 0),
  unit_price numeric(10,2) not null
);

create table if not exists public.newsletter (
  email text primary key,
  created_at timestamptz not null default now()
);

create table if not exists public.admins (
  user_id uuid primary key references auth.users(id) on delete cascade,
  created_at timestamptz not null default now()
);

create or replace function public.is_admin() returns boolean
language sql stable security definer set search_path = public as $$
  select exists (select 1 from public.admins where user_id = auth.uid());
$$;

-- Baixa de stock atómica ao criar pedido
create or replace function public.decrement_stock(p_id text, qty integer) returns void
language sql security definer set search_path = public as $$
  update public.products set stock = greatest(stock - qty, 0), updated_at = now() where id = p_id;
$$;
revoke execute on function public.decrement_stock(text, integer) from public, anon, authenticated;

alter table public.products enable row level security;
alter table public.orders enable row level security;
alter table public.order_items enable row level security;
alter table public.newsletter enable row level security;
alter table public.admins enable row level security;

-- Catálogo: público lê produtos ativos; admins gerem tudo
create policy "produtos ativos visiveis" on public.products for select using (active or public.is_admin());
create policy "admins gerem produtos" on public.products for all using (public.is_admin()) with check (public.is_admin());

-- Pedidos: criados pelo servidor (service role); admins leem e atualizam
create policy "admins leem pedidos" on public.orders for select using (public.is_admin());
create policy "admins atualizam pedidos" on public.orders for update using (public.is_admin()) with check (public.is_admin());
create policy "admins leem itens" on public.order_items for select using (public.is_admin());

-- Newsletter: qualquer pessoa subscreve; só admins leem
create policy "subscrever newsletter" on public.newsletter for insert with check (true);
create policy "admins leem newsletter" on public.newsletter for select using (public.is_admin());

create policy "admin ve o proprio registo" on public.admins for select using (user_id = auth.uid());
