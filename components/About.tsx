"use client";

import { useRef } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import AnimatedTitle from "./AnimatedTitle";
import dynamic from "next/dynamic";

const FloatingGeometry = dynamic(() => import("./3d/FloatingGeometry"), { ssr: false });
const TiltCard3D = dynamic(() => import("./3d/TiltCard3D"), { ssr: false });

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const clipAnimation = gsap.timeline({
        scrollTrigger: {
          trigger: "#about-animation-section",
          start: "top 75%",
          end: "center 50%",
          scrub: 1,
        },
      });

      clipAnimation
        .to(
          ".mask-discover-text",
          {
            opacity: 0,
            scale: 0.8,
            duration: 0.25,
          },
          0
        )
        .to(
          ".mask-clip-path",
          {
            width: "100%",
            maxWidth: "1280px",
            minHeight: "520px",
            borderRadius: "2rem",
            duration: 1,
            ease: "power2.out",
          },
          0
        )
        .to(
          ".mask-content-reveal",
          {
            opacity: 1,
            scale: 1,
            duration: 0.75,
            ease: "power2.out",
          },
          0.2
        );
    },
    { scope: containerRef }
  );

  return (
    <div id="about" ref={containerRef} className="relative w-full bg-slate-50 dark:bg-[#07011a] pt-20 overflow-hidden">
      {/* Interactive 3D Background */}
      <FloatingGeometry scene="about" className="opacity-40 dark:opacity-60 pointer-events-none" />

      {/* 1. Content between Logo Slider and "Excellence..." Title */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 py-12 mb-10 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
        {/* The Creative Behind the Craft in 3D Tilt Card */}
        <TiltCard3D tiltIntensity={8} glareEnabled={true} className="rounded-3xl">
          <div className="h-full p-8 sm:p-10 rounded-3xl bg-white/80 dark:bg-[#0F0927]/90 backdrop-blur-xl border border-slate-200/80 dark:border-white/10 shadow-xl space-y-6">
            <h4 className="font-general text-xs uppercase tracking-widest text-violet-500 font-bold">The Creative Behind the Craft</h4>
            <h2 className="font-zentry text-2xl sm:text-3xl lg:text-4xl font-black uppercase text-slate-900 dark:text-white leading-tight tracking-wide">
              How did we start our journey as a web design and digital marketing company in Coimbatore?
            </h2>
            <div className="font-robert-regular text-slate-700 dark:text-zinc-300 space-y-4 text-sm sm:text-base leading-relaxed">
              <p>
                Based on a foundation of profound technical proficiency and imaginative vision, Santhosh Shanmugasundaram founded Brand Craftsman as a best web design and digital marketing company in Coimbatore. Santhosh has been in the trenches of Digital Marketing, High-End Branding & Full-Stack Development for 7+ years since 2019, where he learned what it takes to scale a modern brand efficiently.
              </p>
              <p>
                From engineering complex Node.js backends and integrating next-generation AI solutions, to directing pixel-perfect UI/UX designs featuring crisp, modern typography, our leadership intimately understands both the code that powers your business and the psychology that converts your audience.
              </p>
              <p>
                Our small but fiercely dedicated team operates on a simple philosophy: In this rapidly expanding, fiercely competitive digital environment, assist other brands in operating effectively. We provide a link between solid technology and imaginative storytelling. We are able to provide top-notch quality whether you are a global enterprise in need of a custom-built ERP system or a local startup web design and digital marketing company in Coimbatore looking for a brand identity.
              </p>
            </div>
          </div>
        </TiltCard3D>

        {/* Synergy with Search Pin in 3D Tilt Card */}
        <TiltCard3D tiltIntensity={8} glareEnabled={true} className="rounded-3xl">
          <div className="h-full p-8 sm:p-10 rounded-3xl bg-white/80 dark:bg-[#0F0927]/90 backdrop-blur-xl border border-slate-200/80 dark:border-white/10 shadow-xl space-y-6">
            <h4 className="font-general text-xs uppercase tracking-widest text-cyan-500 font-bold">Strategic DNA</h4>
            <h2 className="font-zentry text-2xl sm:text-3xl lg:text-4xl font-black uppercase text-slate-900 dark:text-white leading-tight tracking-wide">
              Our Synergy with Search Pin
              <br />
              <span className="text-lg sm:text-xl font-normal opacity-90 text-cyan-400">Digital Marketing Company in Coimbatore</span>
            </h2>
            <div className="font-robert-regular text-slate-700 dark:text-zinc-300 space-y-4 text-sm sm:text-base leading-relaxed">
              <p>
                What sets Brand Craftsman apart from every other web design and digital marketing company in Coimbatore? Our structural DNA. We are the official partner brand of Search Pin - Digital Marketing Company in Coimbatore. While Brand Craftsman focuses heavily on the artisanal aspects of business growth—crafting the visual identity, developing complex software architectures, creating cinematic video content, and designing user-centric mobile apps—Search Pin powers the outreach.
              </p>
              <p>
                The stunning, high-converting platforms we create for you are instantly supported by industry-leading SEO, customized PPC campaigns, and aggressive marketing thanks to our potent alliance. You get a fully optimized digital sales engine that is ready to capture market share right away, not just a website.
              </p>
            </div>
          </div>
        </TiltCard3D>
      </div>

      {/* 2. Excellence as a Masterful Web Design Agency */}
      <div className="relative w-full flex flex-col items-center px-4 py-16 lg:py-24 bg-white dark:bg-black">
        <p className="font-general text-xs uppercase tracking-widest text-gray-500 mb-4 font-bold">
          Welcome to Brand Craftsman
        </p>
        <AnimatedTitle
          title="Brand Craftsman: Architecting Digital <br /> Excellence as a Masterful Web Design Agency"
          containerClass="!text-slate-900 dark:!text-white text-center tracking-wide"
        />
      </div>

      {/* 3. Expanding Animation Mask with 3D Centerpiece */}
      <div id="about-animation-section" className="relative w-full py-12 md:py-20 px-4 md:px-8 flex items-center justify-center bg-white dark:bg-black overflow-hidden">
        <div className="mask-clip-path relative min-h-[380px] md:min-h-[480px] w-[90vw] md:w-[70vw] max-w-6xl overflow-hidden rounded-[2.5rem] bg-slate-950 shadow-2xl flex flex-col justify-center items-center border border-white/20">
          {/* Background image for the expanding box */}
          <Image
            src="/img/bg-mask.png"
            alt="Background"
            fill
            sizes="(max-width: 768px) 85vw, 55vw"
            className="object-cover"
          />
          {/* 3D floating animation scene embedded inside the expanding canvas */}
          <FloatingGeometry scene="hero" className="opacity-70 pointer-events-none" />

          {/* Indigo/Cyan gradient glassmorphism overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-950/70 via-violet-900/40 to-cyan-900/30 backdrop-blur-md z-0" />
          
          <div className="mask-content-reveal relative z-10 w-full max-w-4xl p-8 md:p-16 text-center flex flex-col items-center justify-center h-full opacity-0">
            <p className="text-white mb-6 font-robert-medium text-2xl md:text-4xl leading-snug font-bold drop-shadow-lg">
              Your search for a high-end design, development, and top-tier web design company in Coimbatore ends here.
            </p>
            <p className="text-zinc-200 font-general text-base md:text-xl leading-relaxed max-w-3xl drop-shadow">
              We are a passionate, multidisciplinary startup community of 10+ elite creators, developers, and strategists. We don’t just build websites. We engineer comprehensive digital ecosystems designed to dominate your market.
            </p>
          </div>
          
          {/* Visual hint when the box is small */}
          <div className="mask-discover-text absolute inset-0 z-20 flex items-center justify-center text-white font-zentry text-3xl md:text-5xl uppercase tracking-widest font-black drop-shadow-[0_4px_16px_rgba(0,0,0,0.8)]">
            Discover
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
