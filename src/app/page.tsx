import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle2, MessageCircle, Phone, ShieldCheck, Timer } from "lucide-react";
import { Button } from "@/components/button";
import { FAQ } from "@/components/faq";
import { MotionDiv, MotionSection } from "@/components/motion";
import { PropertyCard } from "@/components/property-card";
import { SearchCard } from "@/components/search-card";
import { SectionHeading } from "@/components/section-heading";
import { categories, phoneHref, stats, whatsappHref } from "@/lib/data";
import { getPublicProperties } from "@/lib/public-properties";

export default async function HomePage() {
  const publicProperties = await getPublicProperties();

  return (
    <>
      <section className="relative min-h-[calc(100vh-80px)] overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1600607687644-c7171b42498f?auto=format&fit=crop&w=2200&q=85"
          alt="Luxury modern property interior"
          fill
          priority
          className="object-cover"
        />
        <div className="hero-overlay absolute inset-0" />
        <div className="container-wide relative grid min-h-[calc(100vh-80px)] items-center gap-10 py-16 lg:grid-cols-[1.05fr_0.95fr]">
          <MotionDiv initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="max-w-3xl text-white">
            <p className="mb-5 inline-flex rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold text-white/90 backdrop-blur">
              Verified real estate advisory
            </p>
            <h1 className="font-heading text-[36px] font-bold leading-[1.08] md:text-[48px] lg:text-[64px]">
              Find Your Perfect Property With Confidence
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-200">
              Helping buyers, sellers, and investors discover exceptional real estate opportunities.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button href="/properties">Browse Properties</Button>
              <Button href="/contact" variant="secondary">Contact Agent</Button>
            </div>
          </MotionDiv>
          <MotionDiv initial={{ opacity: 0, y: 34 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }}>
            <SearchCard />
          </MotionDiv>
        </div>
      </section>

      <section className="container-wide py-14">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <MotionDiv key={stat.label} initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="rounded-lg border border-line bg-white p-6 shadow-card dark:border-white/10 dark:bg-white/5">
              <stat.icon className="mb-5 text-gold" size={30} />
              <p className="font-heading text-3xl font-bold text-navy dark:text-white">{stat.value}</p>
              <p className="mt-2 text-sm font-semibold text-muted dark:text-slate-300">{stat.label}</p>
            </MotionDiv>
          ))}
        </div>
      </section>

      <MotionSection className="container-wide py-14" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
        <SectionHeading
          eyebrow="Featured Properties"
          title="Curated Listings For Serious Buyers"
          description="Explore verified homes, commercial spaces, and investment-grade opportunities selected for quality, location, and long-term value."
          action={<Button href="/properties" variant="outline">View All <ArrowRight size={16} /></Button>}
        />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {publicProperties.slice(0, 3).map((property) => (
            <PropertyCard key={property.slug} property={property} />
          ))}
        </div>
      </MotionSection>

      <section className="bg-white py-20 dark:bg-white/5">
        <div className="container-wide">
          <SectionHeading align="center" eyebrow="Why Choose Us" title="Trusted Guidance From Search To Closing" description="Clear advice, verified listings, and disciplined negotiation for a smoother real estate decision." />
          <div className="grid gap-6 md:grid-cols-3">
            {[
              { icon: ShieldCheck, title: "Trusted Experts", text: "Professional market guidance for confident property decisions." },
              { icon: CheckCircle2, title: "Verified Listings", text: "Every property is reviewed before it reaches our clients." },
              { icon: Timer, title: "Fast Transactions", text: "A smoother buying and selling process with focused support." }
            ].map((item) => (
              <div key={item.title} className="rounded-lg border border-line bg-paper p-8 dark:border-white/10 dark:bg-navy">
                <item.icon className="mb-6 text-gold" size={34} />
                <h3 className="font-heading text-xl font-bold text-navy dark:text-white">{item.title}</h3>
                <p className="mt-3 leading-7 text-muted dark:text-slate-300">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container-wide py-20">
        <SectionHeading eyebrow="Property Categories" title="Find The Right Property Class" />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => (
            <Link key={category.title} href="/properties" className="group relative aspect-[16/10] overflow-hidden rounded-lg">
              <Image src={category.image} alt={category.title} fill sizes="(min-width: 1024px) 33vw, 100vw" className="object-cover transition duration-500 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-navy/25 to-transparent" />
              <div className="absolute bottom-0 p-6 text-white">
                <h3 className="font-heading text-2xl font-bold">{category.title}</h3>
                <p className="mt-2 text-sm text-slate-200">{category.count}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="relative overflow-hidden py-24">
        <Image src="https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=2200&q=85" alt="Luxury investment property" fill className="object-cover" />
        <div className="absolute inset-0 bg-navy/75" />
        <div className="container-wide relative flex flex-col items-start gap-6 text-white md:flex-row md:items-center md:justify-between">
          <div>
            <p className="mb-3 text-sm font-bold uppercase tracking-[0.18em] text-gold">Investment Opportunities</p>
            <h2 className="max-w-2xl font-heading text-3xl font-bold md:text-5xl">Discover High-Return Investment Properties</h2>
          </div>
          <Button href="/contact" variant="gold">Schedule Consultation</Button>
        </div>
      </section>

      <section className="container-wide py-20">
        <SectionHeading align="center" eyebrow="Testimonials" title="Clients Who Moved With Confidence" />
        <div className="grid gap-6 md:grid-cols-3">
          {["A measured, professional process from shortlist to close.", "Their documentation review saved us weeks of uncertainty.", "The investment guidance was practical, clear, and grounded."].map((text, index) => (
            <div key={text} className="rounded-lg border border-line bg-white p-6 shadow-card dark:border-white/10 dark:bg-white/5">
              <div className="mb-5 flex items-center gap-4">
                <div className="h-12 w-12 rounded-full bg-slate-200 dark:bg-white/10" aria-label="Client photo placeholder" />
                <div>
                  <p className="font-heading font-bold text-navy dark:text-white">Client Name {index + 1}</p>
                  <p className="text-sm font-semibold text-gold">5.0 rating</p>
                </div>
              </div>
              <p className="leading-7 text-muted dark:text-slate-300">{text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="container-wide grid gap-10 py-20 lg:grid-cols-[0.85fr_1.15fr]">
        <SectionHeading eyebrow="FAQ" title="Answers Before You Decide" description="Straightforward guidance for buying, selling, documentation, and investment planning." />
        <FAQ />
      </section>

      <section className="container-wide pb-20">
        <div className="rounded-lg bg-navy p-8 text-white md:p-12">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <h2 className="font-heading text-3xl font-bold md:text-4xl">Ready To Find Your Next Property?</h2>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button href={phoneHref} variant="gold"><Phone size={18} /> Call Now</Button>
              <Button href={whatsappHref} variant="secondary"><MessageCircle size={18} /> WhatsApp Us</Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
