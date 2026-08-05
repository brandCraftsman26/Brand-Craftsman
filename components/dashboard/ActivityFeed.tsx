import React from "react";
import { Skeleton } from "@/components/ui/Skeleton";
import { FiCpu, FiCheckCircle, FiClock } from "react-icons/fi";

export interface ActivityItem {
  id: string;
  tool_name: string;
  prompt: string;
  credits_used: number;
  created_at: string;
}

export function ActivityFeed({ items, loading }: { items: ActivityItem[]; loading?: boolean }) {
  if (loading) {
    return (
      <div className="space-y-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="p-4 rounded-2xl bg-gray-100 dark:bg-zinc-800/40 space-y-2">
            <Skeleton className="h-4 w-1/4" />
            <Skeleton className="h-3 w-3/4" />
          </div>
        ))}
      </div>
    );
  }

  if (!items || items.length === 0) {
    return (
      <div className="p-6 rounded-2xl bg-gray-50 dark:bg-zinc-800/30 text-center space-y-2">
        <FiClock className="text-2xl text-gray-400 mx-auto" />
        <p className="font-robert-regular text-xs text-gray-500">No recent AI tool activity recorded.</p>
      </div>
    );
  }

  return (
    <div className="divide-y divide-gray-100 dark:divide-zinc-800">
      {items.map((item) => (
        <div key={item.id} className="py-4 flex items-start justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-xl bg-blue-500/10 text-blue-500 text-lg mt-0.5">
              <FiCpu />
            </div>
            <div>
              <span className="font-zentry text-sm font-bold block uppercase tracking-wide">
                {item.tool_name}
              </span>
              <p className="font-robert-regular text-xs text-gray-600 dark:text-gray-400 line-clamp-1">
                &ldquo;{item.prompt}&rdquo;
              </p>
              <span className="text-[10px] font-mono text-gray-400 mt-1 block">
                {new Date(item.created_at).toLocaleString()}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-500 text-[11px] font-bold font-general">
            <FiCheckCircle /> -{item.credits_used} Credits
          </div>
        </div>
      ))}
    </div>
  );
}
