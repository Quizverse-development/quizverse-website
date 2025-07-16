"use client"

import { useSession } from "@/components/auth-provider"
import { Button } from "@/components/ui/button"
import { User, LogOut } from "lucide-react"
import { useRouter } from "next/navigation"

export function UserAuthButton() {
  const { data: session, signOut } = useSession()
  const router = useRouter()

  if (session) {
    return (
      <div className="flex items-center gap-2">
        <span className="text-sm text-gray-600 hidden sm:inline">
          {session.user?.name}
        </span>
        <Button onClick={() => { signOut(); router.push("/") }} variant="outline" size="sm">
          <LogOut className="mr-0 sm:mr-2 h-4 w-4" />
          <span className="hidden sm:inline">Sign out</span>
        </Button>
      </div>
    )
  }

  return (
    <Button onClick={() => router.push("/auth/signin")} variant="outline">
      <User className="mr-2 h-4 w-4" />
      Sign In
    </Button>
  )
}