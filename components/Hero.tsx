"use client";

import { useState, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";
import { TiLocationArrow } from "react-icons/ti";
import { FiZap, FiCheckCircle, FiShield, FiTrendingUp } from "react-icons/fi";
import Button from "./Button";
import Link from "next/link";
import WaterRipple from "./WaterRipple";
import dynamic from "next/dynamic";

const FloatingGeometry = dynamic(() => import("./3d/FloatingGeometry"), { ssr: false });

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const [currentVideo, setCurrentVideo] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentVideo((prev) => (prev === 1 ? 2 : 1));
    }, 10000); // 10 seconds
    return () => clearInterval(interval);
  }, []);

  useGSAP(() => {
    gsap.set("#video-frame", {
      clipPath: "polygon(14% 0, 72% 0, 88% 90%, 0 95%)",
      borderRadius: "0% 0% 40% 10%",
    });
    gsap.from("#video-frame", {
      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      borderRadius: "0% 0% 0% 0%",
      ease: "power1.inOut",
      scrollTrigger: {
        trigger: "#video-frame",
        start: "center center",
        end: "bottom center",
        scrub: true,
      },
    });

    // Floating badges animation
    gsap.to(".float-badge-1", {
      y: -15,
      repeat: -1,
      yoyo: true,
      duration: 3,
      ease: "sine.inOut",
    });
    gsap.to(".float-badge-2", {
      y: 18,
      repeat: -1,
      yoyo: true,
      duration: 3.5,
      ease: "sine.inOut",
      delay: 0.5,
    });
  });

  return (
    <div className="relative h-dvh w-full overflow-x-hidden">
      <div
        id="video-frame"
        className="relative z-10 h-dvh w-full overflow-hidden rounded-lg bg-zinc-950"
      >
        {/* High Resolution Hero Videos with enhanced contrast & crispness */}
        <div className="absolute left-0 top-0 size-full">
          <video
            src="videos/brand-hero-1.mp4"
            autoPlay
            loop
            muted
            playsInline
            className={`absolute left-0 top-0 size-full object-cover object-center transition-opacity duration-1000 ease-in-out filter contrast-105 brightness-105 ${
              currentVideo === 1 ? "opacity-100 scale-100" : "opacity-0 scale-105"
            }`}
          />
          <video
            src="videos/brand-hero-2.mp4"
            autoPlay
            loop
            muted
            playsInline
            className={`absolute left-0 top-0 size-full object-cover object-center transition-opacity duration-1000 ease-in-out filter contrast-105 brightness-105 ${
              currentVideo === 2 ? "opacity-100 scale-100" : "opacity-0 scale-105"
            }`}
          />
        </div>


        {/* Interactive Water Ripple Effect */}
        <div className="absolute inset-0 z-30 pointer-events-none">
          <WaterRipple />
        </div>

        {/* 3D Floating Geometry Animation */}
        <FloatingGeometry scene="hero" className="opacity-40 z-30 pointer-events-none" />

        {/* Floating Animation Badges */}
        <div className="hidden lg:flex absolute top-32 right-12 z-40 flex-col gap-4 pointer-events-none">
          <div className="float-badge-1 px-5 py-3 rounded-2xl flex items-center gap-3 text-white">
            <div className="p-2 rounded-xl bg-cyan-400/20 text-cyan-300">
              <FiTrendingUp className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-bold font-general uppercase tracking-wider text-cyan-300">ROI Optimization</p>
              <p className="text-sm font-zentry font-black">+300% Growth</p>
            </div>
          </div>

          <div className="float-badge-2 px-5 py-3 rounded-2xl flex items-center gap-3 text-white">
            <div className="p-2 rounded-xl bg-amber-400/20 text-amber-300">
              <FiZap className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-bold font-general uppercase tracking-wider text-amber-300">Next.js Speed</p>
              <p className="text-sm font-zentry font-black">99/100 Core Vitals</p>
            </div>
          </div>
        </div>

        {/* Watermark Brand Craftsman */}
        <div className="special-font uppercase font-black absolute bottom-6 right-8 z-20 text-white/10 tracking-[0.08em] text-lg sm:text-2xl md:text-3xl lg:text-4xl select-none pointer-events-none">
          BRAND CRAFTSMAN
        </div>

        <div className="absolute left-0 top-0 z-40 size-full flex items-center">
          <div className="mt-16 px-5 sm:px-12 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white font-general text-xs uppercase tracking-widest">
              <FiShield className="text-cyan-400" /> Premier Web & Digital Agency
            </div>

            {/* Smaller, beautifully proportioned Brand Craftsman title with sufficient letter spacing */}
            <h2 className="special-font uppercase text-white font-black leading-[1.08] tracking-[0.05em] text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-4 drop-shadow-[0_4px_24px_rgba(0,0,0,0.9)]">
              BRAND CRAFTSMAN
            </h2>

            <h1 className="mb-8 max-w-xl font-robert-medium text-zinc-100 text-lg sm:text-xl md:text-2xl leading-relaxed font-semibold drop-shadow-[0_4px_16px_rgba(0,0,0,0.9)]">
              Architecting Digital Excellence as a Masterful Web Design & Digital Marketing Company in Coimbatore.
            </h1>

            <div className="flex flex-wrap gap-4 items-center">
              <Link href="/contact">
                <Button
                  id="get-started"
                  title="Get Started Now"
                  leftIcon={<TiLocationArrow className="text-xl" />}
                  containerClass="!bg-gradient-to-r from-violet-600 via-indigo-600 to-cyan-500 text-white font-bold shadow-[0_0_30px_rgba(124,58,237,0.5)] hover:shadow-[0_0_40px_rgba(6,182,212,0.6)] hover:scale-105 transition-all flex-center gap-2 px-8 py-4 text-sm md:text-base uppercase tracking-wider rounded-full cursor-pointer"
                />
              </Link>
              <Link
                href="/portfolios"
                className="px-6 py-4 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white font-general text-xs md:text-sm font-bold uppercase tracking-wider transition-all flex items-center gap-2"
              >
                <FiCheckCircle className="text-emerald-400" /> View Portfolios
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="special-font uppercase font-black absolute bottom-6 right-8 text-black/10 dark:text-white/10 tracking-[0.08em] text-lg sm:text-2xl md:text-3xl lg:text-4xl select-none pointer-events-none">
        BRAND CRAFTSMAN
      </div>
    </div>
  );
};

export default Hero;


