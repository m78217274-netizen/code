import { PropertyEditor } from "@/components/admin/property-editor";

export default function AddPropertyPage() {
  return (
    <div className="grid gap-6">
      <div>
        <p className="text-sm font-bold uppercase tracking-[0.18em] text-gold">Add Property</p>
        <h1 className="mt-3 font-heading text-3xl font-bold text-navy dark:text-white">Create A Listing Like A Post</h1>
        <p className="mt-3 max-w-2xl leading-7 text-muted dark:text-slate-300">
          Add core details, upload images, choose amenities, set location, and publish in a focused flow designed for speed.
        </p>
      </div>
      <PropertyEditor />
    </div>
  );
}
