import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { query } from "@/lib/db/postgres";

/**
 * Endpoint for detecting Authelia Reverse Proxy Forward Auth headers:
 * - Remote-User
 * - Remote-Email
 * - Remote-Name
 * - Remote-Groups
 */
export async function GET() {
  try {
    const requestHeaders = await headers();
    const remoteUser = requestHeaders.get("remote-user") || requestHeaders.get("Remote-User");
    const remoteEmail = requestHeaders.get("remote-email") || requestHeaders.get("Remote-Email");
    const remoteName = requestHeaders.get("remote-name") || requestHeaders.get("Remote-Name");
    const remoteGroups = requestHeaders.get("remote-groups") || requestHeaders.get("Remote-Groups");

    if (!remoteUser && !remoteEmail) {
      return NextResponse.json({
        authenticated: false,
        message: "No Authelia reverse proxy authentication headers detected.",
        user: null,
      });
    }

    const email = (remoteEmail || `${remoteUser}@authelia.local`).toLowerCase();
    const displayName = remoteName || remoteUser || "Authelia User";
    const groups = remoteGroups ? remoteGroups.split(",").map((g) => g.trim()) : [];
    const role = groups.includes("admin") ? "admin" : "user";
    const userId = `authelia_${remoteUser || email}`;

    // Upsert into PostgreSQL user_profiles
    try {
      await query(
        `INSERT INTO user_profiles (id, username, email, display_name, role, auth_provider, groups, last_login_at)
         VALUES ($1, $2, $3, $4, $5, 'authelia_proxy', $6, NOW())
         ON CONFLICT (email) DO UPDATE SET
           display_name = COALESCE(EXCLUDED.display_name, user_profiles.display_name),
           role = EXCLUDED.role,
           groups = EXCLUDED.groups,
           last_login_at = NOW(),
           updated_at = NOW()`,
        [userId, remoteUser || email.split("@")[0], email, displayName, role, groups]
      );
    } catch (dbErr) {
      console.warn("Could not sync Authelia forward-auth user to PostgreSQL:", dbErr);
    }

    return NextResponse.json({
      authenticated: true,
      source: "authelia_forward_auth",
      user: {
        id: userId,
        name: displayName,
        email,
        role,
        groups,
        provider: "authelia",
      },
    });
  } catch (error) {
    console.error("Authelia session detection error:", error);
    return NextResponse.json(
      { authenticated: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
