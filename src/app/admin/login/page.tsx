"use client";

import Image from "next/image";
import Link from "next/link";
import { Building2, Eye, Lock, Mail } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { FormEvent, Suspense, useState } from "react";
import { Button } from "@/components/button";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import { companyName } from "@/lib/data";

function AdminLoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(true);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function handleLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const supabase = createSupabaseBrowserClient();
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error || !data.user) {
        setMessage(error?.message ?? "Unable to sign in.");
        return;
      }

      const { data: profile } = await supabase
        .from("users")
        .select("role")
        .eq("id", data.user.id)
        .single();

      if (profile?.role !== "admin") {
        await supabase.auth.signOut();
        setMessage("This account is not authorized for admin access.");
        return;
      }

      if (!remember) {
        sessionStorage.setItem("admin-session-only", "true");
      }

      router.replace(searchParams.get("next") || "/admin");
      router.refresh();
    } catch {
      setMessage("Supabase is not configured yet. Add environment keys to enable login.");
    } finally {
      setLoading(false);
    }
  }

  async function handleForgotPassword() {
    if (!email) {
      setMessage("Enter your email first, then request a reset link.");
      return;
    }

    try {
      const supabase = createSupabaseBrowserClient();
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/admin/login`
      });
      setMessage(error ? error.message : "Password reset email sent.");
    } catch {
      setMessage("Supabase is not configured yet.");
    }
  }

  return (
    <main className="relative grid min-h-screen place-items-center overflow-hidden bg-navy px-4 py-10">
      <Image
        src="https://images.unsplash.com/photo-1600607688969-a5bfcd646154?auto=format&fit=crop&w=2200&q=85"
        alt="Luxury property background"
        fill
        priority
        className="object-cover opacity-45"
      />
      <div className="absolute inset-0 bg-navy/70" />
      <form
        onSubmit={handleLogin}
        className="relative w-full max-w-md rounded-lg border border-white/20 bg-white/15 p-6 text-white shadow-premium backdrop-blur-xl sm:p-8"
      >
        <Link href="/" className="mb-8 flex items-center gap-3">
          <span className="flex h-12 w-12 items-center justify-center rounded-lg bg-white text-navy">
            <Building2 size={23} />
          </span>
          <span className="font-heading text-xl font-bold">{companyName}</span>
        </Link>
        <h1 className="font-heading text-3xl font-bold">Admin Login</h1>
        <p className="mt-3 leading-7 text-slate-200">
          Sign in with an authorized administrator account to manage properties.
        </p>

        <div className="mt-8 grid gap-5">
          <label className="grid gap-2 text-sm font-semibold">
            Username or Email
            <span className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="w-full rounded-lg border border-white/20 bg-white/95 px-11 py-3 text-charcoal outline-none transition focus:border-gold focus:ring-4 focus:ring-gold/20"
                placeholder="admin@example.com"
                type="email"
                autoComplete="email"
                required
              />
            </span>
          </label>
          <label className="grid gap-2 text-sm font-semibold">
            Password
            <span className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="w-full rounded-lg border border-white/20 bg-white/95 px-11 py-3 text-charcoal outline-none transition focus:border-gold focus:ring-4 focus:ring-gold/20"
                placeholder="Password"
                type="password"
                autoComplete="current-password"
                required
              />
              <Eye className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} aria-hidden />
            </span>
          </label>
        </div>

        <div className="mt-5 flex items-center justify-between gap-4">
          <label className="flex items-center gap-2 text-sm text-slate-200">
            <input
              checked={remember}
              onChange={(event) => setRemember(event.target.checked)}
              type="checkbox"
              className="h-4 w-4 rounded border-white/30 text-gold focus:ring-gold"
            />
            Remember Me
          </label>
          <button type="button" onClick={handleForgotPassword} className="text-sm font-semibold text-gold hover:text-white">
            Forgot Password
          </button>
        </div>

        {message ? (
          <p className="mt-5 rounded-lg border border-white/15 bg-white/10 p-3 text-sm text-slate-100">
            {message}
          </p>
        ) : null}

        <Button type="submit" variant="gold" className="mt-6 w-full" disabled={loading}>
          {loading ? "Signing In..." : "Login"}
        </Button>
      </form>
    </main>
  );
}

export default function AdminLoginPage() {
  return (
    <Suspense fallback={<main className="grid min-h-screen place-items-center bg-navy text-white">Loading admin login...</main>}>
      <AdminLoginForm />
    </Suspense>
  );
}
