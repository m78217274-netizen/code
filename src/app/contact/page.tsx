import { Clock, Mail, MessageCircle, Phone } from "lucide-react";
import { Button } from "@/components/button";
import { SectionHeading } from "@/components/section-heading";
import { companyName, contactEmail, phoneHref, phoneNumber, whatsappHref } from "@/lib/data";

export const metadata = {
  title: `Contact | ${companyName}`,
  description: "Contact the property advisory team for buying, selling, and investment guidance."
};

export default function ContactPage() {
  return (
    <>
      <section className="bg-white py-16 dark:bg-white/5">
        <div className="container-wide">
          <SectionHeading
            eyebrow="Contact"
            title={`Contact ${companyName}`}
            description="Send your requirement, call directly, or message on WhatsApp for buying, selling, and property inquiries."
          />
        </div>
      </section>

      <section className="container-wide grid gap-8 py-14 lg:grid-cols-[1fr_420px]">
        <form className="rounded-lg border border-line bg-white p-6 shadow-card dark:border-white/10 dark:bg-white/5 md:p-8">
          <div className="grid gap-5 md:grid-cols-2">
            <label className="grid gap-2 text-sm font-semibold text-navy dark:text-white">
              Name
              <input className="premium-input" placeholder="Your name" />
            </label>
            <label className="grid gap-2 text-sm font-semibold text-navy dark:text-white">
              Phone
              <input className="premium-input" placeholder="Phone number" />
            </label>
            <label className="grid gap-2 text-sm font-semibold text-navy dark:text-white md:col-span-2">
              Email
              <input className="premium-input" placeholder="Email address" type="email" />
            </label>
            <label className="grid gap-2 text-sm font-semibold text-navy dark:text-white md:col-span-2">
              Message
              <textarea className="premium-input min-h-40 resize-y" placeholder="Tell us what you are looking for" />
            </label>
          </div>
          <Button type="button" className="mt-6 w-full md:w-auto">Submit Inquiry</Button>
        </form>

        <aside>
          <div className="rounded-lg border border-line bg-white p-6 shadow-card dark:border-white/10 dark:bg-white/5">
            <h2 className="font-heading text-2xl font-bold text-navy dark:text-white">Contact Information</h2>
            <div className="mt-6 grid gap-5 text-muted dark:text-slate-300">
              <a href={phoneHref} className="flex gap-3 transition hover:text-royal dark:hover:text-white"><Phone className="text-gold" /> {phoneNumber}</a>
              <a href={`mailto:${contactEmail}`} className="flex gap-3 transition hover:text-royal dark:hover:text-white"><Mail className="text-gold" /> {contactEmail}</a>
              <p className="flex gap-3"><Clock className="text-gold" /> Mon - Sat, 9:00 AM - 6:00 PM</p>
            </div>
            <Button href={whatsappHref} variant="gold" className="mt-6 w-full"><MessageCircle size={18} /> WhatsApp Contact</Button>
          </div>
        </aside>
      </section>
    </>
  );
}
