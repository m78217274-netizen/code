import Image from "next/image";
import Link from "next/link";
import { Copy, Eye, Pencil, Search, Star, Trash2 } from "lucide-react";
import { Button } from "@/components/button";
import { AdminCard } from "@/components/admin/admin-card";
import { adminProperties } from "@/lib/admin-data";

export default function AdminPropertiesPage() {
  return (
    <div className="grid gap-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-gold">Properties</p>
          <h1 className="mt-3 font-heading text-3xl font-bold text-navy dark:text-white">Property List Management</h1>
        </div>
        <Button href="/admin/properties/new">Add Property</Button>
      </div>

      <AdminCard>
        <div className="grid gap-3 lg:grid-cols-[1fr_180px_180px_160px]">
          <label className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted" size={18} />
            <input className="premium-input pl-11" placeholder="Search by property name or location" aria-label="Search properties" />
          </label>
          <select className="premium-select" aria-label="Filter status">
            <option>Status</option>
            <option>For Sale</option>
            <option>For Rent</option>
            <option>Sold</option>
          </select>
          <select className="premium-select" aria-label="Filter property type">
            <option>Property Type</option>
            <option>Residential</option>
            <option>Commercial</option>
            <option>Villa</option>
          </select>
          <Button variant="outline">Apply Filters</Button>
        </div>
      </AdminCard>

      <AdminCard className="overflow-hidden p-0">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[920px] text-left">
            <thead className="bg-paper text-sm text-muted dark:bg-navy dark:text-slate-300">
              <tr>
                <th className="px-5 py-4 font-semibold">Thumbnail</th>
                <th className="px-5 py-4 font-semibold">Property Name</th>
                <th className="px-5 py-4 font-semibold">Location</th>
                <th className="px-5 py-4 font-semibold">Price</th>
                <th className="px-5 py-4 font-semibold">Status</th>
                <th className="px-5 py-4 font-semibold">Date Added</th>
                <th className="px-5 py-4 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line dark:divide-white/10">
              {adminProperties.map((property) => (
                <tr key={property.id} className="align-middle">
                  <td className="px-5 py-4">
                    <div className="relative h-14 w-20 overflow-hidden rounded-lg">
                      <Image src={property.image} alt={property.title} fill sizes="80px" className="object-cover" />
                    </div>
                  </td>
                  <td className="px-5 py-4 font-heading font-bold text-navy dark:text-white">{property.title}</td>
                  <td className="px-5 py-4 text-sm text-muted dark:text-slate-300">{property.location}</td>
                  <td className="px-5 py-4 font-semibold text-royal dark:text-gold">{property.price}</td>
                  <td className="px-5 py-4">
                    <span className="rounded-full bg-success/10 px-3 py-1 text-xs font-bold text-success">{property.status}</span>
                  </td>
                  <td className="px-5 py-4 text-sm text-muted dark:text-slate-300">{property.dateAdded}</td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2">
                      <Link href={`/properties/${property.slug}`} className="focus-ring rounded-lg p-2 text-muted hover:bg-slate-100 hover:text-royal dark:hover:bg-white/10" aria-label="View"><Eye size={17} /></Link>
                      <button className="focus-ring rounded-lg p-2 text-muted hover:bg-slate-100 hover:text-royal dark:hover:bg-white/10" aria-label="Edit"><Pencil size={17} /></button>
                      <button className="focus-ring rounded-lg p-2 text-muted hover:bg-slate-100 hover:text-royal dark:hover:bg-white/10" aria-label="Duplicate"><Copy size={17} /></button>
                      <button className="focus-ring rounded-lg p-2 text-muted hover:bg-slate-100 hover:text-gold dark:hover:bg-white/10" aria-label="Feature Listing"><Star size={17} /></button>
                      <button className="focus-ring rounded-lg p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-500/10" aria-label="Delete"><Trash2 size={17} /></button>
                    </div>
                    <div className="mt-2 flex gap-2">
                      <button className="text-xs font-bold text-muted hover:text-success">Mark as Sold</button>
                      <button className="text-xs font-bold text-muted hover:text-gold">Feature Listing</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </AdminCard>
    </div>
  );
}
