"use client"

import { useSession } from "@/components/auth-provider"
import { Button } from "@/components/ui/button"
import { User, LogOut } from "lucide-react"

export function UserAuthButton() {
  const { data: session } = useSession()

  if (session) {
    return (
      <div className="flex items-center gap-2">
        <span className="text-sm text-gray-600">
          {session.user?.name || session.user?.email}
        </span>
        <Button onClick={() => window.location.reload()} variant="outline" size="sm">
          <LogOut className="mr-2 h-4 w-4" />
          Sign out
        </Button>
      </div>
    )
  }

  return (
    <Button onClick={() => window.location.href = '/auth/signin'} variant="outline">
      <User className="mr-2 h-4 w-4" />
      Demo Sign In
    </Button>
  )
}