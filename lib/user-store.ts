// Simple user management system
export interface User {
  id: string
  email: string
  name: string
  password: string
  isAdmin: boolean
  lastLogin: Date
  createdAt: Date
}

// In-memory user storage (would be database in production)
const users = new Map<string, User>()

// Demo users (never deleted)
const DEMO_USERS = [
  { id: "teacher", email: "teacher@school.com", name: "Teacher Demo", password: "demo123", isAdmin: false },
  { id: "student", email: "student@school.com", name: "Student Demo", password: "demo123", isAdmin: false }
]

// Initialize demo users
DEMO_USERS.forEach(user => {
  users.set(user.email, {
    ...user,
    lastLogin: new Date(),
    createdAt: new Date()
  })
})

export function createUser(email: string, password: string, name: string): { success: boolean; error?: string; user?: User } {
  if (users.has(email)) {
    return { success: false, error: "Email already exists" }
  }

  const user: User = {
    id: Math.random().toString(36).substring(2),
    email,
    password,
    name,
    isAdmin: false,
    lastLogin: new Date(),
    createdAt: new Date()
  }

  users.set(email, user)
  return { success: true, user }
}

export function loginUser(email: string, password: string): { success: boolean; error?: string; user?: User } {
  const user = users.get(email)
  
  if (!user) {
    return { success: false, error: "User not found" }
  }

  if (user.password !== password) {
    return { success: false, error: "Invalid password" }
  }

  // Update last login
  user.lastLogin = new Date()
  users.set(email, user)

  return { success: true, user }
}

export function adminLogin(code: string): { success: boolean; user?: User } {
  if (code === "bensteels123") {
    const adminUser: User = {
      id: "admin",
      email: "ben.steels@outlook.com",
      name: "Ben Steels",
      password: "",
      isAdmin: true,
      lastLogin: new Date(),
      createdAt: new Date()
    }
    return { success: true, user: adminUser }
  }
  return { success: false }
}

export function cleanupInactiveUsers() {
  const threeMonthsAgo = new Date()
  threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3)

  for (const [email, user] of users.entries()) {
    // Don't delete demo users or admin
    if (DEMO_USERS.some(demo => demo.email === email) || user.isAdmin) {
      continue
    }

    if (user.lastLogin < threeMonthsAgo) {
      users.delete(email)
    }
  }
}

// Run cleanup daily
setInterval(cleanupInactiveUsers, 24 * 60 * 60 * 1000)