import { Button } from "@/components/button";

export function SearchCard({ compact = false }: { compact?: boolean }) {
  return (
    <form className={`rounded-lg border border-white/20 bg-white p-5 shadow-premium dark:border-white/10 dark:bg-slate-900 ${compact ? "" : "lg:p-6"}`}>
      <div className="grid gap-4">
        <label className="grid gap-2 text-sm font-semibold text-navy dark:text-white">
          Location
          <input className="premium-input" placeholder="City, community, or landmark" />
        </label>
        <label className="grid gap-2 text-sm font-semibold text-navy dark:text-white">
          Property Type
          <select className="premium-select" defaultValue="">
            <option value="" disabled>Select type</option>
            <option>Residential</option>
            <option>Commercial</option>
            <option>Apartment</option>
            <option>Villa</option>
            <option>Plot</option>
          </select>
        </label>
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="grid gap-2 text-sm font-semibold text-navy dark:text-white">
            Price Range
            <select className="premium-select" defaultValue="">
              <option value="" disabled>Any budget</option>
              <option>$250k - $500k</option>
              <option>$500k - $1m</option>
              <option>$1m - $3m</option>
              <option>$3m+</option>
            </select>
          </label>
          <label className="grid gap-2 text-sm font-semibold text-navy dark:text-white">
            Bedrooms
            <select className="premium-select" defaultValue="">
              <option value="" disabled>Any</option>
              <option>1+</option>
              <option>2+</option>
              <option>3+</option>
              <option>5+</option>
            </select>
          </label>
        </div>
        <label className="grid gap-2 text-sm font-semibold text-navy dark:text-white">
          Area
          <input className="premium-input" placeholder="Minimum area" />
        </label>
        <Button type="button" className="w-full">
          Search Properties
        </Button>
      </div>
    </form>
  );
}
