"use client"

import { useSession, signIn, signOut } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { User, LogOut } from "lucide-react"

export function UserAuthButton() {
  const { data: session, status } = useSession()

  if (status === "loading") {
    return <Button variant="outline" disabled>Loading...</Button>
  }

  if (session) {
    return (
      <div className="flex items-center gap-2">
        <span className="text-sm text-gray-600">
          {session.user?.name || session.user?.email}
        </span>
        <Button onClick={() => signOut()} variant="outline" size="sm">
          <LogOut className="mr-2 h-4 w-4" />
          Sign out
        </Button>
      </div>
    )
  }

  return (
    <Button onClick={() => signIn("azure-ad")} variant="outline">
      <User className="mr-2 h-4 w-4" />
      Sign in with Microsoft
    </Button>
  )
}