"use client";

import React, { useState } from "react";
import { useRealtime } from "@/hooks/use-realtime";
import { AiGeneration } from "@/lib/supabase/db";
import { Skeleton } from "@/components/ui/Skeleton";
import { ErrorState } from "@/components/ui/ErrorState";
import { FiCpu, FiCopy, FiCheck, FiSearch } from "react-icons/fi";

export default function UserProjectsPage() {
  const { data: generations, loading, error } = useRealtime<AiGeneration>("ai_generations");
  const [search, setSearch] = useState("");
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const filtered = generations.filter(
    (g) =>
      g.tool_name?.toLowerCase().includes(search.toLowerCase()) ||
      g.prompt?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="font-zentry text-3xl font-black uppercase tracking-tight">
            AI Generations History
          </h1>
          <p className="font-robert-regular text-xs text-gray-400 mt-1">
            Access and copy your previously generated marketing copy, brand messaging, and page layouts.
          </p>
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-72">
          <FiSearch className="absolute left-3.5 top-3 text-gray-400 text-sm" />
          <input
            type="text"
            placeholder="Search generations..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full font-general text-xs pl-10 pr-4 py-2.5 rounded-full bg-zinc-900 border border-zinc-800 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
          />
        </div>
      </div>

      {error ? (
        <ErrorState title="Failed to load generations" message={error} />
      ) : loading ? (
        <div className="space-y-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="p-6 rounded-3xl bg-zinc-900 border border-zinc-800 space-y-3">
              <Skeleton className="h-4 w-1/4" />
              <Skeleton className="h-3 w-1/2" />
              <Skeleton className="h-16 w-full rounded-2xl" />
            </div>
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div className="p-12 rounded-3xl bg-zinc-900/40 border border-zinc-800 text-center space-y-3">
          <FiCpu className="text-4xl text-gray-500 mx-auto" />
          <h3 className="font-zentry text-lg font-bold uppercase">No Generations Found</h3>
          <p className="font-robert-regular text-xs text-gray-400">
            {search ? "No matches found for your search term." : "You haven't generated any AI content yet."}
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {filtered.map((gen) => (
            <div
              key={gen.id}
              className="p-6 rounded-3xl bg-zinc-900 border border-zinc-800 hover:border-zinc-700 transition-all space-y-4"
            >
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 rounded-full bg-purple-500/10 text-purple-400 font-general text-xs font-bold uppercase tracking-wider">
                    {gen.tool_name}
                  </span>
                  <span className="text-[10px] font-mono text-gray-500">
                    {new Date(gen.created_at).toLocaleString()}
                  </span>
                </div>

                <button
                  onClick={() => handleCopy(gen.id, gen.response)}
                  className="px-3 py-1.5 rounded-xl bg-zinc-800 text-xs font-general font-bold uppercase flex items-center gap-1.5 hover:bg-zinc-700 transition-colors"
                >
                  {copiedId === gen.id ? <FiCheck className="text-emerald-400" /> : <FiCopy />} Copy
                </button>
              </div>

              <div>
                <span className="text-xs text-gray-400 font-general uppercase block font-bold mb-1">Prompt:</span>
                <p className="font-robert-regular text-sm text-gray-200 bg-zinc-950/60 p-3 rounded-xl border border-zinc-800">
                  {gen.prompt}
                </p>
              </div>

              <div>
                <span className="text-xs text-gray-400 font-general uppercase block font-bold mb-1">Generated Output:</span>
                <pre className="font-mono text-xs text-cyan-300 bg-slate-950 p-4 rounded-2xl overflow-x-auto max-h-48 border border-zinc-800">
                  {gen.response}
                </pre>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
