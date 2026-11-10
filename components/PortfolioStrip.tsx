"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { PORTFOLIO_WEBSITES, PortfolioWebsite } from "@/lib/portfolio-data";
import {
  FiExternalLink,
  FiMonitor,
  FiSmartphone,
  FiArrowRight,
  FiX,
  FiChevronLeft,
  FiChevronRight,
  FiMaximize2,
} from "react-icons/fi";
import TiltCard3D from "@/components/3d/TiltCard3D";

/* ─────────────── Portfolio Card ─────────────── */

function PortfolioCard({
  site,
  onPreview,
}: {
  site: PortfolioWebsite;
  onPreview: (site: PortfolioWebsite) => void;
}) {
  return (
    <TiltCard3D
      tiltIntensity={10}
      className="flex-shrink-0 w-[320px] sm:w-[340px] rounded-3xl cursor-pointer"
    >
      <div className="h-full p-1 rounded-3xl bg-gradient-to-br from-violet-500/30 via-transparent to-cyan-500/30">
        <div className="h-full p-5 rounded-[22px] bg-zinc-900/95 backdrop-blur-xl border border-zinc-800/80 flex flex-col">
          {/* Preview Thumbnail */}
          <div className="relative w-full h-[180px] rounded-2xl overflow-hidden bg-zinc-950 border border-zinc-800 mb-4 group">
            <iframe
              src={site.url}
              title={site.title}
              className="w-[1280px] h-[720px] border-0 pointer-events-none select-none"
              style={{
                transform: "scale(0.25)",
                transformOrigin: "top left",
              }}
              sandbox="allow-scripts allow-same-origin"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/80 via-transparent to-transparent" />

            {/* Hover Overlay */}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/40 backdrop-blur-sm">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onPreview(site);
                }}
                className="px-4 py-2 rounded-xl bg-white/10 border border-white/20 text-white text-xs font-bold uppercase tracking-wider flex items-center gap-2 hover:bg-white/20 transition-colors cursor-pointer"
              >
                <FiMaximize2 className="w-3.5 h-3.5" /> Live Preview
              </button>
            </div>
          </div>

          {/* Info */}
          <div className="flex-1 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-violet-500/15 text-violet-400 border border-violet-500/20">
                  {site.industry}
                </span>
                <span className="text-[10px] font-bold text-emerald-400">
                  {site.metric}
                </span>
              </div>
              <h3 className="font-zentry text-base font-bold uppercase text-white mb-1 leading-tight line-clamp-1">
                {site.client}
              </h3>
              <p className="text-[11px] text-zinc-400 leading-relaxed line-clamp-2 mb-3">
                {site.description}
              </p>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-zinc-800/80">
              <a
                href={site.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[11px] text-cyan-400 font-semibold flex items-center gap-1 hover:underline"
              >
                {site.domain} <FiExternalLink className="w-3 h-3" />
              </a>
              <button
                onClick={() => onPreview(site)}
                className="text-[11px] text-violet-400 font-bold flex items-center gap-1 hover:text-violet-300 transition-colors cursor-pointer"
              >
                Preview <FiArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </TiltCard3D>
  );
}

/* ─────────────── Preview Modal ─────────────── */

function PreviewModal({
  site,
  onClose,
}: {
  site: PortfolioWebsite;
  onClose: () => void;
}) {
  const [device, setDevice] = useState<"desktop" | "mobile">("desktop");
  const [iframeKey, setIframeKey] = useState(0);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-lg animate-in fade-in duration-200">
      <div className="w-full max-w-6xl h-[85vh] rounded-3xl bg-zinc-900 border border-zinc-800 shadow-2xl flex flex-col overflow-hidden">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-800 flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="flex gap-1.5">
              <button onClick={onClose} className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-400 transition-colors cursor-pointer" />
              <div className="w-3 h-3 rounded-full bg-yellow-500" />
              <div className="w-3 h-3 rounded-full bg-green-500" />
            </div>
            <div className="ml-3">
              <p className="text-white text-sm font-bold">{site.client}</p>
              <p className="text-zinc-500 text-[11px]">{site.domain}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Device Toggle */}
            <div className="flex items-center gap-1 p-1 bg-zinc-950 rounded-xl border border-zinc-800">
              <button
                onClick={() => { setDevice("desktop"); setIframeKey(k => k + 1); }}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                  device === "desktop"
                    ? "bg-violet-600 text-white shadow-lg"
                    : "text-zinc-400 hover:text-white"
                }`}
              >
                <FiMonitor className="w-3.5 h-3.5 inline mr-1" /> Desktop
              </button>
              <button
                onClick={() => { setDevice("mobile"); setIframeKey(k => k + 1); }}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                  device === "mobile"
                    ? "bg-pink-600 text-white shadow-lg"
                    : "text-zinc-400 hover:text-white"
                }`}
              >
                <FiSmartphone className="w-3.5 h-3.5 inline mr-1" /> Mobile
              </button>
            </div>

            <a
              href={site.url}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1.5 rounded-lg bg-zinc-800 text-white text-xs font-bold hover:bg-zinc-700 transition-colors flex items-center gap-1"
            >
              <FiExternalLink className="w-3.5 h-3.5" /> Open
            </a>

            <button
              onClick={onClose}
              className="p-2 rounded-xl text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors cursor-pointer"
            >
              <FiX className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Iframe Container */}
        <div className="flex-1 flex items-center justify-center p-4 bg-zinc-950/50 overflow-hidden">
          <div
            className={`bg-white rounded-2xl overflow-hidden shadow-2xl transition-all duration-500 ${
              device === "desktop"
                ? "w-full h-full"
                : "w-[390px] h-[calc(100%-2rem)] border-[8px] border-zinc-700 rounded-[40px]"
            }`}
          >
            <iframe
              key={iframeKey}
              src={site.url}
              title={site.title}
              className="w-full h-full border-0"
              sandbox="allow-scripts allow-same-origin allow-popups"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─────────────── Main Portfolio Strip Component ─────────────── */

