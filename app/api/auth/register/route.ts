import { NextResponse } from "next/server";
import { query, initPostgresSchema } from "@/lib/db/postgres";
import { findLocalUserByEmail, saveLocalUser } from "@/lib/db/local-user-store";
import bcrypt from "bcryptjs";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, password } = body;

    if (!name || !email || !password) {
      return NextResponse.json(
        { error: "Name, email, and password are required." },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: "Password must be at least 6 characters." },
        { status: 400 }
      );
    }

    const normalizedEmail = String(email).trim().toLowerCase();
    const trimmedName = String(name).trim();

    // Check if user already exists
    let userExists = false;
    let isPgAvailable = false;

    try {
      const existingUserRes = await query(
        `SELECT id FROM user_profiles WHERE LOWER(email) = $1 LIMIT 1`,
        [normalizedEmail]
      );
      isPgAvailable = true;
      if (existingUserRes && existingUserRes.rows.length > 0) {
        userExists = true;
      }
    } catch {
      // PostgreSQL might need schema initialization or be offline
      try {
        await initPostgresSchema();
        const retryRes = await query(
          `SELECT id FROM user_profiles WHERE LOWER(email) = $1 LIMIT 1`,
          [normalizedEmail]
        );
        isPgAvailable = true;
        if (retryRes && retryRes.rows.length > 0) {
          userExists = true;
        }
      } catch {
        isPgAvailable = false;
        // Check local store
        const localUser = findLocalUserByEmail(normalizedEmail);
        if (localUser) {
          userExists = true;
        }
      }
    }

    if (userExists) {
      return NextResponse.json(
        { error: "An account with this email already exists. Please sign in." },
        { status: 409 }
      );
    }

    // Hash password
    const passwordHash = await bcrypt.hash(password, 10);
    const userId = `usr_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
    const username = normalizedEmail.split("@")[0];

    if (isPgAvailable) {
      // Insert user into PostgreSQL user_profiles table
      await query(
        `INSERT INTO user_profiles 
          (id, username, email, display_name, password_hash, role, auth_provider, groups, last_login_at)
         VALUES 
          ($1, $2, $3, $4, $5, 'user', 'credentials', ARRAY['user']::TEXT[], NOW())`,
        [userId, username, normalizedEmail, trimmedName, passwordHash]
      );
    }

    // Also persist to local user store for guaranteed resilience
    saveLocalUser({
      id: userId,
      username,
      email: normalizedEmail,
      display_name: trimmedName,
      password_hash: passwordHash,
      role: "user",
      auth_provider: "credentials",
      groups: ["user"],
      created_at: new Date().toISOString(),
      last_login_at: new Date().toISOString(),
    });

    return NextResponse.json(
      {
        success: true,
        message: "Account created successfully.",
        userId,
      },
      { status: 201 }
    );
  } catch (error: unknown) {
    const errorObj = error as Error;
    console.error("Registration error:", errorObj);
    return NextResponse.json(
      { error: errorObj.message || "Failed to create account. Please try again." },
      { status: 500 }
    );
  }
}
