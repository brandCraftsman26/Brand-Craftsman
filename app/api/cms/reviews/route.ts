import { NextResponse } from "next/server";
import { getAdminClient } from "@/lib/supabase/admin-client";
import { requireAdmin } from "@/lib/admin";

export async function GET() {
  try {
    const supabase = getAdminClient();
    const { data, error } = await supabase
      .from("cms_reviews")
      .select("*")
      .order("sort_order", { ascending: true });

    if (error) throw error;
    return NextResponse.json({ data });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to fetch reviews" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const adminId = await requireAdmin();
    if (!adminId) {
      return NextResponse.json({ error: "Forbidden: Admin access required" }, { status: 403 });
    }

    const body = await req.json();
    const { id, author, role, company, avatar_url, quote, rating, sort_order, is_featured } = body;

    if (!author || !quote) {
      return NextResponse.json({ error: "Author and quote are required" }, { status: 400 });
    }

    const supabase = getAdminClient();
    const payload = {
      ...(id ? { id } : {}),
      author,
      role: role || "Client",
      company: company || null,
      avatar_url: avatar_url || null,
      quote,
      rating: rating ?? 5,
      sort_order: sort_order ?? 0,
      is_featured: is_featured ?? true,
    };

    const { data: result, error } = await supabase
      .from("cms_reviews")
      .upsert(payload)
      .select()
      .single();

    if (error) throw error;
    return NextResponse.json({ data: result, message: "Review saved successfully" });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to save review" }, { status: 500 });
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
    const { error } = await supabase.from("cms_reviews").delete().eq("id", id);
    if (error) throw error;

    return NextResponse.json({ message: "Review deleted successfully" });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to delete review" }, { status: 500 });
  }
}
