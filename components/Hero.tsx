"use client";

import { useState, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";
import { TiLocationArrow } from "react-icons/ti";
import Button from "./Button";

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
  });

  return (
    <div className="relative h-dvh w-full overflow-x-hidden">      <div
        id="video-frame"
        className="relative z-10 h-dvh w-full overflow-hidden rounded-lg bg-blue-75"
      >
        <div className="absolute left-0 top-0 size-full">
          <video
            src="videos/brand-hero-1.mp4"
            autoPlay
            loop
            muted
            playsInline
            className={`absolute left-0 top-0 size-full object-cover object-center transition-opacity duration-1000 ease-in-out ${
              currentVideo === 1 ? "opacity-100" : "opacity-0"
            }`}
          />
          <video
            src="videos/brand-hero-2.mp4"
            autoPlay
            loop
            muted
            playsInline
            className={`absolute left-0 top-0 size-full object-cover object-center transition-opacity duration-1000 ease-in-out ${
              currentVideo === 2 ? "opacity-100" : "opacity-0"
            }`}
          />
        </div>

        <div className="special-font hero-heading absolute bottom-5 right-5 z-40 text-blue-75">
          P<b>I</b>N
        </div>

        <div className="absolute left-0 top-0 z-40 size-full">
          <div className="mt-24 px-5 sm:px-10">
            <div className="special-font hero-heading uppercase text-blue-100">
              S<b>E</b>ARCH
            </div>

            <h1 className="mb-8 max-w-xl font-robert-regular text-blue-100 text-lg md:text-xl leading-relaxed drop-shadow-md">
              Architecting Digital Excellence as a Masterful Web Design Company in Coimbatore.
            </h1>

            <Button
              id="get-started"
              title="Get Started"
              leftIcon={<TiLocationArrow className="text-xl" />}
              containerClass="!bg-yellow-400 text-black font-bold shadow-[0_0_30px_rgba(250,204,21,0.6)] hover:!bg-yellow-300 hover:scale-105 transition-all flex-center gap-2 px-8 py-4 md:text-base uppercase tracking-wider"
            />
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

