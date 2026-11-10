"use client";

import React from "react";
import Footer from "@/components/Footer";
import Link from "next/link";
import dynamic from "next/dynamic";
import {
  FiBriefcase,
  FiArrowRight,
  FiCheckCircle,
  FiFeather,
  FiCode,
  FiTrendingUp,
} from "react-icons/fi";
import { SERVICES_DATA } from "@/lib/services-data";
import TiltCard3D from "@/components/3d/TiltCard3D";

const FloatingGeometry = dynamic(() => import("@/components/3d/FloatingGeometry"), { ssr: false });
const PortfolioStrip = dynamic(() => import("@/components/PortfolioStrip"), { ssr: false });

const categories = [
  {
    name: "Branding & Design",
    icon: <FiFeather className="w-5 h-5 text-violet-500" />,
    description: "Crafting iconic visual identities, memorable logos, and physical print collateral that command industry prestige.",
    color: "border-violet-500/20 bg-violet-500/5",
  },
  {
    name: "Development",
    icon: <FiCode className="w-5 h-5 text-cyan-500" />,
    description: "Engineering blazing-fast Next.js web applications, e-commerce stores, and native mobile apps designed to convert.",
    color: "border-cyan-500/20 bg-cyan-500/5",
  },
  {
    name: "Marketing",
    icon: <FiTrendingUp className="w-5 h-5 text-amber-500" />,
    description: "Data-driven Search Pin SEO, high-converting social campaigns, WhatsApp funnels, and corporate PR.",
    color: "border-amber-500/20 bg-amber-500/5",
  },
];

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white pt-24 pb-0 transition-colors duration-300">
      {/* Services Hero Header with 3D Scene */}
      <section className="relative px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto pt-10 pb-16 text-center overflow-hidden">
        <FloatingGeometry scene="services" className="opacity-50 dark:opacity-75" />

        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 rounded-full bg-violet-500/10 text-violet-600 dark:text-violet-400 font-general text-xs uppercase tracking-widest border border-violet-500/20 backdrop-blur-md">
            <FiBriefcase /> Full-Spectrum Digital Agency
          </div>

          <h1 className="font-zentry text-4xl sm:text-6xl lg:text-7xl font-black uppercase tracking-wide leading-[1.08] mb-6">
            Our Craft & Digital Services
          </h1>

          <p className="font-robert-regular text-lg sm:text-xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed mb-8">
            We combine bespoke visual branding, precision Next.js software engineering, and Search Pin algorithmic SEO dominance into a unified growth engine for ambitious enterprises.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/contact"
              className="px-8 py-3.5 rounded-full bg-violet-600 hover:bg-violet-700 text-white font-semibold text-sm transition-all duration-300 shadow-lg shadow-violet-500/25 flex items-center gap-2"
            >
              Start Your Project <FiArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/portfolios"
              className="px-8 py-3.5 rounded-full bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-900 dark:hover:bg-zinc-800 text-zinc-900 dark:text-zinc-100 font-semibold text-sm border border-zinc-200 dark:border-zinc-800 transition-all duration-300"
            >
              View Live Portfolios
            </Link>
          </div>
        </div>
      </section>

      {/* Categorized Services Grid with 3D Tilt Cards */}
      {categories.map((cat, idx) => {
        const catServices = SERVICES_DATA.filter((s) => s.category === cat.name);
        return (
          <section key={idx} className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto py-12 border-t border-zinc-100 dark:border-zinc-900">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center">
                  {cat.icon}
                </div>
                <div>
                  <h2 className="font-zentry text-2xl sm:text-3xl font-black uppercase tracking-wide text-gray-900 dark:text-white">
                    {cat.name}
                  </h2>
                  <p className="text-gray-500 dark:text-gray-400 text-xs sm:text-sm font-robert-regular">
                    {cat.description}
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {catServices.map((service) => (
                <TiltCard3D key={service.slug} tiltIntensity={10} className="h-full rounded-3xl">
                  <Link
                    href={`/services/${service.slug}`}
                    className="p-8 h-full rounded-3xl bg-zinc-50/70 dark:bg-zinc-900/60 backdrop-blur-md border border-zinc-200/80 dark:border-zinc-800/80 hover:border-violet-500/60 transition-all duration-300 group flex flex-col justify-between hover:shadow-2xl"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-4">
                        <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-violet-500/10 text-violet-600 dark:text-violet-400 border border-violet-500/20">
                          {service.badge}
                        </span>
                        <FiArrowRight className="w-4 h-4 text-gray-400 group-hover:text-violet-500 group-hover:translate-x-1 transition-all" />
                      </div>

                      <h3 className="font-zentry text-2xl font-bold uppercase mb-2 text-gray-900 dark:text-white group-hover:text-violet-500 transition-colors">
                        {service.name}
                      </h3>

                      <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-6 font-robert-regular">
                        {service.tagline}
                      </p>

                      <div className="space-y-2 border-t border-zinc-200/60 dark:border-zinc-800/60 pt-4 mb-6">
                        {service.deliverables.slice(0, 3).map((item, i) => (
                          <div key={i} className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                            <FiCheckCircle className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />
                            <span className="truncate">{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="pt-2">
                      <span className="text-xs font-bold text-violet-600 dark:text-violet-400 inline-flex items-center gap-1 group-hover:underline">
                        Explore Service Details <FiArrowRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </Link>
                </TiltCard3D>
              ))}
            </div>
          </section>
        );
      })}

      {/* Live Portfolios Showcase Strip */}
      <PortfolioStrip
        title="Live Client Platforms Built by Our Team"
        subtitle="Explore real production websites engineered for e-commerce, manufacturing, technology, and health."
        maxItems={8}
      />

      {/* Why Choose Us */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto py-20 border-t border-zinc-100 dark:border-zinc-900">
        <div className="p-8 md:p-14 rounded-3xl bg-gradient-to-br from-zinc-900 to-black text-white border border-zinc-800 shadow-2xl relative overflow-hidden">
          <div className="max-w-2xl relative z-10">
            <span className="text-xs font-bold text-cyan-400 uppercase tracking-widest font-general">
              Partner With Master Craftsmen
            </span>
            <h2 className="font-zentry text-3xl sm:text-5xl font-black uppercase tracking-wide mt-3 mb-6">
              Ready to Accelerate Your Digital Growth?
            </h2>
            <p className="text-zinc-300 text-sm sm:text-base leading-relaxed mb-8 font-robert-regular">
              Every project begins with a high-level strategic consultation. Tell us about your vision, and our architects will prepare a customized roadmap and transparent scope for your team.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/contact"
                className="px-8 py-3.5 rounded-full bg-gradient-to-r from-violet-600 to-cyan-500 hover:from-violet-500 hover:to-cyan-400 text-white font-semibold text-sm transition-all duration-300 shadow-lg flex items-center gap-2"
              >
                Schedule Free Consultation <FiArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
