// Simple demo auth without NextAuth
export interface User {
  id: string
  email: string
  name: string
  isAdmin: boolean
}

export interface Session {
  user: User
}

export const ADMIN_EMAIL = "ben.steels@outlook.com"

// Mock session for demo
export async function getServerSession(): Promise<Session | null> {
  // In demo mode, return admin session
  return {
    user: {
      id: "demo-admin",
      email: ADMIN_EMAIL,
      name: "Ben Steels",
      isAdmin: true
    }
  }
}