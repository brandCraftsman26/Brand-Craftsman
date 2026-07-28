"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";
import { FiCheckCircle } from "react-icons/fi";
import Button from "./Button";

gsap.registerPlugin(ScrollTrigger);

const packages = [
  {
    name: "Startup Launchpad",
    price: "₹14,999",
    description: "Perfect for small businesses looking to establish a strong online presence.",
    features: [
      "Custom 5-Page Website",
      "Mobile Responsive Design",
      "Basic On-Page SEO",
      "Social Media Integration",
      "1 Month Free Support",
    ],
    highlight: false,
  },
  {
    name: "E-Commerce Growth",
    price: "₹34,999",
    description: "All-inclusive digital storefront with advanced marketing integrations.",
    features: [
      "Up to 50 Products",
      "Payment Gateway Setup",
      "Advanced SEO Optimization",
      "1-Month Meta Ads Setup",
      "3 Months Premium Support",
    ],
    highlight: true,
  },
  {
    name: "Corporate Enterprise",
    price: "Custom",
    description: "End-to-end digital transformation for established corporations.",
    features: [
      "Unlimited Pages & Products",
      "Custom Web App Functionality",
      "Full Digital Marketing Suite",
      "Dedicated Account Manager",
      "24/7 Priority Support",
    ],
    highlight: false,
  },
];

const Pricing = () => {
  const containerRef = useRef(null);

  useGSAP(() => {
    gsap.fromTo(
      ".pricing-card",
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
        },
      }
    );
  }, { scope: containerRef });

  return (
    <section ref={containerRef} id="pricing" className="py-24 bg-white dark:bg-zinc-950 relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-sm font-bold tracking-widest text-blue-600 dark:text-yellow-500 uppercase mb-4">
            Transparent Pricing
          </p>
          <h2 className="text-4xl md:text-5xl font-black font-zentry text-gray-900 dark:text-white uppercase">
            All-Inclusive Packages
          </h2>
          <p className="mt-6 text-gray-600 dark:text-gray-400 text-lg font-robert-regular">
            Get your business online with our 100% transparent pricing models. No hidden fees, just masterful digital craftsmanship.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center max-w-7xl mx-auto">
          {packages.map((pkg, idx) => (
            <div
              key={idx}
              className={`pricing-card rounded-2xl p-8 lg:p-10 transition-transform hover:-translate-y-2 border ${
                pkg.highlight
                  ? "bg-blue-600 dark:bg-blue-900 border-transparent shadow-2xl scale-105 relative z-10"
                  : "bg-gray-50 dark:bg-zinc-900 border-gray-200 dark:border-white/10"
              }`}
            >
              {pkg.highlight && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-yellow-400 text-black text-xs font-bold uppercase tracking-widest py-1 px-4 rounded-full shadow-lg">
                  Most Popular
                </div>
              )}
              
              <h3 className={`text-2xl font-bold font-zentry uppercase tracking-wide ${pkg.highlight ? "text-white" : "text-gray-900 dark:text-white"}`}>
                {pkg.name}
              </h3>
              
              <div className="my-6">
                <span className={`text-4xl font-black ${pkg.highlight ? "text-yellow-400" : "text-gray-900 dark:text-white"}`}>
                  {pkg.price}
                </span>
                {pkg.price !== "Custom" && (
                  <span className={`text-sm ${pkg.highlight ? "text-blue-200" : "text-gray-500 dark:text-gray-400"}`}>
                    /project
                  </span>
                )}
              </div>
              
              <p className={`mb-8 h-12 text-sm font-robert-regular ${pkg.highlight ? "text-blue-100" : "text-gray-600 dark:text-gray-400"}`}>
                {pkg.description}
              </p>
              
              <ul className="space-y-4 mb-8">
                {pkg.features.map((feature, fIdx) => (
                  <li key={fIdx} className="flex items-start gap-3">
                    <FiCheckCircle className={`mt-1 flex-shrink-0 ${pkg.highlight ? "text-yellow-400" : "text-blue-600 dark:text-yellow-500"}`} />
                    <span className={`text-sm ${pkg.highlight ? "text-white/90" : "text-gray-700 dark:text-gray-300"}`}>
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>
              
              <div className="pt-4 border-t border-dashed border-gray-300 dark:border-white/10 mt-auto">
                <Button
                  id={`btn-${idx}`}
                  title="Get Started"
                  containerClass={`w-full !px-0 flex-center ${
                    pkg.highlight
                      ? "!bg-yellow-400 text-black hover:!bg-white"
                      : "bg-blue-600 text-white hover:bg-blue-700 dark:bg-white/10 dark:hover:bg-white/20"
                  }`}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;
