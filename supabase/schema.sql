create extension if not exists "pgcrypto";

create table if not exists public.users (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null unique,
  role text not null default 'admin' check (role in ('admin', 'editor')),
  created_at timestamptz not null default now()
);

create table if not exists public.properties (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  description text not null,
  price numeric not null default 0,
  location text not null,
  city text not null,
  area text not null,
  bedrooms integer not null default 0,
  bathrooms integer not null default 0,
  kitchens integer not null default 0,
  floors integer not null default 0,
  parking_spaces integer not null default 0,
  property_type text not null,
  status text not null check (status in ('For Sale', 'For Rent', 'Sold', 'Draft')),
  featured boolean not null default false,
  featured_priority integer,
  featured_starts_at timestamptz,
  featured_ends_at timestamptz,
  amenities text[] not null default '{}',
  address text,
  latitude numeric,
  longitude numeric,
  cover_image_url text,
  created_by uuid references public.users(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.property_images (
  id uuid primary key default gen_random_uuid(),
  property_id uuid not null references public.properties(id) on delete cascade,
  image_url text not null,
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists public.inquiries (
  id uuid primary key default gen_random_uuid(),
  customer_name text not null,
  email text,
  phone text not null,
  property_id uuid references public.properties(id) on delete set null,
  message text not null,
  status text not null default 'Unread' check (status in ('Unread', 'Read', 'Archived')),
  created_at timestamptz not null default now()
);

create table if not exists public.property_categories (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  description text,
  created_at timestamptz not null default now()
);

create table if not exists public.website_settings (
  id uuid primary key default gen_random_uuid(),
  company_name text,
  logo_url text,
  phone_number text,
  whatsapp_number text,
  email text,
  hero_title text,
  hero_subtitle text,
  homepage_banner_url text,
  footer_content text,
  updated_at timestamptz not null default now()
);

alter table public.users enable row level security;
alter table public.properties enable row level security;
alter table public.property_images enable row level security;
alter table public.inquiries enable row level security;
alter table public.property_categories enable row level security;
alter table public.website_settings enable row level security;

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.users
    where id = auth.uid() and role = 'admin'
  );
$$;

create policy "Admins manage users" on public.users
  for all using (public.is_admin()) with check (public.is_admin());

create policy "Published properties are public" on public.properties
  for select using (status <> 'Draft');

create policy "Admins manage properties" on public.properties
  for all using (public.is_admin()) with check (public.is_admin());

create policy "Property images are public" on public.property_images
  for select using (true);

create policy "Admins manage property images" on public.property_images
  for all using (public.is_admin()) with check (public.is_admin());

create policy "Anyone can create inquiries" on public.inquiries
  for insert with check (true);

create policy "Admins manage inquiries" on public.inquiries
  for all using (public.is_admin()) with check (public.is_admin());

create policy "Categories are public" on public.property_categories
  for select using (true);

create policy "Admins manage categories" on public.property_categories
  for all using (public.is_admin()) with check (public.is_admin());

create policy "Settings are public" on public.website_settings
  for select using (true);

create policy "Admins manage settings" on public.website_settings
  for all using (public.is_admin()) with check (public.is_admin());

insert into storage.buckets (id, name, public)
values ('property-images', 'property-images', true)
on conflict (id) do nothing;

create policy "Public can view property images" on storage.objects
  for select using (bucket_id = 'property-images');

create policy "Admins upload property images" on storage.objects
  for insert with check (bucket_id = 'property-images' and public.is_admin());

create policy "Admins update property images" on storage.objects
  for update using (bucket_id = 'property-images' and public.is_admin());

create policy "Admins delete property images" on storage.objects
  for delete using (bucket_id = 'property-images' and public.is_admin());
