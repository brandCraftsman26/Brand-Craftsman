"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { FiLayers, FiEye, FiCode, FiSmartphone, FiCopy, FiGlobe, FiArrowRight } from "react-icons/fi";

const editingItems = [
  {
    icon: <FiLayers className="w-8 h-8" />,
    title: "Strategic Branding",
    description: "Craft compelling brand identities that resonate with your target audience and stand out in competitive markets.",
    color: "from-[#6766FF] to-[#9D4EDD]",
    borderGlow: "group-hover:border-[#6766FF]/60",
    link: "/services/branding"
  },
  {
    icon: <FiEye className="w-8 h-8" />,
    title: "Visual Design",
    description: "Design stunning visuals and high-converting layouts that capture attention and communicate your value clearly.",
    color: "from-[#00F0FF] to-[#6766FF]",
    borderGlow: "group-hover:border-[#00F0FF]/60",
    link: "/services/logo-designing"
  },
  {
    icon: <FiCode className="w-8 h-8" />,
    title: "Custom Development",
    description: "Build high-performance web applications with clean, scalable Next.js & React code tailored for fast loading.",
    color: "from-[#0DB561] to-[#00F0FF]",
    borderGlow: "group-hover:border-[#0DB561]/60",
    link: "/services/web-development"
  },
  {
    icon: <FiSmartphone className="w-8 h-8" />,
    title: "Responsive Design",
    description: "Create liquid-smooth digital experiences that work seamlessly across mobile, tablet, and desktop viewports.",
    color: "from-[#FF9F31] to-[#FF007A]",
    borderGlow: "group-hover:border-[#FF9F31]/60",
    link: "/services/mobile-app-development"
  },
  {
    icon: <FiCopy className="w-8 h-8" />,
    title: "Content Strategy",
    description: "Develop data-driven content architectures that engage visitors, establish authority, and drive conversions.",
    color: "from-[#FF007A] to-[#6766FF]",
    borderGlow: "group-hover:border-[#FF007A]/60",
    link: "/services/press-release"
  },
  {
    icon: <FiGlobe className="w-8 h-8" />,
    title: "Digital Growth & SEO",
    description: "Amplify your search presence with Search Pin technical SEO, PPC campaigns, and organic ranking strategies.",
    color: "from-[#6766FF] to-[#00F0FF]",
    borderGlow: "group-hover:border-[#6766FF]/60",
    link: "/services/digital-marketing"
  },
];

const EditingGrid = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-24 md:py-32 bg-slate-50 dark:bg-[#07011F] overflow-hidden">
      {/* Ambient Radial Lights */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 right-10 w-[500px] h-[500px] rounded-full bg-[#6766FF]/10 blur-[130px]" />
        <div className="absolute bottom-10 left-10 w-[500px] h-[500px] rounded-full bg-[#FF007A]/10 blur-[130px]" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Heading */}
        <div
          className="text-center mb-16 max-w-3xl mx-auto"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 0.6s ease, transform 0.6s ease",
          }}
        >
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-violet-500/10 border border-violet-400/30 text-violet-600 dark:text-cyan-400 font-general text-xs uppercase tracking-widest font-bold mb-4">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse" />
            CORE CAPABILITIES
          </div>
          <h2 className="font-zentry text-4xl sm:text-5xl md:text-6xl font-black text-slate-900 dark:text-white uppercase leading-tight">
            Powerful Digital Solutions
          </h2>
          <p className="font-robert-medium text-slate-700 dark:text-zinc-200 text-lg md:text-xl mt-4 font-semibold">
            Engineered to elevate your brand identity and accelerate your business growth.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {editingItems.map((item, index) => (
            <Link
              key={index}
              href={item.link}
              className={`group relative p-8 md:p-10 rounded-3xl bg-white dark:bg-[#0F0927]/80 border border-slate-200 dark:border-white/10 ${item.borderGlow} backdrop-blur-xl transition-all duration-500 hover:shadow-[0_0_35px_rgba(103,102,255,0.2)] hover:-translate-y-2 flex flex-col justify-between cursor-pointer`}
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? "translateY(0)" : "translateY(40px)",
                transition: `opacity 0.5s ease ${index * 0.1}s, transform 0.5s ease ${index * 0.1}s`,
              }}
            >
              {/* Hover Overlay */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-violet-500/5 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

              <div>
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br ${item.color} text-white mb-6 shadow-lg shadow-indigo-500/20 group-hover:scale-110 transition-transform duration-300`}>
                  {item.icon}
                </div>

                {/* Card Title - Crisp & Visible */}
                <h4 className="font-robert-medium text-2xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-indigo-600 dark:group-hover:text-cyan-400 transition-colors">
                  {item.title}
                </h4>

                {/* Card Description - Crisp & High Contrast */}
                <p className="font-robert-regular text-slate-700 dark:text-zinc-300 leading-relaxed text-base font-normal">
                  {item.description}
                </p>
              </div>

              {/* Gen-Z Hover Link */}
              <div className="mt-8 flex items-center gap-2 text-indigo-600 dark:text-cyan-400 font-general text-xs uppercase tracking-widest font-bold group-hover:translate-x-2 transition-transform duration-300">
                Learn More <FiArrowRight className="w-4 h-4" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EditingGrid;
