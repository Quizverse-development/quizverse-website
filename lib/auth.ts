import NextAuth from "next-auth"
import AzureADProvider from "next-auth/providers/azure-ad"

const ADMIN_EMAIL = "ben.steels@outlook.com"

export default NextAuth({
  providers: [
    AzureADProvider({
      clientId: process.env.AZURE_AD_CLIENT_ID!,
      clientSecret: process.env.AZURE_AD_CLIENT_SECRET!,
      tenantId: process.env.AZURE_AD_TENANT_ID!,
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.sub!
        session.user.isAdmin = session.user.email === ADMIN_EMAIL
      }
      return session
    },
    async jwt({ token, user }) {
      if (user) {
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
  secret: process.env.NEXTAUTH_SECRET,
})

export { default as authOptions }