"use client";

import React, { useState, useEffect } from "react";
import { AnalyticsEvent } from "@/lib/supabase/db";
import { useRealtime } from "@/hooks/use-realtime";
import { FiActivity, FiMousePointer, FiLayers, FiRefreshCw } from "react-icons/fi";
import { SkeletonList } from "./Skeleton";

export default function HeatmapAnalytics() {
  const { data: events, loading, error } = useRealtime<AnalyticsEvent>("analytics_events");
  const [selectedPath, setSelectedPath] = useState<string>("all");

  const paths = ["all", ...Array.from(new Set(events.map((e) => e.path)))];

  const filteredEvents = selectedPath === "all" ? events : events.filter((e) => e.path === selectedPath);

  return (
    <div className="p-8 rounded-3xl bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 space-y-6 shadow-sm">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h3 className="font-zentry text-2xl font-black uppercase tracking-tight flex items-center gap-2">
            <FiActivity className="text-cyan-500" /> Heatmap & User Interaction Analytics
          </h3>
          <p className="font-robert-regular text-xs text-gray-500 mt-0.5">
            Realtime visual click tracking and path navigation metrics across your website.
          </p>
        </div>

        {/* Path Selector Filter */}
        <div className="flex items-center gap-2">
          <label className="text-xs font-bold font-general uppercase text-gray-500">Filter Route:</label>
          <select
            value={selectedPath}
            onChange={(e) => setSelectedPath(e.target.value)}
            className="font-mono text-xs font-bold px-3 py-2 rounded-xl bg-gray-100 dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 text-slate-900 dark:text-white"
          >
            {paths.map((p) => (
              <option key={p} value={p}>
                {p === "all" ? "All Pages" : p}
              </option>
            ))}
          </select>
        </div>
      </div>

      {loading ? (
        <SkeletonList count={4} />
      ) : error ? (
        <div className="p-4 rounded-xl bg-red-500/10 text-red-500 text-xs font-bold">
          Failed to load analytics events: {error}
        </div>
      ) : (
        <div className="space-y-6">
          {/* Visual Heatmap Canvas Simulation */}
          <div className="relative h-64 rounded-2xl bg-slate-950 border border-zinc-800 p-4 overflow-hidden flex flex-col justify-between">
            <div className="flex justify-between items-center z-10">
              <span className="font-mono text-xs text-cyan-400 font-bold flex items-center gap-1.5">
                <FiMousePointer /> Active Heatmap Coordinates ({filteredEvents.length} clicks logged)
              </span>
              <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                Live Supabase Feed
              </span>
            </div>

            {/* Render Click Dots on Map */}
            <div className="absolute inset-0 pointer-events-none opacity-80">
              {filteredEvents.map((evt) => {
                const posX = Math.min(95, Math.max(5, ((evt.x_pos || 50) / 1200) * 100));
                const posY = Math.min(90, Math.max(10, ((evt.y_pos || 50) / 800) * 100));
                return (
                  <div
                    key={evt.id}
                    className="absolute w-4 h-4 rounded-full bg-gradient-to-r from-red-500 via-yellow-400 to-amber-500 blur-[2px] opacity-70 animate-pulse"
                    style={{ left: `${posX}%`, top: `${posY}%` }}
                    title={`${evt.element_tag} at ${evt.path}`}
                  />
                );
              })}
            </div>

            <div className="z-10 text-[10px] font-mono text-gray-500">
              * Click coordinates are captured in real-time as users interact with buttons and links.
            </div>
          </div>

          {/* Recent Event Log */}
          <div className="divide-y divide-gray-100 dark:divide-zinc-800">
            {filteredEvents.slice(0, 8).map((evt) => (
              <div key={evt.id} className="py-3 flex items-center justify-between gap-4 font-mono text-xs">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded-md bg-blue-500/10 text-blue-400 font-bold text-[10px]">
                    {evt.event_type}
                  </span>
                  <span className="text-slate-800 dark:text-gray-200 font-bold">{evt.path}</span>
                  <span className="text-gray-400">&lt;{evt.element_tag || "DIV"}&gt;</span>
                </div>

                <div className="text-right text-[10px] text-gray-500">
                  X: {evt.x_pos}px | Y: {evt.y_pos}px • {new Date(evt.created_at).toLocaleTimeString()}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
