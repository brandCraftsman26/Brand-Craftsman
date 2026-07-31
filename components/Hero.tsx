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

        <div className="special-font hero-heading absolute bottom-5 right-5 z-40 text-blue-75 opacity-80">
          P<b>I</b>N
        </div>

        <div className="absolute left-0 top-0 z-40 size-full flex items-center">
          <div className="mt-16 px-5 sm:px-12 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 rounded-full text-blue-100 font-general text-xs uppercase tracking-widest">
              <FiShield className="text-cyan-400" /> Premier Web & Digital Agency
            </div>

            <div className="special-font hero-heading uppercase text-blue-100 leading-none">
              S<b>E</b>ARCH
            </div>

            <h1 className="mb-8 max-w-xl font-robert-regular text-blue-100 text-lg md:text-2xl leading-relaxed drop-shadow-lg">
              Architecting Digital Excellence as a Masterful Web Design & Digital Marketing Company in Coimbatore.
            </h1>

            <div className="flex flex-wrap gap-4 items-center">
              <Link href="/contact">
                <Button
                  id="get-started"
                  title="Get Started Now"
                  leftIcon={<TiLocationArrow className="text-xl" />}
                  containerClass="!bg-gradient-to-r from-blue-600 to-orange-600 text-white font-bold shadow-[0_0_30px_rgba(37,99,235,0.6)] hover:scale-105 transition-all flex-center gap-2 px-8 py-4 text-sm md:text-base uppercase tracking-wider rounded-full"
                />
              </Link>
              <Link
                href="/portfolios"
                className="px-6 py-4 rounded-full text-white font-general text-xs md:text-sm font-bold uppercase tracking-wider transition-all flex items-center gap-2"
              >
                <FiCheckCircle className="text-emerald-400" /> View Portfolios
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="special-font hero-heading absolute bottom-5 right-5 text-black dark:text-white">
        P<b>I</b>N
      </div>
    </div>
  );
};

export default Hero;


