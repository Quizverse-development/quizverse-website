"use client"

import { createContext, useContext, useState, useEffect } from "react"
import type { Session } from "@/lib/auth"

const AuthContext = createContext<{
  session: Session | null
  signIn: (user: any) => void
  signOut: () => void
}>({
  session: null,
  signIn: () => {},
  signOut: () => {}
})

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<Session | null>(null)

  useEffect(() => {
    // Don't auto-login - users must manually sign in
  }, [])

  const signIn = (user: any) => {
    const newSession = { user }
    setSession(newSession)
    localStorage.setItem("demo-session", JSON.stringify(newSession))
  }

  const signOut = () => {
    setSession(null)
    localStorage.removeItem("demo-session")
  }

  return (
    <AuthContext.Provider value={{ session, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useSession() {
  const context = useContext(AuthContext)
  return { data: context.session, signIn: context.signIn, signOut: context.signOut }
}