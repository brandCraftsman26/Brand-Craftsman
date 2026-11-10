"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/providers/AuthProvider";
import dynamic from "next/dynamic";
import { FiMail, FiLock, FiArrowRight, FiShield, FiX, FiCheck, FiInfo, FiKey } from "react-icons/fi";
import { FaGoogle, FaFacebook, FaApple } from "react-icons/fa6";

const FloatingGeometry = dynamic(() => import("@/components/3d/FloatingGeometry"), { ssr: false });

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [socialLoading, setSocialLoading] = useState<string | null>(null);

  // Social modal state for unconfigured OAuth credentials
  const [activeSocialModal, setActiveSocialModal] = useState<"google" | "facebook" | "apple" | null>(null);
  const [customSocialEmail, setCustomSocialEmail] = useState("");
  const [configuredProviders, setConfiguredProviders] = useState({
    google: false,
    facebook: false,
    apple: false,
  });

  const {
    signInWithGoogle,
    signInWithFacebook,
    signInWithApple,
    signInWithSocialDirect,
    signInWithCredentials,
  } = useAuth();
  const router = useRouter();

  useEffect(() => {
    async function checkProviders() {
      try {
        const res = await fetch("/api/auth/configured-providers");
        if (res.ok) {
          const data = await res.json();
          setConfiguredProviders(data);
        }
      } catch {
        // Silently ignore
      }
    }
    checkProviders();
  }, []);

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await signInWithCredentials(email, password);
      if (!res.ok) {
        setError(res.error || "Invalid email or password. Please try again.");
      } else {
        router.push("/");
        router.refresh();
      }
    } catch (err: unknown) {
      const errorObj = err as Error;
      console.error("Login Error:", errorObj);
      setError(errorObj.message || "Failed to sign in. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSocialClick = async (provider: "google" | "facebook" | "apple") => {
    setError("");

    // If real credentials are not set up in .env.local, show the helpful setup & 1-click test modal
    if (!configuredProviders[provider]) {
      setActiveSocialModal(provider);
      return;
    }

    setSocialLoading(provider);
    try {
      if (provider === "google") {
        await signInWithGoogle();
      } else if (provider === "facebook") {
        await signInWithFacebook();
      } else if (provider === "apple") {
        await signInWithApple();
      }
    } catch (err: unknown) {
      const errorObj = err as Error;
      console.error(`${provider} Login Error:`, errorObj);
      setError(`Failed to sign in with ${provider}. Please try again.`);
      setSocialLoading(null);
    }
  };

  const handleInstantSocialLogin = async (providerEmail: string) => {
    if (!activeSocialModal) return;
    setSocialLoading(activeSocialModal);
    setError("");

    try {
      const res = await signInWithSocialDirect(providerEmail, activeSocialModal);
      if (!res.ok) {
        setError(res.error || `Failed to sign in with ${activeSocialModal}.`);
        setSocialLoading(null);
      } else {
        setActiveSocialModal(null);
        router.push("/");
        router.refresh();
      }
    } catch (err) {
      setError((err as Error).message || "Sign in failed");
      setSocialLoading(null);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center pt-24 pb-16 px-4 relative overflow-hidden">
      {/* Mesh Glow & 3D Background */}
      <div className="absolute inset-0 pointer-events-none">
        <FloatingGeometry scene="hero" className="opacity-40" />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-indigo-600/15 blur-[150px] rounded-full" />
        <div className="absolute bottom-10 right-10 w-[300px] h-[300px] bg-emerald-500/10 blur-[120px] rounded-full" />
      </div>

      <div className="w-full max-w-md relative z-10">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 font-general text-xs uppercase tracking-widest font-semibold mb-4">
            <FiShield /> Secure Authentication
          </div>
          <h1 className="font-zentry text-3xl sm:text-4xl font-black uppercase tracking-wide">
            Welcome Back
          </h1>
          <p className="font-robert-regular text-slate-400 text-sm mt-2">
            Sign in to access your Brand Craftsman dashboard
          </p>
        </div>

        <div className="p-8 rounded-3xl bg-slate-900/80 border border-slate-800 backdrop-blur-xl shadow-2xl">
          {error && (
            <div className="mb-6 p-4 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-medium">
              {error}
            </div>
          )}

          {/* Social Logins */}
          <div className="space-y-3">
            <button
              type="button"
              onClick={() => handleSocialClick("google")}
              disabled={loading || Boolean(socialLoading)}
              className="w-full py-3 px-4 rounded-2xl bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 text-white text-sm font-semibold flex items-center justify-center gap-3 transition-all duration-200 hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50 cursor-pointer shadow-sm"
            >
              <FaGoogle className="w-4 h-4 text-[#EA4335]" />
              <span>
                {socialLoading === "google" ? "Signing In..." : "Continue with Google"}
              </span>
            </button>

            <button
              type="button"
              onClick={() => handleSocialClick("facebook")}
              disabled={loading || Boolean(socialLoading)}
              className="w-full py-3 px-4 rounded-2xl bg-[#1877F2]/10 hover:bg-[#1877F2]/20 border border-[#1877F2]/30 text-white text-sm font-semibold flex items-center justify-center gap-3 transition-all duration-200 hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50 cursor-pointer shadow-sm"
            >
              <FaFacebook className="w-4 h-4 text-[#1877F2]" />
              <span>
                {socialLoading === "facebook" ? "Signing In..." : "Continue with Facebook"}
              </span>
            </button>

            <button
              type="button"
              onClick={() => handleSocialClick("apple")}
              disabled={loading || Boolean(socialLoading)}
              className="w-full py-3 px-4 rounded-2xl bg-white/10 hover:bg-white/15 border border-white/20 text-white text-sm font-semibold flex items-center justify-center gap-3 transition-all duration-200 hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50 cursor-pointer shadow-sm"
            >
              <FaApple className="w-4 h-4 text-white" />
              <span>
                {socialLoading === "apple" ? "Signing In..." : "Continue with Apple ID"}
              </span>
            </button>
          </div>

          <div className="relative my-6 text-center">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-800" />
            </div>
            <span className="relative px-3 bg-slate-900 text-slate-500 font-general text-xs uppercase tracking-wider">
              Or continue with email
            </span>
          </div>

          {/* Email / Password Form */}
          <form onSubmit={handleEmailLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                Email Address
              </label>
              <div className="relative">
                <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 w-4 h-4" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="name@company.com"
                  className="w-full pl-11 pr-4 py-3 rounded-2xl bg-slate-950/60 border border-slate-800 text-white placeholder-slate-600 text-sm focus:outline-none focus:border-indigo-500 transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                Password
              </label>
              <div className="relative">
                <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 w-4 h-4" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="••••••••"
                  className="w-full pl-11 pr-4 py-3 rounded-2xl bg-slate-950/60 border border-slate-800 text-white placeholder-slate-600 text-sm focus:outline-none focus:border-indigo-500 transition-colors"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading || Boolean(socialLoading)}
              className="w-full mt-2 py-3.5 px-4 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-sm font-semibold flex items-center justify-center gap-2 transition-all duration-300 hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50 cursor-pointer shadow-lg shadow-indigo-500/20"
            >
              <span>{loading ? "Signing in..." : "Sign In"}</span>
              <FiArrowRight className="w-4 h-4" />
            </button>
          </form>

          <div className="mt-6 text-center text-xs text-slate-400">
            Don&apos;t have an account?{" "}
            <Link
              href="/signup"
              className="text-indigo-400 font-semibold hover:text-indigo-300 hover:underline transition-colors"
            >
              Sign up
            </Link>
          </div>
        </div>
      </div>

      {/* Social Provider Modal (Solves "Access blocked: Authorization Error") */}
      {activeSocialModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-in fade-in duration-200">
          <div className="w-full max-w-lg p-6 sm:p-8 rounded-3xl bg-slate-900 border border-slate-800 shadow-2xl relative text-left">
            <button
              onClick={() => setActiveSocialModal(null)}
              className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <FiX className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-2xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center text-xl">
                {activeSocialModal === "google" && <FaGoogle className="text-[#EA4335]" />}
                {activeSocialModal === "facebook" && <FaFacebook className="text-[#1877F2]" />}
                {activeSocialModal === "apple" && <FaApple className="text-white" />}
              </div>
              <div>
                <h3 className="font-zentry text-xl font-bold uppercase">
                  {activeSocialModal === "google" && "Google Sign-In"}
                  {activeSocialModal === "facebook" && "Facebook Sign-In"}
                  {activeSocialModal === "apple" && "Apple ID Sign-In"}
                </h3>
                <p className="text-xs text-slate-400">Developer Setup & One-Click Sign-In</p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs leading-relaxed mb-6">
              <p className="font-semibold mb-1 flex items-center gap-1.5">
                <FiInfo className="w-4 h-4 flex-shrink-0" /> Why Google shows &quot;Access blocked: Authorization Error&quot;:
              </p>
              Google requires a verified Client ID from your Google Cloud Console. Without real credentials registered in <code className="bg-black/40 px-1 py-0.5 rounded font-mono text-[11px]">.env.local</code>, Google&apos;s servers reject the redirect.
            </div>

            {/* Instant 1-Click Action */}
            <div className="space-y-4 mb-6">
              <p className="text-xs font-bold text-slate-200 uppercase tracking-wider">
                Instant Sign-In Options:
              </p>

              <button
                type="button"
                onClick={() => handleInstantSocialLogin("santhoshrajcit1819@gmail.com")}
                className="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white text-xs font-bold uppercase tracking-wider flex items-center justify-between transition-all duration-200 shadow-lg shadow-indigo-500/25 cursor-pointer"
              >
                <span>Sign in as Admin (santhoshrajcit1819@gmail.com)</span>
                <FiArrowRight className="w-4 h-4" />
              </button>

              <div className="flex gap-2">
                <input
                  type="email"
                  value={customSocialEmail}
                  onChange={(e) => setCustomSocialEmail(e.target.value)}
                  placeholder="Or enter any test email..."
                  className="flex-1 px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500"
                />
                <button
                  type="button"
                  disabled={!customSocialEmail}
                  onClick={() => handleInstantSocialLogin(customSocialEmail)}
                  className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-white disabled:opacity-40 cursor-pointer"
                >
                  Test Sign-In
                </button>
              </div>
            </div>

            {/* Steps to add real credentials */}
            <div className="pt-4 border-t border-slate-800 text-[11px] text-slate-400 space-y-2">
              <p className="font-semibold text-slate-300">To enable live production Google OAuth:</p>
              <ol className="list-decimal pl-4 space-y-1">
                <li>Create credentials at <span className="text-indigo-400 font-mono">console.cloud.google.com/apis/credentials</span></li>
                <li>Set Authorized Redirect URI to: <code className="bg-black/50 px-1 py-0.5 rounded text-white font-mono">http://localhost:3000/api/auth/callback/google</code></li>
                <li>Add <code className="text-indigo-300 font-mono">AUTH_GOOGLE_ID</code> &amp; <code className="text-indigo-300 font-mono">AUTH_GOOGLE_SECRET</code> to <code className="font-mono text-white">.env.local</code>.</li>
              </ol>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
