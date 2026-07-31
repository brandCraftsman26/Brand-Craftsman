"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { FiTrendingUp, FiArrowRight, FiGrid } from "react-icons/fi";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface Project {
  slug: string;
  title: string;
  category: string;
  client: string;
  metric: string;
  description: string;
  image?: string;
}

const categories = ["All", "Websites", "Branding Designs", "Applications", "Printing Products", "Printing Mockups"];

export default function PortfolioContent({ projects }: { projects: Project[] }) {
  const [activeCategory, setActiveCategory] = useState("All");
  const container = useRef<HTMLDivElement>(null);

  const filteredProjects = activeCategory === "All"
    ? projects
    : projects.filter(p => p.category.toLowerCase().includes(activeCategory.toLowerCase()));

  useGSAP(() => {
    gsap.fromTo(
      ".portfolio-card",
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.6,
        stagger: 0.1,
        ease: "power2.out",
      }
    );
  }, { scope: container, dependencies: [activeCategory] });

  return (
    <div className="space-y-12">
      {/* Category Filter Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 max-w-4xl mx-auto">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-5 py-2.5 rounded-full font-general text-xs uppercase tracking-wider font-bold transition-all duration-300 ${
              activeCategory === cat
                ? "bg-gradient-to-r from-blue-600 via-indigo-600 to-orange-600 text-white shadow-lg shadow-indigo-500/30 scale-105"
                : "bg-gray-100 dark:bg-zinc-900 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-zinc-800 border border-gray-200 dark:border-zinc-800"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Projects Grid */}
      <div ref={container} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProjects.map((project, idx) => (
          <Link
            key={idx}
            href={`/portfolios/${project.slug}`}
            className="portfolio-card group rounded-3xl bg-white dark:bg-zinc-900/90 border border-gray-200 dark:border-zinc-800 hover:border-blue-500 dark:hover:border-orange-500 hover:shadow-2xl transition-all duration-500 flex flex-col overflow-hidden shadow-sm"
          >
            {/* Image Container */}
            <div className="w-full h-64 relative overflow-hidden bg-zinc-950">
              <Image
                src={project.image || "/img/portfolio_website_1785511403920.png"}
                alt={project.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700 brightness-105"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
              
              <div className="absolute top-4 left-4 z-10">
                <span className="bg-gradient-to-r from-blue-600 to-orange-600 text-white px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider shadow-md">
                  {project.category}
                </span>
              </div>
            </div>

            {/* Card Info */}
            <div className="p-6 flex flex-col flex-1 justify-between bg-white dark:bg-zinc-900">
              <div>
                <div className="flex items-center justify-between text-xs font-general mb-3">
                  <span className="text-gray-500 dark:text-gray-400 font-medium">Client: {project.client}</span>
                  {project.metric && (
                    <span className="font-zentry text-sm font-black text-emerald-600 dark:text-emerald-400 flex items-center gap-1 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20">
                      <FiTrendingUp /> {project.metric}
                    </span>
                  )}
                </div>

                <h2 className="font-zentry text-xl font-black uppercase text-slate-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-orange-400 transition-colors leading-snug">
                  {project.title}
                </h2>

                <p className="font-robert-regular text-gray-700 dark:text-gray-300 text-sm leading-relaxed mb-6 font-medium">
                  {project.description}
                </p>
              </div>

              <div className="pt-4 border-t border-gray-100 dark:border-zinc-800 flex items-center justify-between mt-auto">
                <span className="text-xs font-general uppercase tracking-wider text-blue-600 dark:text-orange-400 font-bold group-hover:translate-x-2 transition-transform flex items-center gap-1.5">
                  Explore Case Study <FiArrowRight />
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

