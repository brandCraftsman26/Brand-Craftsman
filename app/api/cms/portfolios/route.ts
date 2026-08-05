import { NextResponse } from "next/server";
import { getAdminClient } from "@/lib/supabase/admin-client";
import { requireAdmin } from "@/lib/admin";

export async function GET() {
  try {
    const supabase = getAdminClient();
    const { data, error } = await supabase
      .from("cms_portfolios")
      .select("*")
      .order("sort_order", { ascending: true });

    if (error) throw error;
    return NextResponse.json({ data });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to fetch portfolios" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const adminId = await requireAdmin();
    if (!adminId) {
      return NextResponse.json({ error: "Forbidden: Admin access required" }, { status: 403 });
    }

    const body = await req.json();
    const { id, title, slug, category, image, description, metrics, client_name, tech_stack, is_published, sort_order } = body;

    if (!title || !slug) {
      return NextResponse.json({ error: "Title and slug are required" }, { status: 400 });
    }

    const supabase = getAdminClient();
    const payload = {
      ...(id ? { id } : {}),
      title,
      slug,
      category: category || "Web Development",
      image: image || null,
      description: description || null,
      metrics: metrics || {},
      client_name: client_name || null,
      tech_stack: tech_stack || [],
      is_published: is_published ?? true,
      sort_order: sort_order ?? 0,
      updated_at: new Date().toISOString(),
    };

    const { data: result, error } = await supabase
      .from("cms_portfolios")
      .upsert(payload, { onConflict: "slug" })
      .select()
      .single();

    if (error) throw error;
    return NextResponse.json({ data: result, message: "Portfolio saved successfully" });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to save portfolio" }, { status: 500 });
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
    if (!id) return NextResponse.json({ error: "ID is required" }, { status: 400 });

    const supabase = getAdminClient();
    const { error } = await supabase.from("cms_portfolios").delete().eq("id", id);
    if (error) throw error;

    return NextResponse.json({ message: "Portfolio deleted successfully" });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to delete portfolio" }, { status: 500 });
  }
}
