/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import React, { useState, useEffect } from "react";
import { FiSave, FiSettings, FiImage, FiEdit3 } from "react-icons/fi";

export default function SettingsPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });
  
  const [config, setConfig] = useState({
    siteName: "",
    headerLogoUrl: "",
    footerCopyright: "",
    socialLinks: {
      facebook: "",
      twitter: "",
      instagram: "",
      linkedin: ""
    }
  });

  const fetchConfig = React.useCallback(async () => {
    try {
      const res = await fetch("/api/admin/settings");
      if (res.ok) {
        const data = await res.json();
        setConfig({
          siteName: data.siteName || "",
          headerLogoUrl: data.headerLogoUrl || "",
          footerCopyright: data.footerCopyright || "",
          socialLinks: data.socialLinks ? JSON.parse(data.socialLinks) : {
            facebook: "", twitter: "", instagram: "", linkedin: ""
          }
        });
      }
    } catch (error) {
      console.error("Error fetching config:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchConfig();
  }, [fetchConfig]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name.startsWith("social_")) {
      const social = name.split("_")[1];
      setConfig(prev => ({
        ...prev,
        socialLinks: {
          ...prev.socialLinks,
          [social]: value
        }
      }));
    } else {
      setConfig(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage({ text: "", type: "" });

    try {
      const res = await fetch("/api/admin/settings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(config),
      });

      if (res.ok) {
        setMessage({ text: "Settings saved successfully!", type: "success" });
      } else {
        setMessage({ text: "Failed to save settings.", type: "error" });
      }
    } catch (error) {
      console.error("Error saving config:", error);
      setMessage({ text: "An error occurred while saving.", type: "error" });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="flex justify-center p-10"><div className="w-8 h-8 border-t-2 border-blue-500 rounded-full animate-spin"></div></div>;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <FiSettings className="text-blue-500" /> Site Settings
          </h2>
          <p className="text-gray-500 dark:text-gray-400 mt-1">Manage your website&apos;s global configuration, header, and footer.</p>
        </div>
      </div>

      {message.text && (
        <div className={`p-4 mb-6 rounded-lg ${message.type === 'success' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'}`}>
          {message.text}
        </div>
      )}

      <div className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-xl overflow-hidden">
        <form onSubmit={handleSave} className="p-6 space-y-6">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="text-lg font-bold flex items-center gap-2 text-gray-900 dark:text-white border-b border-gray-100 dark:border-zinc-800 pb-2">
                <FiEdit3 className="text-gray-400" /> General Info
              </h3>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Site Name</label>
                <input 
                  type="text" 
                  name="siteName" 
                  value={config.siteName} 
                  onChange={handleChange}
                  className="w-full bg-gray-50 dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g. Brand Craftsman"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Header Logo URL</label>
                <input 
                  type="text" 
                  name="headerLogoUrl" 
                  value={config.headerLogoUrl} 
                  onChange={handleChange}
                  className="w-full bg-gray-50 dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="https://example.com/logo.png"
                />
                <p className="text-xs text-gray-500 mt-1">Leave empty to use the default text logo.</p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Footer Copyright Text</label>
                <input 
                  type="text" 
                  name="footerCopyright" 
                  value={config.footerCopyright} 
                  onChange={handleChange}
                  className="w-full bg-gray-50 dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="© 2026 Brand Craftsman. All rights reserved."
                />
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-bold flex items-center gap-2 text-gray-900 dark:text-white border-b border-gray-100 dark:border-zinc-800 pb-2">
                <FiImage className="text-gray-400" /> Social Links
              </h3>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Facebook URL</label>
                <input 
                  type="text" 
                  name="social_facebook" 
                  value={config.socialLinks.facebook} 
                  onChange={handleChange}
                  className="w-full bg-gray-50 dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="https://facebook.com/..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Twitter URL</label>
                <input 
                  type="text" 
                  name="social_twitter" 
                  value={config.socialLinks.twitter} 
                  onChange={handleChange}
                  className="w-full bg-gray-50 dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="https://twitter.com/..."
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Instagram URL</label>
                <input 
                  type="text" 
                  name="social_instagram" 
                  value={config.socialLinks.instagram} 
                  onChange={handleChange}
                  className="w-full bg-gray-50 dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="https://instagram.com/..."
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">LinkedIn URL</label>
                <input 
                  type="text" 
                  name="social_linkedin" 
                  value={config.socialLinks.linkedin} 
                  onChange={handleChange}
                  className="w-full bg-gray-50 dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="https://linkedin.com/..."
                />
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-gray-100 dark:border-zinc-800 flex justify-end">
            <button 
              type="submit" 
              disabled={saving}
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 px-6 rounded-lg transition-colors flex items-center gap-2 disabled:opacity-70"
            >
              {saving ? <div className="w-4 h-4 border-t-2 border-white rounded-full animate-spin"></div> : <FiSave />} 
              {saving ? 'Saving...' : 'Save Settings'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
