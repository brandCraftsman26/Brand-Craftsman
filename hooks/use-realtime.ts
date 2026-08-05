"use client";

import { useEffect, useState } from "react";
import { getClientDb } from "@/lib/supabase/db";
import { RealtimeChannel } from "@supabase/supabase-js";

export function useRealtime<T extends { id: string }>(
  table: string,
  initialData: T[] = [],
  filter?: { column: string; value: string }
) {
  const [data, setData] = useState<T[]>(initialData);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Sync initialData when passed, using JSON.stringify to avoid infinite loops
  useEffect(() => {
    if (initialData && initialData.length > 0) {
      setData(initialData);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(initialData)]);

  useEffect(() => {
    const supabase = getClientDb();
    let channel: RealtimeChannel;

    async function fetchData() {
      try {
        setLoading(true);
        let query = supabase.from(table).select("*");
        if (filter) {
          query = query.eq(filter.column, filter.value);
        }
        const { data: result, error: fetchErr } = await query;
        if (fetchErr) throw fetchErr;
        if (result) setData(result as T[]);
      } catch (err: any) {
        setError(err.message || "Failed to fetch realtime data");
      } finally {
        setLoading(false);
      }
    }

    fetchData();

    // Subscribe to realtime changes
    channel = supabase
      .channel(`realtime:${table}`)
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: table,
          filter: filter ? `${filter.column}=eq.${filter.value}` : undefined,
        },
        (payload) => {
          if (payload.eventType === "INSERT") {
            const newRecord = payload.new as T;
            setData((prev) => [newRecord, ...prev.filter((item) => item.id !== newRecord.id)]);
          } else if (payload.eventType === "UPDATE") {
            const updatedRecord = payload.new as T;
            setData((prev) =>
              prev.map((item) => (item.id === updatedRecord.id ? updatedRecord : item))
            );
          } else if (payload.eventType === "DELETE") {
            const deletedRecord = payload.old as { id: string };
            setData((prev) => prev.filter((item) => item.id !== deletedRecord.id));
          }
        }
      )
      .subscribe();

    return () => {
      if (channel) {
        supabase.removeChannel(channel);
      }
    };
  }, [table, filter?.column, filter?.value]);

  return { data, setData, loading, error };
}
