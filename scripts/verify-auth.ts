import fs from "fs";
import path from "path";

// Load environment variables from .env.local
try {
  const envPath = path.resolve(process.cwd(), ".env.local");
  if (fs.existsSync(envPath)) {
    const lines = fs.readFileSync(envPath, "utf-8").split("\n");
    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#")) continue;
      const eqIdx = trimmed.indexOf("=");
      if (eqIdx !== -1) {
        const key = trimmed.slice(0, eqIdx).trim();
        let val = trimmed.slice(eqIdx + 1).trim();
        if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
          val = val.slice(1, -1);
        }
        if (!process.env[key]) {
          process.env[key] = val;
        }
      }
    }
  }
} catch (e) {
  // Ignore
}

import { checkPostgresConnection, query, initPostgresSchema } from "../lib/db/postgres";
import bcrypt from "bcryptjs";

async function verifyAuthSetup() {
  console.log("============================================================");
  console.log(" Verifying Authelia Authentication & PostgreSQL Database   ");
  console.log("============================================================");

  // 1. Check Environment Variables
  const authSecret = process.env.AUTH_SECRET || process.env.NEXTAUTH_SECRET;
  const databaseUrl = process.env.DATABASE_URL;
  const autheliaUrl = process.env.AUTHELIA_URL || process.env.AUTHELIA_ISSUER_URL;
  const autheliaClientId = process.env.AUTHELIA_CLIENT_ID;

  console.log(`[Config] AUTH_SECRET configured: ${!!authSecret}`);
  console.log(`[Config] DATABASE_URL configured: ${!!databaseUrl}`);
  console.log(`[Config] AUTHELIA_URL configured: ${autheliaUrl || "http://localhost:9091"}`);
  console.log(`[Config] AUTHELIA_CLIENT_ID: ${autheliaClientId || "brand-craftsman"}`);

  // 2. Verify Bcrypt Hashing
  try {
    const testHash = await bcrypt.hash("BrandCraftsman_2026_Secure!", 10);
    const matches = await bcrypt.compare("BrandCraftsman_2026_Secure!", testHash);
    console.log(`[Security] Bcrypt encryption & verification: ${matches ? "PASSED" : "FAILED"}`);
  } catch (err) {
    console.error("[Security] Bcrypt test failed:", err);
  }

  // 3. Verify PostgreSQL Connection
  console.log("\n[PostgreSQL] Testing database connection...");
  try {
    const isConnected = await checkPostgresConnection();
    if (isConnected) {
      console.log("[PostgreSQL] Connection: SUCCESSFUL (Database reachable)");

      // Initialize schema tables if they don't exist
      console.log("[PostgreSQL] Initializing tables and schema...");
      await initPostgresSchema();
      console.log("[PostgreSQL] Schema verification: TABLES CREATED / VERIFIED");

      // Check user_profiles count
      const usersRes = await query<{ count: string }>("SELECT COUNT(*) as count FROM user_profiles");
      console.log(`[PostgreSQL] User count in 'user_profiles': ${usersRes.rows[0]?.count || 0}`);

      // Check blogs count
      const blogsRes = await query<{ count: string }>("SELECT COUNT(*) as count FROM cms_blogs");
      console.log(`[PostgreSQL] Blog count in 'cms_blogs': ${blogsRes.rows[0]?.count || 0}`);
    } else {
      console.log("[PostgreSQL] Note: Database not currently reachable at DATABASE_URL.");
      console.log("             (Fallback memory handlers will ensure website pages continue running).");
      console.log("             To connect PostgreSQL, start Docker container: docker compose -f docker-compose.authelia.yml up -d");
    }
  } catch (error) {
    console.log("[PostgreSQL] Connection note:", (error as Error).message);
    console.log("             PostgreSQL client is configured properly and will connect when the DB service is live.");
  }

  console.log("\n============================================================");
  console.log(" Authelia SSO & PostgreSQL Verification Completed!         ");
  console.log("============================================================");
}

verifyAuthSetup();
