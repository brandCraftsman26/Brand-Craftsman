"use client";

import React, { useState, useEffect } from "react";
import {
  FiMonitor,
  FiSmartphone,
  FiExternalLink,
  FiRotateCw,
  FiX,
  FiShield,
  FiCheckCircle,
  FiMaximize2,
  FiMinimize2
} from "react-icons/fi";

export interface PortfolioWebsite {
  slug: string;
  domain: string;
  url: string;
  title: string;
  category: string;
  client: string;
  metric: string;
  description: string;
  industry: string;
  techStack: string[];
  image?: string;
}

interface LiveDevicePreviewModalProps {
  project: PortfolioWebsite | null;
  isOpen: boolean;
  onClose: () => void;
  initialMode?: "desktop" | "mobile";
}

export default function LiveDevicePreviewModal({
  project,
  isOpen,
  onClose,
  initialMode = "desktop",
}: LiveDevicePreviewModalProps) {
  const [deviceMode, setDeviceMode] = useState<"desktop" | "mobile">(initialMode);
  const [iframeKey, setIframeKey] = useState(0);
  const [iframeLoaded, setIframeLoaded] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    if (initialMode) {
      setDeviceMode(initialMode);
    }
  }, [initialMode, project]);

  useEffect(() => {
    setIframeLoaded(false);
    setIframeKey((prev) => prev + 1);
  }, [project, deviceMode]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || !project) return null;

  const targetUrl = project.url.startsWith("http") ? project.url : `https://${project.domain}`;

  const reloadIframe = () => {
    setIframeLoaded(false);
    setIframeKey((prev) => prev + 1);
  };

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center p-2 sm:p-4 md:p-6 bg-slate-950/85 backdrop-blur-xl animate-fade-in">
      <div
        className={`w-full flex flex-col bg-slate-900 border border-slate-800 rounded-3xl shadow-[0_25px_80px_rgba(0,0,0,0.8)] overflow-hidden transition-all duration-300 ${
          isFullscreen
            ? "fixed inset-2 h-[calc(100vh-16px)]"
            : "max-w-7xl h-[92vh] max-h-[960px]"
        }`}
      >
        {/* Top Control Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 px-4 sm:px-6 py-3.5 bg-slate-950/90 border-b border-slate-800/80">
          {/* Left: Project Info */}
          <div className="flex items-center gap-3 min-w-0">
            <span className="flex h-3 w-3 rounded-full bg-emerald-500 animate-pulse" />
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <h3 className="font-zentry text-base sm:text-lg font-bold text-white uppercase tracking-wide truncate">
                  {project.title}
                </h3>
                <span className="hidden sm:inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                  {project.category}
                </span>
              </div>
              <p className="text-xs text-slate-400 truncate flex items-center gap-2">
                <span className="font-medium text-slate-300">{project.client}</span>
                <span>•</span>
                <span className="text-emerald-400 font-semibold">{project.metric}</span>
              </p>
            </div>
          </div>

          {/* Center: Device Switcher */}
          <div className="flex items-center gap-1.5 p-1 bg-slate-900 border border-slate-800 rounded-2xl mx-auto">
            <button
              onClick={() => setDeviceMode("desktop")}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                deviceMode === "desktop"
                  ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md shadow-indigo-500/20"
                  : "text-slate-400 hover:text-white hover:bg-slate-800"
              }`}
              title="Desktop View"
            >
              <FiMonitor className="w-4 h-4" />
              <span className="hidden sm:inline">Desktop</span>
            </button>
            <button
              onClick={() => setDeviceMode("mobile")}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                deviceMode === "mobile"
                  ? "bg-gradient-to-r from-indigo-600 to-pink-600 text-white shadow-md shadow-pink-500/20"
                  : "text-slate-400 hover:text-white hover:bg-slate-800"
              }`}
              title="Mobile View"
            >
              <FiSmartphone className="w-4 h-4" />
              <span className="hidden sm:inline">Mobile</span>
            </button>
          </div>

          {/* Right: Actions */}
          <div className="flex items-center gap-2">
            <button
              onClick={reloadIframe}
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800 transition-colors cursor-pointer"
              title="Reload Frame"
            >
              <FiRotateCw className="w-4 h-4" />
            </button>
            <a
              href={targetUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-slate-200 hover:text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 transition-colors"
              title="Open website in new tab"
            >
              <span className="hidden md:inline">Open Live</span>
              <FiExternalLink className="w-3.5 h-3.5" />
            </a>
            <button
              onClick={() => setIsFullscreen(!isFullscreen)}
              className="hidden lg:flex p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800 transition-colors cursor-pointer"
              title={isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
            >
              {isFullscreen ? <FiMinimize2 className="w-4 h-4" /> : <FiMaximize2 className="w-4 h-4" />}
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 border border-slate-800 transition-colors cursor-pointer"
              title="Close Preview"
            >
              <FiX className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Viewport Frame Area */}
        <div className="flex-1 bg-slate-950 p-2 sm:p-4 overflow-auto flex items-center justify-center relative">
          {/* Subtle background mesh grid */}
          <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none opacity-40" />

          {/* ─────────────────── DESKTOP VIEWPORT ─────────────────── */}
          {deviceMode === "desktop" && (
            <div className="w-full h-full max-w-[1400px] flex flex-col rounded-2xl border border-slate-800/90 bg-slate-900 shadow-2xl overflow-hidden relative z-10 transition-all duration-300">
              {/* Browser Window Header */}
              <div className="flex items-center gap-3 px-4 py-2.5 bg-slate-950 border-b border-slate-800 select-none">
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                  <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                </div>
                {/* URL Bar */}
                <div className="flex-1 flex items-center justify-center px-4">
                  <div className="w-full max-w-md flex items-center gap-2 px-3 py-1 rounded-xl bg-slate-900 border border-slate-800 text-[11px] text-slate-300 truncate">
                    <FiShield className="text-emerald-400 w-3 h-3 shrink-0" />
                    <span className="text-emerald-400 font-mono">https://</span>
                    <span className="font-mono text-slate-200 truncate">{project.domain}</span>
                  </div>
                </div>
                <div className="text-[10px] text-slate-500 font-mono hidden md:block">
                  1280 × 800 (Responsive Desktop)
                </div>
              </div>

              {/* Iframe View */}
              <div className="flex-1 relative bg-white overflow-hidden">
                {!iframeLoaded && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-900/95 z-20 text-center p-6">
                    <div className="w-10 h-10 border-3 border-indigo-500 border-t-transparent rounded-full animate-spin mb-4" />
                    <p className="text-sm font-semibold text-white">Connecting to {project.domain}...</p>
                    <p className="text-xs text-slate-400 mt-1 max-w-sm">
                      Rendering live client web application in desktop viewport.
                    </p>
                  </div>
                )}

                <iframe
                  key={`desktop-${iframeKey}`}
                  src={targetUrl}
                  title={`${project.title} Desktop View`}
                  onLoad={() => setIframeLoaded(true)}
                  className="w-full h-full border-0"
                  sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-modals"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                />
              </div>

              {/* Bottom Info Status Bar */}
              <div className="flex items-center justify-between px-4 py-2 bg-slate-950 border-t border-slate-800 text-[11px] text-slate-400">
                <div className="flex items-center gap-2">
                  <FiCheckCircle className="text-emerald-400" />
                  <span>Interactive Live Client Preview</span>
                </div>
                <div className="flex items-center gap-3">
                  <span>If site restricts embedding:</span>
                  <a
                    href={targetUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-indigo-400 hover:text-indigo-300 font-semibold underline flex items-center gap-1"
                  >
                    Open in separate window <FiExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>
          )}

          {/* ─────────────────── MOBILE VIEWPORT (iPhone Shell) ─────────────────── */}
          {deviceMode === "mobile" && (
            <div className="h-full flex items-center justify-center py-2 relative z-10 animate-scale-up">
              {/* iPhone Mockup Frame */}
              <div className="w-[375px] h-[720px] max-h-[85vh] bg-slate-900 rounded-[50px] p-3 shadow-[0_20px_60px_rgba(0,0,0,0.9)] border-4 border-slate-700/80 flex flex-col relative overflow-hidden ring-1 ring-slate-600/50">
                {/* iPhone Dynamic Island */}
                <div className="absolute top-4 left-1/2 -translate-x-1/2 w-28 h-5 bg-black rounded-full z-30 flex items-center justify-between px-3">
                  <div className="w-2.5 h-2.5 rounded-full bg-slate-900 border border-slate-800" />
                  <div className="w-2 h-2 rounded-full bg-emerald-500/80 animate-pulse" />
                </div>

                {/* Speaker & Mic Notches */}
                <div className="absolute top-2 left-1/2 -translate-x-1/2 w-12 h-1 bg-slate-700 rounded-full z-20" />

                {/* Screen Container */}
                <div className="flex-1 w-full bg-white rounded-[38px] overflow-hidden flex flex-col relative pt-7">
                  {/* Mobile Safari URL Bar */}
                  <div className="flex items-center justify-between px-3 py-1.5 bg-slate-100 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 text-[10px] text-slate-600 dark:text-slate-300 select-none">
                    <div className="flex items-center gap-1 truncate max-w-[240px]">
                      <FiShield className="text-emerald-500 w-3 h-3 shrink-0" />
                      <span className="font-mono text-slate-700 dark:text-slate-300 truncate">
                        {project.domain}
                      </span>
                    </div>
                    <button
                      onClick={reloadIframe}
                      className="text-slate-500 hover:text-slate-700 dark:hover:text-white"
                      title="Reload"
                    >
                      <FiRotateCw className="w-2.5 h-2.5" />
                    </button>
                  </div>

                  {/* Mobile Screen Iframe */}
                  <div className="flex-1 relative overflow-hidden">
                    {!iframeLoaded && (
                      <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-900 text-center p-4 z-20">
                        <div className="w-8 h-8 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin mb-3" />
                        <p className="text-xs font-semibold text-white">Loading Mobile View...</p>
                        <p className="text-[10px] text-slate-400 mt-1">{project.domain}</p>
                      </div>
                    )}

                    <iframe
                      key={`mobile-${iframeKey}`}
                      src={targetUrl}
                      title={`${project.title} Mobile View`}
                      onLoad={() => setIframeLoaded(true)}
                      className="w-full h-full border-0"
                      sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-modals"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    />
                  </div>

                  {/* iOS Home Indicator Bar */}
                  <div className="h-4 bg-slate-900 flex items-center justify-center">
                    <div className="w-28 h-1 bg-white/40 rounded-full" />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
