"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { CreateQuizForm } from "@/components/create-quiz-form"
import { QuizManager } from "@/components/quiz-manager"
import { GameMonitor } from "@/components/game-monitor"
import { Plus, BarChart3, Users, Trophy } from "lucide-react"

export function AdminDashboard() {
  const [stats, setStats] = useState({
    totalQuizzes: 0,
    publicQuizzes: 0,
    activeGames: 0,
    totalPlayers: 0
  })

  useEffect(() => {
    fetchStats()
  }, [])

  const fetchStats = async () => {
    try {
      const [quizzesRes, gamesRes] = await Promise.all([
        fetch("/api/quizzes/admin"),
        fetch("/api/games/admin")
      ])
      
      if (quizzesRes.ok && gamesRes.ok) {
        const quizzes = await quizzesRes.json()
        const games = await gamesRes.json()
        
        setStats({
          totalQuizzes: quizzes.length,
          publicQuizzes: quizzes.filter((q: any) => q.isPublic).length,
          activeGames: games.filter((g: any) => g.isActive).length,
          totalPlayers: games.reduce((sum: number, g: any) => sum + g.players.length, 0)
        })
      }
    } catch (error) {
      console.error("Failed to fetch stats:", error)
    }
  }

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600 mt-2">Welcome back, Ben! Manage your quizzes and monitor games.</p>
        </div>
        <Badge variant="secondary" className="bg-purple-100 text-purple-700">
          Admin Access
        </Badge>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Quizzes</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalQuizzes}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Public Quizzes</CardTitle>
            <Trophy className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.publicQuizzes}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Games</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.activeGames}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Players</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalPlayers}</div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs defaultValue="create" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="create">Create Quiz</TabsTrigger>
          <TabsTrigger value="manage">Manage Quizzes</TabsTrigger>
          <TabsTrigger value="monitor">Monitor Games</TabsTrigger>
        </TabsList>

        <TabsContent value="create" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Plus className="h-5 w-5" />
                Create New Quiz
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CreateQuizForm onSuccess={fetchStats} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="manage" className="space-y-6">
          <QuizManager onUpdate={fetchStats} />
        </TabsContent>

        <TabsContent value="monitor" className="space-y-6">
          <GameMonitor />
        </TabsContent>
      </Tabs>
    </div>
  )
}