import React from "react";
import Footer from "@/components/Footer";
import { FiBookOpen } from "react-icons/fi";
import BlogContent from "./BlogContent";
import { getBlogsFromDB } from "@/lib/db/cms";
import FloatingGeometry from "@/components/3d/FloatingGeometry";
import PortfolioStrip from "@/components/PortfolioStrip";

export const metadata = {
  title: "Blogs & Insights | Brand Craftsman - Web Design & Digital Marketing in Coimbatore",
  description: "Read the latest guides and insights on Web Design, Branding, SEO, and Digital Marketing strategies in Coimbatore.",
};

const fallbackArticles = [
  {
    slug: "why-brands-fail-without-technical-seo-coimbatore",
    title: "Why Beautiful Brands Fail Without Technical SEO",
    excerpt: "Discover why high-end visual design must be backed by technical SEO architecture to achieve top Google rankings and high ROI.",
    category: "SEO & Strategy",
    date: "July 2026",
    readTime: "5 min read",
    author: "Hari Prashath",
    featureImage: "/img/blog_seo_new.png"
  },
  {
    slug: "nextjs-vs-wordpress-web-design-coimbatore",
    title: "Next.js vs WordPress: Choosing the Right Web Architecture",
    excerpt: "A deep dive comparison into performance, page load speeds, headless CMS setups, and security for modern business applications.",
    category: "Web Development",
    readTime: "7 min read",
    date: "June 2026",
    author: "Santhosh Shanmugasundaram",
    featureImage: "/img/blog_nextjs_new.png"
  },
  {
    slug: "search-pin-genesis-branding-stewardship",
    title: "From Search Pin to Brand Craftsman: Brand Stewardship",
    excerpt: "How our journey scaling Search Pin led to building a full-spectrum digital agency for ambitious business leaders in Coimbatore.",
    category: "Agency Story",
    readTime: "6 min read",
    date: "May 2026",
    author: "Brand Craftsman Team",
    featureImage: "/img/blog_story_new.png"
  }
];

export default async function BlogsPage() {
  const dbBlogs = await getBlogsFromDB();
  
  // Format items to match BlogContent expectations if available
  const postgresArticles = dbBlogs.map(b => ({
    slug: b.slug,
    title: b.title,
    excerpt: b.excerpt,
    category: b.category || "General",
    date: b.publishedAt || "Recently",
    readTime: b.readTime || "5 min read",
    author: b.author || "Brand Craftsman",
    featureImage: b.image || "/img/blog_seo_new.png"
  }));

  const articles = postgresArticles.length > 0 ? [...postgresArticles, ...fallbackArticles] : fallbackArticles;

  return (
    <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white pt-24 pb-0 transition-colors duration-300">
      
      {/* Blog Hero Header with 3D Scene */}
      <section className="relative px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto pt-10 pb-16 text-center overflow-hidden">
        <FloatingGeometry scene="about" className="opacity-50 dark:opacity-75" />

        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-general text-xs uppercase tracking-widest border border-emerald-500/20 backdrop-blur-md">
            <FiBookOpen /> Industry Knowledge & Insights
          </div>

          <h1 className="font-zentry text-4xl sm:text-6xl lg:text-7xl font-black uppercase tracking-wide leading-[1.08] mb-6">
            Brand Craftsman Blogs
          </h1>

          <p className="font-robert-regular text-lg sm:text-xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Actionable digital marketing strategies, web design guides, and SEO insights tailored for Coimbatore entrepreneurs and global business leaders.
          </p>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto py-12">
        <BlogContent articles={articles} />
      </section>

      {/* Live Portfolios Showcase */}
      <PortfolioStrip
        title="Live Case Studies From Our Portfolios"
        subtitle="See how we implement the high-performance design and SEO architecture discussed in our articles."
        maxItems={8}
      />

      <Footer />
    </div>
  );
}
