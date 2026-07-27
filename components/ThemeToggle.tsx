"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const ThemeToggle = () => {
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return <div className="w-20 h-10" />;

  const isDark = resolvedTheme === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className={`relative w-[82px] h-[40px] rounded-full transition-colors duration-500 ease-in-out p-1 shadow-inner border-2 ${
        isDark
          ? "bg-[#0b1b4f] border-[#182a69]"
          : "bg-[#4da9ff] border-[#81c2ff]"
      }`}
      aria-label="Toggle theme"
    >
      {/* Track Background Elements */}

      {/* Light Mode: Sun & Cloud (on the right) */}
      <div
        className={`absolute right-2 top-1/2 -translate-y-1/2 transition-all duration-500 pointer-events-none ${
          isDark ? "opacity-0 scale-75 translate-x-3" : "opacity-100 scale-100 translate-x-0"
        }`}
      >
        <div className="relative w-8 h-7 flex items-center justify-center">
          {/* Sun */}
          <svg className="absolute -top-1 right-0 w-6 h-6 animate-[spin_12s_linear_infinite]" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="5" fill="#FFC800" />
            <path d="M12 2V4M12 20V22M2 12H4M20 12H22M4.93 4.93L6.34 6.34M17.66 17.66L19.07 19.07M4.93 19.07L6.34 17.66M17.66 6.34L19.07 4.93" stroke="#FFC800" strokeWidth="2" strokeLinecap="round" />
          </svg>

          {/* Fluffy Cloud overlapping Sun */}
          <svg className="absolute bottom-0 right-0 w-7 h-5 drop-shadow-sm" viewBox="0 0 28 20" fill="none">
            <path
              d="M7 16H22C24.7614 16 27 13.7614 27 11C27 8.35624 24.9452 6.19232 22.3401 6.01757C21.684 2.5843 18.6477 0 15 0C12.0628 0 9.53123 1.66699 8.30932 4.10173C7.57597 3.42442 6.58619 3 5.5 3C3.01472 3 1 5.01472 1 7.5C1 8.24355 1.18047 8.94491 1.50029 9.56232C0.582847 10.4285 0 11.6483 0 13C0 15.7614 2.23858 18 5 18H7Z"
              fill="#FFFFFF"
            />
          </svg>
        </div>
      </div>

      {/* Dark Mode: Crescent Moon & Sparkles (on the left) */}
      <div
        className={`absolute left-2.5 top-1/2 -translate-y-1/2 transition-all duration-500 pointer-events-none ${
          isDark ? "opacity-100 scale-100 translate-x-0" : "opacity-0 scale-75 -translate-x-3"
        }`}
      >
        <div className="relative w-8 h-7 flex items-center">
          {/* Crescent Moon */}
          <svg className="w-5 h-5 text-yellow-300 drop-shadow-[0_0_8px_rgba(253,224,71,0.5)]" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12.3 2a10 10 0 0 0 9.7 13.6 10 10 0 1 1-11.3-13.4 9.8 9.8 0 0 0 1.6-.2z" />
          </svg>

          {/* Sparkle Star 1 (Right of moon) */}
          <svg className="absolute top-0.5 right-0.5 w-3 h-3 text-white animate-pulse" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
          </svg>

          {/* Sparkle Star 2 (Top Left) */}
          <svg className="absolute -top-1 left-0.5 w-2 h-2 text-white/80 animate-pulse" style={{ animationDelay: "0.4s" }} viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
          </svg>

          {/* Sparkle Star 3 (Bottom) */}
          <svg className="absolute -bottom-1 left-3 w-2 h-2 text-white/70 animate-pulse" style={{ animationDelay: "0.8s" }} viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
          </svg>
        </div>
      </div>

      {/* Slider Circular Knob (White 3D Ball) */}
      <div
        className={`w-7 h-7 rounded-full bg-gradient-to-b from-white via-gray-100 to-gray-300 shadow-[0_2px_5px_rgba(0,0,0,0.3),inset_0_-1px_2px_rgba(0,0,0,0.1)] border border-white/80 transition-transform duration-500 ease-[cubic-bezier(0.68,-0.55,0.27,1.55)] ${
          isDark ? "translate-x-[42px]" : "translate-x-0"
        }`}
      />
    </button>
  );
};

export default ThemeToggle;
