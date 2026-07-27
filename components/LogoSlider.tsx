"use client";

import React from "react";

const clients = [
  "Microsoft",
  "Google",
  "Amazon",
  "Spotify",
  "Netflix",
  "Meta",
  "Apple",
  "Tesla",
];

// Duplicate the array to ensure seamless infinite scrolling
const marqueeClients = [...clients, ...clients, ...clients];

const LogoSlider = () => {
  return (
    <section className="relative w-full overflow-hidden bg-white py-12 dark:bg-zinc-950">
      <div className="absolute inset-y-0 left-0 z-10 w-32 bg-gradient-to-r from-white to-transparent dark:from-zinc-950"></div>
      <div className="absolute inset-y-0 right-0 z-10 w-32 bg-gradient-to-l from-white to-transparent dark:from-zinc-950"></div>
      
      <div className="flex w-full select-none overflow-hidden">
        <div className="flex w-max shrink-0 animate-marquee items-center gap-16 pr-16 md:gap-24 md:pr-24">
          {marqueeClients.map((client, idx) => (
            <div 
              key={idx} 
              className="group flex items-center justify-center opacity-50 grayscale transition-all duration-300 hover:opacity-100 hover:grayscale-0"
            >
              <span className="font-zentry text-3xl font-black uppercase tracking-widest text-black dark:text-white md:text-5xl">
                {client}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LogoSlider;
