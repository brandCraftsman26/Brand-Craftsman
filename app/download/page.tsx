"use client";

import React, { useState } from "react";
import Footer from "@/components/Footer";
import Link from "next/link";
import dynamic from "next/dynamic";
import {
  FiDownloadCloud,
  FiFileText,
  FiCheckCircle,
  FiArrowRight,
  FiPackage,
  FiLayers,
} from "react-icons/fi";
import TiltCard3D from "@/components/3d/TiltCard3D";

const FloatingGeometry = dynamic(() => import("@/components/3d/FloatingGeometry"), { ssr: false });
const PortfolioStrip = dynamic(() => import("@/components/PortfolioStrip"), { ssr: false });

const resources = [
  {
    title: "Agency Capabilities Deck 2026",
    format: "PDF",
    size: "14.2 MB",
    description: "An exhaustive overview of Brand Craftsman's design systems, Next.js architecture, past case studies, and transparent pricing models.",
    tag: "Corporate Deck",
    downloadUrl: "#",
  },
  {
    title: "Search Pin SEO Dominance Playbook",
    format: "PDF",
    size: "8.6 MB",
    description: "Our proprietary framework for dominating local and national Google rankings through algorithmic SEO and Core Web Vitals optimization.",
    tag: "Strategy Guide",
    downloadUrl: "#",
  },
  {
    title: "Brand Craftsman Official Media Kit",
    format: "ZIP",
    size: "28.5 MB",
    description: "High-resolution vector marks, dark/light logos, typography guidelines, and official brand assets for press and partner publications.",
    tag: "Assets Kit",
    downloadUrl: "#",
  },
  {
    title: "Modern Web Architecture Blueprint",
    format: "PDF",
    size: "11.1 MB",
    description: "Technical whitepaper comparing traditional CMS bloat vs. Next.js edge performance, server actions, and sub-second conversion metrics.",
    tag: "Technical Whitepaper",
    downloadUrl: "#",
  },
];

export default function DownloadPage() {
  const [downloading, setDownloading] = useState<string | null>(null);
  const [downloaded, setDownloaded] = useState<string | null>(null);

  const handleDownload = (title: string) => {
    setDownloading(title);
    setTimeout(() => {
      setDownloading(null);
      setDownloaded(title);
      setTimeout(() => setDownloaded(null), 3500);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white pt-24 pb-0 transition-colors duration-300">
      {/* Hero with 3D Canvas */}
      <section className="relative px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto pt-10 pb-16 text-center overflow-hidden">
        <FloatingGeometry scene="download" className="opacity-50 dark:opacity-75" />

        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 rounded-full bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 font-general text-xs uppercase tracking-widest border border-cyan-500/20 backdrop-blur-md">
            <FiDownloadCloud /> Resource Center
          </div>

          <h1 className="font-zentry text-4xl sm:text-6xl lg:text-7xl font-black uppercase tracking-wide leading-[1.08] mb-6">
            Downloads & Agency Resources
          </h1>

          <p className="font-robert-regular text-lg sm:text-xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed mb-8">
            Access our latest capability presentations, technical blueprints, brand asset kits, and Search Pin SEO methodologies.
          </p>
        </div>
      </section>

      {/* Resource Cards Grid with 3D Tilt */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto py-12 border-t border-zinc-100 dark:border-zinc-900">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {resources.map((res, idx) => (
            <TiltCard3D key={idx} tiltIntensity={10} className="h-full rounded-3xl">
              <div className="p-8 h-full rounded-3xl bg-zinc-50/80 dark:bg-zinc-900/60 backdrop-blur-md border border-zinc-200 dark:border-zinc-800 flex flex-col justify-between hover:border-cyan-500/40 transition-all duration-300 group hover:shadow-2xl">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-cyan-500/10 text-cyan-600 dark:text-cyan-400">
                      {res.tag}
                    </span>
                    <span className="text-xs font-semibold text-gray-400 font-general">
                      {res.format} • {res.size}
                    </span>
                  </div>

                  <h3 className="font-zentry text-2xl font-bold uppercase mb-3 text-gray-900 dark:text-white">
                    {res.title}
                  </h3>

                  <p className="font-robert-regular text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
                    {res.description}
                  </p>
                </div>

                <div className="border-t border-zinc-200/80 dark:border-zinc-800/80 pt-4 flex items-center justify-between">
                  <button
                    onClick={() => handleDownload(res.title)}
                    disabled={downloading === res.title}
                    className="px-6 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-700 text-white text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-all duration-200 shadow-md shadow-violet-500/20 disabled:opacity-50 cursor-pointer"
                  >
                    <FiDownloadCloud className="w-4 h-4" />
                    <span>
                      {downloading === res.title
                        ? "Packaging File..."
                        : downloaded === res.title
                        ? "Download Started!"
                        : "Download Asset"}
                    </span>
                  </button>

                  {downloaded === res.title && (
                    <span className="text-xs text-emerald-500 font-semibold flex items-center gap-1">
                      <FiCheckCircle /> Verified
                    </span>
                  )}
                </div>
              </div>
            </TiltCard3D>
          ))}
        </div>
      </section>

      {/* Production Portfolios Ready For Inspection */}
      <PortfolioStrip
        title="Production Portfolios Ready For Inspection"
        subtitle="See our architectural blueprints brought to life in real client websites with live iframe previews."
        maxItems={8}
      />

      {/* Custom Briefing CTA */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto py-16 border-t border-zinc-100 dark:border-zinc-900">
        <div className="p-8 md:p-12 rounded-3xl bg-zinc-900 text-white border border-zinc-800 text-center max-w-3xl mx-auto space-y-4">
          <h2 className="font-zentry text-3xl font-black uppercase">Need A Tailored Executive Briefing?</h2>
          <p className="text-zinc-400 text-sm leading-relaxed font-robert-regular">
            If your leadership team requires a customized architecture proposal or competitive audit for your specific market, our senior strategist will prepare it for you.
          </p>
          <div className="pt-2">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-violet-600 hover:bg-violet-700 text-white font-semibold text-sm transition-all shadow-lg shadow-violet-500/25"
            >
              Request Custom Proposal <FiArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
