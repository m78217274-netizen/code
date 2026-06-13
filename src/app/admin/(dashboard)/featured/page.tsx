import Image from "next/image";
import { CalendarClock, GripVertical, Star } from "lucide-react";
import { Button } from "@/components/button";
import { AdminCard } from "@/components/admin/admin-card";
import { adminProperties } from "@/lib/admin-data";

export default function FeaturedListingsPage() {
  return (
    <div className="grid gap-6">
      <div>
        <p className="text-sm font-bold uppercase tracking-[0.18em] text-gold">Featured Listings</p>
        <h1 className="mt-3 font-heading text-3xl font-bold text-navy dark:text-white">Homepage Featured Property System</h1>
      </div>
      <div className="grid gap-4">
        {adminProperties.slice(0, 5).map((property, index) => (
          <AdminCard key={property.id}>
            <div className="grid gap-5 lg:grid-cols-[auto_96px_1fr_220px_180px] lg:items-center">
              <GripVertical className="hidden text-muted lg:block" />
              <div className="relative h-20 w-28 overflow-hidden rounded-lg">
                <Image src={property.image} alt={property.title} fill sizes="112px" className="object-cover" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <Star className="text-gold" size={18} />
                  <h2 className="font-heading text-lg font-bold text-navy dark:text-white">{property.title}</h2>
                </div>
                <p className="mt-2 text-sm text-muted dark:text-slate-300">{property.location}</p>
              </div>
              <label className="grid gap-2 text-sm font-semibold text-navy dark:text-white">
                Display Priority
                <input className="premium-input" defaultValue={index + 1} type="number" min={1} />
              </label>
              <Button variant="outline"><CalendarClock size={16} /> Schedule</Button>
            </div>
          </AdminCard>
        ))}
      </div>
    </div>
  );
}
