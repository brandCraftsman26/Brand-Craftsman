import { NextResponse } from "next/server";
import { Webhook } from "svix";
import { headers } from "next/headers";
import { isAdminEmail } from "@/lib/admin";
import { getServerDb } from "@/lib/supabase/server";

interface WebhookEvent {
  type: string;
  data: {
    id: string;
    email_addresses: Array<{
      id: string;
      email_address: string;
    }>;
    primary_email_address_id: string;
    first_name: string | null;
    last_name: string | null;
    image_url: string | null;
    username: string | null;
  };
}

export async function POST(req: Request) {
  const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;

  if (!WEBHOOK_SECRET) {
    console.error("Missing CLERK_WEBHOOK_SECRET env variable");
    return NextResponse.json({ error: "Server misconfigured" }, { status: 500 });
  }

  // Get headers
  const headerPayload = await headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  if (!svix_id || !svix_timestamp || !svix_signature) {
    return NextResponse.json({ error: "Missing svix headers" }, { status: 400 });
  }

  // Get body
  const payload = await req.json();
  const body = JSON.stringify(payload);

  // Verify webhook signature
  const wh = new Webhook(WEBHOOK_SECRET);
  let evt: WebhookEvent;

  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent;
  } catch (err) {
    console.error("Webhook verification failed:", err);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  const { type, data } = evt;
  const supabase = await getServerDb();

  if (type === "user.created" || type === "user.updated") {
    const clerkId = data.id;
    const primaryEmail = data.email_addresses.find(
      (e) => e.id === data.primary_email_address_id
    )?.email_address;

    if (!primaryEmail) {
      console.error("No primary email found for user:", clerkId);
      return NextResponse.json({ error: "No email" }, { status: 400 });
    }

    const name = [data.first_name, data.last_name].filter(Boolean).join(" ") || data.username || null;
    const role = isAdminEmail(primaryEmail) ? "ADMIN" : "USER";

    const { error } = await supabase
      .from("users")
      .upsert(
        {
          clerk_id: clerkId,
          email: primaryEmail,
          name,
          image: data.image_url,
          role,
        },
        { onConflict: "clerk_id" }
      );

    if (error) {
      console.error("Error upserting user:", error);
      return NextResponse.json({ error: "Database error" }, { status: 500 });
    }

    console.log(`User ${type === "user.created" ? "created" : "updated"}: ${primaryEmail} (${role})`);
  }

  if (type === "user.deleted") {
    const clerkId = data.id;

    const { error } = await supabase
      .from("users")
      .delete()
      .eq("clerk_id", clerkId);

    if (error) {
      console.error("Error deleting user:", error);
      return NextResponse.json({ error: "Database error" }, { status: 500 });
    }

    console.log(`User deleted: ${clerkId}`);
  }

  return NextResponse.json({ success: true });
}
