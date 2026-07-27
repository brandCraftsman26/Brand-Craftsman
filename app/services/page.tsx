import React from "react";
import Footer from "@/components/Footer";
import ServicesBento from "@/components/ServicesBento";
import { FiArrowRight, FiCheckCircle, FiZap, FiLayers } from "react-icons/fi";

export const metadata = {
  title: "Our Services | Brand Craftsman - Web Design & Digital Marketing Company in Coimbatore",
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

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white pt-24 pb-16 transition-colors duration-300">
      
      {/* Services Hero Header */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto pt-10 pb-16 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 rounded-full bg-purple-500/10 text-purple-600 dark:text-purple-400 font-general text-xs uppercase tracking-widest border border-purple-500/20">
          <FiLayers /> 360° Digital Agency Ecosystem
        </div>

        <h1 className="font-zentry text-4xl sm:text-6xl lg:text-7xl font-black uppercase tracking-tight leading-none mb-6">
          Our Comprehensive Services
        </h1>

        <p className="font-robert-regular text-lg sm:text-xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
          From visual identity creation to high-end software development and Search Pin powered digital marketing campaigns in Coimbatore, we build digital assets that dominate.
        </p>
      </section>

      {/* Services Grid Catalog */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {serviceList.map((item, idx) => (
            <a
              key={idx}
              href={`/services/${item.slug}`}
              className="group p-8 rounded-3xl bg-gray-50 dark:bg-zinc-900/60 border border-gray-200 dark:border-zinc-800 hover:border-blue-500 hover:shadow-2xl transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <span className="text-xs font-general uppercase tracking-widest text-blue-500 dark:text-blue-400 font-bold mb-3 block">
                  {item.category}
                </span>
                <h2 className="font-zentry text-2xl font-bold uppercase text-black dark:text-white mb-3 group-hover:text-blue-500 transition-colors">
                  {item.title}
                </h2>
                <p className="font-robert-regular text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-6">
                  {item.description}
                </p>
              </div>

              <div className="flex items-center text-xs font-general uppercase tracking-wider text-blue-600 dark:text-blue-400 font-bold group-hover:translate-x-2 transition-transform">
                Read Detailed Guide <FiArrowRight className="ml-2" />
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* Interactive Bento Visual Showcase */}
      <ServicesBento />

      <Footer />
    </div>
  );
}
