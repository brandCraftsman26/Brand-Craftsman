"use client";

import { useEffect, useRef, useState } from "react";
import { FiStar } from "react-icons/fi";
import { useRealtime } from "@/hooks/use-realtime";
import { CmsReview } from "@/lib/supabase/db";

const fallbackTestimonials = [
  {
    quote: "Brand Craftsman transformed our online presence completely. Their strategic approach to web design and digital marketing delivered results beyond our expectations. The team is responsive and truly understands brand building.",
    name: "Rajesh Kumar",
    role: "CEO, TechNova Solutions",
    rating: 5,
    avatar: "RK",
  },
  {
    quote: "Working with Brand Craftsman was a game-changer for our business. They not only delivered a stunning website but also provided valuable insights that added immense value to our overall digital strategy.",
    name: "Priya Sharma",
    role: "Founder, DesignHub",
    rating: 5,
    avatar: "PS",
  },
  {
    quote: "The team at Brand Craftsman is exceptional! From the initial consultation to the final delivery, every step was professional and well-executed. Our conversion rates have increased by 300% since the redesign.",
    name: "Arun Patel",
    role: "Marketing Director, ScaleUp Inc",
    rating: 5,
    avatar: "AP",
  },
];

const avatarColors = [
  "from-[#6766FF] to-[#9D4EDD]",
  "from-[#00F0FF] to-[#6766FF]",
  "from-[#0DB561] to-[#00F0FF]",
  "from-[#FF9F31] to-[#FF007A]",
  "from-[#FF007A] to-[#6766FF]",
  "from-[#6766FF] to-[#00F0FF]",
];

const TestimonialSlider = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const { data: dbReviews } = useRealtime<CmsReview>("cms_reviews");

  const displayReviews = dbReviews.length > 0
    ? dbReviews.map((r) => ({
        quote: r.quote,
        name: r.author,
        role: `${r.role}${r.company ? `, ${r.company}` : ""}`,
        rating: r.rating || 5,
        avatar: r.author.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase() || "BC",
      }))
    : fallbackTestimonials;

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-24 md:py-32 bg-slate-50 dark:bg-[#07011F] overflow-hidden">
      {/* Intellio Mesh Glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-[#6766FF]/10 blur-[150px] rounded-full" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Heading */}
        <div
          className="text-center mb-16 max-w-3xl mx-auto"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 0.6s ease, transform 0.6s ease",
          }}
        >
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-amber-500/10 border border-amber-400/30 text-amber-500 dark:text-amber-300 font-general text-xs uppercase tracking-widest font-bold mb-4">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse" />
            CLIENT VERIFIED REVIEWS
          </div>
          <h2 className="font-zentry text-4xl sm:text-5xl md:text-6xl font-black text-slate-900 dark:text-white uppercase leading-tight">
            What Our Clients Say
          </h2>
        </div>

        {/* Testimonial Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {displayReviews.map((testimonial, index) => (
            <div
              key={index}
              className="group relative p-8 rounded-3xl bg-white dark:bg-[#0F0927]/80 border border-slate-200 dark:border-white/10 hover:border-cyan-400/60 backdrop-blur-xl transition-all duration-500 hover:shadow-[0_0_35px_rgba(0,240,255,0.2)] hover:-translate-y-2 flex flex-col justify-between"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? "translateY(0)" : "translateY(30px)",
                transition: `opacity 0.5s ease ${index * 0.1}s, transform 0.5s ease ${index * 0.1}s`,
              }}
            >
              {/* Quote Mark */}
              <div className="absolute top-6 right-6 text-5xl text-indigo-500/15 font-serif select-none">&ldquo;</div>

              {/* Stars */}
              <div className="flex gap-1.5 mb-5">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <FiStar key={i} className="w-5 h-5 text-amber-400 fill-amber-400" />
                ))}
              </div>

              {/* Quote Text */}
              <p className="font-robert-medium text-slate-900 dark:text-zinc-100 leading-relaxed text-base font-semibold mb-8">
                &ldquo;{testimonial.quote}&rdquo;
              </p>

              {/* Author */}
              <div className="flex items-center gap-3.5 pt-4 border-t border-slate-200 dark:border-white/10">
                <div className={`w-11 h-11 rounded-full bg-gradient-to-br ${avatarColors[index % avatarColors.length]} flex items-center justify-center text-white text-sm font-black shadow-md`}>
                  {testimonial.avatar}
                </div>
                <div>
                  <h4 className="font-robert-medium text-base font-extrabold text-slate-900 dark:text-white">
                    {testimonial.name}
                  </h4>
                  <p className="font-general text-xs text-slate-700 dark:text-zinc-400 font-bold">
                    {testimonial.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialSlider;
