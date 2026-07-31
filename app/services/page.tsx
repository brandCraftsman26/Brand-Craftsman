import React from "react";
import dynamic from "next/dynamic";
import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import ServicesBento from "@/components/ServicesBento";
import { FiArrowRight, FiCheckCircle } from "react-icons/fi";

const CTASection = dynamic(() => import("@/components/CTASection"), { ssr: true });
const Footer = dynamic(() => import("@/components/Footer"), { ssr: true });

export const metadata: Metadata = {
  title: "Our Services | Brand Craftsman — Web Design & Digital Marketing Company in Coimbatore",
  description: "Explore our full 360-degree digital ecosystem in Coimbatore: Digital Marketing, Branding, Logo Design, Printing, Web & Mobile App Development, Press Release, Social Media & WhatsApp Marketing.",
};

const serviceList = [
  {
    slug: "digital-marketing",
    title: "Digital Marketing",
    category: "Performance & Growth",
    description: "ROI-driven Search Pin powered digital marketing campaigns including SEO, Google Ads PPC, conversion optimization, and market segmentation."
  },
  {
    slug: "branding",
    title: "Branding",
    category: "Identity & Strategy",
    description: "Holistic brand stewardship crafting emotional visual identity, psychological positioning, brand guidelines, and corporate storytelling."
  },
  {
    slug: "logo-designing",
    title: "Logo Designing",
    category: "Visual Design",
    description: "Bespoke vector logo design, custom iconography, brand marks, and modern typographic visual standards."
  },
  {
    slug: "printing",
    title: "Printing",
    category: "Physical Collateral",
    description: "High-end corporate print media, luxury business cards, brochures, packaging design, and event display assets."
  },
  {
    slug: "web-development",
    title: "Web Development",
    category: "Engineering",
    description: "Next.js modern web architecture, lightning-fast loading speeds, headless CMS setups, and secure e-commerce portals."
  },
  {
    slug: "mobile-app-development",
    title: "Mobile App Development",
    category: "Software & Mobile",
    description: "Custom native & cross-platform iOS and Android applications with high retention user interfaces and cloud API backends."
  },
  {
    slug: "press-release",
    title: "Press Release",
    category: "PR & Authority",
    description: "Strategic corporate PR distribution, media coverage placement, brand authority creation, and industry news wire outreach."
  },
  {
    slug: "social-media-marketing",
    title: "Social Media Marketing",
    category: "Engagement & Ads",
    description: "Viral social content strategy, Meta & LinkedIn ad management, reel production, and community management."
  },
  {
    slug: "whatsapp-marketing",
    title: "WhatsApp Marketing",
    category: "Direct Messaging",
    description: "WhatsApp Business API integrations, automated customer funnels, targeted broadcast campaigns, and CRM sync."
  }
];

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "provider": {
    "@type": "Organization",
    "name": "Brand Craftsman",
    "url": "https://brandcraftsman.com"
  },
  "areaServed": "Coimbatore",
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Digital Agency Services",
    "itemListElement": serviceList.map((s, i) => ({
      "@type": "Offer",
      "itemOffered": {
        "@type": "Service",
        "name": s.title,
        "description": s.description
      }
    }))
  }
};

export default function ServicesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />

      <PageHero
        title="Comprehensive Digital Services"
        description="From bespoke visual branding to high-speed Next.js web engineering and Search Pin performance marketing in Coimbatore."
        primaryCta={{ label: "Start Project", href: "/contact" }}
        secondaryCta={{ label: "View Pricing", href: "/pricing" }}
      />

      {/* Services Grid Catalog */}
      <section className="py-24 md:py-32 bg-slate-50 dark:bg-[#07011F] overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {serviceList.map((item, idx) => (
              <a
                key={idx}
                href={`/services/${item.slug}`}
                className="group p-8 rounded-3xl bg-white dark:bg-[#0F0927]/90 border border-slate-200 dark:border-white/10 hover:border-cyan-400/60 shadow-xl hover:shadow-[0_0_35px_rgba(0,240,255,0.2)] transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <span className="text-xs font-general uppercase tracking-widest text-cyan-400 font-bold mb-3 block">
                    {item.category}
                  </span>
                  <h2 className="font-zentry text-2xl font-bold uppercase text-slate-900 dark:text-white mb-3 group-hover:text-cyan-400 transition-colors">
                    {item.title}
                  </h2>
                  <p className="font-robert-medium text-slate-700 dark:text-zinc-200 text-base leading-relaxed mb-6 font-medium">
                    {item.description}
                  </p>
                </div>

                <div className="flex items-center text-xs font-general uppercase tracking-wider text-indigo-600 dark:text-cyan-400 font-bold group-hover:translate-x-2 transition-transform">
                  Explore Service <FiArrowRight className="ml-2" />
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Bento Visual Showcase */}
      <ServicesBento />

      <CTASection />
      <Footer />
    </>
  );
}
