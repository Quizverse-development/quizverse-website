"use client"

import { createContext, useContext } from "react"
import type React from "react"
import type { Session } from "@/lib/auth"

const AuthContext = createContext<Session | null>(null)

interface AuthProviderProps {
  children: React.ReactNode
  session?: Session | null
}

export default function AuthProvider({ children, session }: AuthProviderProps) {
  return (
    <AuthContext.Provider value={session || null}>
      {children}
    </AuthContext.Provider>
  )
}

export function useSession() {
  return { data: useContext(AuthContext) }
}