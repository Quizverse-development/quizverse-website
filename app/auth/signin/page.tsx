"use client"

import { signIn, getSession } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { Zap } from "lucide-react"

export default function SignInPage() {
  const router = useRouter()

  useEffect(() => {
    // Check if already signed in
    getSession().then((session) => {
      if (session) {
        router.push("/")
      }
    })
  }, [router])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-indigo-100">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Welcome to QuizVerse</CardTitle>
          <p className="text-gray-600">Sign in to create and join quiz games</p>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button 
            onClick={() => signIn("azure-ad", { callbackUrl: "/" })}
            className="w-full"
            size="lg"
          >
            <Zap className="mr-2 h-5 w-5" />
            Sign in with Microsoft
          </Button>
          
          <p className="text-sm text-gray-500 text-center">
            Use your Microsoft account to access all features
          </p>
        </CardContent>
      </Card>
    </div>
  )
}