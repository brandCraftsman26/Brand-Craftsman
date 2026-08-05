import { NextResponse } from "next/server";
import { getAdminClient } from "@/lib/supabase/admin-client";
import { requireAdmin } from "@/lib/admin";

export async function GET() {
  try {
    const supabase = getAdminClient();
    const { data, error } = await supabase
      .from("cms_blogs")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw error;
    return NextResponse.json({ data });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to fetch blogs" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const adminId = await requireAdmin();
    if (!adminId) {
      return NextResponse.json({ error: "Forbidden: Admin access required" }, { status: 403 });
    }

    const body = await req.json();
    const { id, title, slug, category, read_time, author, excerpt, content_json, feature_image, is_published } = body;

    if (!title || !slug) {
      return NextResponse.json({ error: "Title and slug are required" }, { status: 400 });
    }

    const supabase = getAdminClient();
    const payload = {
      ...(id ? { id } : {}),
      title,
      slug,
      category: category || "Web Design",
      read_time: read_time || "5 min read",
      author: author || "Brand Craftsman Team",
      excerpt: excerpt || null,
      content_json: content_json || null,
      feature_image: feature_image || null,
      is_published: is_published ?? true,
      updated_at: new Date().toISOString(),
    };

    const { data: result, error } = await supabase
      .from("cms_blogs")
      .upsert(payload, { onConflict: "slug" })
      .select()
      .single();

    if (error) throw error;
    return NextResponse.json({ data: result, message: "Blog saved successfully" });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to save blog" }, { status: 500 });
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
    const { error } = await supabase.from("cms_blogs").delete().eq("id", id);
    if (error) throw error;

    return NextResponse.json({ message: "Blog deleted successfully" });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to delete blog" }, { status: 500 });
  }
}