interface PortfolioStripProps {
  title?: string;
  subtitle?: string;
  maxItems?: number;
  showViewAll?: boolean;
  variant?: "dark" | "light";
  className?: string;
}

export default function PortfolioStrip({
  title = "Our Live Portfolios",
  subtitle = "Explore real client websites crafted by Brand Craftsman — live in both desktop and mobile.",
  maxItems = 8,
  showViewAll = true,
  variant = "dark",
  className = "",
}: PortfolioStripProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [previewSite, setPreviewSite] = useState<PortfolioWebsite | null>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const items = PORTFOLIO_WEBSITES.slice(0, maxItems);

  const checkScrollBounds = () => {
    if (!scrollRef.current) return;
    const el = scrollRef.current;
    setCanScrollLeft(el.scrollLeft > 10);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 10);
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (el) {
      el.addEventListener("scroll", checkScrollBounds, { passive: true });
      checkScrollBounds();
      return () => el.removeEventListener("scroll", checkScrollBounds);
    }
  }, []);

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const scrollAmount = 370;
    scrollRef.current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  const isDark = variant === "dark";
  const bgClass = isDark
    ? "bg-zinc-950/80 border-t border-b border-zinc-900"
    : "bg-zinc-50/80 dark:bg-zinc-950/80 border-t border-b border-zinc-200 dark:border-zinc-900";

  return (
    <section className={`relative py-16 overflow-hidden ${bgClass} ${className}`}>
      {/* Section Header */}
      <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mb-10">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
          <div>
            <h2
              className={`font-zentry text-3xl sm:text-4xl font-black uppercase tracking-wide mb-2 ${
                isDark ? "text-white" : "text-zinc-900 dark:text-white"
              }`}
            >
              {title}
            </h2>
            <p
              className={`text-sm max-w-xl ${
                isDark ? "text-zinc-400" : "text-zinc-600 dark:text-zinc-400"
              }`}
            >
              {subtitle}
            </p>
          </div>

          <div className="flex items-center gap-3">
            {/* Scroll Arrows */}
            <button
              onClick={() => scroll("left")}
              disabled={!canScrollLeft}
              className="w-10 h-10 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white flex items-center justify-center transition-all disabled:opacity-30 cursor-pointer"
            >
              <FiChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => scroll("right")}
              disabled={!canScrollRight}
              className="w-10 h-10 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white flex items-center justify-center transition-all disabled:opacity-30 cursor-pointer"
            >
              <FiChevronRight className="w-5 h-5" />
            </button>

            {showViewAll && (
              <Link
                href="/portfolios"
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-all shadow-lg shadow-violet-500/20"
              >
                View All ({PORTFOLIO_WEBSITES.length}) <FiArrowRight className="w-3.5 h-3.5" />
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Horizontal Scroll Strip */}
      <div
        ref={scrollRef}
        className="flex gap-5 px-4 sm:px-6 lg:px-8 overflow-x-auto scroll-smooth scrollbar-hide pb-4"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {items.map((site) => (
          <PortfolioCard
            key={site.slug}
            site={site}
            onPreview={setPreviewSite}
          />
        ))}

        {/* View All Teaser Card */}
        {showViewAll && (
          <Link
            href="/portfolios"
            className="flex-shrink-0 w-[200px] rounded-3xl p-1 bg-gradient-to-br from-violet-500/20 to-cyan-500/20"
          >
            <div className="h-full rounded-[22px] bg-zinc-900/95 border border-zinc-800/80 flex flex-col items-center justify-center p-6 text-center hover:bg-zinc-800/95 transition-colors">
              <div className="w-14 h-14 rounded-2xl bg-violet-500/20 text-violet-400 flex items-center justify-center mb-4">
                <FiArrowRight className="w-6 h-6" />
              </div>
              <p className="font-zentry text-lg font-bold uppercase text-white mb-1">
                View All
              </p>
              <p className="text-xs text-zinc-400">
                {PORTFOLIO_WEBSITES.length} Projects
              </p>
            </div>
          </Link>
        )}
      </div>

      {/* Preview Modal */}
      {previewSite && (
        <PreviewModal site={previewSite} onClose={() => setPreviewSite(null)} />
      )}
    </section>
  );
}
