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

// Admin users
const ADMIN_USERS = [
  { id: "1", email: "admin@quizverse.com", name: "Admin One", password: "bensteels123", isAdmin: true },
  { id: "2", email: "admin2@quizverse.com", name: "Admin Two", password: "ethan123789", isAdmin: true },
]

// Demo users
const DEMO_USERS = [
  { id: "3", email: "teacher@school.com", name: "Teacher Demo", isAdmin: false },
  { id: "4", email: "student@school.com", name: "Student Demo", isAdmin: false },
]

export async function getServerSession(): Promise<Session | null> {
  // For demo purposes, return admin session
  return {
    user: ADMIN_USERS[0]
  }
}

// Get user stats for admin dashboard
export function getUserStats() {
  return {
    totalUsers: 256,
    activeUsers: 124,
    newUsersToday: 18,
    totalGamesPlayed: 1893,
    averageGameTime: "8.5 min",
    totalPlayTime: "267 hours"
  }
}

// Get top users for admin dashboard
export function getTopUsers() {
  return [
    { id: 1, name: "Sarah Johnson", games: 87, hours: 12.5, animal: "🦊" },
    { id: 2, name: "Michael Chen", games: 76, hours: 10.2, animal: "🐼" },
    { id: 3, name: "Emma Wilson", games: 65, hours: 9.8, animal: "🦁" },
    { id: 4, name: "James Smith", games: 58, hours: 8.3, animal: "🐵" },
    { id: 5, name: "Olivia Brown", games: 52, hours: 7.1, animal: "🦄" },
    { id: 6, name: "Noah Davis", games: 49, hours: 6.9, animal: "🐯" },
    { id: 7, name: "Sophia Martinez", games: 45, hours: 6.5, animal: "🐰" },
    { id: 8, name: "Liam Johnson", games: 42, hours: 6.2, animal: "🐺" },
    { id: 9, name: "Ava Thompson", games: 38, hours: 5.8, animal: "🦊" },
    { id: 10, name: "William Garcia", games: 36, hours: 5.5, animal: "🐻" }
  ]
}

export function getDemoUsers() {
  return DEMO_USERS
}