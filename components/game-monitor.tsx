"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Users, Clock, Trophy, Play } from "lucide-react"

interface GameSession {
  id: string
  gameCode: string
  hostName: string
  status: string
  players: any[]
  createdAt: string
  quiz: {
    title: string
    category: string
  }
}

export function GameMonitor() {
  const [games, setGames] = useState<GameSession[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchGames()
    const interval = setInterval(fetchGames, 5000) // Refresh every 5 seconds
    return () => clearInterval(interval)
  }, [])

  const fetchGames = async () => {
    try {
      const response = await fetch("/api/games/admin")
      if (response.ok) {
        const data = await response.json()
        setGames(data)
      }
    } catch (error) {
      console.error("Failed to fetch games:", error)
    } finally {
      setLoading(false)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'waiting': return 'bg-yellow-100 text-yellow-800'
      case 'active': return 'bg-green-100 text-green-800'
      case 'finished': return 'bg-gray-100 text-gray-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  if (loading) {
    return <div className="text-center py-8">Loading active games...</div>
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Active Games</h2>
        <Badge variant="outline">{games.filter(g => g.status === 'active').length} active</Badge>
      </div>

      {games.length === 0 ? (
        <Card>
          <CardContent className="text-center py-8">
            <Play className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">No active games at the moment</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {games.map((game) => (
            <Card key={game.id}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <CardTitle className="flex items-center gap-2">
                      {game.quiz.title}
                      <Badge className={getStatusColor(game.status)}>
                        {game.status}
                      </Badge>
                    </CardTitle>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Users className="h-4 w-4" />
                        <span>{game.players.length} players</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Trophy className="h-4 w-4" />
                        <span>{game.quiz.category}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        <span>{new Date(game.createdAt).toLocaleTimeString()}</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-purple-600">{game.gameCode}</div>
                    <div className="text-sm text-muted-foreground">Game Code</div>
                    <div className="text-sm text-muted-foreground mt-1">
                      Host: {game.hostName}
                    </div>
                  </div>
                </div>
              </CardHeader>
              
              {game.players.length > 0 && (
                <CardContent>
                  <div className="space-y-2">
                    <h4 className="font-medium">Players:</h4>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                      {game.players.map((player, index) => (
                        <div key={index} className="flex items-center gap-2 text-sm">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          <span>{player.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              )}
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}