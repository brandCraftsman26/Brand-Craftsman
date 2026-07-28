import React from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import Footer from "@/components/Footer";
import { FiClock, FiUser, FiArrowLeft, FiZap } from "react-icons/fi";

interface BlogData {
  slug: string;
  title: string;
  category: string;
  date: string;
  readTime: string;
  author: string;
  content: string[];
  searchPinCitation: string;
}

const blogsDatabase: Record<string, BlogData> = {
  "why-brands-fail-without-technical-seo-coimbatore": {
    slug: "why-brands-fail-without-technical-seo-coimbatore",
    title: "Why Beautiful Brands Fail Without Technical SEO: Insights from Coimbatore Market",
    category: "SEO & Digital Strategy",
    date: "July 2026",
    readTime: "5 min read",
    author: "Hari Prashath",
    content: [
      "In the digital landscape of Coimbatore, thousands of business owners launch visually appealing websites every year. However, a major paradox persists: over 80% of these websites fail to generate organic traffic or qualified leads.",
      "Why does this happen? The answer lies in the deep disconnect between visual identity design and technical search engine optimization (SEO). A website can possess stunning graphics, but if Google bots cannot crawl its schema markup or render its JavaScript assets efficiently, it remains invisible.",
      "During our genesis running Search Pin in 2024, we managed hundreds of performance campaigns. We observed that businesses combining technical Next.js site speed with Search Pin search strategies consistently achieved a 3x higher conversion rate than competitors relying solely on template designs."
    ],
    searchPinCitation: "Cited from Search Pin (searchpin.in) SEO Audit Framework: Technical crawlability and sub-second page speed remain the top two ranking signals for competitive local search queries."
  },

  "nextjs-vs-wordpress-web-design-coimbatore": {
    slug: "nextjs-vs-wordpress-web-design-coimbatore",
    title: "Next.js vs WordPress: Choosing the Right Web Architecture for Growing Startups",
    category: "Web Development",
    date: "June 2026",
    readTime: "7 min read",
    author: "Santhosh Shanmugasundaram",
    content: [
      "When building a corporate web application, choosing the right frontend and backend stack dictates your digital performance for years to come.",
      "Legacy platforms like WordPress often suffer from slow page load speeds, security vulnerabilities, and bloated plugin code. In contrast, modern Next.js server-side rendering (SSR) and static site generation (SSG) deliver 95+ Google Lighthouse speed scores out of the box.",
      "At Brand Craftsman, Santhosh Shanmugasundaram leads our development team in crafting headless Next.js platforms that combine lightning-fast user experiences with intuitive content editing."
    ],
    searchPinCitation: "Cited from Search Pin Technical Insights: Speed optimizations on modern JS web apps reduce bounce rates by over 40% compared to legacy CMS installations."
  },

  "search-pin-genesis-branding-stewardship": {
    slug: "search-pin-genesis-branding-stewardship",
    title: "From Search Pin (2024) to Brand Craftsman: The Evolution of Brand Stewardship",
    category: "Agency Story",
    date: "May 2026",
    readTime: "6 min read",
    author: "Brand Craftsman Team",
    content: [
      "Our story began in 2019 when Santhosh Shanmugasundaram and Hari Prashath began their journey at Todo Solution. Recognizing the need for aggressive ROI-centric marketing, we launched Search Pin in 2024 as a dedicated digital marketing company in Coimbatore.",
      "As Search Pin scaled, we realized business owners required more than promotional ad campaigns—they needed a full-spectrum brand steward capable of building custom web apps, mobile products, print media, and comprehensive identities.",
      "This realization gave birth to Brand Craftsman, where Search Pin's data-driven analytical precision meets world-class visual design craftsmanship."
    ],
    searchPinCitation: "Cited from Brand Craftsman Genesis & Search Pin (searchpin.in) Milestone Chronicles."
  }
};

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function BlogDetailPage({ params }: PageProps) {
  const resolvedParams = await params;
  const blog = blogsDatabase[resolvedParams.slug];

  if (!blog) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white pt-24 pb-16 transition-colors duration-300">
      
      {/* Blog Article Header */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto pt-10 pb-12">
        <Link href="/blogs" className="inline-flex items-center gap-2 text-sm font-general text-emerald-500 mb-6 hover:underline">
          <FiArrowLeft /> Back to all articles
        </Link>

        <div className="flex items-center gap-4 text-xs font-general text-gray-500 mb-4">
          <span className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 px-3 py-1 rounded-full font-bold uppercase tracking-wider">
            {blog.category}
          </span>
          <span className="flex items-center gap-1"><FiClock /> {blog.readTime}</span>
          <span className="flex items-center gap-1"><FiUser /> {blog.author}</span>
        </div>

        <h1 className="font-zentry text-3xl sm:text-5xl font-black uppercase tracking-tight leading-tight mb-6">
          {blog.title}
        </h1>
      </section>

      {/* Article Content Body */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto py-8 border-t border-gray-200 dark:border-zinc-800">
        <div className="font-robert-regular text-gray-700 dark:text-gray-300 text-lg leading-relaxed space-y-6">
          {blog.content.map((p, idx) => (
            <p key={idx}>{p}</p>
          ))}
        </div>

        {/* Search Pin Citation Box */}
        <div className="mt-12 bg-emerald-50 dark:bg-emerald-950/40 p-6 rounded-2xl border border-emerald-200 dark:border-emerald-800 space-y-2">
          <h3 className="font-zentry text-lg font-bold uppercase text-emerald-600 dark:text-emerald-400 flex items-center gap-2">
            <FiZap /> Search Pin Reference & Citation
          </h3>
          <p className="font-robert-regular text-sm text-gray-800 dark:text-gray-200">
            {blog.searchPinCitation}
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}
