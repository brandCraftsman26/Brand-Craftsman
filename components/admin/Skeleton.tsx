import React from "react";

export function SkeletonRow({ cols = 4 }: { cols?: number }) {
  return (
    <div className="animate-pulse flex items-center justify-between py-4 border-b border-gray-200 dark:border-zinc-800 gap-4">
      {Array.from({ length: cols }).map((_, i) => (
        <div
          key={i}
          className="h-4 bg-gray-200 dark:bg-zinc-800 rounded-lg flex-1"
          style={{ width: `${Math.floor(Math.random() * 40) + 40}%` }}
        />
      ))}
    </div>
  );
}

export function SkeletonCard() {
  return (
    <div className="animate-pulse p-6 rounded-3xl bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 space-y-4">
      <div className="flex justify-between items-center">
        <div className="h-4 bg-gray-200 dark:bg-zinc-800 rounded-lg w-1/3" />
        <div className="h-8 w-8 bg-gray-200 dark:bg-zinc-800 rounded-xl" />
      </div>
      <div className="h-8 bg-gray-200 dark:bg-zinc-800 rounded-xl w-1/2" />
      <div className="h-3 bg-gray-200 dark:bg-zinc-800 rounded-lg w-1/4" />
    </div>
  );
}

export function SkeletonList({ count = 5 }: { count?: number }) {
  return (
    <div className="space-y-3">
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonRow key={i} />
      ))}
    </div>
  );
}
