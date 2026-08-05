"use client";

import React from "react";
import { useRealtime } from "@/hooks/use-realtime";
import { CmsLogo } from "@/lib/supabase/db";
import Image from "next/image";

const fallbackClients = [
  { name: "Search Pin", logo_url: "/img/logo-dark.png" },
  { name: "Brand Craftsman", logo_url: "/img/logo-light.png" },
  { name: "Kovai Tex", logo_url: "/img/logo-dark.png" },
  { name: "Apex Digital", logo_url: "/img/logo-light.png" },
  { name: "Aura Luxe", logo_url: "/img/logo-dark.png" },
];

const LogoSlider = () => {
  const { data: dbLogos } = useRealtime<CmsLogo>("cms_logos");

  const displayLogos = dbLogos.length > 0 ? dbLogos : fallbackClients;
  const marqueeClients = [...displayLogos, ...displayLogos, ...displayLogos];

  return (
    <section className="relative w-full overflow-hidden bg-white py-12 dark:bg-zinc-950">
      <div className="absolute inset-y-0 left-0 z-10 w-32 bg-gradient-to-r from-white to-transparent dark:from-zinc-950"></div>
      <div className="absolute inset-y-0 right-0 z-10 w-32 bg-gradient-to-l from-white to-transparent dark:from-zinc-950"></div>
      
      <div className="flex w-full select-none overflow-hidden">
        <div className="flex w-max shrink-0 animate-marquee items-center gap-16 pr-16 md:gap-24 md:pr-24">
          {marqueeClients.map((client, idx) => (
            <div 
              key={idx} 
              className="group flex items-center justify-center opacity-60 grayscale transition-all duration-300 hover:opacity-100 hover:grayscale-0"
            >
              {"logo_url" in client && client.logo_url ? (
                <Image src={client.logo_url} alt={client.name} width={200} height={48} className="h-10 md:h-12 w-auto object-contain" />
              ) : (
                <span className="font-zentry text-3xl font-black uppercase tracking-widest text-black dark:text-white md:text-5xl">
                  {client.name}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LogoSlider;
