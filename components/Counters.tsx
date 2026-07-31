"use client";

import { useEffect, useRef, useState } from "react";

interface CounterItem {
  value: number;
  suffix: string;
  label: string;
}

const countersData: CounterItem[] = [
  { value: 150, suffix: "+", label: "Projects Delivered" },
  { value: 50, suffix: "+", label: "Happy Clients" },
  { value: 12, suffix: "+", label: "Years Experience" },
  { value: 99, suffix: "%", label: "Satisfaction Rate" },
];

function useCountUp(target: number, duration: number = 2000, start: boolean) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!start) return;
    let startTime: number | null = null;
    let rafId: number;

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) {
        rafId = requestAnimationFrame(step);
      }
    };

    rafId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafId);
  }, [target, duration, start]);

  return count;
}

const CounterBox = ({ item, index, isVisible }: { item: CounterItem; index: number; isVisible: boolean }) => {
  const count = useCountUp(item.value, 2000, isVisible);

  return (
    <div
      className="group relative p-8 rounded-3xl bg-[#0F0927]/80 border border-white/10 hover:border-[#6766FF]/60 backdrop-blur-xl transition-all duration-500 hover:scale-105 hover:shadow-[0_0_35px_rgba(103,102,255,0.3)] text-center"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(40px)",
        transition: `opacity 0.6s ease ${index * 0.15}s, transform 0.6s ease ${index * 0.15}s`,
      }}
    >
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-[#6766FF]/10 to-[#00F0FF]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      <h2 className="relative font-zentry text-4xl md:text-5xl lg:text-6xl font-black text-white mb-3">
        {count}
        <span className="text-cyan-400 font-bold">{item.suffix}</span>
      </h2>
      <p className="relative font-general text-xs md:text-sm uppercase tracking-widest text-zinc-300 font-semibold">{item.label}</p>
    </div>
  );
};

const Counters = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-24 md:py-32 bg-[#080220] border-b border-white/10 overflow-hidden"
    >
      {/* Intellio Mesh Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[450px] bg-[#6766FF]/10 blur-[140px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <div
          className="text-center mb-16"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 0.6s ease, transform 0.6s ease",
          }}
        >
          <h3 className="font-zentry text-3xl md:text-4xl lg:text-5xl font-black text-white uppercase tracking-tight">
            Trusted by <span className="text-hyper-gradient">Brands</span> Worldwide
          </h3>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
          {countersData.map((item, index) => (
            <CounterBox key={index} item={item} index={index} isVisible={isVisible} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Counters;
