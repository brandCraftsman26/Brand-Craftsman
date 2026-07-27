import React from "react";
import { notFound } from "next/navigation";
import Footer from "@/components/Footer";
import { FiTrendingUp, FiCheckCircle, FiArrowLeft, FiZap } from "react-icons/fi";

interface CaseStudyData {
  slug: string;
  title: string;
  category: string;
  client: string;
  metric: string;
  challenge: string;
  solution: string;
  results: string[];
  techStack: string[];
}

const caseStudiesDatabase: Record<string, CaseStudyData> = {
  "retail-e-commerce-rebrand": {
    slug: "retail-e-commerce-rebrand",
    title: "Regional Retail E-Commerce Overhaul & PPC Strategy",
    category: "E-Commerce & Digital Marketing",
    client: "Regional Retailer, Coimbatore",
    metric: "+40% Premium Leads & Sales",
    challenge: "The client possessed a legacy storefront with high bounce rates, slow load speeds, and fragmented marketing campaigns.",
    solution: "Brand Craftsman engineered a bespoke Next.js e-commerce application paired with Search Pin performance marketing campaigns.",
    results: [
      "40% increase in premium leads within 3 months",
      "Sub-second page load times across all mobile devices",
      "Significant month-over-month sales uplift and higher LTV"
    ],
    techStack: ["Next.js", "TypeScript", "Tailwind CSS", "Search Pin PPC", "Google Ads"]
  },

  "manufacturing-b2b-lead-generation": {
    slug: "manufacturing-b2b-lead-generation",
    title: "Industrial Manufacturing B2B Digital Marketing Engine",
    category: "B2B Marketing & SEO",
    client: "Industrial Equipment Manufacturer",
    metric: "+55% B2B Qualified Leads",
    challenge: "High technical product complexity with low online visibility and insufficient qualified B2B inquiries.",
    solution: "Deployed Search Pin SEO architecture, technical content positioning, and precision Google B2B Search Ads.",
    results: [
      "55% growth in high-quality B2B leads over 6 months",
      "30% increase in lead-to-customer conversion rates",
      "#1 rankings for primary industrial equipment search queries"
    ],
    techStack: ["Technical SEO", "Google Search Ads", "Landing Page UX", "CRM Funnel"]
  },

  "local-service-provider-rebrand": {
    slug: "local-service-provider-rebrand",
    title: "Local Service Provider Identity Rebrand & PPC Launch",
    category: "Branding & Performance PPC",
    client: "Coimbatore Local Service Provider",
    metric: "3X Inquiries & 2X Revenue",
    challenge: "Outdated visual identity, lack of online trust signals, and inconsistent client acquisition.",
    solution: "Executed a total brand identity redesign and launched a hyper-local Google Ads PPC rollout.",
    results: [
      "Customer requests tripled within 4 months",
      "Service revenue doubled within 120 days",
      "Dominant local brand recognition across Coimbatore"
    ],
    techStack: ["Brand Identity", "Logo Redesign", "Local PPC Ads", "WhatsApp Automation"]
  }
};

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function PortfolioDetailPage({ params }: PageProps) {
  const resolvedParams = await params;
  const project = caseStudiesDatabase[resolvedParams.slug];

  if (!project) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white pt-24 pb-16 transition-colors duration-300">
      
      {/* Header */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto pt-10 pb-12">
        <a href="/portfolios" className="inline-flex items-center gap-2 text-sm font-general text-pink-500 mb-6 hover:underline">
          <FiArrowLeft /> Back to all case studies
        </a>

        <div className="flex items-center gap-4 text-xs font-general text-gray-500 mb-4">
          <span className="bg-pink-500/10 text-pink-600 dark:text-pink-400 px-3 py-1 rounded-full font-bold uppercase tracking-wider">
            {project.category}
          </span>
          <span className="font-zentry text-sm font-black text-emerald-500 flex items-center gap-1">
            <FiTrendingUp /> {project.metric}
          </span>
        </div>

        <h1 className="font-zentry text-3xl sm:text-5xl font-black uppercase tracking-tight leading-tight mb-4">
          {project.title}
        </h1>

        <p className="text-sm font-general text-gray-500">Client: {project.client}</p>
      </section>

      {/* Main Content */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto py-8 border-t border-gray-200 dark:border-zinc-800">
        <div className="space-y-8 font-robert-regular text-gray-700 dark:text-gray-300 text-base sm:text-lg leading-relaxed">
          
          <div className="bg-gray-50 dark:bg-zinc-900 p-6 rounded-2xl border border-gray-200 dark:border-zinc-800">
            <h2 className="font-zentry text-xl font-bold uppercase text-red-500 mb-2">The Challenge</h2>
            <p>{project.challenge}</p>
          </div>

          <div className="bg-gray-50 dark:bg-zinc-900 p-6 rounded-2xl border border-gray-200 dark:border-zinc-800">
            <h2 className="font-zentry text-xl font-bold uppercase text-blue-500 mb-2">Our Solution</h2>
            <p>{project.solution}</p>
          </div>

          <div className="bg-emerald-50 dark:bg-emerald-950/40 p-6 rounded-2xl border border-emerald-200 dark:border-emerald-800">
            <h2 className="font-zentry text-xl font-bold uppercase text-emerald-600 dark:text-emerald-400 mb-4 flex items-center gap-2">
              <FiZap /> Measurable Business Outcomes
            </h2>
            <ul className="space-y-3 font-general text-sm sm:text-base text-gray-800 dark:text-gray-200">
              {project.results.map((r, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <FiCheckCircle className="text-emerald-500 shrink-0 mt-0.5" />
                  <span>{r}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-zentry text-lg font-bold uppercase mb-3">Technologies & Services Deployed</h3>
            <div className="flex flex-wrap gap-2">
              {project.techStack.map((tech, idx) => (
                <span key={idx} className="px-3 py-1 bg-gray-100 dark:bg-zinc-800 text-xs font-general rounded-lg">
                  {tech}
                </span>
              ))}
            </div>
          </div>

        </div>
      </section>

      <Footer />
    </div>
  );
}
