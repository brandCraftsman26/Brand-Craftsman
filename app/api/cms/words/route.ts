import { NextResponse } from "next/server";
import { getAdminClient } from "@/lib/supabase/admin-client";
import { requireAdmin } from "@/lib/admin";

export async function GET() {
  try {
    const supabase = getAdminClient();
    const { data, error } = await supabase
      .from("cms_words")
      .select("*")
      .order("category", { ascending: true });

    if (error) throw error;

    return NextResponse.json({ data });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to fetch CMS words" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const adminId = await requireAdmin();
    if (!adminId) {
      return NextResponse.json({ error: "Forbidden: Admin access required" }, { status: 403 });
    }

    const body = await req.json();
    const { key, value, category } = body;

    if (!key || value === undefined) {
      return NextResponse.json({ error: "Key and value are required" }, { status: 400 });
    }

    const supabase = getAdminClient();
    const { data, error } = await supabase
      .from("cms_words")
      .upsert(
        {
          key,
          value,
          category: category || "general",
          updated_by: adminId,
          updated_at: new Date().toISOString(),
        },
        { onConflict: "key" }
      )
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json({ data, message: "CMS word saved successfully" });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to save CMS word" }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const adminId = await requireAdmin();
    if (!adminId) {
      return NextResponse.json({ error: "Forbidden: Admin access required" }, { status: 403 });
    }

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "ID is required" }, { status: 400 });
    }

    const supabase = getAdminClient();
    const { error } = await supabase.from("cms_words").delete().eq("id", id);

    if (error) throw error;

    return NextResponse.json({ message: "CMS word deleted successfully" });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to delete CMS word" }, { status: 500 });
  }
}
