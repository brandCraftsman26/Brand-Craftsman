"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  FiTrendingUp,
  FiArrowRight,
  FiMonitor,
  FiSmartphone,
  FiExternalLink,
  FiSearch,
  FiGlobe
} from "react-icons/fi";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PORTFOLIO_WEBSITES, PortfolioWebsite, PORTFOLIO_CATEGORIES } from "@/lib/portfolio-data";
import LiveDevicePreviewModal from "@/components/LiveDevicePreviewModal";

gsap.registerPlugin(ScrollTrigger);

export default function PortfolioContent({
  projects = PORTFOLIO_WEBSITES,
}: {
  projects?: PortfolioWebsite[];
}) {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [modalProject, setModalProject] = useState<PortfolioWebsite | null>(null);
  const [modalMode, setModalMode] = useState<"desktop" | "mobile">("desktop");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const container = useRef<HTMLDivElement>(null);

  const openPreview = (project: PortfolioWebsite, mode: "desktop" | "mobile", e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    setModalProject(project);
    setModalMode(mode);
    setIsModalOpen(true);
  };

  const filteredProjects = projects.filter((p) => {
    const matchesCategory =
      activeCategory === "All" ||
      p.category.toLowerCase().includes(activeCategory.toLowerCase());

    const matchesSearch =
      !searchQuery ||
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.domain.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.client.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.industry.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.techStack.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesCategory && matchesSearch;
  });

  useGSAP(
    () => {
      gsap.fromTo(
        ".portfolio-card",
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          stagger: 0.05,
          ease: "power2.out",
        }
      );
    },
    { scope: container, dependencies: [activeCategory, searchQuery] }
  );

  return (
    <div className="space-y-10">
      {/* Search and Category Filter Bar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 max-w-7xl mx-auto">
        {/* Category Pills */}
        <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
          {PORTFOLIO_CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full font-general text-xs uppercase tracking-wider font-bold transition-all duration-300 cursor-pointer ${
                activeCategory === cat
                  ? "bg-gradient-to-r from-violet-600 via-indigo-600 to-cyan-500 text-white shadow-lg shadow-indigo-500/30 scale-105"
                  : "bg-gray-100 dark:bg-zinc-900 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-zinc-800 border border-gray-200 dark:border-zinc-800"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-72">
          <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search websites or domain..."
            className="w-full pl-10 pr-4 py-2 rounded-2xl bg-gray-50 dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:border-indigo-500 transition-colors"
          />
        </div>
      </div>

      {/* Projects Grid */}
      <div ref={container} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProjects.map((project, idx) => {
          const targetUrl = project.url.startsWith("http")
            ? project.url
            : `https://${project.domain}`;

          return (
            <div
              key={idx}
              className="portfolio-card group rounded-3xl bg-white dark:bg-zinc-900/90 border border-gray-200 dark:border-zinc-800 hover:border-violet-500 dark:hover:border-cyan-400 hover:shadow-2xl hover:shadow-indigo-500/10 transition-all duration-500 flex flex-col overflow-hidden shadow-sm"
            >
              {/* Image Preview & Device Trigger Container */}
              <div className="w-full h-64 relative overflow-hidden bg-zinc-950">
                <Image
                  src={project.image || "/img/portfolio_website_1785511403920.png"}
                  alt={`${project.title} - Web Design & Branding Portfolio`}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700 brightness-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-75 group-hover:opacity-60 transition-opacity" />

                {/* Category & Domain Badges */}
                <div className="absolute top-4 left-4 right-4 z-10 flex items-center justify-between">
                  <span className="bg-gradient-to-r from-violet-600 via-indigo-600 to-cyan-500 text-white px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider shadow-md">
                    {project.category}
                  </span>
                  <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-900/90 backdrop-blur-md border border-slate-700 text-cyan-300 text-[11px] font-mono font-semibold">
                    <FiGlobe className="w-3 h-3 text-cyan-400" />
                    {project.domain}
                  </span>
                </div>

                {/* Hover Live Preview Overlay Overlay */}
                <div className="absolute inset-0 z-20 flex flex-col items-center justify-center gap-3 bg-black/60 backdrop-blur-xs opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <p className="text-xs font-bold text-white uppercase tracking-wider font-general">
                    Live Iframe Preview
                  </p>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={(e) => openPreview(project, "desktop", e)}
                      className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold uppercase tracking-wider shadow-lg transition-transform hover:scale-105 cursor-pointer"
                    >
                      <FiMonitor className="w-3.5 h-3.5" /> Desktop
                    </button>
                    <button
                      onClick={(e) => openPreview(project, "mobile", e)}
                      className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-pink-600 hover:bg-pink-500 text-white text-xs font-bold uppercase tracking-wider shadow-lg transition-transform hover:scale-105 cursor-pointer"
                    >
                      <FiSmartphone className="w-3.5 h-3.5" /> Mobile
                    </button>
                  </div>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 flex flex-col flex-1 justify-between bg-white dark:bg-zinc-900">
                <div>
                  <div className="flex items-center justify-between text-xs font-general mb-3">
                    <span className="text-gray-500 dark:text-gray-400 font-medium">
                      Client: {project.client}
                    </span>
                    {project.metric && (
                      <span className="font-zentry text-xs font-black text-emerald-600 dark:text-emerald-400 flex items-center gap-1 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20">
                        <FiTrendingUp /> {project.metric}
                      </span>
                    )}
                  </div>

                  <h2 className="font-zentry text-lg font-black uppercase text-slate-900 dark:text-white mb-2 group-hover:text-violet-600 dark:group-hover:text-cyan-400 transition-colors leading-snug">
                    {project.title}
                  </h2>

                  <p className="font-robert-regular text-gray-700 dark:text-gray-300 text-sm leading-relaxed mb-4 line-clamp-3 font-medium">
                    {project.description}
                  </p>

                  {/* Tech Stack Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {project.techStack.slice(0, 3).map((tag, tIdx) => (
                      <span
                        key={tIdx}
                        className="px-2 py-0.5 rounded-md bg-gray-100 dark:bg-zinc-800 text-[10px] font-semibold text-gray-600 dark:text-gray-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Bottom Actions Row */}
                <div className="pt-4 border-t border-gray-100 dark:border-zinc-800 flex items-center justify-between mt-auto">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={(e) => openPreview(project, "desktop", e)}
                      className="p-1.5 rounded-lg text-slate-500 hover:text-blue-600 hover:bg-blue-500/10 transition-colors cursor-pointer"
                      title="Preview in Desktop Iframe"
                    >
                      <FiMonitor className="w-4 h-4" />
                    </button>
                    <button
                      onClick={(e) => openPreview(project, "mobile", e)}
                      className="p-1.5 rounded-lg text-slate-500 hover:text-pink-600 hover:bg-pink-500/10 transition-colors cursor-pointer"
                      title="Preview in Mobile Iframe"
                    >
                      <FiSmartphone className="w-4 h-4" />
                    </button>
                  </div>

                  <a
                    href={targetUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-general uppercase tracking-wider text-blue-600 dark:text-orange-400 font-bold group-hover:translate-x-1 transition-transform flex items-center gap-1 hover:underline"
                  >
                    <span>Visit Live</span>
                    <FiExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Live Device Preview Modal */}
      <LiveDevicePreviewModal
        project={modalProject}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        initialMode={modalMode}
      />
    </div>
  );
}
