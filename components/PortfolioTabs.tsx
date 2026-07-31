"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FiArrowRight } from 'react-icons/fi';

const portfolioProjects = [
  {
    slug: "premium-printing-products",
    title: "Premium Printing Materials Design",
    category: "Printing Products",
    client: "Corporate Agency",
    metric: "10k+ Prints",
    description: "Designed high-quality modern business cards, brochures, and flyers that elevate brand presence and feel.",
    image: "/img/portfolio_printing_1785511380254.png"
  },
  {
    slug: "sleek-brand-identity",
    title: "Sleek Hypercolor Brand Identity",
    category: "Branding Designs",
    client: "Tech Startup",
    metric: "Global Reach",
    description: "Created a full branding package including stationery, logos, and digital assets using a vibrant, hypercolor aesthetic.",
    image: "/img/portfolio_branding_1785511392412.png"
  },
  {
    slug: "modern-glassmorphism-website",
    title: "Glassmorphism SaaS Website",
    category: "Websites",
    client: "FinTech Enterprise",
    metric: "2X Engagement",
    description: "Developed a stunning modern website with a glassmorphism UI, focusing on speed, animations, and high conversions.",
    image: "/img/portfolio_website_1785511403920.png"
  },
  {
    slug: "dynamic-mobile-application",
    title: "Dynamic Fitness Tracking App",
    category: "Applications",
    client: "Health Brand",
    metric: "50k+ Downloads",
    description: "Designed and developed a sleek, modern UI/UX mobile application for a health and fitness brand, maximizing user retention.",
    image: "/img/portfolio_application_1785511415543.png"
  },
  {
    slug: "creative-printing-mockups",
    title: "Creative Merchandise Mockups",
    category: "Printing Mockups",
    client: "Lifestyle Brand",
    metric: "High Fidelity",
    description: "Presented premium apparel and packaging designs using modern, realistic mockups to showcase the final product quality.",
    image: "/img/portfolio_mockups_1785511434346.png"
  }
];

const categories = ["All", "Printing Products", "Branding Designs", "Websites", "Applications", "Printing Mockups"];

const PortfolioTabs = () => {
  const [activeTab, setActiveTab] = useState("All");

  const filteredProjects = activeTab === "All"
    ? portfolioProjects
    : portfolioProjects.filter(p => p.category === activeTab);

  return (
    <section className="py-24 md:py-32 bg-slate-50 dark:bg-[#07011F] overflow-hidden border-t border-b border-white/10">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-blue-500/10 border border-blue-400/30 text-blue-500 dark:text-cyan-400 font-general text-xs uppercase tracking-widest font-bold mb-4">
            OUR WORK
          </span>
          <h2 className="font-zentry text-4xl sm:text-5xl md:text-6xl font-black uppercase text-slate-900 dark:text-white leading-tight">
            Creative Portfolio
          </h2>
          <p className="font-robert-medium text-slate-600 dark:text-zinc-300 mt-6 text-lg">
            Showcasing our latest projects across branding, web design, and digital experiences.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveTab(cat)}
              className={`px-6 py-2.5 rounded-full font-general text-xs md:text-sm font-bold uppercase tracking-wider transition-all duration-300 ${
                activeTab === cat
                  ? "bg-gradient-to-r from-blue-600 to-orange-600 text-white shadow-lg scale-105"
                  : "bg-white dark:bg-[#0F0927] text-slate-700 dark:text-zinc-300 border border-slate-200 dark:border-white/10 hover:border-blue-500/50"
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
              className="group relative rounded-3xl overflow-hidden bg-white dark:bg-[#0F0927] border border-slate-200 dark:border-white/10 shadow-md hover:shadow-2xl hover:border-orange-500/50 transition-all duration-500 transform hover:-translate-y-2 flex flex-col"
            >
              {project.image ? (
                <div className="relative w-full h-64 overflow-hidden bg-slate-100 dark:bg-black">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-60" />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-black/60 backdrop-blur-md text-white text-xs font-bold uppercase tracking-widest rounded-full border border-white/20">
                      {project.category}
                    </span>
                  </div>
                </div>
              ) : (
                <div className="w-full h-64 bg-gradient-to-br from-slate-200 to-slate-100 dark:from-[#1A103C] dark:to-[#0F0927] flex items-center justify-center p-8 text-center">
                   <h3 className="font-zentry text-3xl font-black uppercase text-slate-800 dark:text-white/30">
                     {project.client}
                   </h3>
                </div>
              )}
              
              <div className="p-6 sm:p-8 flex-1 flex flex-col">
                <h3 className="font-zentry text-2xl sm:text-3xl font-bold uppercase text-slate-900 dark:text-white mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-500 group-hover:to-orange-500 transition-colors duration-300">
                  {project.title}
                </h3>
                <p className="font-robert-regular text-slate-600 dark:text-zinc-400 text-sm leading-relaxed mb-6 flex-1">
                  {project.description}
                </p>
                
                <div className="flex items-center justify-between mt-auto pt-6 border-t border-slate-100 dark:border-white/10">
                  <div className="flex flex-col">
                    <span className="text-xs font-general uppercase tracking-widest text-slate-400 dark:text-zinc-500">Metric</span>
                    <span className="font-bold text-orange-600 dark:text-orange-400">{project.metric}</span>
                  </div>
                  <Link href={`/portfolios/${project.slug}`} className="w-10 h-10 rounded-full bg-slate-100 dark:bg-white/5 flex items-center justify-center group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-orange-600 transition-all duration-300">
                    <FiArrowRight className="text-slate-900 dark:text-white group-hover:text-white group-hover:-rotate-45 transition-transform duration-300" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <Link href="/portfolios" className="btn-genz group">
            <span>View All Portfolios</span>
            <FiArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform duration-300" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default PortfolioTabs;
