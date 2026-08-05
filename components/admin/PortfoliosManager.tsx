"use client";

import React, { useState } from "react";
import { CmsPortfolio } from "@/lib/supabase/db";
import { useRealtime } from "@/hooks/use-realtime";
import { FiPlus, FiTrash2, FiEdit3, FiCheck, FiRefreshCw, FiEye, FiEyeOff, FiBriefcase } from "react-icons/fi";
import { SkeletonList } from "./Skeleton";

export default function PortfoliosManager({ initialData }: { initialData?: CmsPortfolio[] }) {
  const { data: portfolios, loading, error } = useRealtime<CmsPortfolio>("cms_portfolios", initialData);
  const [savingId, setSavingId] = useState<string | null>(null);
  const [notification, setNotification] = useState<string | null>(null);
  const [editingItem, setEditingItem] = useState<Partial<CmsPortfolio> | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [category, setCategory] = useState("Web Development");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [clientName, setClientName] = useState("");
  const [leadGrowth, setLeadGrowth] = useState("+50%");
  const [conversionUplift, setConversionUplift] = useState("+30%");

  const showToast = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  };

  const handleSave = async (item: Partial<CmsPortfolio>) => {
    try {
      setSavingId(item.id || "new");
      const res = await fetch("/api/cms/portfolios", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(item),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error);
      showToast(`Portfolio "${item.title}" saved!`);
      setEditingItem(null);
      setIsCreating(false);
    } catch (err: any) {
      alert(`Error saving portfolio: ${err.message}`);
    } finally {
      setSavingId(null);
    }
  };

  const handleCreate = () => {
    if (!title || !slug) return alert("Title and Slug are required");
    handleSave({
      title,
      slug,
      category,
      image: image || "/img/portfolio_website_1785511403920.png",
      description,
      client_name: clientName,
      metrics: { leadGrowth, conversionUplift },
      is_published: true,
      sort_order: portfolios.length + 1,
    });
  };

  const handleDelete = async (id: string, titleStr: string) => {
    if (!confirm(`Delete portfolio item "${titleStr}"?`)) return;
    try {
      const res = await fetch(`/api/cms/portfolios?id=${id}`, { method: "DELETE" });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error);
      showToast(`Deleted "${titleStr}"`);
    } catch (err: any) {
      alert(`Error deleting: ${err.message}`);
    }
  };

  return (
    <div className="p-8 rounded-3xl bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 space-y-6 shadow-sm">
      {notification && (
        <div className="fixed top-20 right-6 z-50 px-6 py-3 rounded-2xl bg-emerald-500 text-white font-general text-xs font-bold uppercase tracking-wider shadow-2xl flex items-center gap-2 animate-bounce">
          <FiCheck className="text-lg" /> {notification}
        </div>
      )}

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h3 className="font-zentry text-2xl font-black uppercase tracking-tight flex items-center gap-2">
            <FiBriefcase className="text-blue-500" /> Portfolio Case Studies CMS
          </h3>
          <p className="font-robert-regular text-xs text-gray-500 mt-0.5">
            Add, update, or delete live portfolio projects, metrics, and visual previews.
          </p>
        </div>

        <button
          onClick={() => setIsCreating(!isCreating)}
          className="px-5 py-2.5 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-general text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow-md hover:scale-105 transition-all"
        >
          <FiPlus /> {isCreating ? "Cancel" : "Add Portfolio Item"}
        </button>
      </div>

      {isCreating && (
        <div className="p-6 rounded-2xl bg-gray-50 dark:bg-zinc-800/50 border border-gray-200 dark:border-zinc-700 space-y-4">
          <h4 className="font-zentry text-lg font-bold uppercase">New Portfolio Project</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Project Title</label>
              <input
                type="text"
                placeholder="e.g. Kovai Tex Printing Engine"
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                  setSlug(e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, "-"));
                }}
                className="w-full font-zentry text-sm font-bold px-3 py-2 rounded-xl bg-white dark:bg-zinc-900 border border-gray-300 dark:border-zinc-700"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-gray-500 mb-1">URL Slug</label>
              <input
                type="text"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                className="w-full font-mono text-sm px-3 py-2 rounded-xl bg-white dark:bg-zinc-900 border border-gray-300 dark:border-zinc-700"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full font-general text-sm px-3 py-2 rounded-xl bg-white dark:bg-zinc-900 border border-gray-300 dark:border-zinc-700"
              >
                <option value="Web Development">Web Development</option>
                <option value="Branding">Branding</option>
                <option value="Digital Marketing">Digital Marketing</option>
                <option value="Mobile Applications">Mobile Applications</option>
                <option value="Printing">Printing</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Client Name</label>
              <input
                type="text"
                placeholder="e.g. Kovai Tex"
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                className="w-full font-general text-sm px-3 py-2 rounded-xl bg-white dark:bg-zinc-900 border border-gray-300 dark:border-zinc-700"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Lead Growth Metric</label>
              <input
                type="text"
                placeholder="+55%"
                value={leadGrowth}
                onChange={(e) => setLeadGrowth(e.target.value)}
                className="w-full font-mono text-sm px-3 py-2 rounded-xl bg-white dark:bg-zinc-900 border border-gray-300 dark:border-zinc-700"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Conversion Metric</label>
              <input
                type="text"
                placeholder="+40%"
                value={conversionUplift}
                onChange={(e) => setConversionUplift(e.target.value)}
                className="w-full font-mono text-sm px-3 py-2 rounded-xl bg-white dark:bg-zinc-900 border border-gray-300 dark:border-zinc-700"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Image URL</label>
            <input
              type="text"
              placeholder="/img/portfolio_website_1785511403920.png"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              className="w-full font-general text-sm px-3 py-2 rounded-xl bg-white dark:bg-zinc-900 border border-gray-300 dark:border-zinc-700"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Case Study Description</label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full font-robert-regular text-sm p-3 rounded-xl bg-white dark:bg-zinc-900 border border-gray-300 dark:border-zinc-700"
            />
          </div>

          <button
            onClick={handleCreate}
            disabled={savingId === "new"}
            className="px-6 py-2.5 rounded-full bg-emerald-600 text-white font-general text-xs font-bold uppercase tracking-wider flex items-center gap-2"
          >
            {savingId === "new" ? <FiRefreshCw className="animate-spin" /> : <FiCheck />} Create Portfolio Item
          </button>
        </div>
      )}

      {loading ? (
        <SkeletonList count={4} />
      ) : error ? (
        <div className="p-4 rounded-xl bg-red-500/10 text-red-500 text-xs font-bold">
          Failed to load portfolios: {error}
        </div>
      ) : portfolios.length === 0 ? (
        <p className="text-gray-500 text-sm py-4">No portfolio items added yet. Click above to create one!</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {portfolios.map((item) => (
            <div
              key={item.id}
              className="p-5 rounded-2xl bg-gray-50 dark:bg-zinc-800/40 border border-gray-200 dark:border-zinc-700 space-y-3"
            >
              <div className="flex justify-between items-start">
                <div>
                  <span className="font-zentry text-lg font-bold block">{item.title}</span>
                  <span className="px-2.5 py-0.5 rounded-full bg-blue-500/10 text-blue-500 text-[10px] font-bold font-general">
                    {item.category}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleSave({ ...item, is_published: !item.is_published })}
                    className={`p-1.5 rounded-lg text-xs ${
                      item.is_published ? "text-emerald-500 bg-emerald-500/10" : "text-gray-400 bg-gray-100 dark:bg-zinc-800"
                    }`}
                  >
                    {item.is_published ? <FiEye /> : <FiEyeOff />}
                  </button>
                  <button
                    onClick={() => setEditingItem(editingItem?.id === item.id ? null : item)}
                    className="p-1.5 rounded-lg bg-gray-100 dark:bg-zinc-800 text-gray-400 hover:text-white"
                  >
                    <FiEdit3 />
                  </button>
                  <button
                    onClick={() => handleDelete(item.id, item.title)}
                    className="p-1.5 rounded-lg bg-gray-100 dark:bg-zinc-800 text-gray-400 hover:text-red-500"
                  >
                    <FiTrash2 />
                  </button>
                </div>
              </div>

              {editingItem?.id === item.id ? (
                <div className="space-y-3 pt-3 border-t border-gray-200 dark:border-zinc-700">
                  <input
                    type="text"
                    value={editingItem.title}
                    onChange={(e) => setEditingItem({ ...editingItem, title: e.target.value })}
                    className="w-full font-zentry text-sm font-bold p-2 rounded-xl bg-gray-100 dark:bg-zinc-800 border border-blue-500"
                  />
                  <textarea
                    rows={3}
                    value={editingItem.description || ""}
                    onChange={(e) => setEditingItem({ ...editingItem, description: e.target.value })}
                    className="w-full font-robert-regular text-xs p-2 rounded-xl bg-gray-100 dark:bg-zinc-800 border border-blue-500"
                  />
                  <button
                    onClick={() => handleSave(editingItem)}
                    disabled={savingId === item.id}
                    className="px-4 py-2 rounded-full bg-emerald-600 text-white font-general text-xs font-bold uppercase flex items-center gap-1.5"
                  >
                    {savingId === item.id ? <FiRefreshCw className="animate-spin" /> : <FiCheck />} Save Portfolio
                  </button>
                </div>
              ) : (
                <p className="font-robert-regular text-xs text-gray-600 dark:text-gray-400 line-clamp-2">
                  {item.description}
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
