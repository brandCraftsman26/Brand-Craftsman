"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { FiArrowRight } from "react-icons/fi";
import WaterRipple from "./WaterRipple";

interface PageHeroProps {
  title: string;
  description: string;
  primaryCta?: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
  bgImage?: string;
  children?: React.ReactNode;
}

const PageHero = ({ title, description, primaryCta, secondaryCta, bgImage, children }: PageHeroProps) => {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;
    el.style.opacity = "0";
    el.style.transform = "translateY(30px)";
    requestAnimationFrame(() => {
      el.style.transition = "opacity 0.8s ease, transform 0.8s ease";
      el.style.opacity = "1";
      el.style.transform = "translateY(0)";
    });
  }, []);

  return (
    <section className="relative overflow-hidden bg-[#080220] pt-36 pb-28 md:pt-48 md:pb-36 border-b border-white/10 group">
      {bgImage && (
        <div className="absolute inset-0 z-0">
          <Image
            src={bgImage}
            alt="Hero Background"
            fill
            className="object-cover opacity-30 group-hover:opacity-40 transition-opacity duration-700 mix-blend-overlay"
            priority
          />
          <WaterRipple />
        </div>
      )}
      
      {/* Intellio-inspired Background Mesh Glows */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute -top-32 -right-32 w-[600px] h-[600px] rounded-full bg-[#6766FF]/20 blur-[150px] animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-[700px] h-[700px] rounded-full bg-[#FF007A]/15 blur-[160px]" style={{ animationDelay: "1s" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-[#00F0FF]/15 blur-[130px]" />
        
        {/* Subtle grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: "48px 48px",
          }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10 pointer-events-none">
        <div ref={heroRef} className="max-w-4xl mx-auto text-center pointer-events-auto">
          {/* Main Title */}
          <h1 className="font-zentry text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-white uppercase leading-none tracking-tight mb-8 drop-shadow-lg">
            {title}
          </h1>

          {/* High Contrast Description */}
          <p className="font-robert-medium text-xl md:text-2xl text-zinc-100 max-w-3xl mx-auto mb-12 leading-relaxed font-semibold text-balance drop-shadow-md">
            {description}
          </p>

          {/* Gen-Z Trend Buttons */}
          {(primaryCta || secondaryCta) && (
            <div className="flex flex-wrap justify-center gap-5">
              {primaryCta && (
                <Link
                  href={primaryCta.href}
                  className="btn-genz group"
                >
                  <span>{primaryCta.label}</span>
                  <FiArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform duration-300" />
                </Link>
              )}
              {secondaryCta && (
                <Link
                  href={secondaryCta.href}
                  className="btn-genz-outline bg-black/40 backdrop-blur-sm"
                >
                  {secondaryCta.label}
                </Link>
              )}
            </div>
          )}

          {children}
        </div>
      </div>
    </section>
  );
};

export default PageHero;
