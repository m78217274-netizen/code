import Image from "next/image";
import Link from "next/link";
import { Bath, BedDouble, Heart, MapPin, Maximize2, UserRound } from "lucide-react";
import { Button } from "@/components/button";
import { MotionArticle } from "@/components/motion";
import type { Property } from "@/lib/data";

export function PropertyCard({ property, compact = false }: { property: Property; compact?: boolean }) {
  return (
    <MotionArticle
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.45 }}
      whileHover={{ y: -6 }}
      className="overflow-hidden rounded-lg border border-line bg-white shadow-card transition dark:border-white/10 dark:bg-white/5"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image src={property.image} alt={property.title} fill sizes="(min-width: 1024px) 33vw, 100vw" className="object-cover transition duration-500 hover:scale-105" />
        <span className="absolute left-4 top-4 rounded-full bg-navy px-3 py-1 text-xs font-bold uppercase tracking-wide text-white">
          {property.status}
        </span>
        {!compact ? (
          <div className="absolute bottom-4 left-4 flex items-center gap-2">
            {property.gallery.slice(0, 3).map((image, index) => (
              <span key={image} className="relative h-10 w-12 overflow-hidden rounded-md border border-white/70 shadow-sm">
                <Image src={image} alt={`${property.title} preview ${index + 1}`} fill sizes="48px" className="object-cover" />
              </span>
            ))}
          </div>
        ) : null}
        <button aria-label={`Save ${property.title}`} className="focus-ring absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white text-navy shadow-md transition hover:text-royal">
          <Heart size={18} />
        </button>
      </div>
      <div className="p-5">
        <div className="mb-4 flex items-start justify-between gap-4">
          <div>
            <h3 className="font-heading text-xl font-bold text-navy dark:text-white">
              <Link href={`/properties/${property.slug}`}>{property.title}</Link>
            </h3>
            <p className="mt-2 flex items-center gap-2 text-sm text-muted dark:text-slate-300">
              <MapPin size={16} /> {property.location}
            </p>
          </div>
          <p className="text-right font-heading text-lg font-bold text-royal dark:text-gold">
            {property.price}
          </p>
        </div>
        <div className="grid grid-cols-3 gap-3 border-y border-line py-4 text-sm text-muted dark:border-white/10 dark:text-slate-300">
          <span className="flex items-center gap-2"><BedDouble size={17} /> {property.beds || "Studio"}</span>
          <span className="flex items-center gap-2"><Bath size={17} /> {property.baths}</span>
          <span className="flex items-center gap-2"><Maximize2 size={17} /> {property.area}</span>
        </div>
        {!compact ? (
          <div className="mt-4 flex items-center gap-2 text-sm text-muted dark:text-slate-300">
            <UserRound size={17} />
            {property.agent}
          </div>
        ) : null}
        <Button href={`/properties/${property.slug}`} className="mt-5 w-full">
          View Details
        </Button>
      </div>
    </MotionArticle>
  );
}
