"use client";

import React from "react";
import { useUser } from "@clerk/nextjs";
import { useRealtime } from "@/hooks/use-realtime";
import { AiGeneration } from "@/lib/supabase/db";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { ActivityFeed } from "@/components/dashboard/ActivityFeed";
import { ErrorState } from "@/components/ui/ErrorState";
import { 
  FiZap, FiCpu, FiCheckCircle, FiClock, FiArrowRight 
} from "react-icons/fi";
import Link from "next/link";

export default function UserDashboardHome() {
  const { user, isLoaded: userLoaded } = useUser();
  const userId = user?.id || "";

  // Fetch AI Generations in realtime for this user
  const { 
    data: generations, 
    loading: genLoading, 
    error: genError 
  } = useRealtime<AiGeneration>("ai_generations");

  const totalCreditsUsed = generations.reduce((acc, curr) => acc + (curr.credits_used || 1), 0);
  const creditsRemaining = Math.max(0, 100 - totalCreditsUsed);

  if (!userLoaded) {
    return (
      <div className="space-y-6 animate-pulse">
        <div className="h-24 bg-zinc-900 rounded-3xl" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="h-32 bg-zinc-900 rounded-3xl" />
          <div className="h-32 bg-zinc-900 rounded-3xl" />
          <div className="h-32 bg-zinc-900 rounded-3xl" />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Welcome Banner */}
      <div className="p-8 rounded-3xl bg-gradient-to-r from-blue-900/30 via-purple-900/30 to-zinc-900/40 border border-blue-500/20 backdrop-blur-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-6 shadow-2xl">
        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-500/20 text-cyan-400 font-general text-xs uppercase tracking-widest border border-blue-500/30 mb-3">
            <FiZap /> Realtime Client Portal
          </div>
          <h1 className="font-zentry text-3xl md:text-4xl font-black uppercase tracking-tight">
            Welcome back, {user?.firstName || user?.username || "Client"}!
          </h1>
          <p className="font-robert-regular text-gray-400 text-sm mt-1">
            Monitor your AI tool usage, generated brand assets, and active account status in real time.
          </p>
        </div>

        <Link
          href="/dashboard/ai-tools"
          className="px-6 py-3 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-general text-xs font-bold uppercase tracking-wider shadow-lg hover:scale-105 transition-all flex items-center gap-2"
        >
          Launch AI Tools <FiArrowRight />
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatsCard
          title="Available AI Credits"
          value={`${creditsRemaining} / 100`}
          subtitle="Resets monthly"
          icon={<FiZap />}
          color="text-amber-400"
          loading={genLoading}
        />
        <StatsCard
          title="Total Generations"
          value={generations.length}
          subtitle="AI assets generated"
          icon={<FiCpu />}
          color="text-cyan-400"
          loading={genLoading}
        />
        <StatsCard
          title="Account Status"
          value="Active Pro"
          subtitle="Verified Member"
          icon={<FiCheckCircle />}
          color="text-emerald-400"
          loading={false}
        />
      </div>

      {/* Error state if data fetching fails */}
      {genError && (
        <ErrorState
          title="Unable to load realtime feed"
          message={genError}
        />
      )}

      {/* Realtime Activity Feed Section */}
      <div className="p-8 rounded-3xl bg-zinc-900/60 border border-zinc-800 space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="font-zentry text-xl font-black uppercase tracking-tight flex items-center gap-2">
              <FiClock className="text-blue-400" /> Real-time Activity Feed
            </h3>
            <p className="font-robert-regular text-xs text-gray-400">
              Live updates when you generate website blocks or marketing copy.
            </p>
          </div>

          <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-[10px] font-bold font-mono uppercase tracking-widest flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" /> Realtime Connected
          </span>
        </div>

        <ActivityFeed items={generations.slice(0, 5)} loading={genLoading} />
      </div>
    </div>
  );
}
