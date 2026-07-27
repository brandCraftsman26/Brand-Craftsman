import React from "react";
import Footer from "@/components/Footer";
import { FiBriefcase, FiArrowRight, FiTrendingUp } from "react-icons/fi";

export const metadata = {
  title: "Portfolios & Case Studies | Brand Craftsman - Web Design Company in Coimbatore",
  description: "Explore our client portfolio and case studies showcasing measurable ROI: 55% B2B lead growth, 40% retail conversion uplift, and 3x customer inquiries.",
};

const portfolioProjects = [
  {
    slug: "retail-e-commerce-rebrand",
    title: "Regional Retail E-Commerce Overhaul & PPC Strategy",
    category: "Branding & Web",
    client: "Regional Retailer",
    metric: "40% Lead Uplift",
    description: "Built a bespoke Next.js e-commerce platform integrated with an aggressive Search Pin PPC strategy, resulting in a 40% increase in premium leads within 90 days."
  },
  {
    slug: "manufacturing-b2b-lead-generation",
    title: "Industrial Manufacturing B2B Digital Marketing Engine",
    category: "Digital Marketing",
    client: "Tech Manufacturer",
    metric: "55% B2B Growth",
    description: "Executed a targeted SEO and Google Ads strategy generating 55% growth in high-quality B2B leads and a 30% increase in conversion rates over 6 months."
  },
  {
    slug: "local-service-provider-rebrand",
    title: "Local Service Provider Identity Rebrand & PPC Launch",
    category: "Branding & Performance",
    client: "Coimbatore Service Provider",
    metric: "3X Inquiries",
    description: "Re-architected the complete visual identity and launched a targeted performance ad rollout, tripling customer requests and doubling service revenue in 4 months."
  }
];

export default function PortfoliosPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white pt-24 pb-16 transition-colors duration-300">
      
      {/* Portfolio Hero Header */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto pt-10 pb-16 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 rounded-full bg-pink-500/10 text-pink-600 dark:text-pink-400 font-general text-xs uppercase tracking-widest border border-pink-500/20">
          <FiBriefcase /> Proven Client Results
        </div>

        <h1 className="font-zentry text-4xl sm:text-6xl lg:text-7xl font-black uppercase tracking-tight leading-none mb-6">
          Our Portfolio & Case Studies
        </h1>

        <p className="font-robert-regular text-lg sm:text-xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
          We don't just design attractive platforms; we engineer measurable business outcomes. Explore how our omnichannel approach drives real growth.
        </p>
      </section>

      {/* Projects Grid */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {portfolioProjects.map((project, idx) => (
            <a
              key={idx}
              href={`/portfolios/${project.slug}`}
              className="group p-8 rounded-3xl bg-gray-50 dark:bg-zinc-900/60 border border-gray-200 dark:border-zinc-800 hover:border-pink-500 hover:shadow-2xl transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between text-xs font-general mb-4">
                  <span className="bg-pink-500/10 text-pink-600 dark:text-pink-400 px-3 py-1 rounded-full font-bold uppercase tracking-wider">
                    {project.category}
                  </span>
                  <span className="font-zentry text-lg font-black text-emerald-500 flex items-center gap-1">
                    <FiTrendingUp /> {project.metric}
                  </span>
                </div>

                <h2 className="font-zentry text-2xl font-bold uppercase text-black dark:text-white mb-3 group-hover:text-pink-500 transition-colors leading-tight">
                  {project.title}
                </h2>

                <p className="font-robert-regular text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-6">
                  {project.description}
                </p>
              </div>

              <div className="pt-4 border-t border-gray-200 dark:border-zinc-800 flex items-center justify-between">
                <span className="text-xs font-general text-gray-500">Client: {project.client}</span>
                <span className="text-xs font-general uppercase tracking-wider text-pink-500 font-bold group-hover:translate-x-2 transition-transform flex items-center gap-1">
                  View Case Study <FiArrowRight />
                </span>
              </div>
            </a>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}
