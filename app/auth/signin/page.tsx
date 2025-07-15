"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useRouter } from "next/navigation"

export default function SignInPage() {
  const router = useRouter()

  const handleAdminLogin = () => {
    // In demo mode, just redirect to home
    router.push("/")
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-indigo-100">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-center">Demo Mode</CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <p className="text-muted-foreground">
            This is a demo version. Click below to continue as admin.
          </p>
          <Button onClick={handleAdminLogin} className="w-full">
            Continue as Ben (Admin)
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}