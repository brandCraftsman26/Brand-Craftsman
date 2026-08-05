"use client";

import React, { useState } from "react";
import { CmsReview } from "@/lib/supabase/db";
import { useRealtime } from "@/hooks/use-realtime";
import { FiPlus, FiTrash2, FiEdit3, FiCheck, FiRefreshCw, FiStar, FiMessageSquare } from "react-icons/fi";
import { SkeletonList } from "./Skeleton";

export default function ReviewsManager({ initialData }: { initialData?: CmsReview[] }) {
  const { data: reviews, loading, error } = useRealtime<CmsReview>("cms_reviews", initialData);
  const [savingId, setSavingId] = useState<string | null>(null);
  const [notification, setNotification] = useState<string | null>(null);
  const [editingItem, setEditingItem] = useState<Partial<CmsReview> | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  const [author, setAuthor] = useState("");
  const [role, setRole] = useState("CEO & Founder");
  const [company, setCompany] = useState("");
  const [quote, setQuote] = useState("");
  const [rating, setRating] = useState(5);

  const showToast = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  };

  const handleSave = async (item: Partial<CmsReview>) => {
    try {
      setSavingId(item.id || "new");
      const res = await fetch("/api/cms/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(item),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error);
      showToast(`Review from "${item.author}" saved!`);
      setEditingItem(null);
      setIsCreating(false);
    } catch (err: any) {
      alert(`Error saving review: ${err.message}`);
    } finally {
      setSavingId(null);
    }
  };

  const handleCreate = () => {
    if (!author || !quote) return alert("Author and Quote are required");
    handleSave({
      author,
      role,
      company,
      quote,
      rating,
      is_featured: true,
      sort_order: reviews.length + 1,
    });
  };

  const handleDelete = async (id: string, authorName: string) => {
    if (!confirm(`Delete review from "${authorName}"?`)) return;
    try {
      const res = await fetch(`/api/cms/reviews?id=${id}`, { method: "DELETE" });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error);
      showToast(`Deleted review from "${authorName}"`);
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
            <FiMessageSquare className="text-amber-500" /> Client Reviews & Testimonials CMS
          </h3>
          <p className="font-robert-regular text-xs text-gray-500 mt-0.5">
            Add, edit, or delete customer testimonials displayed in the live testimonial slider.
          </p>
        </div>

        <button
          onClick={() => setIsCreating(!isCreating)}
          className="px-5 py-2.5 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-general text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow-md hover:scale-105 transition-all"
        >
          <FiPlus /> {isCreating ? "Cancel" : "Add Review"}
        </button>
      </div>

      {isCreating && (
        <div className="p-6 rounded-2xl bg-gray-50 dark:bg-zinc-800/50 border border-gray-200 dark:border-zinc-700 space-y-4">
          <h4 className="font-zentry text-lg font-bold uppercase">New Client Testimonial</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Author Name</label>
              <input
                type="text"
                placeholder="e.g. Karthik Subbaraj"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                className="w-full font-zentry text-sm font-bold px-3 py-2 rounded-xl bg-white dark:bg-zinc-900 border border-gray-300 dark:border-zinc-700"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Role / Position</label>
              <input
                type="text"
                placeholder="e.g. Founder & CEO"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full font-general text-sm px-3 py-2 rounded-xl bg-white dark:bg-zinc-900 border border-gray-300 dark:border-zinc-700"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Company</label>
              <input
                type="text"
                placeholder="e.g. Kovai Tex"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                className="w-full font-general text-sm px-3 py-2 rounded-xl bg-white dark:bg-zinc-900 border border-gray-300 dark:border-zinc-700"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Star Rating (1-5)</label>
            <select
              value={rating}
              onChange={(e) => setRating(Number(e.target.value))}
              className="w-48 font-general text-sm px-3 py-2 rounded-xl bg-white dark:bg-zinc-900 border border-gray-300 dark:border-zinc-700"
            >
              <option value={5}>5 Stars ⭐⭐⭐⭐⭐</option>
              <option value={4}>4 Stars ⭐⭐⭐⭐</option>
              <option value={3}>3 Stars ⭐⭐⭐</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Testimonial Quote</label>
            <textarea
              rows={3}
              value={quote}
              onChange={(e) => setQuote(e.target.value)}
              className="w-full font-robert-regular text-sm p-3 rounded-xl bg-white dark:bg-zinc-900 border border-gray-300 dark:border-zinc-700"
            />
          </div>

          <button
            onClick={handleCreate}
            disabled={savingId === "new"}
            className="px-6 py-2.5 rounded-full bg-emerald-600 text-white font-general text-xs font-bold uppercase tracking-wider flex items-center gap-2"
          >
            {savingId === "new" ? <FiRefreshCw className="animate-spin" /> : <FiCheck />} Create Review
          </button>
        </div>
      )}

      {loading ? (
        <SkeletonList count={3} />
      ) : error ? (
        <div className="p-4 rounded-xl bg-red-500/10 text-red-500 text-xs font-bold">
          Failed to load reviews: {error}
        </div>
      ) : reviews.length === 0 ? (
        <p className="text-gray-500 text-sm py-4">No reviews added yet. Click above to create one!</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {reviews.map((rev) => (
            <div
              key={rev.id}
              className="p-5 rounded-2xl bg-gray-50 dark:bg-zinc-800/40 border border-gray-200 dark:border-zinc-700 space-y-3"
            >
              <div className="flex justify-between items-start">
                <div>
                  <span className="font-zentry text-lg font-bold block">{rev.author}</span>
                  <span className="text-xs text-gray-500 font-general block">
                    {rev.role} {rev.company ? `• ${rev.company}` : ""}
                  </span>
                  <div className="flex items-center text-amber-400 gap-1 text-xs mt-1">
                    {Array.from({ length: rev.rating }).map((_, i) => (
                      <FiStar key={i} className="fill-amber-400" />
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setEditingItem(editingItem?.id === rev.id ? null : rev)}
                    className="p-1.5 rounded-lg bg-gray-100 dark:bg-zinc-800 text-gray-400 hover:text-white"
                  >
                    <FiEdit3 />
                  </button>
                  <button
                    onClick={() => handleDelete(rev.id, rev.author)}
                    className="p-1.5 rounded-lg bg-gray-100 dark:bg-zinc-800 text-gray-400 hover:text-red-500"
                  >
                    <FiTrash2 />
                  </button>
                </div>
              </div>

              {editingItem?.id === rev.id ? (
                <div className="space-y-3 pt-3 border-t border-gray-200 dark:border-zinc-700">
                  <textarea
                    rows={3}
                    value={editingItem.quote || ""}
                    onChange={(e) => setEditingItem({ ...editingItem, quote: e.target.value })}
                    className="w-full font-robert-regular text-xs p-2 rounded-xl bg-gray-100 dark:bg-zinc-800 border border-blue-500"
                  />
                  <button
                    onClick={() => handleSave(editingItem)}
                    disabled={savingId === rev.id}
                    className="px-4 py-2 rounded-full bg-emerald-600 text-white font-general text-xs font-bold uppercase flex items-center gap-1.5"
                  >
                    {savingId === rev.id ? <FiRefreshCw className="animate-spin" /> : <FiCheck />} Save Review
                  </button>
                </div>
              ) : (
                <p className="font-robert-regular text-xs text-gray-700 dark:text-gray-300 italic">
                  &ldquo;{rev.quote}&rdquo;
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
