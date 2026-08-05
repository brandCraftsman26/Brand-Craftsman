"use client";

import React, { useState, useEffect } from "react";
import { DbUser } from "@/lib/supabase/db";
import { FiUsers, FiShield, FiSave, FiCheck, FiRefreshCw } from "react-icons/fi";
import { SkeletonList } from "./Skeleton";

export default function UsersManager() {
  const [users, setUsers] = useState<DbUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [savingId, setSavingId] = useState<string | null>(null);
  const [notification, setNotification] = useState<string | null>(null);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/admin/users");
      const json = await res.json();
      if (json.data) setUsers(json.data);
    } catch (err: any) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const showToast = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  };

  const handleUpdate = async (u: DbUser) => {
    try {
      setSavingId(u.id);
      const res = await fetch("/api/admin/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: u.id, role: u.role, plan: u.plan, credits: u.credits }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error);
      showToast(`User ${u.email} updated!`);
    } catch (err: any) {
      alert(`Update error: ${err.message}`);
    } finally {
      setSavingId(null);
    }
  };

  return (
    <div className="p-8 rounded-3xl bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 space-y-6 shadow-sm">
      {notification && (
        <div className="fixed top-20 right-6 z-50 px-6 py-3 rounded-2xl bg-emerald-500 text-white font-general text-xs font-bold uppercase tracking-wider shadow-2xl flex items-center gap-2 animate-bounce">
          <FiCheck className="text-lg" /> {notification}
        </div>
      )}

      <div>
        <h3 className="font-zentry text-2xl font-black uppercase tracking-tight flex items-center gap-2">
          <FiUsers className="text-purple-500" /> User Accounts & Role Privileges
        </h3>
        <p className="font-robert-regular text-xs text-gray-500 mt-0.5">
          View registered users, assign ADMIN status, adjust AI generation credits, and manage plans.
        </p>
      </div>

      {loading ? (
        <SkeletonList count={4} />
      ) : users.length === 0 ? (
        <p className="text-gray-500 text-sm py-4">No users synced in Supabase database yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left font-general text-sm">
            <thead>
              <tr className="border-b border-gray-200 dark:border-zinc-800 text-xs font-bold text-gray-500 uppercase tracking-wider">
                <th className="pb-3">User</th>
                <th className="pb-3">Role</th>
                <th className="pb-3">Plan</th>
                <th className="pb-3">Credits</th>
                <th className="pb-3">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-zinc-800">
              {users.map((u, idx) => (
                <tr key={u.id} className="hover:bg-gray-50 dark:hover:bg-zinc-800/40">
                  <td className="py-4">
                    <span className="font-zentry font-bold text-sm block">{u.name || "Client"}</span>
                    <span className="font-mono text-xs text-gray-400">{u.email}</span>
                  </td>

                  <td className="py-4">
                    <select
                      value={u.role}
                      onChange={(e) => {
                        const copy = [...users];
                        copy[idx].role = e.target.value as any;
                        setUsers(copy);
                      }}
                      className="font-general text-xs font-bold px-3 py-1.5 rounded-xl bg-gray-100 dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700"
                    >
                      <option value="USER">USER</option>
                      <option value="ADMIN">ADMIN</option>
                    </select>
                  </td>

                  <td className="py-4">
                    <select
                      value={u.plan}
                      onChange={(e) => {
                        const copy = [...users];
                        copy[idx].plan = e.target.value as any;
                        setUsers(copy);
                      }}
                      className="font-general text-xs font-bold px-3 py-1.5 rounded-xl bg-gray-100 dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700"
                    >
                      <option value="FREE">FREE</option>
                      <option value="STARTER">STARTER</option>
                      <option value="PRO">PRO</option>
                      <option value="AGENCY">AGENCY</option>
                    </select>
                  </td>

                  <td className="py-4">
                    <input
                      type="number"
                      value={u.credits}
                      onChange={(e) => {
                        const copy = [...users];
                        copy[idx].credits = Number(e.target.value);
                        setUsers(copy);
                      }}
                      className="w-24 font-mono text-xs font-bold px-3 py-1.5 rounded-xl bg-gray-100 dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700"
                    />
                  </td>

                  <td className="py-4">
                    <button
                      onClick={() => handleUpdate(u)}
                      disabled={savingId === u.id}
                      className="px-3 py-1.5 rounded-xl bg-blue-600 text-white font-general text-xs font-bold uppercase flex items-center gap-1.5 hover:bg-blue-700 transition-colors"
                    >
                      {savingId === u.id ? <FiRefreshCw className="animate-spin" /> : <FiSave />} Save
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
