import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

const ADMIN_EMAIL = "ben.steels@outlook.com"

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "Demo Login",
      credentials: {
        email: { label: "Email", type: "email" },
        name: { label: "Name", type: "text" }
      },
      async authorize(credentials) {
        if (credentials?.email) {
          return {
            id: Math.random().toString(),
            email: credentials.email,
            name: credentials.name || "User",
            isAdmin: credentials.email === ADMIN_EMAIL
          }
        }
        return null
      },
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      if (token.sub && session.user) {
        session.user.id = token.sub
        session.user.isAdmin = token.email === ADMIN_EMAIL
      }
      return session
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.isAdmin = user.email === ADMIN_EMAIL
      }
      return token
    },
  },
  pages: {
    signIn: "/auth/signin",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.AUTH_SECRET || process.env.NEXTAUTH_SECRET,
})