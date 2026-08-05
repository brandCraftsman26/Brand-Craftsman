"use client";

import React, { useState } from "react";
import { CmsSection } from "@/lib/supabase/db";
import { useRealtime } from "@/hooks/use-realtime";
import { FiPlus, FiTrash2, FiCheck, FiRefreshCw, FiLayers, FiEye, FiEyeOff } from "react-icons/fi";
import { SkeletonList } from "./Skeleton";

export default function SectionsManager({ initialSections }: { initialSections?: CmsSection[] }) {
  const { data: sections, loading, error } = useRealtime<CmsSection>("cms_sections", initialSections);
  const [savingId, setSavingId] = useState<string | null>(null);
  const [notification, setNotification] = useState<string | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  const [newPageSlug, setNewPageSlug] = useState("home");
  const [newSectionKey, setNewSectionKey] = useState("");
  const [newSortOrder, setNewSortOrder] = useState(1);

  const showToast = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  };

  const handleSave = async (section: Partial<CmsSection>) => {
    try {
      setSavingId(section.id || "new");
      const res = await fetch("/api/cms/sections", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(section),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error);
      showToast(`Section "${section.section_key}" saved!`);
      setIsCreating(false);
    } catch (err: any) {
      alert(`Error saving section: ${err.message}`);
    } finally {
      setSavingId(null);
    }
  };

  const handleCreate = () => {
    if (!newSectionKey.trim()) return alert("Section key is required");
    handleSave({
      page_slug: newPageSlug,
      section_key: newSectionKey.trim(),
      sort_order: newSortOrder,
      is_active: true,
      block_ids: [],
      config: {},
    });
    setNewSectionKey("");
  };

  const handleDelete = async (id: string, key: string) => {
    if (!confirm(`Are you sure you want to delete section "${key}"?`)) return;
    try {
      const res = await fetch(`/api/cms/sections?id=${id}`, { method: "DELETE" });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error);
      showToast(`Deleted section "${key}"!`);
    } catch (err: any) {
      alert(`Error deleting section: ${err.message}`);
    }
  };

  const pages = Array.from(new Set(sections.map((s) => s.page_slug)));

  return (
    <div className="p-8 rounded-3xl bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 space-y-6 shadow-sm">
      {notification && (
        <div className="fixed top-20 right-6 z-50 px-6 py-3 rounded-2xl bg-emerald-500 text-white font-general text-xs font-bold uppercase tracking-wider shadow-2xl flex items-center gap-2 animate-bounce">
          <FiCheck className="text-lg" /> {notification}
        </div>
      )}

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h3 className="font-zentry text-2xl font-black uppercase tracking-tight">
            Page Layout Sections (CMS Sections)
          </h3>
          <p className="font-robert-regular text-xs text-gray-500 mt-0.5">
            Configure section ordering and layout blocks for every website page.
          </p>
        </div>

        <button
          onClick={() => setIsCreating(!isCreating)}
          className="px-5 py-2.5 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-general text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow-md hover:scale-105 transition-all"
        >
          <FiPlus /> {isCreating ? "Cancel" : "Add Page Section"}
        </button>
      </div>

      {isCreating && (
        <div className="p-6 rounded-2xl bg-gray-50 dark:bg-zinc-800/50 border border-gray-200 dark:border-zinc-700 space-y-4">
          <h4 className="font-zentry text-lg font-bold uppercase">Add New Page Section</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Target Page Slug</label>
              <input
                type="text"
                placeholder="e.g. home, about, pricing"
                value={newPageSlug}
                onChange={(e) => setNewPageSlug(e.target.value)}
                className="w-full font-general text-sm px-3 py-2 rounded-xl bg-white dark:bg-zinc-900 border border-gray-300 dark:border-zinc-700"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Section Key</label>
              <input
                type="text"
                placeholder="e.g. hero_section, services_grid"
                value={newSectionKey}
                onChange={(e) => setNewSectionKey(e.target.value)}
                className="w-full font-mono text-sm px-3 py-2 rounded-xl bg-white dark:bg-zinc-900 border border-gray-300 dark:border-zinc-700"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Display Sort Order</label>
              <input
                type="number"
                value={newSortOrder}
                onChange={(e) => setNewSortOrder(Number(e.target.value))}
                className="w-full font-general text-sm px-3 py-2 rounded-xl bg-white dark:bg-zinc-900 border border-gray-300 dark:border-zinc-700"
              />
            </div>
          </div>

          <button
            onClick={handleCreate}
            disabled={savingId === "new"}
            className="px-6 py-2.5 rounded-full bg-emerald-600 text-white font-general text-xs font-bold uppercase tracking-wider flex items-center gap-2"
          >
            {savingId === "new" ? <FiRefreshCw className="animate-spin" /> : <FiCheck />} Add Section
          </button>
        </div>
      )}

      {loading ? (
        <SkeletonList count={4} />
      ) : error ? (
        <div className="p-4 rounded-xl bg-red-500/10 text-red-500 text-xs font-bold">
          Failed to load sections: {error}
        </div>
      ) : sections.length === 0 ? (
        <p className="text-gray-500 text-sm py-4">No sections configured yet. Add one above!</p>
      ) : (
        <div className="space-y-6">
          {pages.map((slug) => {
            const pageSections = sections.filter((s) => s.page_slug === slug);
            return (
              <div key={slug} className="space-y-3">
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-500 font-general text-xs font-bold uppercase tracking-widest flex items-center gap-1.5">
                    <FiLayers /> Page: /{slug} ({pageSections.length} sections)
                  </span>
                  <div className="h-px bg-gray-200 dark:bg-zinc-800 flex-1" />
                </div>

                <div className="divide-y divide-gray-100 dark:divide-zinc-800">
                  {pageSections.map((sec) => (
                    <div key={sec.id} className="py-3 flex items-center justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-xs text-gray-400 font-bold">#{sec.sort_order}</span>
                        <span className="font-mono text-sm font-bold text-slate-800 dark:text-white">
                          {sec.section_key}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleSave({ ...sec, is_active: !sec.is_active })}
                          className={`p-1.5 rounded-lg text-xs ${
                            sec.is_active ? "text-emerald-500 bg-emerald-500/10" : "text-gray-400 bg-gray-100 dark:bg-zinc-800"
                          }`}
                        >
                          {sec.is_active ? <FiEye /> : <FiEyeOff />}
                        </button>
                        <button
                          onClick={() => handleDelete(sec.id, sec.section_key)}
                          className="p-1.5 rounded-lg bg-gray-100 dark:bg-zinc-800 text-gray-400 hover:text-red-500"
                        >
                          <FiTrash2 />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
