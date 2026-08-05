import React from "react";
import { Skeleton } from "@/components/ui/Skeleton";

export interface StatsCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: React.ReactNode;
  color?: string;
  loading?: boolean;
}

export function StatsCard({ title, value, subtitle, icon, color = "text-blue-500", loading = false }: StatsCardProps) {
  if (loading) {
    return (
      <div className="p-6 rounded-3xl bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 shadow-sm space-y-4">
        <div className="flex justify-between items-center">
          <Skeleton className="h-3 w-1/3" />
          <Skeleton className="h-8 w-8 rounded-xl" />
        </div>
        <Skeleton className="h-8 w-1/2" />
        <Skeleton className="h-3 w-1/4" />
      </div>
    );
  }

  return (
    <div className="p-6 rounded-3xl bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 shadow-sm flex flex-col justify-between hover:border-blue-500/30 transition-all">
      <div className="flex justify-between items-start">
        <span className="font-general text-xs uppercase tracking-wider text-gray-500 font-bold">{title}</span>
        <div className={`p-2.5 rounded-xl bg-gray-100 dark:bg-zinc-800 ${color} text-xl`}>
          {icon}
        </div>
      </div>
      <div className="mt-4">
        <h2 className="font-zentry text-3xl font-black tracking-tight">{value}</h2>
        {subtitle && (
          <p className="font-robert-regular text-xs text-emerald-500 font-semibold mt-1">
            {subtitle}
          </p>
        )}
      </div>
    </div>
  );
}
