import Image from "next/image";
import { notFound } from "next/navigation";
import { Bath, BedDouble, Car, Mail, MapPin, Maximize2, MessageCircle, Phone, ShieldCheck } from "lucide-react";
import { Button } from "@/components/button";
import { FloorPlans } from "@/components/floor-plans";
import { PropertyGallery } from "@/components/property-gallery";
import { PropertyCard } from "@/components/property-card";
import { SectionHeading } from "@/components/section-heading";
import { amenities, companyName, contactEmail, phoneHref, properties, whatsappHref } from "@/lib/data";
import { getPublicProperties, getPublicPropertyBySlug } from "@/lib/public-properties";

export function generateStaticParams() {
  return properties.map((property) => ({ slug: property.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const property = await getPublicPropertyBySlug(slug);
  return {
    title: property ? `${property.title} | ${companyName}` : "Property Details",
    description: property?.description
  };
}

export default async function PropertyDetailsPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const property = await getPublicPropertyBySlug(slug);
  if (!property) notFound();

  const allProperties = await getPublicProperties();
  const similar = allProperties.filter((item) => item.slug !== property.slug).slice(0, 3);

  return (
    <>
      <section className="bg-white py-10 dark:bg-white/5">
        <div className="container-wide">
          <p className="mb-3 text-sm font-bold uppercase tracking-[0.18em] text-gold">{property.status}</p>
          <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <h1 className="font-heading text-4xl font-bold leading-tight text-navy dark:text-white md:text-5xl">{property.title}</h1>
              <p className="mt-4 flex items-center gap-2 text-muted dark:text-slate-300"><MapPin size={18} /> {property.location}</p>
            </div>
            <p className="font-heading text-3xl font-bold text-royal dark:text-gold">{property.price}</p>
          </div>
        </div>
      </section>

      <section className="container-wide grid gap-8 py-10 lg:grid-cols-[1fr_360px]">
        <div className="grid gap-10">
          <PropertyGallery images={property.gallery} title={property.title} />

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { label: "Area", value: property.area, icon: Maximize2 },
              { label: "Bedrooms", value: property.beds || "Studio", icon: BedDouble },
              { label: "Bathrooms", value: property.baths, icon: Bath },
              { label: "Parking", value: property.parking, icon: Car }
            ].map((fact) => (
              <div key={fact.label} className="rounded-lg border border-line bg-white p-5 dark:border-white/10 dark:bg-white/5">
                <fact.icon className="mb-4 text-gold" />
                <p className="text-sm text-muted dark:text-slate-300">{fact.label}</p>
                <p className="mt-1 font-heading text-xl font-bold text-navy dark:text-white">{fact.value}</p>
              </div>
            ))}
          </div>

          <section className="rounded-lg border border-line bg-white p-6 dark:border-white/10 dark:bg-white/5">
            <h2 className="font-heading text-2xl font-bold text-navy dark:text-white">Property Information</h2>
            <p className="mt-4 leading-8 text-muted dark:text-slate-300">{property.description}</p>
            <div className="mt-6 grid gap-3 text-sm text-muted dark:text-slate-300 sm:grid-cols-2">
              <p><strong className="text-navy dark:text-white">Type:</strong> {property.type}</p>
              <p><strong className="text-navy dark:text-white">Status:</strong> {property.status}</p>
              <p><strong className="text-navy dark:text-white">Location:</strong> {property.location}</p>
              <p><strong className="text-navy dark:text-white">Agent:</strong> {property.agent}</p>
            </div>
          </section>

          <section>
            <SectionHeading title="Amenities" description="Every essential feature clearly presented for fast comparison." />
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {amenities.map((amenity) => (
                <div key={amenity.label} className="rounded-lg border border-line bg-white p-5 dark:border-white/10 dark:bg-white/5">
                  <amenity.icon className="mb-4 text-gold" />
                  <p className="font-semibold text-navy dark:text-white">{amenity.label}</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <SectionHeading title="Floor Plans" description="Compare layouts and choose the configuration that fits your needs." />
            <FloorPlans />
          </section>

          <section>
            <SectionHeading title="Location Map" />
            <div className="grid min-h-[340px] place-items-center rounded-lg border border-dashed border-line bg-white text-center dark:border-white/10 dark:bg-white/5">
              <div>
                <MapPin className="mx-auto mb-4 text-gold" size={38} />
                <p className="font-heading text-xl font-bold text-navy dark:text-white">Embedded map placeholder</p>
                <p className="mt-2 text-muted dark:text-slate-300">{property.location}</p>
              </div>
            </div>
          </section>
        </div>

        <aside className="h-fit rounded-lg border border-line bg-white p-6 shadow-premium dark:border-white/10 dark:bg-white/5 lg:sticky lg:top-28">
          <div className="flex items-center gap-4">
            <div className="relative h-16 w-16 overflow-hidden rounded-full bg-slate-200">
              <Image src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=300&q=80" alt="Agent photo placeholder" fill className="object-cover" />
            </div>
            <div>
              <p className="font-heading text-lg font-bold text-navy dark:text-white">Agent Placeholder</p>
              <p className="text-sm text-muted dark:text-slate-300">{property.agent}</p>
            </div>
          </div>
          <div className="my-6 flex items-center gap-2 rounded-lg bg-green-50 p-4 text-sm font-semibold text-success dark:bg-emerald-500/10">
            <ShieldCheck size={18} /> Verified listing and advisor
          </div>
          <div className="grid gap-3">
            <Button href={phoneHref}><Phone size={18} /> Call</Button>
            <Button href={whatsappHref} variant="gold"><MessageCircle size={18} /> WhatsApp</Button>
            <Button href={`mailto:${contactEmail}`} variant="outline"><Mail size={18} /> Email</Button>
          </div>
        </aside>
      </section>

      <section className="container-wide py-16">
        <SectionHeading title="Similar Properties" description="Recommended listings with comparable quality, location value, and buyer interest." />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {similar.map((item) => (
            <PropertyCard key={item.slug} property={item} compact />
          ))}
        </div>
      </section>
    </>
  );
}
