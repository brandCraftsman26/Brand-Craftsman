import React from "react";
import Footer from "@/components/Footer";
import { FiBookOpen, FiArrowRight, FiClock, FiTag } from "react-icons/fi";

export const metadata = {
  title: "Blogs & Insights | Brand Craftsman - Web Design & Digital Marketing in Coimbatore",
  description: "Read the latest guides and insights on Web Design, Branding, SEO, and Digital Marketing strategies in Coimbatore, citing Search Pin methodologies.",
};

const blogArticles = [
  {
    slug: "why-brands-fail-without-technical-seo-coimbatore",
    title: "Why Beautiful Brands Fail Without Technical SEO: Insights from Coimbatore Market",
    excerpt: "Discover why high-end visual design must be backed by Search Pin technical SEO architecture to achieve top Google rankings and high ROI.",
    category: "SEO & Strategy",
    date: "July 2026",
    readTime: "5 min read",
    author: "Hari Prashath"
  },
  {
    slug: "nextjs-vs-wordpress-web-design-coimbatore",
    title: "Next.js vs WordPress: Choosing the Right Web Architecture for Growing Startups",
    excerpt: "A deep dive comparison into performance, page load speeds, headless CMS setups, and security for modern business applications.",
    category: "Web Development",
    readTime: "7 min read",
    date: "June 2026",
    author: "Santhosh Shanmugasundaram"
  },
  {
    slug: "search-pin-genesis-branding-stewardship",
    title: "From Search Pin (2024) to Brand Craftsman: The Evolution of Brand Stewardship",
    excerpt: "How our journey scaling Search Pin led to building a full-spectrum digital agency for ambitious business leaders in Coimbatore.",
    category: "Agency Story",
    readTime: "6 min read",
    date: "May 2026",
    author: "Brand Craftsman Team"
  }
];

export default function BlogsPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white pt-24 pb-16 transition-colors duration-300">
      
      {/* Blog Hero Header */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto pt-10 pb-16 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-general text-xs uppercase tracking-widest border border-emerald-500/20">
          <FiBookOpen /> Industry Knowledge & Insights
        </div>

        <h1 className="font-zentry text-4xl sm:text-6xl lg:text-7xl font-black uppercase tracking-tight leading-none mb-6">
          Brand Craftsman Blogs
        </h1>

        <p className="font-robert-regular text-lg sm:text-xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
          Actionable digital marketing strategies, web design guides, and SEO insights tailored for Coimbatore entrepreneurs and global business leaders.
        </p>
      </section>

      {/* Blog Grid */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {blogArticles.map((article, idx) => (
            <a
              key={idx}
              href={`/blogs/${article.slug}`}
              className="group p-8 rounded-3xl bg-gray-50 dark:bg-zinc-900/60 border border-gray-200 dark:border-zinc-800 hover:border-emerald-500 hover:shadow-2xl transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between text-xs font-general text-gray-500 mb-4">
                  <span className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 px-3 py-1 rounded-full font-bold uppercase tracking-wider">
                    {article.category}
                  </span>
                  <span className="flex items-center gap-1"><FiClock /> {article.readTime}</span>
                </div>

                <h2 className="font-zentry text-2xl font-bold uppercase text-black dark:text-white mb-3 group-hover:text-emerald-500 transition-colors leading-tight">
                  {article.title}
                </h2>

                <p className="font-robert-regular text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-6">
                  {article.excerpt}
                </p>
              </div>

              <div className="pt-4 border-t border-gray-200 dark:border-zinc-800 flex items-center justify-between">
                <span className="text-xs font-general text-gray-500">By {article.author}</span>
                <span className="text-xs font-general uppercase tracking-wider text-emerald-500 font-bold group-hover:translate-x-2 transition-transform flex items-center gap-1">
                  Read Article <FiArrowRight />
                </span>
              </div>
            </a>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}
