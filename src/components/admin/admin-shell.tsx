"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  BarChart3,
  Building2,
  FolderTree,
  Home,
  LogOut,
  Menu,
  MessageSquareText,
  PlusCircle,
  Settings,
  ShieldCheck,
  Star,
  UsersRound,
  X
} from "lucide-react";
import { ReactNode, useState } from "react";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import { cn } from "@/lib/utils";

const adminNav = [
  { label: "Dashboard Overview", href: "/admin", icon: BarChart3 },
  { label: "Properties", href: "/admin/properties", icon: Building2 },
  { label: "Add Property", href: "/admin/properties/new", icon: PlusCircle },
  { label: "Property Categories", href: "/admin/categories", icon: FolderTree },
  { label: "Inquiries", href: "/admin/inquiries", icon: MessageSquareText },
  { label: "Featured Listings", href: "/admin/featured", icon: Star },
  { label: "Users", href: "/admin/users", icon: UsersRound },
  { label: "Settings", href: "/admin/settings", icon: Settings }
];

export function AdminShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  async function logout() {
    try {
      const supabase = createSupabaseBrowserClient();
      await supabase.auth.signOut();
    } catch {
      // Login route remains the fallback when Supabase is not configured locally.
    }
    router.replace("/admin/login");
    router.refresh();
  }

  return (
    <div className="min-h-screen bg-paper text-charcoal dark:bg-navy dark:text-white">
      <aside className={cn("fixed inset-y-0 left-0 z-50 w-[19.5rem] max-w-[82vw] border-r border-line bg-white transition-transform duration-300 dark:border-white/10 dark:bg-slate-950 lg:translate-x-0", open ? "translate-x-0" : "-translate-x-full")}>
        <div className="flex h-20 items-center justify-between border-b border-line px-5 dark:border-white/10">
          <Link href="/admin" className="flex items-center gap-3">
            <span className="grid h-11 w-11 place-items-center rounded-lg bg-navy text-gold dark:bg-white">
              <Home size={21} />
            </span>
            <span className="font-heading text-lg font-bold text-navy dark:text-white">Admin Panel</span>
          </Link>
          <button className="focus-ring rounded-lg p-2 lg:hidden" onClick={() => setOpen(false)} aria-label="Close sidebar">
            <X size={22} />
          </button>
        </div>
        <nav className="grid gap-1 p-4">
          {adminNav.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setOpen(false)}
                className={cn(
                  "flex min-h-11 items-center gap-3 rounded-lg px-4 py-3 text-sm font-semibold transition",
                  active
                    ? "bg-navy text-white dark:bg-gold dark:text-navy"
                    : "text-muted hover:bg-slate-100 hover:text-navy dark:text-slate-300 dark:hover:bg-white/10 dark:hover:text-white"
                )}
              >
                <item.icon size={18} />
                {item.label}
              </Link>
            );
          })}
          <button
            onClick={logout}
            className="mt-3 flex min-h-11 items-center gap-3 rounded-lg px-4 py-3 text-left text-sm font-semibold text-red-600 transition hover:bg-red-50 dark:hover:bg-red-500/10"
          >
            <LogOut size={18} />
            Logout
          </button>
        </nav>
      </aside>

      {open ? <button aria-label="Close sidebar overlay" className="fixed inset-0 z-40 bg-navy/40 lg:hidden" onClick={() => setOpen(false)} /> : null}

      <div className="lg:pl-[19.5rem]">
        <header className="sticky top-0 z-30 border-b border-line bg-white/90 backdrop-blur-xl dark:border-white/10 dark:bg-navy/85">
          <div className="flex h-20 items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
            <button className="focus-ring rounded-lg border border-line bg-white p-3 text-navy lg:hidden dark:border-white/10 dark:bg-white/5 dark:text-white" onClick={() => setOpen(true)} aria-label="Open sidebar">
              <Menu size={22} />
            </button>
            <div>
              <p className="text-sm font-semibold text-gold">Secure admin workspace</p>
              <h1 className="font-heading text-xl font-bold text-navy dark:text-white">Real Estate CMS</h1>
            </div>
            <div className="hidden items-center gap-3 rounded-lg border border-line bg-white px-4 py-3 text-sm font-semibold text-muted dark:border-white/10 dark:bg-white/5 dark:text-slate-300 sm:flex">
              <ShieldCheck size={18} className="text-success" />
              Admin access
            </div>
          </div>
        </header>
        <div className="px-4 py-8 sm:px-6 lg:px-8">{children}</div>
      </div>
    </div>
  );
}
