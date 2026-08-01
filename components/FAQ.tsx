"use client";

import React, { useState, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";
import { FiPlus, FiMinus } from "react-icons/fi";

gsap.registerPlugin(ScrollTrigger);

const faqs = [
  {
    question: "What distinguishes Brand Craftsman from other web design companies in Coimbatore?",
    answer: "Brand Craftsman - Web Design Company in Coimbatore is led by an exceptional group of full-stack developers, digital marketers, and designers with more than seven years of extensive technical knowledge, in contrast to traditional agencies that solely concentrate on aesthetics. Our team of over ten people, founded by Santhosh Shanmugasundaram, connects high-performance technology with elegant design. Additionally, every asset we produce as Search Pin's partner brand is naturally designed for search engine optimization and successful digital marketing from the outset."
  },
  {
    question: "How does the partnership with Search Pin make you the best digital marketing company in Coimbatore for my needs?",
    answer: "Our partnership means you get a true end-to-end solution. Brand Craftsman builds the engine (your branding, website, apps, and software), and Search Pin provides the fuel (SEO, PPC, and Social Media Ads). This eliminates the friction of hiring a separate web design and digital marketing company in Coimbatore. The developers who build your site work side-by-side with the marketers who will promote it, ensuring your digital presence is built for maximum conversion and ROI from day one."
  },
  {
    question: "Do you create unique software and web apps from the ground up?",
    answer: "Of course. Custom software creation is our primary strength, even if we are quite skilled with reliable CMS platforms. Using cutting-edge backend architectures, frontend frameworks (like React), and specialized API connections (including sophisticated Generative AI integrations), we create scalable, secure applications. Our development team can create a custom cloud application, a sophisticated ERP system, or a cross-platform mobile app from the ground up to meet your unique operational requirements."
  },
  {
    question: "How much time does it take to finish a branding and digital marketing project?",
    answer: "The extent and complexity of your needs will determine the timeline. From early discovery to final deployment, a typical brand identity and business website project takes four to eight weeks. Projects involving mobile apps or extensive custom software development could take three to six months. We give you a thorough roadmap and firm deadlines at our first meeting, and our agile methodology guarantees that you will receive regular updates all along the way."
  },
  {
    question: "What industries do you serve?",
    answer: "As a multidisciplinary startup community and web design and digital marketing company in Coimbatore, we have the agility and technical depth to serve a wide array of industries. From local businesses, real estate, and healthcare in Coimbatore to tech startups, e-commerce brands, and large corporate enterprises globally, our strategies are highly adaptable. Our data-driven research phase ensures that we intimately understand your specific industry niche, competitors, and target audience before we begin the creative and development phases."
  }
];

const FAQ = ({ data }: { data?: { question: string; answer: string }[] }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.to(".faq-item", {
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 80%",
      },
      y: 0,
      opacity: 1,
      duration: 0.6,
      stagger: 0.1,
      ease: "power2.out",
    });
  }, { scope: containerRef });

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqData = data || faqs;

  return (
    <section id="faq" className="bg-blue-50 dark:bg-zinc-900 py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto" ref={containerRef}>
        <div className="text-center mb-16">
          <h4 className="font-general text-sm uppercase tracking-widest text-blue-500 mb-2">
            Got Questions?
          </h4>
          <h2 className="font-zentry text-4xl md:text-5xl font-black uppercase text-black dark:text-white leading-none">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-4">
          {faqData.map((faq, index) => {
            const isOpen = openIndex === index;
            
            return (
              <div 
                key={index} 
                className="faq-item border border-gray-200 dark:border-white/10 rounded-2xl bg-white dark:bg-black/20 overflow-hidden transition-all duration-300"
                style={{ opacity: 0, transform: "translateY(50px)" }}
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full flex items-center justify-between p-6 text-left focus:outline-none"
                >
                  <span className="font-zentry text-xl md:text-2xl font-bold uppercase text-black dark:text-white pr-8">
                    {faq.question}
                  </span>
                  <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-300 ${isOpen ? 'bg-blue-500 text-white' : 'bg-gray-100 dark:bg-white/10 text-gray-500 dark:text-white'}`}>
                    {isOpen ? <FiMinus /> : <FiPlus />}
                  </div>
                </button>
                
                <div 
                  className={`grid transition-all duration-300 ease-in-out ${
                    isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="p-6 pt-0 font-robert-regular text-gray-800 dark:text-zinc-200 leading-relaxed text-base md:text-lg font-medium">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
