"use client";

import Link from "next/link";
import { Building2, Menu, Moon, Phone, Sun, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/button";
import { companyName, navLinks, phoneHref, phoneNumber, whatsappHref } from "@/lib/data";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  return (
    <header className={cn("sticky top-0 z-50 transition", scrolled ? "glass-nav shadow-sm" : "bg-white/95 dark:bg-navy/95")}>
      <nav className="container-wide flex min-h-20 items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-3" aria-label="Brand placeholder home">
          <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-navy text-gold dark:bg-white">
            <Building2 size={22} />
          </span>
          <span className="font-heading text-lg font-bold text-navy dark:text-white">
            {companyName}
          </span>
        </Link>

        <div className="hidden items-center gap-7 lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-sm font-semibold text-charcoal transition hover:text-royal dark:text-slate-200 dark:hover:text-white"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="hidden items-center gap-3 xl:flex">
          <a href={phoneHref} className="flex items-center gap-2 text-sm font-semibold text-navy dark:text-white">
            <Phone size={17} />
            {phoneNumber}
          </a>
          <Button href={whatsappHref} variant="outline" className="px-4">
            WhatsApp
          </Button>
          <Button href="/contact" className="px-4">
            List Your Property
          </Button>
          <button
            aria-label="Toggle dark mode"
            onClick={() => setDark((value) => !value)}
            className="focus-ring flex h-11 w-11 items-center justify-center rounded-lg border border-line bg-white text-navy transition hover:border-royal dark:border-white/15 dark:bg-white/5 dark:text-white"
          >
            {dark ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </div>

        <button
          aria-label="Open navigation menu"
          className="focus-ring flex h-11 w-11 items-center justify-center rounded-lg border border-line bg-white text-navy lg:hidden dark:border-white/15 dark:bg-white/5 dark:text-white"
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {open ? (
        <div className="border-t border-line bg-white px-4 py-5 shadow-xl lg:hidden dark:border-white/10 dark:bg-navy">
          <div className="mx-auto flex max-w-md flex-col gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-3 text-sm font-semibold text-charcoal hover:bg-slate-100 dark:text-white dark:hover:bg-white/10"
              >
                {link.label}
              </Link>
            ))}
            <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
              <Button href={whatsappHref} variant="outline">WhatsApp</Button>
              <Button href="/contact">List Your Property</Button>
            </div>
          </div>
        </div>
      ) : null}
    </header>
  );
}
