"use client";

import { useState } from "react";
import Link from "next/link";
import { FiUser, FiMail, FiLock, FiEye, FiEyeOff, FiArrowRight } from "react-icons/fi";
import { FaGoogle, FaGithub } from "react-icons/fa";

export default function SignupPage() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#1a0533] via-[#2d1b69] to-[#1e3a5f] px-4 py-20">
      {/* Background effects */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full bg-violet-500/15 blur-[120px]" />
        <div className="absolute -bottom-40 -right-40 w-[500px] h-[500px] rounded-full bg-blue-500/15 blur-[100px]" />
      </div>

      <div className="relative w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-block">
            <h1 className="font-zentry text-3xl font-black text-white uppercase tracking-wider">
              Brand<span className="text-violet-400">Craftsman</span>
            </h1>
          </Link>
          <p className="font-robert-regular text-white/50 mt-2">Create your account and get started.</p>
        </div>

        {/* Card */}
        <div className="rounded-3xl bg-white/[0.06] border border-white/[0.08] backdrop-blur-xl p-8 md:p-10 shadow-2xl">
          {/* Social signup */}
          <div className="flex gap-3 mb-6">
            <button className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-white/[0.06] border border-white/[0.08] text-white font-general text-xs uppercase tracking-wider hover:bg-white/10 transition-all duration-300">
              <FaGoogle className="w-4 h-4" />
              Google
            </button>
            <button className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-white/[0.06] border border-white/[0.08] text-white font-general text-xs uppercase tracking-wider hover:bg-white/10 transition-all duration-300">
              <FaGithub className="w-4 h-4" />
              GitHub
            </button>
          </div>

          {/* Divider */}
          <div className="flex items-center gap-4 my-6">
            <div className="flex-1 h-px bg-white/10" />
            <span className="text-white/30 font-general text-xs uppercase">or sign up with email</span>
            <div className="flex-1 h-px bg-white/10" />
          </div>

          {/* Form */}
          <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
            <div>
              <label className="block text-white/60 font-general text-xs uppercase tracking-wider mb-2">Full Name</label>
              <div className="relative">
                <FiUser className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 w-5 h-5" />
                <input
                  type="text"
                  placeholder="John Doe"
                  className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-white/[0.04] border border-white/10 text-white placeholder-white/30 font-robert-regular focus:outline-none focus:border-violet-500/50 focus:ring-1 focus:ring-violet-500/20 transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-white/60 font-general text-xs uppercase tracking-wider mb-2">Email</label>
              <div className="relative">
                <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 w-5 h-5" />
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-white/[0.04] border border-white/10 text-white placeholder-white/30 font-robert-regular focus:outline-none focus:border-violet-500/50 focus:ring-1 focus:ring-violet-500/20 transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-white/60 font-general text-xs uppercase tracking-wider mb-2">Password</label>
              <div className="relative">
                <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 w-5 h-5" />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Min 8 characters"
                  className="w-full pl-12 pr-12 py-3.5 rounded-xl bg-white/[0.04] border border-white/10 text-white placeholder-white/30 font-robert-regular focus:outline-none focus:border-violet-500/50 focus:ring-1 focus:ring-violet-500/20 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors"
                >
                  {showPassword ? <FiEyeOff className="w-5 h-5" /> : <FiEye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <label className="flex items-start gap-3 cursor-pointer">
              <input type="checkbox" className="w-4 h-4 rounded border-white/20 bg-white/5 text-violet-500 focus:ring-violet-500/20 mt-0.5" />
              <span className="text-white/50 text-sm font-robert-regular leading-tight">
                I agree to the{" "}
                <a href="#" className="text-violet-400 hover:text-violet-300">Terms of Service</a>{" "}
                and{" "}
                <a href="#" className="text-violet-400 hover:text-violet-300">Privacy Policy</a>
              </span>
            </label>

            <button
              type="submit"
              className="group w-full flex items-center justify-center gap-2 py-4 rounded-xl bg-gradient-to-r from-blue-600 to-orange-600 text-white font-general text-sm uppercase tracking-wider hover:shadow-[0_0_40px_rgba(37,99,235,0.4)] hover:scale-[1.02] transition-all duration-300"
            >
              Create Account
              <FiArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </form>

          <p className="text-center mt-6 text-white/50 font-robert-regular text-sm">
            Already have an account?{" "}
            <Link href="/login" className="text-violet-400 hover:text-violet-300 transition-colors font-bold">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
