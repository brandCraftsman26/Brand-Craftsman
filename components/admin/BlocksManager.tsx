"use client";

import React, { useState } from "react";
import { CmsBlock } from "@/lib/supabase/db";
import { useRealtime } from "@/hooks/use-realtime";
import { FiPlus, FiTrash2, FiEdit3, FiCheck, FiRefreshCw, FiGrid, FiEye, FiEyeOff } from "react-icons/fi";
import { SkeletonList } from "./Skeleton";

export default function BlocksManager({ initialBlocks }: { initialBlocks?: CmsBlock[] }) {
  const { data: blocks, loading, error } = useRealtime<CmsBlock>("cms_blocks", initialBlocks);
  const [savingId, setSavingId] = useState<string | null>(null);
  const [notification, setNotification] = useState<string | null>(null);
  const [editingBlock, setEditingBlock] = useState<Partial<CmsBlock> | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  // New Block Form state
  const [newType, setNewType] = useState("service");
  const [newTitle, setNewTitle] = useState("");
  const [newDataJson, setNewDataJson] = useState('{\n  "price": "₹19,999/mo",\n  "description": "Short description",\n  "status": "Active"\n}');

  const showToast = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  };

  const handleSave = async (block: Partial<CmsBlock>) => {
    try {
      setSavingId(block.id || "new");
      const res = await fetch("/api/cms/blocks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(block),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error);
      showToast(`Block "${block.title}" saved!`);
      setEditingBlock(null);
      setIsCreating(false);
    } catch (err: any) {
      alert(`Error saving block: ${err.message}`);
    } finally {
      setSavingId(null);
    }
  };

  const handleCreate = () => {
    try {
      const parsedData = JSON.parse(newDataJson);
      handleSave({
        type: newType,
        title: newTitle,
        data: parsedData,
        sort_order: blocks.length + 1,
        is_active: true,
      });
      setNewTitle("");
    } catch (err: any) {
      alert("Invalid JSON data structure");
    }
  };

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Are you sure you want to delete block "${title}"?`)) return;
    try {
      const res = await fetch(`/api/cms/blocks?id=${id}`, { method: "DELETE" });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error);
      showToast(`Deleted block "${title}"!`);
    } catch (err: any) {
      alert(`Error deleting block: ${err.message}`);
    }
  };

  const toggleActive = (block: CmsBlock) => {
    handleSave({ ...block, is_active: !block.is_active });
  };

  const types = Array.from(new Set(blocks.map((b) => b.type)));

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
            Reusable CMS Component Blocks
          </h3>
          <p className="font-robert-regular text-xs text-gray-500 mt-0.5">
            Manage structured component data (services, pricing cards, feature items, testimonials).
          </p>
        </div>

        <button
          onClick={() => setIsCreating(!isCreating)}
          className="px-5 py-2.5 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-general text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow-md hover:scale-105 transition-all"
        >
          <FiPlus /> {isCreating ? "Cancel" : "Create New Block"}
        </button>
      </div>

      {/* CREATE FORM */}
      {isCreating && (
        <div className="p-6 rounded-2xl bg-gray-50 dark:bg-zinc-800/50 border border-gray-200 dark:border-zinc-700 space-y-4">
          <h4 className="font-zentry text-lg font-bold uppercase">Add New Component Block</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Block Type</label>
              <select
                value={newType}
                onChange={(e) => setNewType(e.target.value)}
                className="w-full font-general text-sm px-3 py-2 rounded-xl bg-white dark:bg-zinc-900 border border-gray-300 dark:border-zinc-700"
              >
                <option value="service">Service Item</option>
                <option value="pricing">Pricing Tier</option>
                <option value="feature">Feature Item</option>
                <option value="testimonial">Testimonial</option>
                <option value="team">Team Member</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Block Title</label>
              <input
                type="text"
                placeholder="e.g. Enterprise SEO Strategy"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                className="w-full font-zentry text-sm font-bold px-3 py-2 rounded-xl bg-white dark:bg-zinc-900 border border-gray-300 dark:border-zinc-700"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Custom JSON Data Payload</label>
            <textarea
              rows={5}
              value={newDataJson}
              onChange={(e) => setNewDataJson(e.target.value)}
              className="w-full font-mono text-xs p-3 rounded-xl bg-slate-950 text-cyan-400 border border-gray-700"
            />
          </div>

          <button
            onClick={handleCreate}
            disabled={savingId === "new"}
            className="px-6 py-2.5 rounded-full bg-emerald-600 text-white font-general text-xs font-bold uppercase tracking-wider flex items-center gap-2"
          >
            {savingId === "new" ? <FiRefreshCw className="animate-spin" /> : <FiCheck />} Create Block
          </button>
        </div>
      )}

      {loading ? (
        <SkeletonList count={5} />
      ) : error ? (
        <div className="p-4 rounded-xl bg-red-500/10 text-red-500 text-xs font-bold">
          Failed to load blocks: {error}
        </div>
      ) : blocks.length === 0 ? (
        <p className="text-gray-500 text-sm py-4">No component blocks available. Click above to create one!</p>
      ) : (
        <div className="space-y-6">
          {types.map((type) => {
            const typeBlocks = blocks.filter((b) => b.type === type);
            return (
              <div key={type} className="space-y-3">
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 rounded-full bg-purple-500/10 text-purple-500 font-general text-xs font-bold uppercase tracking-widest flex items-center gap-1.5">
                    <FiGrid /> {type} blocks ({typeBlocks.length})
                  </span>
                  <div className="h-px bg-gray-200 dark:bg-zinc-800 flex-1" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {typeBlocks.map((block) => (
                    <div
                      key={block.id}
                      className={`p-5 rounded-2xl border transition-all ${
                        block.is_active
                          ? "bg-white dark:bg-zinc-800/40 border-gray-200 dark:border-zinc-700"
                          : "bg-gray-50 dark:bg-zinc-900/40 border-dashed border-gray-300 dark:border-zinc-800 opacity-60"
                      }`}
                    >
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <span className="font-zentry text-lg font-bold block">{block.title}</span>
                          <span className="text-[10px] font-mono text-gray-400">Order: #{block.sort_order}</span>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => toggleActive(block)}
                            className={`p-1.5 rounded-lg text-xs ${
                              block.is_active ? "text-emerald-500 bg-emerald-500/10" : "text-gray-400 bg-gray-100 dark:bg-zinc-800"
                            }`}
                            title={block.is_active ? "Deactivate" : "Activate"}
                          >
                            {block.is_active ? <FiEye /> : <FiEyeOff />}
                          </button>

                          <button
                            onClick={() => setEditingBlock(editingBlock?.id === block.id ? null : block)}
                            className="p-1.5 rounded-lg bg-gray-100 dark:bg-zinc-800 text-gray-400 hover:text-white"
                          >
                            <FiEdit3 />
                          </button>

                          <button
                            onClick={() => handleDelete(block.id, block.title)}
                            className="p-1.5 rounded-lg bg-gray-100 dark:bg-zinc-800 text-gray-400 hover:text-red-500"
                          >
                            <FiTrash2 />
                          </button>
                        </div>
                      </div>

                      {/* EDIT PANEL */}
                      {editingBlock?.id === block.id ? (
                        <div className="mt-3 pt-3 border-t border-gray-200 dark:border-zinc-700 space-y-3">
                          <input
                            type="text"
                            value={editingBlock.title}
                            onChange={(e) => setEditingBlock({ ...editingBlock, title: e.target.value })}
                            className="w-full font-zentry text-sm font-bold p-2 rounded-xl bg-gray-100 dark:bg-zinc-800 border border-blue-500"
                          />
                          <textarea
                            rows={4}
                            value={JSON.stringify(editingBlock.data, null, 2)}
                            onChange={(e) => {
                              try {
                                const parsed = JSON.parse(e.target.value);
                                setEditingBlock({ ...editingBlock, data: parsed });
                              } catch {}
                            }}
                            className="w-full font-mono text-xs p-2 rounded-xl bg-slate-950 text-cyan-400 border border-gray-700"
                          />
                          <button
                            onClick={() => handleSave(editingBlock)}
                            disabled={savingId === block.id}
                            className="px-4 py-2 rounded-full bg-emerald-600 text-white font-general text-xs font-bold uppercase flex items-center gap-1.5"
                          >
                            {savingId === block.id ? <FiRefreshCw className="animate-spin" /> : <FiCheck />} Save Block
                          </button>
                        </div>
                      ) : (
                        <pre className="font-mono text-[11px] p-3 rounded-xl bg-gray-50 dark:bg-zinc-900 text-slate-700 dark:text-gray-300 overflow-x-auto max-h-32">
                          {JSON.stringify(block.data, null, 2)}
                        </pre>
                      )}
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
