import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "./lib/prisma"
import CredentialsProvider from "next-auth/providers/credentials"

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    // We can add Google/GitHub providers here later.
    // Setting up a dummy credentials provider for early testing.
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        // Warning: This is for testing only. In production, hash and verify passwords!
        if (credentials?.email === "admin@brandcraftsman.in" && credentials?.password === "admin") {
          return { id: "1", name: "Admin", email: "admin@brandcraftsman.in", role: "ADMIN" }
        }
        return null
      }
    })
  ],
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.role = (user as { role?: string }).role
      }
      return token
    },
    session({ session, token }) {
      if (session.user) {
        (session.user as { role?: unknown }).role = token.role
      }
      return session
    }
  },
  session: {
    strategy: "jwt"
  }
})
