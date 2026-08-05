import { NextResponse } from "next/server";
import { getAdminClient } from "@/lib/supabase/admin-client";
import { requireAdmin } from "@/lib/admin";

export async function GET() {
  try {
    const supabase = getAdminClient();
    const { data, error } = await supabase
      .from("cms_sections")
      .select("*")
      .order("sort_order", { ascending: true });

    if (error) throw error;

    return NextResponse.json({ data });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to fetch CMS sections" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const adminId = await requireAdmin();
    if (!adminId) {
      return NextResponse.json({ error: "Forbidden: Admin access required" }, { status: 403 });
    }

    const body = await req.json();
    const { id, page_slug, section_key, block_ids, config, sort_order, is_active } = body;

    if (!page_slug || !section_key) {
      return NextResponse.json({ error: "Page slug and section key are required" }, { status: 400 });
    }

    const supabase = getAdminClient();
    const payload = {
      ...(id ? { id } : {}),
      page_slug,
      section_key,
      block_ids: block_ids || [],
      config: config || {},
      sort_order: sort_order ?? 0,
      is_active: is_active ?? true,
      updated_by: adminId,
      updated_at: new Date().toISOString(),
    };

    const { data: result, error } = await supabase
      .from("cms_sections")
      .upsert(payload, { onConflict: "page_slug,section_key" })
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json({ data: result, message: "CMS section saved successfully" });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to save CMS section" }, { status: 500 });
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
    const { error } = await supabase.from("cms_sections").delete().eq("id", id);

    if (error) throw error;

    return NextResponse.json({ message: "CMS section deleted successfully" });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to delete CMS section" }, { status: 500 });
  }
}
