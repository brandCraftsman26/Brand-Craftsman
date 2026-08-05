"use client";

import React, { useState } from "react";
import { CmsWord } from "@/lib/supabase/db";
import { useRealtime } from "@/hooks/use-realtime";
import { FiSave, FiPlus, FiTrash2, FiEdit3, FiCheck, FiRefreshCw } from "react-icons/fi";
import { SkeletonList } from "./Skeleton";

export default function WordsManager({ initialWords }: { initialWords?: CmsWord[] }) {
  const { data: words, loading, error } = useRealtime<CmsWord>("cms_words", initialWords);
  const [savingKey, setSavingKey] = useState<string | null>(null);
  const [notification, setNotification] = useState<string | null>(null);
  const [editingWord, setEditingWord] = useState<Partial<CmsWord> | null>(null);
  const [newKey, setNewKey] = useState("");
  const [newValue, setNewValue] = useState("");
  const [newCategory, setNewCategory] = useState("general");
  const [isAdding, setIsAdding] = useState(false);

  const showToast = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  };

  const handleSave = async (wordKey: string, value: string, category: string) => {
    try {
      setSavingKey(wordKey);
      const res = await fetch("/api/cms/words", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ key: wordKey, value, category }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error);
      showToast(`Word "${wordKey}" updated successfully!`);
      setEditingWord(null);
    } catch (err: any) {
      alert(`Error saving word: ${err.message}`);
    } finally {
      setSavingKey(null);
    }
  };

  const handleCreate = async () => {
    if (!newKey.trim()) return alert("Key is required");
    try {
      setSavingKey("new");
      const res = await fetch("/api/cms/words", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ key: newKey.trim(), value: newValue, category: newCategory }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error);
      showToast(`Created "${newKey}"!`);
      setNewKey("");
      setNewValue("");
      setIsAdding(false);
    } catch (err: any) {
      alert(`Error creating word: ${err.message}`);
    } finally {
      setSavingKey(null);
    }
  };

  const handleDelete = async (id: string, key: string) => {
    if (!confirm(`Are you sure you want to delete "${key}"?`)) return;
    try {
      const res = await fetch(`/api/cms/words?id=${id}`, { method: "DELETE" });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error);
      showToast(`Deleted "${key}"!`);
    } catch (err: any) {
      alert(`Error deleting word: ${err.message}`);
    }
  };

  // Group words by category
  const categories = Array.from(new Set(words.map((w) => w.category || "general")));

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
            Dynamic CMS Words (Text Fields)
          </h3>
          <p className="font-robert-regular text-xs text-gray-500 mt-0.5">
            Manage site-wide headline text, subtitles, contact parameters, and footer details in real time.
          </p>
        </div>

        <button
          onClick={() => setIsAdding(!isAdding)}
          className="px-5 py-2.5 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-general text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow-md hover:scale-105 transition-all"
        >
          <FiPlus /> {isAdding ? "Cancel" : "Add New Text Key"}
        </button>
      </div>

      {isAdding && (
        <div className="p-6 rounded-2xl bg-gray-50 dark:bg-zinc-800/50 border border-gray-200 dark:border-zinc-700 space-y-4">
          <h4 className="font-zentry text-lg font-bold uppercase">Add New Word/Text</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Unique Key</label>
              <input
                type="text"
                placeholder="e.g. hero_title"
                value={newKey}
                onChange={(e) => setNewKey(e.target.value)}
                className="w-full font-mono text-sm px-3 py-2 rounded-xl bg-white dark:bg-zinc-900 border border-gray-300 dark:border-zinc-700"
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Category</label>
              <input
                type="text"
                placeholder="e.g. hero, contact, footer"
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                className="w-full font-general text-sm px-3 py-2 rounded-xl bg-white dark:bg-zinc-900 border border-gray-300 dark:border-zinc-700"
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Text Value</label>
              <input
                type="text"
                placeholder="Content text..."
                value={newValue}
                onChange={(e) => setNewValue(e.target.value)}
                className="w-full font-robert-regular text-sm px-3 py-2 rounded-xl bg-white dark:bg-zinc-900 border border-gray-300 dark:border-zinc-700"
              />
            </div>
          </div>
          <button
            onClick={handleCreate}
            disabled={savingKey === "new"}
            className="px-6 py-2.5 rounded-full bg-emerald-600 text-white font-general text-xs font-bold uppercase tracking-wider flex items-center gap-2"
          >
            {savingKey === "new" ? <FiRefreshCw className="animate-spin" /> : <FiSave />} Save New Key
          </button>
        </div>
      )}

      {loading ? (
        <SkeletonList count={4} />
      ) : error ? (
        <div className="p-4 rounded-xl bg-red-500/10 text-red-500 text-xs font-bold">
          Failed to load words: {error}
        </div>
      ) : words.length === 0 ? (
        <p className="text-gray-500 text-sm py-4">No CMS words configured yet. Click above to create one!</p>
      ) : (
        <div className="space-y-6">
          {categories.map((cat) => {
            const catWords = words.filter((w) => (w.category || "general") === cat);
            return (
              <div key={cat} className="space-y-3">
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 rounded-full bg-blue-500/10 text-blue-500 font-general text-xs font-bold uppercase tracking-widest">
                    {cat}
                  </span>
                  <div className="h-px bg-gray-200 dark:bg-zinc-800 flex-1" />
                </div>

                <div className="divide-y divide-gray-100 dark:divide-zinc-800">
                  {catWords.map((word) => (
                    <div key={word.id} className="py-3 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 group">
                      <div className="w-full md:w-1/3">
                        <span className="font-mono text-xs text-purple-600 dark:text-purple-400 font-bold block">
                          {word.key}
                        </span>
                        <span className="text-[10px] text-gray-400 font-general">
                          Updated: {new Date(word.updated_at).toLocaleDateString()}
                        </span>
                      </div>

                      <div className="w-full md:w-1/2">
                        {editingWord?.id === word.id ? (
                          <textarea
                            rows={2}
                            value={editingWord.value}
                            onChange={(e) => setEditingWord({ ...editingWord, value: e.target.value })}
                            className="w-full font-robert-regular text-sm p-2 rounded-xl bg-gray-100 dark:bg-zinc-800 border border-blue-500 text-slate-900 dark:text-white"
                          />
                        ) : (
                          <p className="font-robert-regular text-sm text-slate-800 dark:text-gray-200 line-clamp-2">
                            {word.value}
                          </p>
                        )}
                      </div>

                      <div className="flex items-center gap-2">
                        {editingWord?.id === word.id ? (
                          <button
                            onClick={() => handleSave(word.key, editingWord.value || "", word.category)}
                            disabled={savingKey === word.key}
                            className="p-2 rounded-xl bg-emerald-500 text-white hover:bg-emerald-600 transition-colors"
                            title="Save"
                          >
                            {savingKey === word.key ? <FiRefreshCw className="animate-spin" /> : <FiCheck />}
                          </button>
                        ) : (
                          <button
                            onClick={() => setEditingWord(word)}
                            className="p-2 rounded-xl bg-gray-100 dark:bg-zinc-800 text-gray-600 dark:text-gray-300 hover:bg-blue-500 hover:text-white transition-colors"
                            title="Edit"
                          >
                            <FiEdit3 />
                          </button>
                        )}

                        <button
                          onClick={() => handleDelete(word.id, word.key)}
                          className="p-2 rounded-xl bg-gray-100 dark:bg-zinc-800 text-gray-400 hover:bg-red-500 hover:text-white transition-colors"
                          title="Delete"
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
