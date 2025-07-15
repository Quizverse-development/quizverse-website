// Simple demo auth system
export interface User {
  id: string
  email: string
  name: string
  isAdmin: boolean
}

export interface Session {
  user: User
}

const ADMIN_EMAIL = "ben.steels@outlook.com"

// Demo users
const DEMO_USERS = [
  { id: "2", email: "teacher@school.com", name: "Teacher Demo", isAdmin: false },
  { id: "3", email: "student@school.com", name: "Student Demo", isAdmin: false },
]

export async function getServerSession(): Promise<Session | null> {
  // Return null for server-side (no session by default)
  return null
}

export function getDemoUsers() {
  return DEMO_USERS
}