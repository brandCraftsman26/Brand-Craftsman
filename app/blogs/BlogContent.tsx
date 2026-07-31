"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { FiClock, FiArrowRight } from "react-icons/fi";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface Article {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  author: string;
  featureImage?: string;
}

export default function BlogContent({ articles }: { articles: Article[] }) {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.from(".blog-card", {
      y: 40,
      opacity: 0,
      duration: 0.8,
      stagger: 0.2,
      ease: "power2.out",
      scrollTrigger: {
        trigger: container.current,
        start: "top 80%",
      },
    });
  }, { scope: container });

  return (
    <div ref={container} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {articles.map((article, idx) => (
        <a
          key={idx}
          href={`/blogs/${article.slug}`}
          className="blog-card group rounded-3xl bg-gray-50 dark:bg-zinc-900/60 border border-gray-200 dark:border-zinc-800 hover:border-emerald-500 hover:shadow-2xl transition-all duration-500 flex flex-col overflow-hidden"
        >
          {article.featureImage && (
            <div className="w-full h-48 relative overflow-hidden">
              <Image
                src={article.featureImage}
                alt={article.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
          )}
          <div className="p-6 flex flex-col flex-1 justify-between">
            <div>
              <div className="flex items-center justify-between text-xs font-general text-gray-500 mb-4">
                <span className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 px-3 py-1 rounded-full font-bold uppercase tracking-wider">
                  {article.category}
                </span>
                <span className="flex items-center gap-1"><FiClock /> {article.readTime}</span>
              </div>

              <h2 className="font-zentry text-xl font-bold uppercase text-black dark:text-white mb-3 group-hover:text-emerald-500 transition-colors leading-tight">
                {article.title}
              </h2>

              <p className="font-robert-regular text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-6">
                {article.excerpt}
              </p>
            </div>

            <div className="pt-4 border-t border-gray-200 dark:border-zinc-800 flex items-center justify-between mt-auto">
              <span className="text-xs font-general text-gray-500">By {article.author}</span>
              <span className="text-xs font-general uppercase tracking-wider text-emerald-500 font-bold group-hover:translate-x-2 transition-transform flex items-center gap-1">
                Read Article <FiArrowRight />
              </span>
            </div>
          </div>
        </a>
      ))}
    </div>
  );
}
