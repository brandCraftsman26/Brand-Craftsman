"use client";

import React from "react";
import Footer from "@/components/Footer";
import Link from "next/link";
import dynamic from "next/dynamic";
import {
  FiZap,
  FiTrendingUp,
  FiShield,
  FiSmartphone,
  FiLayers,
  FiCpu,
  FiArrowRight,
  FiCheckCircle,
} from "react-icons/fi";
import TiltCard3D from "@/components/3d/TiltCard3D";

const FloatingGeometry = dynamic(() => import("@/components/3d/FloatingGeometry"), { ssr: false });
const PortfolioStrip = dynamic(() => import("@/components/PortfolioStrip"), { ssr: false });

const coreFeatures = [
  {
    icon: <FiZap className="w-6 h-6 text-amber-500" />,
    tag: "Performance",
    title: "Sub-Second Next.js Rendering",
    description: "Built on modern Next.js server components, edge routing, and optimized asset pipelines that score 95+ on Google Lighthouse and load in under 800 milliseconds.",
    highlights: ["Server-Side Rendering (SSR)", "Automatic Image Optimization", "Zero Layout Shift (CLS < 0.1)"],
  },
  {
    icon: <FiTrendingUp className="w-6 h-6 text-emerald-500" />,
    tag: "Search Pin SEO",
    title: "Algorithmic Search Dominance",
    description: "Deep structural alignment with Google core ranking algorithms and Search Pin local index pipelines to deliver predictable, compounding organic customer acquisition.",
    highlights: ["JSON-LD Schema Markup", "Canonical Hierarchy", "Core Web Vitals Perfection"],
  },
  {
    icon: <FiSmartphone className="w-6 h-6 text-cyan-500" />,
    tag: "Responsive UX",
    title: "Fluid Multi-Device Layouts",
    description: "Interfaces crafted specifically for mobile touch ergonomically and high-resolution desktop viewports with fluid micro-interactions and GSAP animations.",
    highlights: ["Thumb-Zone Navigation", "Native Touch Gestures", "Adaptive Breakpoint Geometry"],
  },
  {
    icon: <FiShield className="w-6 h-6 text-indigo-500" />,
    tag: "Security",
    title: "Enterprise Hardened Architecture",
    description: "Static file generation and stateless edge endpoints eliminate typical WordPress database injection surfaces, safeguarding user data and uptime.",
    highlights: ["SSL / TLS Encryption", "DDoS Mitigation", "Strict Content Security Policies"],
  },
  {
    icon: <FiCpu className="w-6 h-6 text-purple-500" />,
    tag: "Integrations",
    title: "Seamless API & CRM Workhooks",
    description: "Effortlessly connect payment gateways (Razorpay, Stripe), WhatsApp APIs, automated email workflows, and custom enterprise databases.",
    highlights: ["Custom REST & GraphQL Endpoints", "WhatsApp Business Webhooks", "Automated Lead Routing"],
  },
  {
    icon: <FiLayers className="w-6 h-6 text-rose-500" />,
    tag: "Content Engine",
    title: "Intuitive Content Management",
    description: "Empower your marketing team to publish blogs, update service offerings, and showcase new portfolio projects effortlessly without touching code.",
    highlights: ["Structured Editorial Workflows", "Instant Static Regeneration", "Media Asset Library"],
  },
];

export default function FeaturesPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white pt-24 pb-0 transition-colors duration-300">
      {/* Hero with 3D Canvas */}
      <section className="relative px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto pt-10 pb-16 text-center overflow-hidden">
        <FloatingGeometry scene="features" className="opacity-50 dark:opacity-75" />

        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 font-general text-xs uppercase tracking-widest border border-indigo-500/20 backdrop-blur-md">
            <FiCpu /> Platform Capabilities
          </div>

          <h1 className="font-zentry text-4xl sm:text-6xl lg:text-7xl font-black uppercase tracking-wide leading-[1.08] mb-6">
            Engineered For Speed, Scale & Revenue
          </h1>

          <p className="font-robert-regular text-lg sm:text-xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed mb-8">
            Discover the architectural standards that differentiate Brand Craftsman websites from generic templates. Every line of code is optimized for maximum conversions.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/contact"
              className="px-8 py-3.5 rounded-full bg-violet-600 hover:bg-violet-700 text-white font-semibold text-sm transition-all duration-300 shadow-lg shadow-violet-500/25 flex items-center gap-2"
            >
              Build With These Features <FiArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/portfolios"
              className="px-8 py-3.5 rounded-full bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-900 dark:hover:bg-zinc-800 text-zinc-900 dark:text-zinc-100 font-semibold text-sm border border-zinc-200 dark:border-zinc-800 transition-all duration-300"
            >
              Inspect Live Demos
            </Link>
          </div>
        </div>
      </section>

      {/* Grid of 6 Core Features with 3D Tilt */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto py-12 border-t border-zinc-100 dark:border-zinc-900">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {coreFeatures.map((feat, idx) => (
            <TiltCard3D key={idx} tiltIntensity={12} className="h-full rounded-3xl">
              <div className="p-8 h-full rounded-3xl bg-zinc-50/80 dark:bg-zinc-900/60 backdrop-blur-md border border-zinc-200 dark:border-zinc-800 hover:border-violet-500/50 transition-all duration-300 group flex flex-col justify-between hover:shadow-2xl">
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center group-hover:scale-110 transition-transform">
                      {feat.icon}
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-zinc-200/60 dark:bg-zinc-800 text-gray-700 dark:text-gray-300">
                      {feat.tag}
                    </span>
                  </div>

                  <h3 className="font-zentry text-2xl font-bold uppercase mb-3 text-gray-900 dark:text-white">
                    {feat.title}
                  </h3>

                  <p className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm leading-relaxed mb-6 font-robert-regular">
                    {feat.description}
                  </p>
                </div>

                <div className="space-y-2 border-t border-zinc-200/60 dark:border-zinc-800/60 pt-4">
                  {feat.highlights.map((h, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-300">
                      <FiCheckCircle className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>
            </TiltCard3D>
          ))}
        </div>
      </section>

      {/* Live Client Portfolios Showcase */}
      <PortfolioStrip
        title="Production Platforms Powered by Our Features"
        subtitle="Explore the live websites running on Brand Craftsman's modern architecture."
        maxItems={8}
      />

      <Footer />
    </div>
  );
}
