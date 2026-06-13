import { createClient } from "@supabase/supabase-js";
import { properties, type Property } from "@/lib/data";

type PropertyRow = {
  id: string;
  title: string;
  slug: string;
  description: string;
  price: number;
  location: string;
  city: string;
  bedrooms: number;
  bathrooms: number;
  area: string;
  property_type: string;
  status: string;
  featured: boolean;
  parking_spaces: number;
  cover_image_url: string | null;
  property_images?: Array<{ image_url: string; sort_order: number }>;
};

function getPublicSupabaseClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) return null;
  return createClient(supabaseUrl, supabaseAnonKey);
}

function formatPrice(price: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0
  }).format(price);
}

function mapProperty(row: PropertyRow): Property {
  const gallery = (row.property_images ?? [])
    .sort((a, b) => a.sort_order - b.sort_order)
    .map((image) => image.image_url);
  const image = row.cover_image_url || gallery[0] || properties[0].image;

  return {
    slug: row.slug,
    title: row.title,
    price: formatPrice(row.price),
    location: row.location,
    status: row.status,
    type: row.property_type,
    beds: row.bedrooms,
    baths: row.bathrooms,
    area: row.area,
    parking: row.parking_spaces ? `${row.parking_spaces} Cars` : "N/A",
    agent: "Property Advisor",
    image,
    gallery: gallery.length ? gallery : [image],
    description: row.description
  };
}

export async function getPublicProperties() {
  const supabase = getPublicSupabaseClient();
  if (!supabase) return properties;

  const { data, error } = await supabase
    .from("properties")
    .select("*, property_images(image_url, sort_order)")
    .neq("status", "Draft")
    .order("featured", { ascending: false })
    .order("created_at", { ascending: false });

  if (error || !data?.length) return properties;
  return data.map((row) => mapProperty(row as PropertyRow));
}

export async function getPublicPropertyBySlug(slug: string) {
  const supabase = getPublicSupabaseClient();
  if (!supabase) return properties.find((property) => property.slug === slug);

  const { data, error } = await supabase
    .from("properties")
    .select("*, property_images(image_url, sort_order)")
    .eq("slug", slug)
    .neq("status", "Draft")
    .single();

  if (error || !data) return properties.find((property) => property.slug === slug);
  return mapProperty(data as PropertyRow);
}
