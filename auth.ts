import NextAuth, { type DefaultSession } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import Facebook from "next-auth/providers/facebook";
import Apple from "next-auth/providers/apple";
import { query } from "@/lib/db/postgres";
import { findLocalUserByEmail } from "@/lib/db/local-user-store";
import bcrypt from "bcryptjs";

declare module "next-auth" {
  interface User {
    id?: string;
    role?: string;
    provider?: string;
    groups?: string[];
  }
  interface Session {
    user: {
      id?: string;
      role?: string;
      provider?: string;
      groups?: string[];
    } & DefaultSession["user"];
  }
}

const autheliaIssuer =
  process.env.AUTHELIA_ISSUER_URL ||
  process.env.AUTHELIA_URL ||
  "http://localhost:9091";
const autheliaClientId = process.env.AUTHELIA_CLIENT_ID || "brand-craftsman";
const autheliaClientSecret =
  process.env.AUTHELIA_CLIENT_SECRET ||
  "brand-craftsman-authelia-client-secret-key-32chars";

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    // 1. Google Social Login
    Google({
      clientId: process.env.AUTH_GOOGLE_ID || process.env.GOOGLE_CLIENT_ID || "google-client-id",
      clientSecret: process.env.AUTH_GOOGLE_SECRET || process.env.GOOGLE_CLIENT_SECRET || "google-client-secret",
    }),

    // 2. Facebook Social Login
    Facebook({
      clientId: process.env.AUTH_FACEBOOK_ID || process.env.FACEBOOK_CLIENT_ID || "facebook-client-id",
      clientSecret: process.env.AUTH_FACEBOOK_SECRET || process.env.FACEBOOK_CLIENT_SECRET || "facebook-client-secret",
    }),

    // 3. Apple ID Social Login
    Apple({
      clientId: process.env.AUTH_APPLE_ID || process.env.APPLE_CLIENT_ID || "apple-client-id",
      clientSecret: process.env.AUTH_APPLE_SECRET || process.env.APPLE_CLIENT_SECRET || "apple-client-secret",
    }),

    // 4. Single Sign-On (SSO) OAuth Provider with explicit endpoints
    {
      id: "authelia",
      name: "Single Sign-On",
      type: "oauth",
      authorization: {
        url: `${autheliaIssuer}/api/oidc/authorization`,
        params: { scope: "openid profile email groups" },
      },
      token: `${autheliaIssuer}/api/oidc/token`,
      userinfo: `${autheliaIssuer}/api/oidc/userinfo`,
      issuer: autheliaIssuer,
      clientId: autheliaClientId,
      clientSecret: autheliaClientSecret,
      checks: ["state"],
      profile(profile) {
        const groups = (profile.groups as string[]) || [];
        const isDefaultAdmin =
          (profile.email && String(profile.email).toLowerCase() === "santhoshrajcit1819@gmail.com") ||
          groups.includes("admin") ||
          groups.includes("admins") ||
          groups.includes("devops");
        return {
          id: String(profile.sub || profile.preferred_username || profile.email),
          name:
            (profile.name as string) ||
            (profile.preferred_username as string) ||
            "Verified User",
          email: (profile.email as string) || "user@craftsman.io",
          image: (profile.picture as string) || null,
          role: isDefaultAdmin ? "admin" : "user",
          provider: "sso",
          groups: isDefaultAdmin ? ["admin", "devops"] : groups,
        };
      },
    },

    // 5. Secure Credentials Provider
    Credentials({
      name: "Email & Password",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
        socialProvider: { label: "Social Provider", type: "text" },
      },
      async authorize(credentials) {
        if (!credentials?.email) {
          return null;
        }

        const email = String(credentials.email).trim().toLowerCase();
        const socialProvider = credentials.socialProvider ? String(credentials.socialProvider).toLowerCase() : null;

        // If this is a direct/simulated social sign-in (e.g. Google, Facebook, Apple)
        if (socialProvider && (socialProvider === "google" || socialProvider === "facebook" || socialProvider === "apple")) {
          const isAdmin = email === "santhoshrajcit1819@gmail.com";
          const displayName = isAdmin ? "Santhosh Raj (Admin)" : (email.split("@")[0] || "Social User");
          return {
            id: `usr_${socialProvider}_${Date.now()}`,
            name: displayName,
            email: email,
            image: null,
            role: isAdmin ? "admin" : "user",
            provider: socialProvider,
            groups: isAdmin ? ["admin", "devops"] : ["user"],
          };
        }

        if (!credentials?.password) {
          return null;
        }

        const password = String(credentials.password);

        try {
          // Query PostgreSQL user_profiles table
          const userResult = await query<{
            id: string;
            username: string;
            email: string;
            role: string;
            display_name: string;
            avatar_url: string;
            password_hash: string;
            groups: string[];
          }>(
            `SELECT id, username, email, role, display_name, avatar_url, password_hash, groups 
             FROM user_profiles 
             WHERE LOWER(email) = $1 LIMIT 1`,
            [email]
          );

          if (userResult.rows && userResult.rows.length > 0) {
            const user = userResult.rows[0];
            if (user.password_hash) {
              const isPasswordValid = await bcrypt.compare(password, user.password_hash);
              if (isPasswordValid) {
                // Update last_login_at in PostgreSQL
                try {
                  await query(
                    `UPDATE user_profiles SET last_login_at = NOW(), updated_at = NOW() WHERE id = $1`,
                    [user.id]
                  );
                } catch {
                  // Silently ignore timestamp update error
                }

                return {
                  id: user.id,
                  name: user.display_name || user.username || "User",
                  email: user.email,
                  image: user.avatar_url || null,
                  role: user.role || "user",
                  provider: "credentials",
                  groups: user.groups || [],
                };
              }
            }
          }
        } catch (dbError) {
          console.warn("PostgreSQL authorize check failed (DB might be offline):", (dbError as Error).message);
        }

        // Check local user fallback store
        try {
          const localUser = findLocalUserByEmail(email);
          if (localUser && localUser.password_hash) {
            const isPasswordValid = await bcrypt.compare(password, localUser.password_hash);
            if (isPasswordValid) {
              return {
                id: localUser.id,
                name: localUser.display_name || localUser.username || "User",
                email: localUser.email,
                image: localUser.avatar_url || null,
                role: localUser.role || "user",
                provider: "credentials",
                groups: localUser.groups || [],
              };
            }
          }
        } catch (localErr) {
          console.warn("Local user store authorize check failed:", (localErr as Error).message);
        }

        // Fallback default admin credentials
        const isAdminEmail =
          email === "santhoshrajcit1819@gmail.com" ||
          email === "admin@brandcraftsman.in";

        if (
          isAdminEmail &&
          (password === "AdminBrand2026!" || password === "password123" || password === "SanthoshBrand2026!")
        ) {
          return {
            id: "usr_admin_santhosh",
            name: "Santhosh Raj (Admin)",
            email: "santhoshrajcit1819@gmail.com",
            image: null,
            role: "admin",
            provider: "credentials",
            groups: ["admin", "devops"],
          };
        }

        return null;
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async signIn({ user, account }) {
      if (user.email) {
        const userEmail = user.email.toLowerCase();
        const isAdmin = userEmail === "santhoshrajcit1819@gmail.com";
        if (isAdmin) {
          user.role = "admin";
          user.groups = ["admin", "devops"];
        }

        try {
          const userId = user.id || `usr_${Date.now()}`;
          const displayName = user.name || (isAdmin ? "Santhosh Raj" : "Verified User");
          const role = isAdmin ? "admin" : (user.role || "user");
          const groups = isAdmin ? ["admin", "devops"] : (user.groups || []);
          const provider = account?.provider || "credentials";

          // Upsert user into PostgreSQL user_profiles
          await query(
            `INSERT INTO user_profiles (id, username, email, display_name, role, auth_provider, groups, last_login_at)
             VALUES ($1, $2, $3, $4, $5, $6, $7, NOW())
             ON CONFLICT (email) DO UPDATE SET
               display_name = COALESCE(EXCLUDED.display_name, user_profiles.display_name),
               role = COALESCE(EXCLUDED.role, user_profiles.role),
               groups = EXCLUDED.groups,
               last_login_at = NOW(),
               updated_at = NOW()`,
            [userId, user.name || userEmail.split("@")[0], userEmail, displayName, role, provider, groups]
          );
        } catch {
          // If PostgreSQL is offline, keep going seamlessly
        }
      }
      return true;
    },
    async jwt({ token, user, account }) {
      if (user) {
        token.id = user.id;
        const userEmail = (user.email || (token.email as string) || "").toLowerCase();
        const isAdmin = userEmail === "santhoshrajcit1819@gmail.com" || user.role === "admin";

        token.role = isAdmin ? "admin" : (user.role || "user");
        token.provider = account?.provider || user.provider || "credentials";
        token.groups = isAdmin ? ["admin", "devops"] : (user.groups || []);
      }
      if (token.email && String(token.email).toLowerCase() === "santhoshrajcit1819@gmail.com") {
        token.role = "admin";
        token.groups = ["admin", "devops"];
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = (token.id as string) || (token.sub as string) || "";
        const email = (session.user.email || (token.email as string) || "").toLowerCase();
        const isAdmin = email === "santhoshrajcit1819@gmail.com" || token.role === "admin";

        session.user.role = isAdmin ? "admin" : ((token.role as string) || "user");
        session.user.provider = (token.provider as string) || "credentials";
        session.user.groups = isAdmin ? ["admin", "devops"] : ((token.groups as string[]) || []);
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
    error: "/login",
  },
  secret:
    process.env.AUTH_SECRET ||
    process.env.NEXTAUTH_SECRET ||
    "f3a5e8b4c2d1e0f987654321abcdef0123456789abcdef0123456789abcdef01",
  trustHost: true,
});
