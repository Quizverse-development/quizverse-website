"use client"

import { useSession } from "@/components/auth-provider"
import { getDemoUsers } from "@/lib/auth"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { User, Microsoft } from "lucide-react"

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

  const handleMicrosoftSignIn = () => {
    // Placeholder for Microsoft OAuth
    alert("Microsoft sign-in would be implemented here with proper OAuth setup")
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-indigo-100 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-xl sm:text-2xl">Sign In to QuizVerse</CardTitle>
          <p className="text-gray-600 text-sm sm:text-base">Choose how you'd like to sign in</p>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button
            onClick={handleMicrosoftSignIn}
            variant="outline"
            className="w-full justify-start"
            size="lg"
          >
            <Microsoft className="mr-3 h-5 w-5" />
            <div className="text-left">
              <div className="font-medium">Sign in with Microsoft</div>
              <div className="text-sm text-gray-500">Use your Microsoft account</div>
            </div>
          </Button>
          
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-2 text-muted-foreground">Or try demo accounts</span>
            </div>
          </div>
          
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
                  {user.email}
                </div>
              </div>
            </Button>
          ))}
          
          <p className="text-xs sm:text-sm text-gray-500 text-center mt-4">
            Demo accounts are for testing purposes only
          </p>
        </CardContent>
      </Card>
    </div>
  )
}