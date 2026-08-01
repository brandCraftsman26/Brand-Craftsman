/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { FiPlus, FiEdit2, FiTrash2, FiExternalLink, FiLayout } from "react-icons/fi";
import { format } from "date-fns";

type BuilderPage = {
  id: string;
  title: string;
  slug: string;
  isPublished: boolean;
  updatedAt: string;
};

export default function BuilderPagesDashboard() {
  const [pages, setPages] = useState<BuilderPage[]>([]);
  const [loading, setLoading] = useState(true);
  const [showNewModal, setShowNewModal] = useState(false);
  const [newPage, setNewPage] = useState({ title: "", slug: "" });
  const [creating, setCreating] = useState(false);

  const fetchPages = React.useCallback(async () => {
    try {
      const res = await fetch("/api/admin/builder/pages");
      if (res.ok) {
        const data = await res.json();
        setPages(data);
      }
    } catch (error) {
      console.error("Failed to fetch pages", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPages();
  }, [fetchPages]);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setCreating(true);
    try {
      const res = await fetch("/api/admin/builder/pages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newPage),
      });
      if (res.ok) {
        const page = await res.json();
        window.location.href = `/admin/builder/${page.id}`;
      }
    } catch (error) {
      console.error("Failed to create page", error);
      setCreating(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this page?")) return;
    
    try {
      const res = await fetch(`/api/admin/builder/pages/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setPages(pages.filter((p) => p.id !== id));
      }
    } catch (error) {
      console.error("Failed to delete page", error);
    }
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
            <FiLayout className="text-pink-500" /> Website Builder
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">Manage your custom landing pages and layouts.</p>
        </div>
        <button
          onClick={() => setShowNewModal(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 px-5 rounded-lg flex items-center gap-2 transition-colors shadow-lg shadow-blue-500/20"
        >
          <FiPlus /> Create New Page
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center p-20">
          <div className="w-8 h-8 border-t-2 border-blue-500 rounded-full animate-spin"></div>
        </div>
      ) : pages.length === 0 ? (
        <div className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-xl p-12 text-center">
          <div className="w-16 h-16 bg-gray-100 dark:bg-zinc-800 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-400">
            <FiLayout size={24} />
          </div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">No pages found</h3>
          <p className="text-gray-500 dark:text-gray-400 max-w-md mx-auto mb-6">You haven&apos;t created any custom builder pages yet. Click the button below to get started.</p>
          <button
            onClick={() => setShowNewModal(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 px-6 rounded-lg transition-colors"
          >
            Create Your First Page
          </button>
        </div>
      ) : (
        <div className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-xl overflow-hidden shadow-sm">
          <table className="w-full text-left">
            <thead className="bg-gray-50 dark:bg-zinc-800/50 border-b border-gray-200 dark:border-zinc-800">
              <tr>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Page Name</th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Last Updated</th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-zinc-800">
              {pages.map((page) => (
                <tr key={page.id} className="hover:bg-gray-50 dark:hover:bg-zinc-800/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="font-medium text-gray-900 dark:text-white">{page.title}</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400 font-mono mt-1">/{page.slug}</div>
                  </td>
                  <td className="px-6 py-4">
                    {page.isPublished ? (
                      <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 border border-green-200 dark:border-green-800">Published</span>
                    ) : (
                      <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400 border border-yellow-200 dark:border-yellow-800">Draft</span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                    {format(new Date(page.updatedAt), "MMM d, yyyy h:mm a")}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-3">
                      <Link href={`/${page.slug}`} target="_blank" className="text-gray-400 hover:text-blue-500 transition-colors p-2" title="View live page">
                        <FiExternalLink />
                      </Link>
                      <Link href={`/admin/builder/${page.id}`} className="text-gray-400 hover:text-blue-500 transition-colors p-2" title="Edit in builder">
                        <FiEdit2 />
                      </Link>
                      <button onClick={() => handleDelete(page.id)} className="text-gray-400 hover:text-red-500 transition-colors p-2" title="Delete page">
                        <FiTrash2 />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* New Page Modal */}
      {showNewModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-zinc-900 rounded-2xl w-full max-w-md shadow-2xl border border-gray-200 dark:border-zinc-800">
            <div className="p-6 border-b border-gray-200 dark:border-zinc-800 flex justify-between items-center">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">Create New Page</h2>
              <button onClick={() => setShowNewModal(false)} className="text-gray-400 hover:text-gray-500">&times;</button>
            </div>
            <form onSubmit={handleCreate} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Page Title</label>
                <input 
                  type="text" 
                  required
                  value={newPage.title}
                  onChange={(e) => setNewPage({ ...newPage, title: e.target.value })}
                  className="w-full bg-gray-50 dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g. About Us"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">URL Slug</label>
                <input 
                  type="text" 
                  required
                  value={newPage.slug}
                  onChange={(e) => setNewPage({ ...newPage, slug: e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, "-") })}
                  className="w-full bg-gray-50 dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g. about-us"
                />
                <p className="text-xs text-gray-500 mt-1">This will be the URL path (e.g. yoursite.com/about-us).</p>
              </div>
              <div className="pt-4 flex gap-3">
                <button 
                  type="button" 
                  onClick={() => setShowNewModal(false)}
                  className="flex-1 bg-gray-100 hover:bg-gray-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-gray-900 dark:text-white font-medium py-2.5 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  disabled={creating}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 rounded-lg transition-colors disabled:opacity-70 flex items-center justify-center"
                >
                  {creating ? <div className="w-5 h-5 border-t-2 border-white rounded-full animate-spin"></div> : 'Create Page'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
