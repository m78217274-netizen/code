import { FolderTree, Plus } from "lucide-react";
import { Button } from "@/components/button";
import { AdminCard } from "@/components/admin/admin-card";
import { categoriesAdmin } from "@/lib/admin-data";

export default function CategoriesPage() {
  return (
    <div className="grid gap-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-gold">Property Categories</p>
          <h1 className="mt-3 font-heading text-3xl font-bold text-navy dark:text-white">Organize Property Inventory</h1>
        </div>
        <Button><Plus size={18} /> Add Category</Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {categoriesAdmin.map((category) => (
          <AdminCard key={category.name}>
            <FolderTree className="mb-5 text-gold" />
            <h2 className="font-heading text-xl font-bold text-navy dark:text-white">{category.name}</h2>
            <p className="mt-2 text-sm text-muted dark:text-slate-300">{category.description}</p>
            <p className="mt-5 font-heading text-3xl font-bold text-royal dark:text-gold">{category.count}</p>
            <p className="text-sm font-semibold text-muted dark:text-slate-300">active listings</p>
            <div className="mt-5 flex gap-2">
              <Button variant="outline" className="px-3">Edit</Button>
              <Button variant="outline" className="px-3 text-red-600">Delete</Button>
            </div>
          </AdminCard>
        ))}
      </div>
    </div>
  );
}
