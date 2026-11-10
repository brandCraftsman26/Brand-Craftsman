"use client";

import React, { useState } from "react";
import {
  PORTFOLIO_WEBSITES,
  PortfolioWebsite
} from "@/lib/portfolio-data";
import {
  FiMonitor,
  FiSmartphone,
  FiExternalLink,
  FiRotateCw,
  FiShield,
  FiCheckCircle,
  FiZap,
  FiArrowRight,
  FiLayers
} from "react-icons/fi";

export default function LivePortfolioShowcase() {
  const [selectedSite, setSelectedSite] = useState<PortfolioWebsite>(PORTFOLIO_WEBSITES[0]);
  const [deviceMode, setDeviceMode] = useState<"desktop" | "mobile">("desktop");
  const [iframeKey, setIframeKey] = useState(0);
  const [iframeLoading, setIframeLoading] = useState(false);

  const handleSelectSite = (site: PortfolioWebsite) => {
    setSelectedSite(site);
    setIframeLoading(true);
    setIframeKey((prev) => prev + 1);
  };

  const handleModeChange = (mode: "desktop" | "mobile") => {
    setDeviceMode(mode);
    setIframeLoading(true);
    setIframeKey((prev) => prev + 1);
  };

  const reloadIframe = () => {
    setIframeLoading(true);
    setIframeKey((prev) => prev + 1);
  };

  const targetUrl = selectedSite.url.startsWith("http")
    ? selectedSite.url
    : `https://${selectedSite.domain}`;

  return (
    <div className="w-full rounded-3xl bg-slate-900/90 border border-slate-800 shadow-2xl p-4 sm:p-6 lg:p-8 backdrop-blur-xl">
      {/* Header & Quick Selector */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 pb-6 border-b border-slate-800">
        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-gradient-to-r from-blue-500/10 to-indigo-500/10 border border-blue-500/20 text-blue-400 font-general text-xs uppercase tracking-widest font-semibold mb-2">
            <FiZap className="text-amber-400" /> Interactive Live Showcase
          </div>
          <h2 className="font-zentry text-2xl sm:text-3xl lg:text-4xl font-black uppercase text-white tracking-wide">
            Live Web Portfolios in Real-Time
          </h2>
          <p className="font-robert-regular text-slate-400 text-sm mt-1 max-w-xl">
            Test and interact with our client web applications live in both desktop and mobile viewports.
          </p>
        </div>

        {/* Viewport Mode Toggle */}
        <div className="flex items-center gap-2 p-1.5 bg-slate-950 border border-slate-800 rounded-2xl shrink-0">
          <button
            onClick={() => handleModeChange("desktop")}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer ${
              deviceMode === "desktop"
                ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-indigo-500/30"
                : "text-slate-400 hover:text-white hover:bg-slate-800"
            }`}
          >
            <FiMonitor className="w-4 h-4" />
            <span>Desktop View</span>
          </button>
          <button
            onClick={() => handleModeChange("mobile")}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer ${
              deviceMode === "mobile"
                ? "bg-gradient-to-r from-indigo-600 to-pink-600 text-white shadow-lg shadow-pink-500/30"
                : "text-slate-400 hover:text-white hover:bg-slate-800"
            }`}
          >
            <FiSmartphone className="w-4 h-4" />
            <span>Mobile View</span>
          </button>
        </div>
      </div>

      {/* Website Pills Bar */}
      <div className="py-4 overflow-x-auto no-scrollbar flex items-center gap-2">
        <span className="text-xs uppercase font-bold tracking-wider text-slate-500 shrink-0 mr-2 flex items-center gap-1">
          <FiLayers /> Websites:
        </span>
        {PORTFOLIO_WEBSITES.map((site) => {
          const isSelected = selectedSite.slug === site.slug;
          return (
            <button
              key={site.slug}
              onClick={() => handleSelectSite(site)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all duration-200 cursor-pointer ${
                isSelected
                  ? "bg-white text-slate-950 shadow-md scale-105 font-bold"
                  : "bg-slate-950/80 hover:bg-slate-800 text-slate-300 border border-slate-800 hover:border-slate-700"
              }`}
            >
              {site.domain}
            </button>
          );
        })}
      </div>

      {/* Main Interactive Viewer Frame */}
      <div className="mt-4 bg-slate-950 rounded-2xl border border-slate-800 p-2 sm:p-4 lg:p-6 overflow-hidden flex flex-col items-center">
        {/* Device Wrapper */}
        {deviceMode === "desktop" ? (
          // DESKTOP BROWSER FRAME
          <div className="w-full flex flex-col rounded-2xl border border-slate-800 bg-slate-900 shadow-2xl overflow-hidden transition-all duration-300">
            {/* Browser Header Bar */}
            <div className="flex items-center justify-between gap-4 px-4 py-3 bg-slate-950 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
              </div>

              {/* URL Address Bar */}
              <div className="flex-1 max-w-xl mx-auto flex items-center gap-2 px-3 py-1 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300">
                <FiShield className="text-emerald-400 w-3.5 h-3.5 shrink-0" />
                <span className="text-emerald-400 font-mono">https://</span>
                <span className="font-mono text-white truncate">{selectedSite.domain}</span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={reloadIframe}
                  className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
                  title="Reload Live View"
                >
                  <FiRotateCw className="w-3.5 h-3.5" />
                </button>
                <a
                  href={targetUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-xs text-indigo-400 hover:text-indigo-300 font-semibold px-2 py-1 rounded-lg hover:bg-indigo-500/10 transition-colors"
                >
                  <span className="hidden sm:inline">Launch Fullscreen</span>
                  <FiExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* Desktop Iframe Frame */}
            <div className="w-full h-[620px] bg-white relative overflow-hidden">
              {iframeLoading && (
                <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-slate-900/90 text-center p-6">
                  <div className="w-10 h-10 border-3 border-indigo-500 border-t-transparent rounded-full animate-spin mb-4" />
                  <p className="text-sm font-bold text-white uppercase tracking-wider font-general">
                    Loading {selectedSite.domain}...
                  </p>
                  <p className="text-xs text-slate-400 mt-1 max-w-sm">
                    Rendering desktop live web architecture.
                  </p>
                </div>
              )}

              <iframe
                key={`desktop-embed-${iframeKey}`}
                src={targetUrl}
                title={`${selectedSite.title} Desktop View`}
                onLoad={() => setIframeLoading(false)}
                className="w-full h-full border-0"
                sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              />
            </div>
          </div>
        ) : (
          // MOBILE SMARTPHONE FRAME
          <div className="py-4 flex flex-col items-center justify-center w-full">
            <div className="w-[375px] h-[720px] max-h-[85vh] bg-slate-900 rounded-[50px] p-3 shadow-[0_20px_70px_rgba(0,0,0,0.9)] border-4 border-slate-700 flex flex-col relative overflow-hidden ring-1 ring-slate-600/50">
              {/* Dynamic Island */}
              <div className="absolute top-4 left-1/2 -translate-x-1/2 w-28 h-5 bg-black rounded-full z-30 flex items-center justify-between px-3">
                <div className="w-2.5 h-2.5 rounded-full bg-slate-900 border border-slate-800" />
                <div className="w-2 h-2 rounded-full bg-emerald-500/80 animate-pulse" />
              </div>

              {/* Screen */}
              <div className="flex-1 w-full bg-white rounded-[38px] overflow-hidden flex flex-col relative pt-7">
                {/* Mobile Safari Bar */}
                <div className="flex items-center justify-between px-3 py-1.5 bg-slate-900 border-b border-slate-800 text-[10px] text-slate-300 select-none">
                  <div className="flex items-center gap-1 truncate max-w-[240px]">
                    <FiShield className="text-emerald-500 w-3 h-3 shrink-0" />
                    <span className="font-mono text-slate-200 truncate">{selectedSite.domain}</span>
                  </div>
                  <button
                    onClick={reloadIframe}
                    className="text-slate-400 hover:text-white"
                    title="Reload"
                  >
                    <FiRotateCw className="w-3 h-3" />
                  </button>
                </div>

                {/* Mobile Iframe */}
                <div className="flex-1 relative overflow-hidden bg-white">
                  {iframeLoading && (
                    <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-slate-900 text-center p-4">
                      <div className="w-8 h-8 border-2 border-pink-500 border-t-transparent rounded-full animate-spin mb-3" />
                      <p className="text-xs font-semibold text-white">Rendering Mobile View...</p>
                      <p className="text-[10px] text-slate-400 mt-1">{selectedSite.domain}</p>
                    </div>
                  )}

                  <iframe
                    key={`mobile-embed-${iframeKey}`}
                    src={targetUrl}
                    title={`${selectedSite.title} Mobile View`}
                    onLoad={() => setIframeLoading(false)}
                    className="w-full h-full border-0"
                    sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  />
                </div>

                {/* Home Indicator */}
                <div className="h-4 bg-slate-900 flex items-center justify-center">
                  <div className="w-24 h-1 bg-white/40 rounded-full" />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Selected Project Details Footer */}
        <div className="w-full mt-6 pt-4 border-t border-slate-800/80 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-xs text-slate-400">
          <div>
            <span className="font-bold text-white text-sm mr-2">{selectedSite.title}</span>
            <span className="text-emerald-400 font-semibold">• {selectedSite.metric}</span>
            <p className="text-slate-400 mt-1 max-w-2xl">{selectedSite.description}</p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <span className="px-3 py-1 rounded-full bg-slate-800 text-slate-300 font-semibold text-[11px]">
              {selectedSite.industry}
            </span>
            <a
              href={targetUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-semibold transition-all shadow-md"
            >
              <span>Visit Website</span>
              <FiArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
