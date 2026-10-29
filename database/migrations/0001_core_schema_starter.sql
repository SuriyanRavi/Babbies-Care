-- Babbies Care starter schema. Review and extend before production.
-- Apply through Supabase migrations, not by pasting into a live database without review.
create extension if not exists pgcrypto;

create type public.app_role as enum ('customer', 'admin');
create type public.product_status as enum ('draft', 'active', 'archived');
create type public.order_status as enum ('pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled', 'refunded');
create type public.payment_status as enum ('pending', 'authorized', 'paid', 'failed', 'refunded', 'partially_refunded');

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  phone text,
  role public.app_role not null default 'customer',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.categories (
  id uuid primary key default gen_random_uuid(),
  parent_id uuid references public.categories(id) on delete set null,
  name text not null,
  slug text not null unique,
  description text,
  image_url text,
  sort_order integer not null default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

create table public.brands (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  slug text not null unique,
  logo_url text,
  is_active boolean not null default true
);

create table public.products (
  id uuid primary key default gen_random_uuid(),
  category_id uuid references public.categories(id) on delete set null,
  brand_id uuid references public.brands(id) on delete set null,
  name text not null,
  slug text not null unique,
  sku text unique,
  short_description text,
  description text,
  status public.product_status not null default 'draft',
  price_paise bigint not null check (price_paise >= 0),
  compare_at_price_paise bigint check (compare_at_price_paise is null or compare_at_price_paise >= 0),
  currency char(3) not null default 'INR' check (currency = 'INR'),
  tax_code text,
  tax_rate numeric(5,2),
  seo_title text,
  seo_description text,
  weight_grams integer,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.product_images (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null references public.products(id) on delete cascade,
  image_url text not null,
  alt_text text not null default '',
  sort_order integer not null default 0,
  is_primary boolean not null default false,
  source_rights_note text,
  created_at timestamptz not null default now()
);

create table public.product_variants (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null references public.products(id) on delete cascade,
  sku text not null unique,
  name text not null,
  options jsonb not null default '{}'::jsonb,
  price_paise bigint check (price_paise is null or price_paise >= 0),
  compare_at_price_paise bigint check (compare_at_price_paise is null or compare_at_price_paise >= 0),
  stock_quantity integer not null default 0 check (stock_quantity >= 0),
  low_stock_threshold integer not null default 3 check (low_stock_threshold >= 0),
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.inventory_movements (
  id uuid primary key default gen_random_uuid(),
  variant_id uuid not null references public.product_variants(id),
  quantity_delta integer not null check (quantity_delta <> 0),
  reason text not null,
  reference_type text,
  reference_id uuid,
  actor_id uuid references public.profiles(id) on delete set null,
  created_at timestamptz not null default now()
);

create table public.addresses (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  recipient_name text not null,
  phone text not null,
  line1 text not null,
  line2 text,
  city text not null,
  state text not null,
  postal_code text not null,
  country_code char(2) not null default 'IN' check (country_code = 'IN'),
  is_default boolean not null default false,
  created_at timestamptz not null default now()
);

create table public.coupons (
  id uuid primary key default gen_random_uuid(),
  code text not null unique,
  discount_type text not null check (discount_type in ('percentage','fixed')),
  discount_value numeric(12,2) not null check (discount_value > 0),
  min_order_paise bigint not null default 0 check (min_order_paise >= 0),
  max_discount_paise bigint check (max_discount_paise is null or max_discount_paise >= 0),
  starts_at timestamptz,
  ends_at timestamptz,
  usage_limit integer check (usage_limit is null or usage_limit > 0),
  per_customer_limit integer check (per_customer_limit is null or per_customer_limit > 0),
  is_active boolean not null default false,
  created_at timestamptz not null default now()
);

create table public.orders (
  id uuid primary key default gen_random_uuid(),
  order_number text not null unique,
  user_id uuid references public.profiles(id) on delete set null,
  guest_email text,
  guest_phone text,
  guest_tracking_token_hash text,
  status public.order_status not null default 'pending',
  payment_status public.payment_status not null default 'pending',
  currency char(3) not null default 'INR' check (currency = 'INR'),
  subtotal_paise bigint not null check (subtotal_paise >= 0),
  discount_paise bigint not null default 0 check (discount_paise >= 0),
  shipping_paise bigint not null default 0 check (shipping_paise >= 0),
  tax_paise bigint not null default 0 check (tax_paise >= 0),
  total_paise bigint not null check (total_paise >= 0),
  coupon_id uuid references public.coupons(id) on delete set null,
  shipping_address_snapshot jsonb not null,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.orders(id) on delete cascade,
  product_id uuid references public.products(id) on delete set null,
  variant_id uuid references public.product_variants(id) on delete set null,
  sku_snapshot text not null,
  product_name_snapshot text not null,
  variant_snapshot jsonb not null default '{}'::jsonb,
  unit_price_paise bigint not null check (unit_price_paise >= 0),
  quantity integer not null check (quantity > 0),
  line_total_paise bigint not null check (line_total_paise >= 0)
);

create table public.payments (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.orders(id) on delete cascade,
  provider text not null default 'razorpay',
  provider_order_id text unique,
  provider_payment_id text unique,
  amount_paise bigint not null check (amount_paise >= 0),
  status public.payment_status not null default 'pending',
  verified_at timestamptz,
  provider_event_id text unique,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.shipments (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.orders(id) on delete cascade,
  carrier text,
  tracking_number text,
  tracking_url text,
  status text not null default 'unfulfilled',
  shipped_at timestamptz,
  delivered_at timestamptz,
  created_at timestamptz not null default now()
);

create table public.wishlist_items (
  user_id uuid not null references public.profiles(id) on delete cascade,
  product_id uuid not null references public.products(id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (user_id, product_id)
);

create table public.reviews (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null references public.products(id) on delete cascade,
  user_id uuid not null references public.profiles(id) on delete cascade,
  order_item_id uuid references public.order_items(id) on delete set null,
  rating integer not null check (rating between 1 and 5),
  title text,
  body text,
  is_verified_purchase boolean not null default false,
  status text not null default 'pending' check (status in ('pending','approved','rejected')),
  created_at timestamptz not null default now(),
  unique (product_id, user_id, order_item_id)
);

create table public.banners (
  id uuid primary key default gen_random_uuid(),
  title text,
  image_url text not null,
  alt_text text not null default '',
  placement text not null,
  cta_label text,
  cta_url text,
  starts_at timestamptz,
  ends_at timestamptz,
  is_active boolean not null default false,
  sort_order integer not null default 0
);

create table public.newsletter_subscriptions (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  consented_at timestamptz not null default now(),
  unsubscribed_at timestamptz,
  created_at timestamptz not null default now()
);

create index products_status_category_idx on public.products(status, category_id);
create index products_created_at_idx on public.products(created_at desc);
create index product_variants_product_active_idx on public.product_variants(product_id, is_active);
create index orders_user_created_idx on public.orders(user_id, created_at desc);
create index orders_status_created_idx on public.orders(status, created_at desc);
create index order_items_order_idx on public.order_items(order_id);
create index reviews_product_status_idx on public.reviews(product_id, status);
create index categories_parent_sort_idx on public.categories(parent_id, sort_order);

-- RLS enabled. Policies must be completed and tested before production.
alter table public.profiles enable row level security;
alter table public.categories enable row level security;
alter table public.brands enable row level security;
alter table public.products enable row level security;
alter table public.product_images enable row level security;
alter table public.product_variants enable row level security;
alter table public.inventory_movements enable row level security;
alter table public.addresses enable row level security;
alter table public.coupons enable row level security;
alter table public.orders enable row level security;
alter table public.order_items enable row level security;
alter table public.payments enable row level security;
alter table public.shipments enable row level security;
alter table public.wishlist_items enable row level security;
alter table public.reviews enable row level security;
alter table public.banners enable row level security;
alter table public.newsletter_subscriptions enable row level security;

-- Safe starter policies only. Add reviewed admin policies and guest checkout server-only operations.
create policy "Customers can read own profile" on public.profiles
  for select to authenticated using (auth.uid() = id);
create policy "Customers can update own profile" on public.profiles
  for update to authenticated using (auth.uid() = id) with check (auth.uid() = id);

create policy "Public can read active categories" on public.categories
  for select to anon, authenticated using (is_active = true);
create policy "Public can read active brands" on public.brands
  for select to anon, authenticated using (is_active = true);
create policy "Public can read active products" on public.products
  for select to anon, authenticated using (status = 'active');
create policy "Public can read images for active products" on public.product_images
  for select to anon, authenticated using (
    exists (select 1 from public.products p where p.id = product_id and p.status = 'active')
  );
create policy "Public can read active variants for active products" on public.product_variants
  for select to anon, authenticated using (
    is_active = true and exists (select 1 from public.products p where p.id = product_id and p.status = 'active')
  );
create policy "Users manage own addresses" on public.addresses
  for all to authenticated using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "Users manage own wishlist" on public.wishlist_items
  for all to authenticated using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "Public read approved reviews" on public.reviews
  for select to anon, authenticated using (status = 'approved');
create policy "Users submit own reviews" on public.reviews
  for insert to authenticated with check (auth.uid() = user_id and status = 'pending' and is_verified_purchase = false);
create policy "Public read active banners" on public.banners
  for select to anon, authenticated using (is_active = true);
create policy "Public can read active coupons" on public.coupons
  for select to authenticated using (false);

-- Deliberately no client policies for inventory movements, orders, order items, payments,
-- shipments or newsletter writes. Implement trusted server/Edge Function workflows and
-- narrowly scoped policies only after threat modeling. Do not expose service-role credentials.
