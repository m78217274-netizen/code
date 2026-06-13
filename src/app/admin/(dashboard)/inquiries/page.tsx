import { Archive, Mail, Reply, Search, Trash2 } from "lucide-react";
import { Button } from "@/components/button";
import { AdminCard } from "@/components/admin/admin-card";
import { inquiries } from "@/lib/admin-data";

export default function AdminInquiriesPage() {
  return (
    <div className="grid gap-6">
      <div>
        <p className="text-sm font-bold uppercase tracking-[0.18em] text-gold">Inquiries</p>
        <h1 className="mt-3 font-heading text-3xl font-bold text-navy dark:text-white">Customer Messages</h1>
      </div>

      <AdminCard>
        <div className="grid gap-3 md:grid-cols-[1fr_180px_160px]">
          <label className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted" size={18} />
            <input className="premium-input pl-11" placeholder="Search customer, property, or message" aria-label="Search inquiries" />
          </label>
          <select className="premium-select" aria-label="Filter inquiry status">
            <option>All Statuses</option>
            <option>Unread</option>
            <option>Read</option>
            <option>Archived</option>
          </select>
          <Button variant="outline">Filter</Button>
        </div>
      </AdminCard>

      <div className="grid gap-4">
        {inquiries.map((inquiry) => (
          <AdminCard key={inquiry.id}>
            <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
              <div>
                <div className="flex flex-wrap items-center gap-3">
                  <h2 className="font-heading text-xl font-bold text-navy dark:text-white">{inquiry.customerName}</h2>
                  <span className="rounded-full bg-navy px-3 py-1 text-xs font-bold text-white dark:bg-gold dark:text-navy">{inquiry.status}</span>
                </div>
                <p className="mt-2 text-sm text-muted dark:text-slate-300">{inquiry.phone} - {inquiry.email}</p>
                <p className="mt-3 text-sm font-semibold text-royal dark:text-gold">Interested in {inquiry.property}</p>
                <p className="mt-4 max-w-3xl leading-7 text-muted dark:text-slate-300">{inquiry.message}</p>
                <p className="mt-3 text-xs font-semibold text-muted dark:text-slate-400">{inquiry.date}</p>
              </div>
              <div className="flex flex-wrap gap-2">
                <Button variant="outline" className="px-3"><Mail size={16} /> Mark as Read</Button>
                <Button variant="outline" className="px-3"><Reply size={16} /> Reply</Button>
                <Button variant="outline" className="px-3"><Archive size={16} /> Archive</Button>
                <Button variant="outline" className="px-3 text-red-600"><Trash2 size={16} /> Delete</Button>
              </div>
            </div>
          </AdminCard>
        ))}
      </div>
    </div>
  );
}
