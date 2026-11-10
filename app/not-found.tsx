import Link from "next/link";
import { FiHome, FiArrowRight } from "react-icons/fi";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#1a0533] via-[#2d1b69] to-[#1e3a5f] px-4 py-20">
      {/* Background effects */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-violet-500/10 blur-[150px]" />
      </div>

      <div className="relative text-center max-w-lg">
        {/* 404 big text */}
        <h1 className="font-zentry text-8xl md:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-pink-400 to-blue-400 leading-none mb-6">
          404
        </h1>

        <h2 className="font-zentry text-2xl md:text-3xl font-black text-white uppercase tracking-wide mb-4">
          Page Not Found
        </h2>

        <p className="font-robert-regular text-white/60 leading-relaxed mb-8 text-base">
          Oops! The page you are looking for doesn&apos;t exist or has been moved. Let&apos;s get you back on track.
        </p>

        <div className="flex flex-wrap justify-center gap-4">
          <Link
            href="/"
            className="group inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-violet-600 via-indigo-600 to-cyan-500 text-white font-general text-sm uppercase tracking-wider rounded-full hover:shadow-[0_0_40px_rgba(124,58,237,0.5)] hover:scale-105 transition-all duration-300"
          >
            <FiHome className="w-4 h-4" />
            Back To Home
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 border border-white/20 text-white font-general text-sm uppercase tracking-wider rounded-full hover:bg-white/10 transition-all duration-300"
          >
            Contact Support
            <FiArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
