import React from "react";
import dynamic from "next/dynamic";
import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import ServicesBento from "@/components/ServicesBento";
import FAQ from "@/components/FAQ";
import { FiCheckCircle, FiZap } from "react-icons/fi";

const CTASection = dynamic(() => import("@/components/CTASection"), { ssr: true });
const Footer = dynamic(() => import("@/components/Footer"), { ssr: true });

export const metadata: Metadata = {
  title: "Web Design & Digital Marketing Company in Coimbatore | Brand Craftsman",
  description: "Brand Craftsman is the #1 Web Design & Digital Marketing Company in Coimbatore. We combine high-end branding, bespoke software engineering, and Search Pin SEO strategies to scale your business.",
  keywords: ["Web Design Company in Coimbatore", "Digital Marketing Agency Coimbatore", "SEO Company Coimbatore", "Branding Agency Coimbatore"],
};

const landingSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Brand Craftsman",
  "image": "https://brandcraftsman.com/img/logo-dark.png",
  "url": "https://brandcraftsman.com/web-design-digital-marketing-company-in-coimbatore",
  "telephone": "+919876543210",
  "priceRange": "₹₹",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Coimbatore Tech Corridor",
    "addressLocality": "Coimbatore",
    "addressRegion": "TN",
    "postalCode": "641001",
    "addressCountry": "IN"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 11.0168,
    "longitude": 76.9558
  },
  "openingHoursSpecification": {
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    "opens": "09:00",
    "closes": "19:00"
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "5.0",
    "reviewCount": "50"
  }
};

export default function PrimaryKeywordLandingPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(landingSchema) }}
      />

      <PageHero
        title="Web Design & Digital Marketing Company in Coimbatore"
        description="Engineered for business leaders, ambitious startups, and growth-minded enterprises. We combine bespoke web engineering with Search Pin performance marketing to scale your revenue."
        primaryCta={{ label: "Get Free Consultation", href: "/contact" }}
        secondaryCta={{ label: "Call Our Experts", href: "tel:+919876543210" }}
      />

      {/* Key Proof Banner */}
      <section className="py-16 bg-[#080220] border-b border-white/10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 p-8 rounded-3xl bg-[#0F0927] border border-cyan-400/30 text-center shadow-[0_0_30px_rgba(0,240,255,0.2)] max-w-6xl mx-auto">
            <div>
              <div className="font-zentry text-4xl sm:text-5xl font-black text-cyan-400">55%</div>
              <p className="font-general text-xs uppercase tracking-widest text-zinc-300 font-bold mt-2">B2B Lead Growth</p>
            </div>
            <div>
              <div className="font-zentry text-4xl sm:text-5xl font-black text-emerald-400">40%</div>
              <p className="font-general text-xs uppercase tracking-widest text-zinc-300 font-bold mt-2">Retail Lead Uplift</p>
            </div>
            <div>
              <div className="font-zentry text-4xl sm:text-5xl font-black text-pink-400">3X</div>
              <p className="font-general text-xs uppercase tracking-widest text-zinc-300 font-bold mt-2">Customer Inquiries</p>
            </div>
            <div>
              <div className="font-zentry text-4xl sm:text-5xl font-black text-amber-400">150+</div>
              <p className="font-general text-xs uppercase tracking-widest text-zinc-300 font-bold mt-2">Projects Delivered</p>
            </div>
          </div>
        </div>
      </section>

      {/* Detailed Keyword SEO Content */}
      <section className="py-24 md:py-32 bg-slate-50 dark:bg-[#07011F] overflow-hidden">
        {/* Intellio Mesh Glow */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/3 right-10 w-[600px] h-[600px] bg-[#6766FF]/10 blur-[150px] rounded-full" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-violet-500/10 border border-violet-400/30 text-cyan-400 font-general text-xs uppercase tracking-widest font-bold">
                <FiZap /> MARKET LEADERSHIP IN COIMBATORE
              </div>

              <h2 className="font-zentry text-3xl sm:text-5xl font-black uppercase leading-tight text-slate-900 dark:text-white">
                Why Brand Craftsman is the #1 Web Design & Digital Marketing Company in Coimbatore
              </h2>

              {/* High Contrast EEAT Description */}
              <div className="font-robert-medium text-slate-800 dark:text-zinc-100 space-y-4 text-base md:text-lg leading-relaxed font-semibold">
                <p>
                  In today&apos;s digital-first economy, simply having a website is no longer sufficient. You need a dedicated, high-speed digital sales platform backed by strategic search engine optimization, performance advertising, and unified visual branding.
                </p>
                <p>
                  As the top <strong>Web Design & Digital Marketing Company in Coimbatore</strong>, Brand Craftsman bridges the crucial gap between aesthetic web design and ROI-centric digital marketing campaigns. Founded by Santhosh Shanmugasundaram and Hari Prashath, our agency brings years of hands-on field experience building bespoke digital infrastructure for regional, national, and international clients.
                </p>
                <p>
                  Our strategic synergy with <strong>Search Pin</strong> (our dedicated digital marketing arm established in 2024) ensures that your web application isn&apos;t just visual eye candy—it is engineered to rank #1 on Google, capture high-intent organic traffic, and convert visitors into high-paying customers.
                </p>
              </div>
            </div>

            <div className="bg-white dark:bg-[#0F0927] p-8 sm:p-10 rounded-3xl border border-slate-200 dark:border-white/10 shadow-[0_0_50px_rgba(103,102,255,0.25)] space-y-6">
              <h3 className="font-zentry text-2xl sm:text-3xl font-black uppercase text-slate-900 dark:text-white">
                What Sets Our Agency Apart?
              </h3>
              <ul className="space-y-4 font-robert-medium text-slate-800 dark:text-zinc-200 text-base font-semibold">
                <li className="flex items-start gap-3">
                  <FiCheckCircle className="text-cyan-400 text-xl shrink-0 mt-1" />
                  <span><strong>Bespoke Next.js & React Frameworks:</strong> Ultra-fast page loads, sub-second latency, and responsive mobile-first UI design.</span>
                </li>
                <li className="flex items-start gap-3">
                  <FiCheckCircle className="text-cyan-400 text-xl shrink-0 mt-1" />
                  <span><strong>Search Pin Power Ingestion:</strong> Deep technical SEO, JSON-LD schema markup, and localized keyword targeting built directly into the site architecture.</span>
                </li>
                <li className="flex items-start gap-3">
                  <FiCheckCircle className="text-cyan-400 text-xl shrink-0 mt-1" />
                  <span><strong>5+ Year Expert Community:</strong> Access to senior mobile app developers, UI designers, and full-stack engineers.</span>
                </li>
              </ul>

              <div className="pt-4">
                <Link href="/contact" className="btn-genz w-full justify-center">
                  Claim Free Digital Audit
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Bento Visual Showcase */}
      <ServicesBento />

      <FAQ />
      <CTASection />
      <Footer />
    </>
  );
}
