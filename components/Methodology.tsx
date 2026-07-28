"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";
import { FiSearch, FiCode, FiCheckCircle, FiTrendingUp } from "react-icons/fi";

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    title: "Discovery & Strategy",
    description: "Every project starts with a deep dive. We sit down with you to understand your market, your competitors, and your long-term goals. We do not write a single line of code or sketch a single logo until we have a bulletproof strategy.",
    icon: <FiSearch className="text-2xl" />,
    color: "#a855f7", // purple-500
    shadow: "0 0 25px rgba(168,85,247,0.6)"
  },
  {
    title: "Development & Execution",
    description: "Our developers, writers, and designers get to work. We use agile development methodologies, providing you with regular updates and staging links so you can watch your project come to life in real time.",
    icon: <FiCode className="text-2xl" />,
    color: "#3b82f6", // blue-500
    shadow: "0 0 25px rgba(59,130,246,0.6)"
  },
  {
    title: "Testing & Optimization",
    description: "Before anything goes live, it passes through rigorous Quality Assurance. We test for cross-browser compatibility, mobile responsiveness, security vulnerabilities, and page speed. We ensure perfection.",
    icon: <FiCheckCircle className="text-2xl" />,
    color: "#22c55e", // green-500
    shadow: "0 0 25px rgba(34,197,94,0.6)"
  },
  {
    title: "Launch & Scale",
    description: "We handle the deployment smoothly. But launch day is just the beginning. Through our partnership with Search Pin, we immediately pivot to scaling your brand through aggressive digital marketing and continuous technical support.",
    icon: <FiTrendingUp className="text-2xl" />,
    color: "#f97316", // orange-500
    shadow: "0 0 25px rgba(249,115,22,0.6)"
  }
];

const Methodology = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top center",
        end: "bottom center",
        scrub: 1,
      },
    });

    // Animate the progress line
    tl.to(".progress-line-fill", {
      height: "100%",
      ease: "none",
    });

    // Stagger step reveals
    gsap.to(".methodology-step", {
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 75%",
        end: "bottom 80%",
      },
      x: 0,
      opacity: 1,
      duration: 0.8,
      stagger: 0.3,
      ease: "back.out(1.2)",
    });

    // Highlight icons when reached and KEEP them active/visible after scrolling
    const stepElements = gsap.utils.toArray<HTMLElement>(".methodology-icon");
    stepElements.forEach((step, index) => {
      const stepData = steps[index];
      
      ScrollTrigger.create({
        trigger: step,
        start: "top 90%",
        onEnter: () => gsap.to(step, { backgroundColor: stepData.color, borderColor: stepData.color, color: "white", boxShadow: stepData.shadow, duration: 0.5 }),
        onLeave: () => gsap.to(step, { backgroundColor: stepData.color, borderColor: stepData.color, color: "white", boxShadow: stepData.shadow, duration: 0.5 }),
        onEnterBack: () => gsap.to(step, { backgroundColor: stepData.color, borderColor: stepData.color, color: "white", boxShadow: stepData.shadow, duration: 0.5 }),
        onLeaveBack: () => gsap.to(step, { clearProps: "all", duration: 0.5 }),
      });
    });

  }, { scope: containerRef });

  return (
    <section id="methodology" className="bg-white dark:bg-zinc-950 py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="max-w-4xl mx-auto" ref={containerRef}>
        <div className="text-center mb-20">
          <h4 className="font-general text-sm uppercase tracking-widest text-gray-500 dark:text-gray-400 mb-2">
            The Craftsman’s Process
          </h4>
          <h2 className="font-zentry text-4xl md:text-5xl font-black uppercase text-black dark:text-white leading-tight">
            Our Methodology
          </h2>
          <p className="mt-4 text-gray-600 dark:text-gray-400 font-robert-regular text-lg max-w-2xl mx-auto">
            How do we consistently deliver true excellence? Through a refined, battle-tested process that guarantees transparency, efficiency, and superior results.
          </p>
        </div>

        <div className="relative">
          {/* Vertical Progress Line Background */}
          <div className="absolute left-6 sm:left-8 md:left-1/2 top-0 bottom-0 w-1 bg-gray-200 dark:bg-white/10 -translate-x-1/2 rounded-full"></div>
          
          {/* Vertical Progress Line Fill */}
          <div className="progress-line-fill absolute left-6 sm:left-8 md:left-1/2 top-0 w-1 bg-gradient-to-b from-blue-400 to-purple-600 -translate-x-1/2 rounded-full h-0"></div>

          <div className="space-y-12 md:space-y-0 relative">
            {steps.map((step, index) => {
              const isEven = index % 2 === 0;
              return (
                <div 
                  key={index}
                  className={`methodology-step relative flex flex-col sm:flex-row items-center md:justify-between w-full md:min-h-[200px] opacity-0 ${
                    isEven ? "md:flex-row-reverse" : ""
                  }`}
                  style={{ transform: `translateX(${isEven ? '50px' : '-50px'})` }}
                >
                  {/* Timeline Center Icon (Visible on all screens) */}
                  <div className="absolute left-6 sm:left-8 md:left-1/2 -translate-x-1/2 z-10 flex">
                    <div className="methodology-icon w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-white dark:bg-zinc-900 border-4 border-gray-100 dark:border-white/10 text-gray-400 dark:text-gray-500 flex items-center justify-center transition-all duration-500 shadow-md">
                      {step.icon}
                    </div>
                  </div>

                  {/* Empty space for alternating layout on desktop */}
                  <div className="hidden md:block md:w-5/12"></div>

                  {/* Content Card */}
                  <div className="w-full pl-16 sm:pl-24 md:pl-0 md:w-5/12">
                    <div className="p-6 md:p-8 bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10 rounded-3xl hover:border-blue-500/30 transition-all duration-300 shadow-sm hover:shadow-md relative">
                      
                      {/* Header with Icon Badge & Number */}
                      <div className="flex items-center gap-3 mb-3 relative z-10">
                        <span className="font-zentry text-4xl sm:text-5xl font-black text-blue-500 mr-2">
                          0{index + 1}.
                        </span>
                        <h3 className="font-zentry text-2xl font-bold uppercase text-black dark:text-white">
                          {step.title}
                        </h3>
                      </div>

                      <p className="font-robert-regular text-gray-600 dark:text-gray-400 leading-relaxed relative z-10">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Methodology;
