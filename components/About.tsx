"use client";

import Image from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import AnimatedTitle from "./AnimatedTitle";

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  useGSAP(() => {
    const clipAnimation = gsap.timeline({
      scrollTrigger: {
        trigger: "#about-animation-section",
        start: "center center",
        end: "+=800 center",
        scrub: 0.5,
        pin: true,
        pinSpacing: true,
      },
    });

    clipAnimation.to(".mask-discover-text", {
      opacity: 0,
      duration: 0.2,
    }, 0)
    .to(".mask-clip-path", {
      width: "100%",
      height: "100vh",
      borderRadius: 0,
      duration: 1,
    }, 0)
    .to(".mask-content-reveal", {
      opacity: 1,
      duration: 0.8,
      ease: "power2.inOut",
    }, 0.2);
  });

  return (
    <div id="about" className="w-full bg-blue-50 dark:bg-zinc-900 pt-20">
      
      {/* 1. Content between Logo Slider and "Excellence..." Title */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-12 mb-10 grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* The Creative Behind the Craft */}
        <div className="space-y-6">
          <h4 className="font-general text-sm uppercase tracking-widest text-blue-500">The Creative Behind the Craft</h4>
          <h2 className="font-zentry text-3xl md:text-4xl font-black uppercase text-black dark:text-white leading-tight">
            How did we start our journey as a web design and digital marketing company in Coimbatore?
          </h2>
          <div className="font-robert-regular text-gray-700 dark:text-gray-300 space-y-4 text-base leading-relaxed">
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

        {/* Synergy with Search Pin */}
        <div className="space-y-6 lg:mt-12">
          <h2 className="font-zentry text-3xl md:text-4xl font-black uppercase text-black dark:text-white leading-tight">
            Our Synergy with Search Pin
            <br />
            <span className="text-xl md:text-2xl tracking-normal opacity-80 text-blue-500">Digital Marketing Company in Coimbatore</span>
          </h2>
          <div className="font-robert-regular text-gray-700 dark:text-gray-300 space-y-4 text-base leading-relaxed">
            <p>
              What sets Brand Craftsman apart from every other web design and digital marketing company in Coimbatore? Our structural DNA. We are the official partner brand of Search Pin - Digital Marketing Company in Coimbatore. While Brand Craftsman focuses heavily on the artisanal aspects of business growth—crafting the visual identity, developing complex software architectures, creating cinematic video content, and designing user-centric mobile apps—Search Pin powers the outreach.
            </p>
            <p>
              The stunning, high-converting platforms we create for you are instantly supported by industry-leading SEO, customized PPC campaigns, and aggressive marketing thanks to our potent alliance. You get a fully optimized digital sales engine that is ready to capture market share right away, not just a website.
            </p>
          </div>
        </div>
      </div>

      {/* 2. Excellence as a Masterful Web Design Agency */}
      <div className="relative w-full flex flex-col items-center px-4 py-20 lg:py-32 bg-white dark:bg-black">
        <p className="font-general text-sm uppercase md:text-[10px] tracking-widest text-gray-500 mb-6">
          Welcome to Brand Craftsman
        </p>
        <AnimatedTitle
          title="<b>B</b>rand Craftsman: Architecting Digital <br /> Excellence as a Masterful Web Design Agency"
          containerClass="!text-black dark:!text-white text-center"
        />
      </div>

      {/* 3. Expanding Animation Mask */}
      <div id="about-animation-section" className="relative h-screen w-full flex items-center justify-center bg-white dark:bg-black overflow-hidden">
        <div className="mask-clip-path relative h-[40vh] w-[80vw] md:w-[50vw] overflow-hidden rounded-[2rem] bg-blue-600 dark:bg-zinc-800 shadow-2xl flex flex-col justify-center items-center border border-white/10">
          {/* Background image for the expanding box */}
          <Image
            src="/img/bg-mask.png"
            alt="Background"
            fill
            className="object-cover"
          />
          {/* Blue gradient glassmorphism overlay inside the expanding box */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/60 via-blue-800/40 to-blue-500/20 backdrop-blur-md z-0" />
          
          <div className="mask-content-reveal relative z-10 w-full max-w-4xl p-8 md:p-16 text-center flex flex-col items-center justify-center h-full opacity-0">
            <p className="text-white mb-6 font-robert-medium text-2xl md:text-4xl leading-snug">
              Your search for a high-end design, development, and top-tier web design company in Coimbatore ends here.
            </p>
            <p className="text-gray-300 font-general text-lg md:text-xl leading-relaxed max-w-3xl">
              We are a passionate, multidisciplinary startup community of 10+ elite creators, developers, and strategists. We don’t just build websites. We engineer comprehensive digital ecosystems designed to dominate your market.
            </p>
          </div>
          
          {/* Visual hint when the box is small */}
          <div className="mask-discover-text absolute inset-0 z-20 flex items-center justify-center text-white font-zentry text-3xl md:text-5xl uppercase tracking-widest">
            Discover
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
