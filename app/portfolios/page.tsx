import React from "react";
import Footer from "@/components/Footer";
import { FiBriefcase } from "react-icons/fi";
import PortfolioContent from "./PortfolioContent";
import LivePortfolioShowcase from "@/components/LivePortfolioShowcase";
import { PORTFOLIO_WEBSITES } from "@/lib/portfolio-data";
import FloatingGeometry from "@/components/3d/FloatingGeometry";

export const metadata = {
  title: "Portfolios & Case Studies | Brand Craftsman - Web Design Company in Coimbatore",
  description: "Explore our client web portfolios across e-commerce, manufacturing, technology, and institutions with live desktop and mobile iframe previews.",
};

export default function PortfoliosPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white pt-24 pb-16 transition-colors duration-300">
      {/* Portfolio Hero Header with 3D Scene */}
      <section className="relative px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto pt-10 pb-16 text-center overflow-hidden">
        <FloatingGeometry scene="hero" className="opacity-50 dark:opacity-75" />

        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 rounded-full bg-pink-500/10 text-pink-600 dark:text-pink-400 font-general text-xs uppercase tracking-widest border border-pink-500/20 backdrop-blur-md">
            <FiBriefcase /> 22+ Live Client Platforms
          </div>

          <h1 className="font-zentry text-4xl sm:text-6xl lg:text-7xl font-black uppercase tracking-wide leading-[1.08] mb-6">
            Our Web Development Portfolios
          </h1>

          <p className="font-robert-regular text-lg sm:text-xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            We don&apos;t just design static mockups — we engineer high-performance, conversion-focused digital platforms. Test our client applications live in both desktop and mobile viewports.
          </p>
        </div>
      </section>

      {/* Interactive Live Device Showcase Section */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto pb-16">
        <LivePortfolioShowcase />
      </section>

      {/* All Client Portfolios Grid */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto py-8">
        <div className="mb-8">
          <h2 className="font-zentry text-3xl sm:text-4xl font-black uppercase tracking-wide mb-2">
            All Development Projects ({PORTFOLIO_WEBSITES.length})
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            Click on any project to preview in live desktop or mobile iframe, or launch directly in a separate window.
          </p>
        </div>

        <PortfolioContent projects={PORTFOLIO_WEBSITES} />
      </section>

      <Footer />
    </div>
  );
}
