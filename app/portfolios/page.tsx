import React from "react";
import Footer from "@/components/Footer";
import { FiBriefcase } from "react-icons/fi";
import PortfolioContent from "./PortfolioContent";
import { getServerDb } from "@/lib/supabase/server";

export const metadata = {
  title: "Portfolios & Case Studies | Brand Craftsman - Web Design Company in Coimbatore",
  description: "Explore our client portfolio and case studies showcasing measurable ROI: 55% B2B lead growth, 40% retail conversion uplift, and 3x customer inquiries.",
};

const fallbackProjects = [
  {
    slug: "retail-e-commerce-rebrand",
    title: "Regional Retail E-Commerce Overhaul",
    category: "Websites",
    client: "Regional Retailer",
    metric: "40% Lead Uplift",
    description: "Built a bespoke Next.js e-commerce platform integrated with an aggressive Search Pin PPC strategy, resulting in a 40% increase in premium leads within 90 days.",
    image: "/img/portfolio_website_1785511403920.png"
  },
  {
    slug: "manufacturing-b2b-lead-generation",
    title: "Industrial B2B Digital Marketing",
    category: "Branding Designs",
    client: "Tech Manufacturer",
    metric: "55% B2B Growth",
    description: "Executed a targeted SEO and Google Ads strategy generating 55% growth in high-quality B2B leads and a 30% increase in conversion rates over 6 months.",
    image: "/img/portfolio_branding_1785511392412.png"
  },
  {
    slug: "local-service-provider-rebrand",
    title: "Service Provider Identity Rebrand",
    category: "Applications",
    client: "Coimbatore Service Provider",
    metric: "3X Inquiries",
    description: "Re-architected the complete visual identity and launched a targeted performance ad rollout, tripling customer requests and doubling service revenue in 4 months.",
    image: "/img/portfolio_application_1785511415543.png"
  },
  {
    slug: "premium-printing-products",
    title: "Premium Printing Materials Design",
    category: "Printing Products",
    client: "Corporate Agency",
    metric: "10k+ Prints",
    description: "Designed high-quality modern business cards, brochures, and flyers that elevate brand presence and feel.",
    image: "/img/portfolio_printing_1785511380254.png"
  }
];

export default async function PortfoliosPage() {
  let projects = fallbackProjects;

  try {
    const supabase = await getServerDb();
    const { data: dbPortfolios } = await supabase
      .from("cms_portfolios")
      .select("*")
      .eq("is_published", true)
      .order("sort_order", { ascending: true });

    if (dbPortfolios && dbPortfolios.length > 0) {
      projects = dbPortfolios.map((p) => ({
        slug: p.slug,
        title: p.title,
        category: p.category,
        client: p.client_name || "Client Project",
        metric: p.metrics?.leadGrowth ? `${p.metrics.leadGrowth} Growth` : "High ROI",
        description: p.description || "",
        image: p.image || "/img/portfolio_website_1785511403920.png",
      }));
    }
  } catch {}

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
          We don&apos;t just design attractive platforms; we engineer measurable business outcomes. Explore how our omnichannel approach drives real growth.
        </p>
      </section>

      {/* Projects Grid */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto py-12">
        <PortfolioContent projects={projects} />
      </section>

      <Footer />
    </div>
  );
}
