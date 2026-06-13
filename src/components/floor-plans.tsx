"use client";

import { useState } from "react";
import { Ruler, Sofa, UsersRound } from "lucide-react";

const plans = [
  { name: "Suite", area: "1,240 sq ft", rooms: "2 bedrooms", fit: "Private living" },
  { name: "Residence", area: "3,250 sq ft", rooms: "4 bedrooms", fit: "Family comfort" },
  { name: "Signature", area: "6,150 sq ft", rooms: "5 bedrooms", fit: "Entertaining" }
];

export function FloorPlans() {
  const [active, setActive] = useState(1);
  const plan = plans[active];

  return (
    <div className="rounded-lg border border-line bg-white p-5 dark:border-white/10 dark:bg-white/5">
      <div className="mb-5 flex gap-2 overflow-x-auto no-scrollbar">
        {plans.map((item, index) => (
          <button
            key={item.name}
            onClick={() => setActive(index)}
            className={`focus-ring shrink-0 rounded-lg px-4 py-2 text-sm font-semibold transition ${active === index ? "bg-navy text-white dark:bg-gold dark:text-navy" : "bg-slate-100 text-navy dark:bg-white/10 dark:text-white"}`}
          >
            {item.name}
          </button>
        ))}
      </div>
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-lg bg-paper p-4 dark:bg-navy">
          <Ruler className="mb-3 text-gold" />
          <p className="font-heading font-bold text-navy dark:text-white">{plan.area}</p>
          <p className="text-sm text-muted dark:text-slate-300">Covered area</p>
        </div>
        <div className="rounded-lg bg-paper p-4 dark:bg-navy">
          <Sofa className="mb-3 text-gold" />
          <p className="font-heading font-bold text-navy dark:text-white">{plan.rooms}</p>
          <p className="text-sm text-muted dark:text-slate-300">Configuration</p>
        </div>
        <div className="rounded-lg bg-paper p-4 dark:bg-navy">
          <UsersRound className="mb-3 text-gold" />
          <p className="font-heading font-bold text-navy dark:text-white">{plan.fit}</p>
          <p className="text-sm text-muted dark:text-slate-300">Best suited for</p>
        </div>
      </div>
      <div className="mt-5 grid aspect-[16/9] place-items-center rounded-lg border border-dashed border-line bg-paper text-center dark:border-white/15 dark:bg-navy">
        <p className="px-5 font-heading text-lg font-bold text-muted dark:text-slate-300">
          Interactive floor plan preview placeholder
        </p>
      </div>
    </div>
  );
}
