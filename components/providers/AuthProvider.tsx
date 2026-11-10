"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { SessionProvider, useSession, signIn, signOut } from "next-auth/react";

export interface AuthUser {
  id?: string;
  uid?: string;
  name?: string | null;
  displayName?: string | null;
  email?: string | null;
  image?: string | null;
  photoURL?: string | null;
  role?: string;
  provider?: string;
  groups?: string[];
}

interface AuthContextType {
  user: AuthUser | null;
  loading: boolean;
  signInWithGoogle: () => Promise<void>;
  signInWithFacebook: () => Promise<void>;
  signInWithApple: () => Promise<void>;
  signInWithSocialDirect: (
    email: string,
    provider: "google" | "facebook" | "apple"
  ) => Promise<{ ok: boolean; error?: string }>;
  signInWithSSO: () => Promise<void>;
  signInWithAuthelia: () => Promise<void>;
  signInWithCredentials: (
    email: string,
    password: string
  ) => Promise<{ ok: boolean; error?: string }>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  signInWithGoogle: async () => {},
  signInWithFacebook: async () => {},
  signInWithApple: async () => {},
  signInWithSocialDirect: async () => ({ ok: false }),
  signInWithSSO: async () => {},
  signInWithAuthelia: async () => {},
  signInWithCredentials: async () => ({ ok: false }),
  logout: async () => {},
});

function AuthInnerProvider({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();
  const [proxyUser, setProxyUser] = useState<AuthUser | null>(null);
  const [proxyChecked, setProxyChecked] = useState(false);

  // Check for session headers on mount
  useEffect(() => {
    async function checkProxy() {
      try {
        const res = await fetch("/api/auth/authelia-session");
        if (res.ok) {
          const data = await res.json();
          if (data.authenticated && data.user) {
            setProxyUser({
              id: data.user.id,
              uid: data.user.id,
              name: data.user.name,
              displayName: data.user.name,
              email: data.user.email,
              role: data.user.role || "user",
              provider: "sso",
              groups: data.user.groups || [],
            });
          }
        }
      } catch {
        // Silently ignore if not running behind SSO proxy
      } finally {
        setProxyChecked(true);
      }
    }

    if (status !== "loading" && !session?.user) {
      checkProxy();
    } else {
      setProxyChecked(true);
    }
  }, [status, session]);

  const loading = status === "loading" || !proxyChecked;

  const sessionUser = session?.user;
  const user: AuthUser | null = sessionUser
    ? {
        id: sessionUser.id,
        uid: sessionUser.id,
        name: sessionUser.name,
        displayName: sessionUser.name,
        email: sessionUser.email,
        image: sessionUser.image,
        photoURL: sessionUser.image,
        role: sessionUser.role || "user",
        provider: sessionUser.provider || "credentials",
        groups: sessionUser.groups || [],
      }
    : proxyUser;

  const signInWithGoogle = async () => {
    try {
      await signIn("google", { callbackUrl: "/" });
    } catch (error) {
      console.error("Google Sign-In Error:", error);
      throw error;
    }
  };

  const signInWithFacebook = async () => {
    try {
      await signIn("facebook", { callbackUrl: "/" });
    } catch (error) {
      console.error("Facebook Sign-In Error:", error);
      throw error;
    }
  };

  const signInWithApple = async () => {
    try {
      await signIn("apple", { callbackUrl: "/" });
    } catch (error) {
      console.error("Apple Sign-In Error:", error);
      throw error;
    }
  };

  const signInWithSocialDirect = async (
    email: string,
    provider: "google" | "facebook" | "apple"
  ) => {
    try {
      const res = await signIn("credentials", {
        email,
        socialProvider: provider,
        redirect: false,
      });

      if (res?.error) {
        return { ok: false, error: res.error };
      }
      return { ok: true };
    } catch (error: unknown) {
      const err = error as Error;
      console.error("Social Direct Sign-In Error:", err);
      return { ok: false, error: err?.message || "Sign in failed" };
    }
  };

  const signInWithSSO = async () => {
    try {
      await signIn("authelia", { callbackUrl: "/" });
    } catch (error) {
      console.error("Single Sign-On Error:", error);
      throw error;
    }
  };

  const signInWithCredentials = async (email: string, password: string) => {
    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (res?.error) {
        return { ok: false, error: res.error };
      }
      return { ok: true };
    } catch (error: unknown) {
      const err = error as Error;
      console.error("Credentials Sign-In Error:", err);
      return { ok: false, error: err?.message || "Sign in failed" };
    }
  };

  const logout = async () => {
    try {
      await signOut({ callbackUrl: "/" });
    } catch (error) {
      console.error("Logout Error:", error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        signInWithGoogle,
        signInWithFacebook,
        signInWithApple,
        signInWithSocialDirect,
        signInWithSSO,
        signInWithAuthelia: signInWithSSO,
        signInWithCredentials,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <SessionProvider>
      <AuthInnerProvider>{children}</AuthInnerProvider>
    </SessionProvider>
  );
};

export const useAuth = () => useContext(AuthContext);
