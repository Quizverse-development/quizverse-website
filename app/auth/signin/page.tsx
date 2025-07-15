"use client"

import { useSession } from "@/components/auth-provider"
import { getDemoUsers } from "@/lib/auth"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { User } from "lucide-react"

export default function SignInPage() {
  const { data: session, signIn } = useSession()
  const router = useRouter()
  const demoUsers = getDemoUsers()

  useEffect(() => {
    if (session) {
      router.push("/")
    }
  }, [session, router])

  const handleSignIn = (user: any) => {
    signIn(user)
    router.push("/")
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-indigo-100">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Choose Demo Account</CardTitle>
          <p className="text-gray-600">Select a user to sign in as</p>
        </CardHeader>
        <CardContent className="space-y-3">
          {demoUsers.map((user) => (
            <Button
              key={user.id}
              onClick={() => handleSignIn(user)}
              variant="outline"
              className="w-full justify-start"
              size="lg"
            >
              <User className="mr-3 h-5 w-5" />
              <div className="text-left">
                <div className="font-medium">{user.name}</div>
                <div className="text-sm text-gray-500">
                  {user.email} {user.isAdmin && "(Admin)"}
                </div>
              </div>
            </Button>
          ))}
          
          <p className="text-sm text-gray-500 text-center mt-4">
            This is a demo version. Choose any account to explore the features.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}