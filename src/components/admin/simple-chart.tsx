"use client";

import { chartSeries } from "@/lib/admin-data";

export function SimpleChart({
  title,
  metric,
  color = "bg-royal"
}: {
  title: string;
  metric: "views" | "inquiries" | "listings";
  color?: string;
}) {
  const max = Math.max(...chartSeries.map((item) => item[metric]));

  return (
    <div className="rounded-lg border border-line bg-white p-5 shadow-card dark:border-white/10 dark:bg-white/5">
      <h2 className="font-heading text-lg font-bold text-navy dark:text-white">{title}</h2>
      <div className="mt-6 flex h-52 items-end gap-3">
        {chartSeries.map((item) => (
          <div key={item.label} className="flex flex-1 flex-col items-center gap-2">
            <div className="flex h-40 w-full items-end rounded-md bg-slate-100 p-1 dark:bg-white/10">
              <div
                className={`w-full rounded-sm ${color}`}
                style={{ height: `${(item[metric] / max) * 100}%` }}
                aria-label={`${item.label}: ${item[metric]}`}
              />
            </div>
            <span className="text-xs font-semibold text-muted dark:text-slate-300">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
