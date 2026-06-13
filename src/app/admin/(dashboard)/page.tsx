import { Activity, ArrowUpRight, Building2, Eye, Inbox, Star } from "lucide-react";
import { AdminCard } from "@/components/admin/admin-card";
import { SimpleChart } from "@/components/admin/simple-chart";
import { adminMetrics, recentActivity } from "@/lib/admin-data";

const metricIcons = [Building2, Eye, Building2, Inbox, Star, Activity];

export default function AdminDashboardPage() {
  return (
    <div className="grid gap-8">
      <div>
        <p className="text-sm font-bold uppercase tracking-[0.18em] text-gold">Dashboard Overview</p>
        <h1 className="mt-3 font-heading text-3xl font-bold text-navy dark:text-white">Performance Snapshot</h1>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {adminMetrics.map((metric, index) => {
          const Icon = metricIcons[index];
          return (
            <AdminCard key={metric.label}>
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-semibold text-muted dark:text-slate-300">{metric.label}</p>
                  <p className="mt-3 font-heading text-3xl font-bold text-navy dark:text-white">{metric.value}</p>
                  <p className="mt-2 flex items-center gap-1 text-sm font-semibold text-success">
                    <ArrowUpRight size={15} /> {metric.trend}
                  </p>
                </div>
                <span className="grid h-12 w-12 place-items-center rounded-lg bg-navy text-gold dark:bg-white">
                  <Icon size={22} />
                </span>
              </div>
            </AdminCard>
          );
        })}
      </div>

      <div className="grid gap-6 xl:grid-cols-3">
        <SimpleChart title="Property Views" metric="views" />
        <SimpleChart title="Inquiries Over Time" metric="inquiries" color="bg-gold" />
        <SimpleChart title="Listings Added" metric="listings" color="bg-success" />
      </div>

      <AdminCard>
        <h2 className="font-heading text-xl font-bold text-navy dark:text-white">Recent Activity</h2>
        <div className="mt-5 grid gap-4">
          {recentActivity.map((item) => (
            <div key={item} className="flex items-center gap-4 rounded-lg bg-paper p-4 dark:bg-navy">
              <span className="h-2.5 w-2.5 rounded-full bg-gold" />
              <p className="text-sm font-semibold text-muted dark:text-slate-300">{item}</p>
            </div>
          ))}
        </div>
      </AdminCard>
    </div>
  );
}
