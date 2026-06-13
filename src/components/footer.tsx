import Link from "next/link";
import { Mail, Phone } from "lucide-react";
import { companyName, contactEmail, navLinks, phoneHref, phoneNumber } from "@/lib/data";

export function Footer() {
  return (
    <footer className="bg-navy text-white">
      <div className="container-wide grid gap-10 py-16 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <h2 className="font-heading text-xl font-bold">{companyName}</h2>
          <p className="mt-4 max-w-sm leading-7 text-slate-300">
            Trusted real estate advisory for buyers, sellers, and investors seeking verified, high-quality property opportunities.
          </p>
        </div>
        <div>
          <h3 className="font-heading text-base font-bold">Quick Links</h3>
          <div className="mt-5 grid gap-3">
            {navLinks.map((link) => (
              <Link key={link.label} href={link.href} className="text-sm text-slate-300 transition hover:text-gold">
                {link.label}
              </Link>
            ))}
          </div>
        </div>
        <div>
          <h3 className="font-heading text-base font-bold">Property Types</h3>
          <div className="mt-5 grid gap-3 text-sm text-slate-300">
            <span>Residential</span>
            <span>Commercial</span>
            <span>Apartments</span>
            <span>Villas</span>
            <span>Plots</span>
          </div>
        </div>
        <div>
          <h3 className="font-heading text-base font-bold">Contact Information</h3>
          <div className="mt-5 grid gap-4 text-sm text-slate-300">
            <a href={phoneHref} className="flex gap-3 transition hover:text-white"><Phone size={18} className="text-gold" /> {phoneNumber}</a>
            <a href={`mailto:${contactEmail}`} className="flex gap-3 transition hover:text-white"><Mail size={18} className="text-gold" /> {contactEmail}</a>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="container-wide flex flex-col gap-4 py-6 text-sm text-slate-400 md:flex-row md:items-center md:justify-between">
          <p>Copyright 2026. All rights reserved.</p>
          <div className="flex gap-5">
            <Link href="/privacy" className="hover:text-white">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
