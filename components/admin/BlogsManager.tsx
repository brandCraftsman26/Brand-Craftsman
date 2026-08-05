"use client";

import React, { useState } from "react";
import { CmsBlog } from "@/lib/supabase/db";
import { useRealtime } from "@/hooks/use-realtime";
import { FiPlus, FiTrash2, FiEdit3, FiCheck, FiRefreshCw, FiFileText, FiEye, FiEyeOff } from "react-icons/fi";
import { SkeletonList } from "./Skeleton";

export default function BlogsManager({ initialData }: { initialData?: CmsBlog[] }) {
  const { data: blogs, loading, error } = useRealtime<CmsBlog>("cms_blogs", initialData);
  const [savingId, setSavingId] = useState<string | null>(null);
  const [notification, setNotification] = useState<string | null>(null);
  const [editingItem, setEditingItem] = useState<Partial<CmsBlog> | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [category, setCategory] = useState("Web Development");
  const [readTime, setReadTime] = useState("5 min read");
  const [author, setAuthor] = useState("Brand Craftsman Team");
  const [excerpt, setExcerpt] = useState("");
  const [featureImage, setFeatureImage] = useState("/img/blog_nextjs_new.png");

  const showToast = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  };

  const handleSave = async (item: Partial<CmsBlog>) => {
    try {
      setSavingId(item.id || "new");
      const res = await fetch("/api/cms/blogs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(item),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error);
      showToast(`Blog article "${item.title}" saved!`);
      setEditingItem(null);
      setIsCreating(false);
    } catch (err: any) {
      alert(`Error saving blog: ${err.message}`);
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
      read_time: readTime,
      author,
      excerpt,
      feature_image: featureImage,
      is_published: true,
    });
  };

  const handleDelete = async (id: string, titleStr: string) => {
    if (!confirm(`Delete blog article "${titleStr}"?`)) return;
    try {
      const res = await fetch(`/api/cms/blogs?id=${id}`, { method: "DELETE" });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error);
      showToast(`Deleted blog "${titleStr}"`);
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
            <FiFileText className="text-emerald-500" /> Blogs & Insights CMS
          </h3>
          <p className="font-robert-regular text-xs text-gray-500 mt-0.5">
            Add, update, or delete dynamic blog articles, technical insights, and SEO publications.
          </p>
        </div>

        <button
          onClick={() => setIsCreating(!isCreating)}
          className="px-5 py-2.5 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-general text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow-md hover:scale-105 transition-all"
        >
          <FiPlus /> {isCreating ? "Cancel" : "Add New Blog Article"}
        </button>
      </div>

      {isCreating && (
        <div className="p-6 rounded-2xl bg-gray-50 dark:bg-zinc-800/50 border border-gray-200 dark:border-zinc-700 space-y-4">
          <h4 className="font-zentry text-lg font-bold uppercase">New Blog Publication</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Article Title</label>
              <input
                type="text"
                placeholder="e.g. Master Guide to Local SEO"
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
              <input
                type="text"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full font-general text-sm px-3 py-2 rounded-xl bg-white dark:bg-zinc-900 border border-gray-300 dark:border-zinc-700"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Author</label>
              <input
                type="text"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                className="w-full font-general text-sm px-3 py-2 rounded-xl bg-white dark:bg-zinc-900 border border-gray-300 dark:border-zinc-700"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Read Time</label>
              <input
                type="text"
                value={readTime}
                onChange={(e) => setReadTime(e.target.value)}
                className="w-full font-mono text-sm px-3 py-2 rounded-xl bg-white dark:bg-zinc-900 border border-gray-300 dark:border-zinc-700"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Feature Image URL</label>
              <input
                type="text"
                value={featureImage}
                onChange={(e) => setFeatureImage(e.target.value)}
                className="w-full font-general text-sm px-3 py-2 rounded-xl bg-white dark:bg-zinc-900 border border-gray-300 dark:border-zinc-700"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Excerpt Summary</label>
            <textarea
              rows={3}
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              className="w-full font-robert-regular text-sm p-3 rounded-xl bg-white dark:bg-zinc-900 border border-gray-300 dark:border-zinc-700"
            />
          </div>

          <button
            onClick={handleCreate}
            disabled={savingId === "new"}
            className="px-6 py-2.5 rounded-full bg-emerald-600 text-white font-general text-xs font-bold uppercase tracking-wider flex items-center gap-2"
          >
            {savingId === "new" ? <FiRefreshCw className="animate-spin" /> : <FiCheck />} Publish Blog
          </button>
        </div>
      )}

      {loading ? (
        <SkeletonList count={3} />
      ) : error ? (
        <div className="p-4 rounded-xl bg-red-500/10 text-red-500 text-xs font-bold">
          Failed to load blogs: {error}
        </div>
      ) : blogs.length === 0 ? (
        <p className="text-gray-500 text-sm py-4">No blogs published yet. Click above to create one!</p>
      ) : (
        <div className="space-y-4">
          {blogs.map((b) => (
            <div
              key={b.id}
              className="p-5 rounded-2xl bg-gray-50 dark:bg-zinc-800/40 border border-gray-200 dark:border-zinc-700 flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
            >
              <div className="flex-1 space-y-1">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-500 text-[10px] font-bold font-general uppercase">
                    {b.category}
                  </span>
                  <span className="text-[10px] font-mono text-gray-400">{b.read_time}</span>
                  <span className="text-[10px] text-gray-400">• By {b.author}</span>
                </div>
                <h4 className="font-zentry text-lg font-bold">{b.title}</h4>
                <p className="font-robert-regular text-xs text-gray-500 line-clamp-1">{b.excerpt}</p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleSave({ ...b, is_published: !b.is_published })}
                  className={`p-2 rounded-xl text-xs ${
                    b.is_published ? "text-emerald-500 bg-emerald-500/10" : "text-gray-400 bg-gray-100 dark:bg-zinc-800"
                  }`}
                >
                  {b.is_published ? <FiEye /> : <FiEyeOff />}
                </button>
                <button
                  onClick={() => handleDelete(b.id, b.title)}
                  className="p-2 rounded-xl bg-gray-100 dark:bg-zinc-800 text-gray-400 hover:text-red-500"
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
