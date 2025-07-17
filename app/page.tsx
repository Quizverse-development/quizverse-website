"use client"

import { useSession } from "@/components/auth-provider"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Header } from "@/components/header"
import { JoinGameDialog } from "@/components/join-game-dialog"
import { Play, Users, Trophy, Zap } from "lucide-react"
import Link from "next/link"
import { HomePage } from "@/app/home"

export default function MainPage() {
  const { data: session } = useSession()

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      <Header />
      <main className="container mx-auto px-4 pt-20 pb-8 sm:pt-24">
        {!session ? (
          // Landing page for non-authenticated users
          <div className="text-center space-y-8">
            <div className="space-y-4">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900">
                Welcome to <span className="text-blue-600">QuizVerse</span>
              </h1>
              <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
                Create, host, and join interactive quiz games. Perfect for classrooms, team building, and fun with friends!
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <Card className="text-center border-blue-100 bg-gradient-to-r from-blue-50 to-indigo-50 shadow-md hover:shadow-lg transition-all">
                <CardHeader>
                  <Play className="h-12 w-12 text-purple-600 mx-auto mb-2" />
                  <CardTitle className="text-purple-700">Host Games</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700">Create and host live quiz games with real-time participation</p>
                </CardContent>
              </Card>

              <Card className="text-center border-blue-100 bg-gradient-to-r from-blue-50 to-indigo-50 shadow-md hover:shadow-lg transition-all">
                <CardHeader>
                  <Users className="h-12 w-12 text-purple-600 mx-auto mb-2" />
                  <CardTitle className="text-purple-700">Join Games</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700">Enter a game code and compete with others in real-time</p>
                </CardContent>
              </Card>

              <Card className="text-center border-blue-100 bg-gradient-to-r from-blue-50 to-indigo-50 shadow-md hover:shadow-lg transition-all">
                <CardHeader>
                  <Trophy className="h-12 w-12 text-purple-600 mx-auto mb-2" />
                  <CardTitle className="text-purple-700">Create Quizzes</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700">Build custom quizzes with multiple choice questions</p>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-4">
              <p className="text-lg text-gray-700">Sign in to create and join quiz games</p>
              <Button size="lg" className="bg-purple-600 hover:bg-purple-700" asChild>
                <Link href="/auth/signin">
                  <Zap className="mr-2 h-5 w-5" />
                  Sign In
                </Link>
              </Button>
            </div>
          </div>
        ) : (
          // Dashboard for authenticated users with new HomePage component
          <HomePage />
        )}
      </main>
    </div>
  )
}