/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import React, { useEffect, useState, useCallback } from "react";
import { Puck, Data } from "@measured/puck";
import "@measured/puck/puck.css";
import { config } from "@/puck.config";
import { FiArrowLeft, FiAlertCircle, FiZap, FiX } from "react-icons/fi";
import Link from "next/link";

export default function BuilderPage({ params }: { params: Promise<{ pageId: string }> }) {
  const [pageId, setPageId] = useState<string | null>(null);
  const [data, setData] = useState<Data | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // AI Generation State
  const [showAiModal, setShowAiModal] = useState(false);
  const [aiPrompt, setAiPrompt] = useState("");
  const [generating, setGenerating] = useState(false);
  const [aiMode, setAiMode] = useState<"layout" | "evolve">("layout");

  // Resolve params
  useEffect(() => {
    params.then((p) => setPageId(p.pageId));
  }, [params]);

  const fetchPageData = useCallback(async () => {
    if (!pageId) return;
    try {
      const res = await fetch(`/api/admin/builder/pages/${pageId}`);
      if (res.ok) {
        const page = await res.json();
        const contentStr = page.content_json || page.contentJson;
        const parsedJson = JSON.parse(contentStr);
        setData(parsedJson);
      } else {
        setError("Page not found or error loading page");
      }
    } catch (err) {
      console.error(err);
      setError("Failed to fetch page data");
    } finally {
      setLoading(false);
    }
  }, [pageId]);

  useEffect(() => {
    fetchPageData();
  }, [fetchPageData]);

  const handlePublish = async (puckData: Data) => {
    setSaving(true);
    try {
      if (!pageId) return;
      const res = await fetch(`/api/admin/builder/pages/${pageId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ contentJson: puckData, isPublished: true }),
      });
      if (!res.ok) {
        throw new Error("Failed to save");
      }
      alert("Page saved successfully!");
    } catch (err) {
      console.error(err);
      alert("Error saving page");
    } finally {
      setSaving(false);
    }
  };

  const handleAiGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!aiPrompt) return;
    
    setGenerating(true);
    try {
      const res = await fetch("/api/ai/builder", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          prompt: aiPrompt, 
          action: aiMode === "layout" ? "generate-layout" : "evolve",
          currentLayout: aiMode === "evolve" ? data : undefined 
        }),
      });
      
      if (!res.ok) throw new Error("Generation failed");
      
      const generatedData = await res.json();
      setData(generatedData);
      setShowAiModal(false);
      setAiPrompt("");
      alert(aiMode === "layout" ? "Layout generated successfully! Don't forget to save." : "Design evolved successfully! Don't forget to save.");
    } catch (err) {
      console.error(err);
      alert("Failed to generate layout.");
    } finally {
      setGenerating(false);
    }
  };

  const handleGenerateBlocks = async () => {
    if (!data) return;
    
    setGenerating(true);
    try {
      const res = await fetch("/api/ai/builder", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "generate-blocks", currentLayout: data }),
      });
      
      if (!res.ok) throw new Error("Generation failed");
      
      const generatedData = await res.json();
      setData(generatedData);
      alert("Custom blocks generated successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to generate custom blocks.");
    } finally {
      setGenerating(false);
    }
  };

  const handleOptimize = async () => {
    if (!data) return;
    
    setGenerating(true);
    try {
      const res = await fetch("/api/ai/builder", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          prompt: "Optimize all text on this page for SEO and high conversion rate. Fix any grammar issues. Do not change the overall structure or block types, just improve the text content.",
          action: "evolve", 
          currentLayout: data 
        }),
      });
      
      if (!res.ok) throw new Error("Optimization failed");
      
      const generatedData = await res.json();
      setData(generatedData);
      alert("Page copy optimized successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to optimize page.");
    } finally {
      setGenerating(false);
    }
  };

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-50 dark:bg-zinc-950">
        <div className="flex flex-col items-center">
          <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
          <p className="mt-4 text-gray-500 font-medium">Loading Visual Editor...</p>
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-50 dark:bg-zinc-950">
        <div className="bg-white dark:bg-zinc-900 p-8 rounded-xl border border-red-200 dark:border-red-900 max-w-md text-center">
          <FiAlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{error}</h2>
          <Link href="/admin/builder" className="inline-block mt-4 text-blue-600 hover:underline">
            &larr; Back to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-gray-100">
      <div className="bg-white dark:bg-zinc-900 border-b border-gray-200 dark:border-zinc-800 p-4 flex items-center justify-between z-10">
        <div className="flex items-center gap-4">
          <Link href="/admin/builder" className="text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors">
            <FiArrowLeft size={20} />
          </Link>
          <h1 className="font-bold text-gray-900 dark:text-white">Page Editor</h1>
        </div>
        <div className="text-sm text-gray-500 flex items-center gap-3">
          <button 
            onClick={handleOptimize}
            disabled={generating}
            className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-gray-900 dark:text-white px-4 py-2 rounded-lg font-medium transition-colors text-sm disabled:opacity-50"
          >
            <FiZap /> Optimize Copy
          </button>
          <button 
            onClick={handleGenerateBlocks}
            disabled={generating}
            className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-gray-900 dark:text-white px-4 py-2 rounded-lg font-medium transition-colors text-sm disabled:opacity-50"
          >
            <FiZap /> Build AI Blocks
          </button>
          <button 
            onClick={() => { setAiMode("evolve"); setShowAiModal(true); }}
            disabled={generating}
            className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-lg font-medium hover:opacity-90 transition-opacity text-sm disabled:opacity-50"
          >
            <FiZap /> Evolve Design
          </button>
          <button 
            onClick={() => { setAiMode("layout"); setShowAiModal(true); }}
            disabled={generating}
            className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-lg font-medium hover:opacity-90 transition-opacity text-sm disabled:opacity-50"
          >
            <FiZap /> New Layout
          </button>
          {saving && <span className="animate-pulse flex items-center gap-1"><div className="w-3 h-3 rounded-full bg-blue-500"></div> Saving...</span>}
        </div>
      </div>

      {showAiModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-zinc-900 rounded-2xl w-full max-w-lg shadow-2xl border border-gray-200 dark:border-zinc-800">
            <div className="p-6 border-b border-gray-200 dark:border-zinc-800 flex justify-between items-center">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                <FiZap className={aiMode === "layout" ? "text-blue-500" : "text-purple-500"} /> 
                {aiMode === "layout" ? "AI Layout Generator" : "AI Design Evolution"}
              </h2>
              <button onClick={() => setShowAiModal(false)} className="text-gray-400 hover:text-gray-500">
                <FiX size={24} />
              </button>
            </div>
            <form onSubmit={handleAiGenerate} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {aiMode === "layout" ? "Describe the layout you want to build:" : "How should the AI evolve this design?"}
                </label>
                <textarea 
                  required
                  rows={4}
                  value={aiPrompt}
                  onChange={(e) => setAiPrompt(e.target.value)}
                  className="w-full bg-gray-50 dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                  placeholder={aiMode === "layout" ? "e.g. A dark themed hero section for a digital marketing agency..." : "e.g. Make the text more professional and add a pricing block..."}
                />
                <p className="text-xs text-gray-500 mt-2">
                  {aiMode === "layout" ? "The AI will overwrite your current layout with the generated blocks." : "The AI will modify your existing layout based on your instructions."}
                </p>
              </div>
              <div className="pt-2 flex gap-3">
                <button 
                  type="button" 
                  onClick={() => setShowAiModal(false)}
                  className="flex-1 bg-gray-100 hover:bg-gray-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-gray-900 dark:text-white font-medium py-2.5 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  disabled={generating}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 rounded-lg transition-colors disabled:opacity-70 flex items-center justify-center gap-2"
                >
                  {generating ? (
                    <><div className="w-5 h-5 border-t-2 border-white rounded-full animate-spin"></div> Generating...</>
                  ) : (
                    <><FiZap /> Generate</>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="flex-1 relative">
        {data && (
          <Puck 
            key={JSON.stringify(data)} // Force re-mount when data changes entirely via AI
            config={config} 
            data={data} 
            onPublish={handlePublish} 
          />
        )}
      </div>
    </div>
  );
}
