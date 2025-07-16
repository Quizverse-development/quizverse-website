"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from "recharts"
import { 
  Users, 
  Clock, 
  Calendar, 
  Award, 
  BarChart3, 
  PieChart as PieChartIcon
} from "lucide-react"

// Mock data for the admin dashboard
const userStats = {
  totalUsers: 256,
  activeUsers: 124,
  newUsersToday: 18,
  totalGamesPlayed: 1893,
  averageGameTime: "8.5 min",
  totalPlayTime: "267 hours"
}

const topUsers = [
  { id: 1, name: "Sarah Johnson", games: 87, hours: 12.5, animal: "🦊" },
  { id: 2, name: "Michael Chen", games: 76, hours: 10.2, animal: "🐼" },
  { id: 3, name: "Emma Wilson", games: 65, hours: 9.8, animal: "🦁" },
  { id: 4, name: "James Smith", games: 58, hours: 8.3, animal: "🐵" },
  { id: 5, name: "Olivia Brown", games: 52, hours: 7.1, animal: "🦄" },
  { id: 6, name: "Noah Davis", games: 49, hours: 6.9, animal: "🐯" },
  { id: 7, name: "Sophia Martinez", games: 45, hours: 6.5, animal: "🐰" },
  { id: 8, name: "Liam Johnson", games: 42, hours: 6.2, animal: "🐺" },
  { id: 9, name: "Ava Thompson", games: 38, hours: 5.8, animal: "🦊" },
  { id: 10, name: "William Garcia", games: 36, hours: 5.5, animal: "🐻" }
]

const weeklyData = [
  { name: "Mon", games: 45 },
  { name: "Tue", games: 52 },
  { name: "Wed", games: 49 },
  { name: "Thu", games: 63 },
  { name: "Fri", games: 87 },
  { name: "Sat", games: 103 },
  { name: "Sun", games: 92 }
]

const quizPopularity = [
  { name: "Geography", value: 35 },
  { name: "Science", value: 25 },
  { name: "History", value: 20 },
  { name: "Animals", value: 15 },
  { name: "Movies", value: 30 },
  { name: "Food", value: 18 }
]

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];

export function AdminDashboard() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Admin Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <Users className="mr-2 h-4 w-4 text-blue-500" />
              Total Users
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{userStats.totalUsers}</div>
            <p className="text-xs text-muted-foreground">
              {userStats.activeUsers} active in last 7 days
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <Award className="mr-2 h-4 w-4 text-yellow-500" />
              Games Played
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{userStats.totalGamesPlayed}</div>
            <p className="text-xs text-muted-foreground">
              {userStats.newUsersToday} new games today
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <Clock className="mr-2 h-4 w-4 text-green-500" />
              Total Play Time
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{userStats.totalPlayTime}</div>
            <p className="text-xs text-muted-foreground">
              Avg. {userStats.averageGameTime} per game
            </p>
          </CardContent>
        </Card>
      </div>
      
      <Tabs defaultValue="users">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="users">Top Users</TabsTrigger>
          <TabsTrigger value="activity">Activity</TabsTrigger>
          <TabsTrigger value="quizzes">Quiz Stats</TabsTrigger>
        </TabsList>
        
        <TabsContent value="users" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Top Players</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {topUsers.map((user, index) => (
                  <div 
                    key={user.id} 
                    className="flex items-center justify-between p-3 rounded-lg bg-white border border-gray-100"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-50 text-blue-700 font-bold">
                        {index + 1}
                      </div>
                      <span className="text-xl">{user.animal}</span>
                      <span className="font-medium">{user.name}</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <Badge variant="outline">{user.games} games</Badge>
                      <Badge variant="secondary">{user.hours} hrs</Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="activity" className="mt-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Weekly Activity</CardTitle>
              <BarChart3 className="h-4 w-4 text-gray-500" />
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={weeklyData}
                    margin={{
                      top: 5,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="games" fill="#8884d8" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="quizzes" className="mt-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Quiz Popularity</CardTitle>
              <PieChartIcon className="h-4 w-4 text-gray-500" />
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={quizPopularity}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {quizPopularity.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}