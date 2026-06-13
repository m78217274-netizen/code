import { Grid3X3, ListFilter, Map, SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/button";
import { PropertyCard } from "@/components/property-card";
import { SectionHeading } from "@/components/section-heading";
import { companyName } from "@/lib/data";
import { getPublicProperties } from "@/lib/public-properties";

const filters = ["Location", "Property Type", "Min Price", "Max Price", "Bedrooms", "Bathrooms", "Area"];

export const metadata = {
  title: `Properties | ${companyName}`,
  description: "Browse verified property listings with refined search filters."
};

export default async function PropertiesPage() {
  const publicProperties = await getPublicProperties();

  return (
    <>
      <section className="border-b border-line bg-white py-12 dark:border-white/10 dark:bg-white/5">
        <div className="container-wide">
          <SectionHeading
            eyebrow="Property Marketplace"
            title="Explore Verified Properties"
            description="Search premium homes, commercial spaces, plots, and investment listings with practical filters."
          />
          <div className="grid gap-3 rounded-lg border border-line bg-paper p-4 dark:border-white/10 dark:bg-navy md:grid-cols-2 lg:grid-cols-7">
            {filters.map((filter) => (
              <input key={filter} aria-label={filter} className="premium-input" placeholder={filter} />
            ))}
            <Button className="lg:col-span-7">Search Listings</Button>
          </div>
        </div>
      </section>

      <section className="container-wide grid gap-8 py-12 lg:grid-cols-[300px_1fr]">
        <aside className="h-fit rounded-lg border border-line bg-white p-5 shadow-card dark:border-white/10 dark:bg-white/5">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="font-heading text-xl font-bold text-navy dark:text-white">Filters</h2>
            <SlidersHorizontal size={20} className="text-gold" />
          </div>
          <div className="grid gap-4">
            {["Listing Status", "Property Category", "Payment Plan", "Furnishing", "Documentation"].map((item) => (
              <label key={item} className="grid gap-2 text-sm font-semibold text-navy dark:text-white">
                {item}
                <select className="premium-select" defaultValue="">
                  <option value="">Any</option>
                  <option>Verified</option>
                  <option>Premium</option>
                  <option>Ready</option>
                </select>
              </label>
            ))}
            <div className="rounded-lg bg-paper p-4 dark:bg-navy">
              <p className="mb-3 text-sm font-bold text-navy dark:text-white">Map View</p>
              <button className="focus-ring flex w-full items-center justify-center gap-2 rounded-lg border border-line bg-white px-4 py-3 text-sm font-semibold text-navy transition hover:border-royal dark:border-white/10 dark:bg-white/5 dark:text-white">
                <Map size={18} /> Toggle Map
              </button>
            </div>
          </div>
        </aside>

        <div>
          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="font-semibold text-muted dark:text-slate-300">{publicProperties.length} curated listings available</p>
            <div className="flex items-center gap-2 rounded-lg border border-line bg-white p-1 dark:border-white/10 dark:bg-white/5">
              <button className="focus-ring rounded-md bg-navy p-2 text-white"><Grid3X3 size={18} /></button>
              <button className="focus-ring rounded-md p-2 text-muted hover:text-royal dark:text-slate-300"><ListFilter size={18} /></button>
            </div>
          </div>
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {publicProperties.map((property) => (
              <PropertyCard key={property.slug} property={property} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
