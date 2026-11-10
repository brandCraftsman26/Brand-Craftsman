"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FiArrowRight, FiGlobe, FiTrendingUp } from "react-icons/fi";
import { PORTFOLIO_WEBSITES, PORTFOLIO_CATEGORIES } from "@/lib/portfolio-data";

const PortfolioTabs = () => {
  const [activeTab, setActiveTab] = useState("All");

  const filteredProjects = activeTab === "All"
    ? PORTFOLIO_WEBSITES.slice(0, 9)
    : PORTFOLIO_WEBSITES.filter(p => p.category === activeTab).slice(0, 9);

  return (
    <section className="py-24 md:py-32 bg-slate-50 dark:bg-[#07011F] overflow-hidden border-t border-b border-white/10">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-blue-500/10 border border-blue-400/30 text-blue-500 dark:text-cyan-400 font-general text-xs uppercase tracking-widest font-bold mb-4">
            OUR CLIENT WORK
          </span>
          <h2 className="font-zentry text-4xl sm:text-5xl md:text-6xl font-black uppercase text-slate-900 dark:text-white leading-tight">
            Creative Web Portfolios
          </h2>
          <p className="font-robert-medium text-slate-600 dark:text-zinc-300 mt-6 text-lg">
            Explore 22+ active client platforms engineered for speed, conversion, and global brand authority.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {PORTFOLIO_CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveTab(cat)}
              className={`px-6 py-2.5 rounded-full font-general text-xs md:text-sm font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                activeTab === cat
                  ? "bg-gradient-to-r from-violet-600 via-indigo-600 to-cyan-500 text-white shadow-lg shadow-indigo-500/30 scale-105"
                  : "bg-white dark:bg-[#0F0927] text-slate-700 dark:text-zinc-300 border border-slate-200 dark:border-white/10 hover:border-violet-500/50"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Portfolio Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, idx) => (
            <div
              key={`${project.slug}-${idx}`}
              className="group relative rounded-3xl overflow-hidden bg-white dark:bg-[#0F0927] border border-slate-200 dark:border-white/10 shadow-md hover:shadow-2xl hover:border-violet-500/50 hover:shadow-indigo-500/20 transition-all duration-500 transform hover:-translate-y-2 flex flex-col"
            >
              <div className="relative w-full h-64 overflow-hidden bg-slate-100 dark:bg-black">
                <Image
                  src={project.image || "/img/portfolio_website_1785511403920.png"}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-60" />
                <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                  <span className="px-3 py-1 bg-black/60 backdrop-blur-md text-white text-[11px] font-bold uppercase tracking-widest rounded-full border border-white/20">
                    {project.category}
                  </span>
                  <span className="flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-slate-900/90 text-cyan-300 text-[10px] font-mono border border-cyan-500/30">
                    <FiGlobe className="w-3 h-3 text-cyan-400" />
                    {project.domain}
                  </span>
                </div>
              </div>

              <div className="p-6 sm:p-8 flex-1 flex flex-col">
                <div className="text-xs text-slate-400 mb-2 font-medium">
                  {project.client}
                </div>
                <h3 className="font-zentry text-xl sm:text-2xl font-bold uppercase text-slate-900 dark:text-white mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-violet-500 group-hover:to-cyan-400 transition-colors duration-300">
                  {project.title}
                </h3>
                <p className="font-robert-regular text-slate-600 dark:text-zinc-400 text-sm leading-relaxed mb-6 flex-1 line-clamp-3">
                  {project.description}
                </p>

                <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-100 dark:border-white/10">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full">
                    <FiTrendingUp /> {project.metric}
                  </div>
                  <Link
                    href={`/portfolios/${project.slug}`}
                    className="w-10 h-10 rounded-full bg-slate-100 dark:bg-white/5 flex items-center justify-center group-hover:bg-gradient-to-r group-hover:from-violet-600 group-hover:to-cyan-500 transition-all duration-300 cursor-pointer"
                    title="View Live Case Study & Preview"
                  >
                    <FiArrowRight className="text-slate-900 dark:text-white group-hover:text-white group-hover:-rotate-45 transition-transform duration-300" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <Link href="/portfolios" className="btn-genz group">
            <span>View All 22+ Web Portfolios (Live Iframe View)</span>
            <FiArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform duration-300" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default PortfolioTabs;
