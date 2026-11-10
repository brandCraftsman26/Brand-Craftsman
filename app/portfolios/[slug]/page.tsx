import React from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import Footer from "@/components/Footer";
import {
  FiTrendingUp,
  FiCheckCircle,
  FiArrowLeft,
  FiZap,
  FiExternalLink,
  FiMonitor,
  FiSmartphone,
  FiGlobe
} from "react-icons/fi";
import { PORTFOLIO_WEBSITES, PortfolioWebsite } from "@/lib/portfolio-data";
import LiveDevicePreviewModal from "@/components/LiveDevicePreviewModal";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return PORTFOLIO_WEBSITES.map((site) => ({
    slug: site.slug,
  }));
}

export default async function PortfolioDetailPage({ params }: PageProps) {
  const resolvedParams = await params;
  const project = PORTFOLIO_WEBSITES.find((p) => p.slug === resolvedParams.slug);

  if (!project) {
    notFound();
  }

  const targetUrl = project.url.startsWith("http") ? project.url : `https://${project.domain}`;

  return (
    <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white pt-24 pb-16 transition-colors duration-300">
      {/* Header */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto pt-10 pb-8">
        <Link
          href="/portfolios"
          className="inline-flex items-center gap-2 text-sm font-general text-pink-500 mb-6 hover:underline"
        >
          <FiArrowLeft /> Back to all web portfolios
        </Link>

        <div className="flex flex-wrap items-center gap-3 text-xs font-general text-gray-500 mb-4">
          <span className="bg-pink-500/10 text-pink-600 dark:text-pink-400 px-3 py-1 rounded-full font-bold uppercase tracking-wider">
            {project.category}
          </span>
          <span className="bg-indigo-500/10 text-indigo-400 px-3 py-1 rounded-full font-semibold">
            {project.industry}
          </span>
          <span className="font-zentry text-sm font-black text-emerald-500 flex items-center gap-1 ml-auto">
            <FiTrendingUp /> {project.metric}
          </span>
        </div>

        <h1 className="font-zentry text-3xl sm:text-5xl font-black uppercase tracking-wide leading-tight mb-4">
          {project.title}
        </h1>

        <div className="flex flex-wrap items-center justify-between gap-4 py-2 border-b border-gray-200 dark:border-zinc-800">
          <p className="text-sm font-general text-gray-500">Client: {project.client}</p>
          <a
            href={targetUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900 text-cyan-400 border border-slate-700 text-xs font-mono font-bold hover:bg-slate-800 transition-colors"
          >
            <FiGlobe /> {project.domain} <FiExternalLink className="w-3 h-3" />
          </a>
        </div>
      </section>

      {/* Live Embedded Iframe Showcase */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto py-6">
        <div className="rounded-3xl bg-slate-950 border border-slate-800 shadow-2xl overflow-hidden p-4 sm:p-6">
          <div className="flex items-center justify-between gap-4 mb-4 pb-3 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs font-bold text-white uppercase tracking-wider font-general">
                Live Iframe Web Preview
              </span>
            </div>

            <a
              href={targetUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-semibold text-indigo-400 hover:text-indigo-300 flex items-center gap-1.5"
            >
              Launch in full window <FiExternalLink className="w-3 h-3" />
            </a>
          </div>

          {/* Desktop Responsive Iframe Embed */}
          <div className="w-full h-[550px] rounded-2xl bg-white overflow-hidden shadow-inner border border-slate-800">
            <iframe
              src={targetUrl}
              title={`${project.title} Live Interactive Preview`}
              className="w-full h-full border-0"
              sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            />
          </div>
        </div>
      </section>

      {/* Main Case Study Content */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto py-8">
        <div className="space-y-8 font-robert-regular text-gray-700 dark:text-gray-300 text-base sm:text-lg leading-relaxed">
          <div className="bg-gray-50 dark:bg-zinc-900 p-6 rounded-2xl border border-gray-200 dark:border-zinc-800">
            <h2 className="font-zentry text-xl font-bold uppercase text-blue-500 mb-2">Project Overview</h2>
            <p>{project.description}</p>
          </div>

          <div className="bg-emerald-50 dark:bg-emerald-950/40 p-6 rounded-2xl border border-emerald-200 dark:border-emerald-800">
            <h2 className="font-zentry text-xl font-bold uppercase text-emerald-600 dark:text-emerald-400 mb-3 flex items-center gap-2">
              <FiZap /> Key Performance Metrics
            </h2>
            <p className="font-semibold text-emerald-500 text-lg">{project.metric}</p>
          </div>

          <div>
            <h3 className="font-zentry text-lg font-bold uppercase mb-3">Technologies & Architecture Deployed</h3>
            <div className="flex flex-wrap gap-2">
              {project.techStack.map((tech, idx) => (
                <span
                  key={idx}
                  className="px-3.5 py-1.5 bg-gray-100 dark:bg-zinc-800 text-xs font-semibold text-gray-800 dark:text-gray-200 rounded-xl border border-gray-200 dark:border-zinc-700"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
