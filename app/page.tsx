"use client"

import { useSession } from "@/components/auth-provider"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Header } from "@/components/header"
import { JoinGameDialog } from "@/components/join-game-dialog"
import { CreateGameDialog } from "@/components/create-game-dialog"
import { Play, Users, Trophy, Zap } from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  const { data: session } = useSession()

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100">
      <Header />
      <main className="container mx-auto px-4 pt-20 pb-8 sm:pt-24">
        {!session ? (
          // Landing page for non-authenticated users
          <div className="text-center space-y-8">
            <div className="space-y-4">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900">
                Welcome to <span className="text-purple-600">QuizVerse</span>
              </h1>
              <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
                Create, host, and join interactive quiz games. Perfect for classrooms, team building, and fun with friends!
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <Card className="text-center">
                <CardHeader>
                  <Play className="h-12 w-12 text-purple-600 mx-auto mb-2" />
                  <CardTitle>Host Games</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">Create and host live quiz games with real-time participation</p>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardHeader>
                  <Users className="h-12 w-12 text-purple-600 mx-auto mb-2" />
                  <CardTitle>Join Games</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">Enter a game code and compete with others in real-time</p>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardHeader>
                  <Trophy className="h-12 w-12 text-purple-600 mx-auto mb-2" />
                  <CardTitle>Create Quizzes</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">Build custom quizzes with multiple choice questions</p>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-4">
              <p className="text-lg text-gray-700">Sign in to create and join quiz games</p>
              <Button size="lg" asChild>
                <Link href="/auth/signin">
                  <Zap className="mr-2 h-5 w-5" />
                  Sign In
                </Link>
              </Button>
            </div>
          </div>
        ) : (
          // Dashboard for authenticated users
          <div className="space-y-8">
            <div className="text-center space-y-4">
              <h1 className="text-4xl font-bold text-gray-900">
                Welcome back, {session.user?.name?.split(' ')[0]}!
              </h1>
              <p className="text-lg text-gray-600">What would you like to do today?</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader className="text-center">
                  <Play className="h-16 w-16 text-purple-600 mx-auto mb-4" />
                  <CardTitle className="text-2xl">Host a Game</CardTitle>
                </CardHeader>
                <CardContent className="text-center space-y-4">
                  <p className="text-gray-600">Start a live quiz game and get a code for others to join</p>
                  <CreateGameDialog />
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader className="text-center">
                  <Users className="h-16 w-16 text-purple-600 mx-auto mb-4" />
                  <CardTitle className="text-2xl">Join a Game</CardTitle>
                </CardHeader>
                <CardContent className="text-center space-y-4">
                  <p className="text-gray-600">Enter a game code to join an active quiz</p>
                  <JoinGameDialog />
                </CardContent>
              </Card>
            </div>

            <div className="text-center space-y-4">
              <h2 className="text-2xl font-semibold text-gray-800">Explore More</h2>
              <div className="flex justify-center gap-4">
                <Button variant="outline" asChild>
                  <Link href="/search">Browse Public Quizzes</Link>
                </Button>
                {session.user?.isAdmin && (
                  <Button variant="outline" asChild>
                    <Link href="/admin">Admin Dashboard</Link>
                  </Button>
                )}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}