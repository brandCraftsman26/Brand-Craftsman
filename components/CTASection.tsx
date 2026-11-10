"use client";

import { useEffect, useRef, useState } from "react";
import { FiArrowRight, FiZap } from "react-icons/fi";
import Link from "next/link";
import dynamic from "next/dynamic";

const FloatingGeometry = dynamic(() => import("./3d/FloatingGeometry"), { ssr: false });

const CTASection = () => {
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
      { threshold: 0.3 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-24 md:py-36 bg-[#080220] overflow-hidden border-b border-white/10">
      {/* 3D Floating Geometry Scene */}
      <FloatingGeometry scene="hero" className="opacity-50 pointer-events-none" />

      {/* Intellio Mesh Glow */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 -right-40 w-[700px] h-[700px] rounded-full bg-[#6766FF]/20 blur-[160px] animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-[600px] h-[600px] rounded-full bg-[#FF007A]/15 blur-[140px]" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          {/* Left content */}
          <div
            className="w-full lg:w-1/2 text-center lg:text-left"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? "translateY(0)" : "translateY(30px)",
              transition: "opacity 0.8s ease, transform 0.8s ease",
            }}
          >
            <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-violet-500/10 border border-violet-400/30 text-cyan-400 font-general text-xs uppercase tracking-widest font-bold mb-6">
              <FiZap className="w-4 h-4 text-cyan-400 animate-pulse" />
              READY TO SCALE YOUR BRAND?
            </div>

            <h2 className="font-zentry text-4xl sm:text-5xl md:text-6xl font-black text-white uppercase leading-[1.1] mb-6 tracking-wide">
              Start Building Your <span className="text-hyper-gradient">Dream Brand</span> Today
            </h2>

            {/* High Contrast Description */}
            <p className="font-robert-medium text-zinc-100 text-lg md:text-xl leading-relaxed mb-10 max-w-xl mx-auto lg:mx-0 font-semibold">
              Partner with Brand Craftsman to engineer high-converting digital experiences, custom web applications, and dominant search presence.
            </p>

            {/* Gen-Z Trend Buttons */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-5">
              <Link
                href="/contact"
                className="btn-genz group"
              >
                Get Started Free
                <FiArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform duration-300" />
              </Link>
              <Link
                href="/portfolios"
                className="btn-genz-outline"
              >
                View Portfolios
              </Link>
            </div>
          </div>

          {/* Right Visual Card */}
          <div
            className="w-full lg:w-1/2"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? "translateX(0) scale(1)" : "translateX(30px) scale(0.95)",
              transition: "opacity 0.8s ease 0.3s, transform 0.8s ease 0.3s",
            }}
          >
            <div className="relative">
              <div className="relative rounded-3xl bg-[#0F0927]/90 border border-cyan-400/30 backdrop-blur-2xl p-8 md:p-10 shadow-[0_0_50px_rgba(103,102,255,0.25)]">
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#6766FF] to-[#00F0FF] flex items-center justify-center text-white font-black text-xl shadow-lg">BC</div>
                    <div>
                      <h4 className="text-white font-zentry text-2xl font-black uppercase">Brand Craftsman</h4>
                      <p className="text-cyan-400 font-general text-xs uppercase tracking-wider font-bold">Premium Digital Agency</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="rounded-2xl bg-white/[0.04] p-4 border border-white/10">
                      <p className="text-zinc-300 text-xs font-general uppercase mb-1 font-semibold">Projects</p>
                      <p className="text-white text-3xl font-black">150+</p>
                    </div>
                    <div className="rounded-2xl bg-white/[0.04] p-4 border border-white/10">
                      <p className="text-zinc-300 text-xs font-general uppercase mb-1 font-semibold">Satisfaction</p>
                      <p className="text-white text-3xl font-black">99%</p>
                    </div>
                  </div>

                  {/* Progress bars */}
                  <div className="space-y-4">
                    {[
                      { label: "Brand Strategy Architecture", value: 95, color: "from-[#6766FF] to-[#00F0FF]" },
                      { label: "Next.js Web Performance", value: 99, color: "from-[#0DB561] to-[#00F0FF]" },
                      { label: "Search Pin SEO Growth", value: 94, color: "from-[#FF007A] to-[#FF9F31]" },
                    ].map((item, i) => (
                      <div key={i}>
                        <div className="flex justify-between text-sm mb-1.5 font-robert-medium">
                          <span className="text-zinc-200 font-semibold">{item.label}</span>
                          <span className="text-white font-bold">{item.value}%</span>
                        </div>
                        <div className="h-2.5 rounded-full bg-white/10 overflow-hidden">
                          <div
                            className={`h-full rounded-full bg-gradient-to-r ${item.color} transition-all duration-1000 ease-out`}
                            style={{ width: isVisible ? `${item.value}%` : "0%" }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Floating Badge */}
              <div className="absolute -top-4 -right-4 px-5 py-2.5 rounded-full bg-[#080220] border border-emerald-400 text-emerald-400 text-sm font-bold shadow-[0_0_20px_rgba(13,181,97,0.4)] animate-bounce" style={{ animationDuration: "3s" }}>
                ⭐ 5.0 Rating // Verified
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
