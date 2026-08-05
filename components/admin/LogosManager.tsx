"use client";

import React, { useState } from "react";
import { CmsLogo } from "@/lib/supabase/db";
import { useRealtime } from "@/hooks/use-realtime";
import { FiPlus, FiTrash2, FiEdit3, FiCheck, FiRefreshCw, FiImage, FiEye, FiEyeOff } from "react-icons/fi";
import { SkeletonList } from "./Skeleton";

export default function LogosManager({ initialData }: { initialData?: CmsLogo[] }) {
  const { data: logos, loading, error } = useRealtime<CmsLogo>("cms_logos", initialData);
  const [savingId, setSavingId] = useState<string | null>(null);
  const [notification, setNotification] = useState<string | null>(null);
  const [editingItem, setEditingItem] = useState<Partial<CmsLogo> | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  const [name, setName] = useState("");
  const [logoUrl, setLogoUrl] = useState("/img/logo-dark.png");
  const [websiteUrl, setWebsiteUrl] = useState("");

  const showToast = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  };

  const handleSave = async (item: Partial<CmsLogo>) => {
    try {
      setSavingId(item.id || "new");
      const res = await fetch("/api/cms/logos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(item),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error);
      showToast(`Logo "${item.name}" saved!`);
      setEditingItem(null);
      setIsCreating(false);
    } catch (err: any) {
      alert(`Error saving logo: ${err.message}`);
    } finally {
      setSavingId(null);
    }
  };

  const handleCreate = () => {
    if (!name || !logoUrl) return alert("Name and Logo URL are required");
    handleSave({
      name,
      logo_url: logoUrl,
      website_url: websiteUrl,
      is_active: true,
      sort_order: logos.length + 1,
    });
  };

  const handleDelete = async (id: string, nameStr: string) => {
    if (!confirm(`Delete logo "${nameStr}"?`)) return;
    try {
      const res = await fetch(`/api/cms/logos?id=${id}`, { method: "DELETE" });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error);
      showToast(`Deleted logo "${nameStr}"`);
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
            <FiImage className="text-purple-500" /> Brand Logo Carousel CMS
          </h3>
          <p className="font-robert-regular text-xs text-gray-500 mt-0.5">
            Manage partner & client brand logos displayed in the continuous marquee slider.
          </p>
        </div>

        <button
          onClick={() => setIsCreating(!isCreating)}
          className="px-5 py-2.5 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-general text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow-md hover:scale-105 transition-all"
        >
          <FiPlus /> {isCreating ? "Cancel" : "Add Brand Logo"}
        </button>
      </div>

      {isCreating && (
        <div className="p-6 rounded-2xl bg-gray-50 dark:bg-zinc-800/50 border border-gray-200 dark:border-zinc-700 space-y-4">
          <h4 className="font-zentry text-lg font-bold uppercase">Add New Partner Logo</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Brand Name</label>
              <input
                type="text"
                placeholder="e.g. Kovai Tex"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full font-zentry text-sm font-bold px-3 py-2 rounded-xl bg-white dark:bg-zinc-900 border border-gray-300 dark:border-zinc-700"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Logo Image URL</label>
              <input
                type="text"
                placeholder="/img/logo-dark.png"
                value={logoUrl}
                onChange={(e) => setLogoUrl(e.target.value)}
                className="w-full font-general text-sm px-3 py-2 rounded-xl bg-white dark:bg-zinc-900 border border-gray-300 dark:border-zinc-700"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Website URL (Optional)</label>
              <input
                type="text"
                placeholder="https://brandcraftsman.com"
                value={websiteUrl}
                onChange={(e) => setWebsiteUrl(e.target.value)}
                className="w-full font-general text-sm px-3 py-2 rounded-xl bg-white dark:bg-zinc-900 border border-gray-300 dark:border-zinc-700"
              />
            </div>
          </div>

          <button
            onClick={handleCreate}
            disabled={savingId === "new"}
            className="px-6 py-2.5 rounded-full bg-emerald-600 text-white font-general text-xs font-bold uppercase tracking-wider flex items-center gap-2"
          >
            {savingId === "new" ? <FiRefreshCw className="animate-spin" /> : <FiCheck />} Add Logo
          </button>
        </div>
      )}

      {loading ? (
        <SkeletonList count={3} />
      ) : error ? (
        <div className="p-4 rounded-xl bg-red-500/10 text-red-500 text-xs font-bold">
          Failed to load logos: {error}
        </div>
      ) : logos.length === 0 ? (
        <p className="text-gray-500 text-sm py-4">No logos added yet. Click above to create one!</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {logos.map((lg) => (
            <div
              key={lg.id}
              className="p-4 rounded-2xl bg-gray-50 dark:bg-zinc-800/40 border border-gray-200 dark:border-zinc-700 flex items-center justify-between gap-3"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-slate-900 flex items-center justify-center p-1">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={lg.logo_url} alt={lg.name} className="max-h-full max-w-full object-contain" />
                </div>
                <div>
                  <span className="font-zentry text-sm font-bold block">{lg.name}</span>
                  <span className="text-[10px] font-mono text-gray-400">Order: #{lg.sort_order}</span>
                </div>
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => handleSave({ ...lg, is_active: !lg.is_active })}
                  className={`p-1.5 rounded-lg text-xs ${
                    lg.is_active ? "text-emerald-500 bg-emerald-500/10" : "text-gray-400 bg-gray-100 dark:bg-zinc-800"
                  }`}
                >
                  {lg.is_active ? <FiEye /> : <FiEyeOff />}
                </button>
                <button
                  onClick={() => handleDelete(lg.id, lg.name)}
                  className="p-1.5 rounded-lg bg-gray-100 dark:bg-zinc-800 text-gray-400 hover:text-red-500"
                >
                  <FiTrash2 />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
