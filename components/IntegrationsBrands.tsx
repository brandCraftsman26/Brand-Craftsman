"use client";

import { useEffect, useRef, useState } from "react";
import { FiArrowRight, FiMessageSquare, FiLayout, FiPenTool, FiBarChart2, FiMail, FiZap, FiTarget, FiCreditCard, FiShoppingCart, FiCode, FiGrid, FiImage } from "react-icons/fi";
import Link from "next/link";

const integrations = [
  { icon: <FiMessageSquare className="w-8 h-8" />, name: "Slack" },
  { icon: <FiLayout className="w-8 h-8" />, name: "Notion" },
  { icon: <FiPenTool className="w-8 h-8" />, name: "Figma" },
  { icon: <FiBarChart2 className="w-8 h-8" />, name: "Analytics" },
  { icon: <FiMail className="w-8 h-8" />, name: "Mailchimp" },
  { icon: <FiZap className="w-8 h-8" />, name: "Zapier" },
  { icon: <FiTarget className="w-8 h-8" />, name: "HubSpot" },
  { icon: <FiCreditCard className="w-8 h-8" />, name: "Stripe" },
  { icon: <FiShoppingCart className="w-8 h-8" />, name: "Shopify" },
  { icon: <FiCode className="w-8 h-8" />, name: "WordPress" },
  { icon: <FiGrid className="w-8 h-8" />, name: "Webflow" },
  { icon: <FiImage className="w-8 h-8" />, name: "Adobe CC" },
];

const IntegrationsBrands = () => {
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
    <section
      ref={sectionRef}
      className="relative py-24 md:py-36 bg-[#080220] border-b border-white/10 overflow-hidden"
    >
      {/* Intellio Mesh Glow */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/3 -right-32 w-[600px] h-[600px] rounded-full bg-[#6766FF]/15 blur-[150px]" />
        <div className="absolute bottom-10 -left-32 w-[600px] h-[600px] rounded-full bg-[#00F0FF]/15 blur-[150px]" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
          {/* Left Content */}
          <div
            className="w-full lg:w-5/12"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? "translateX(0)" : "translateX(-30px)",
              transition: "opacity 0.8s ease, transform 0.8s ease",
            }}
          >
            <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-violet-500/10 border border-violet-400/30 text-cyan-400 font-general text-xs uppercase tracking-widest font-bold mb-6">
              <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse" />
              INTEGRATION ECOSYSTEM
            </div>

            <h2 className="font-zentry text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white uppercase leading-none mb-6">
              Connect With <span className="text-hyper-gradient">3000+</span> Tools
            </h2>

            {/* High Contrast Description */}
            <p className="font-robert-medium text-zinc-100 leading-relaxed mb-10 text-lg md:text-xl font-semibold">
              Seamlessly connect your existing workflow. Our web application architecture integrates cleanly with popular tools, CRMs, analytics platforms, and payment gateways.
            </p>

            <Link
              href="/contact"
              className="btn-genz group"
            >
              Start Free Trial
              <FiArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform duration-300" />
            </Link>
          </div>

          {/* Right Integrations Grid */}
          <div className="w-full lg:w-7/12">
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-4">
              {integrations.map((item, index) => (
                <div
                  key={index}
                  className="group relative flex flex-col items-center justify-center p-6 rounded-3xl bg-[#0F0927]/90 border border-white/10 hover:border-cyan-400/60 backdrop-blur-xl transition-all duration-500 hover:scale-105 hover:shadow-[0_0_30px_rgba(0,240,255,0.3)] cursor-pointer"
                  style={{
                    opacity: isVisible ? 1 : 0,
                    transform: isVisible ? "translateY(0)" : "translateY(30px)",
                    transition: `opacity 0.5s ease ${index * 0.05}s, transform 0.5s ease ${index * 0.05}s`,
                  }}
                >
                  <div className="text-cyan-400 group-hover:text-white transition-colors duration-300 mb-3">
                    {item.icon}
                  </div>
                  <span className="font-general text-xs uppercase tracking-wider text-zinc-200 group-hover:text-cyan-400 font-bold transition-colors">
                    {item.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default IntegrationsBrands;
