import { NextResponse } from "next/server";
import { getAdminClient } from "@/lib/supabase/admin-client";

export async function GET() {
  try {
    const supabase = getAdminClient();
    const { data, error } = await supabase
      .from("analytics_events")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(500);

    if (error) throw error;
    return NextResponse.json({ data });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to fetch analytics events" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { user_id, event_type, path, x_pos, y_pos, element_tag, metadata } = body;

    const supabase = getAdminClient();
    const { data, error } = await supabase
      .from("analytics_events")
      .insert({
        user_id: user_id || null,
        event_type: event_type || "click",
        path: path || "/",
        x_pos: x_pos || 0,
        y_pos: y_pos || 0,
        element_tag: element_tag || "DIV",
        metadata: metadata || {},
      })
      .select()
      .single();

    if (error) throw error;
    return NextResponse.json({ data });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to log event" }, { status: 500 });
  }
}
