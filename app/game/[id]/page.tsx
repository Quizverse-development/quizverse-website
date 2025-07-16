"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Users, Clock } from "lucide-react"

interface Player {
  id: string
  username: string
  animal: string
  score: number
}

interface Game {
  id: string
  code: string
  status: string
  players: Player[]
  quizId: string
}

export default function GamePage() {
  const params = useParams()
  const [game, setGame] = useState<Game | null>(null)
  const [player, setPlayer] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const savedPlayer = localStorage.getItem('player')
    if (savedPlayer) {
      setPlayer(JSON.parse(savedPlayer))
    }

    const fetchGame = async () => {
      try {
        const response = await fetch(`/api/games/${params.id}`)
        const data = await response.json()
        if (data.game) {
          setGame(data.game)
        }
      } catch (error) {
        console.error('Failed to fetch game:', error)
      }
      setLoading(false)
    }

    fetchGame()
    const interval = setInterval(fetchGame, 2000)
    return () => clearInterval(interval)
  }, [params.id])

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardContent className="p-8 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
            <p className="text-lg">Loading game...</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (!game) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardContent className="p-8 text-center">
            <p className="text-lg text-red-600">Game not found</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-lg">
        <CardContent className="p-8 text-center space-y-6">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold text-gray-900">Waiting for Game</h1>
            <p className="text-gray-600">The host will start the game soon</p>
          </div>

          <div className="flex justify-center">
            <div className="animate-pulse flex space-x-2">
              <div className="w-3 h-3 bg-purple-600 rounded-full animate-bounce"></div>
              <div className="w-3 h-3 bg-purple-600 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
              <div className="w-3 h-3 bg-purple-600 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
            </div>
          </div>

          {player && (
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-sm text-gray-600 mb-2">You are playing as:</p>
              <div className="flex items-center justify-center gap-3">
                <span className="text-3xl">{player.animal}</span>
                <span className="text-xl font-medium">{player.username}</span>
              </div>
            </div>
          )}

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white rounded-lg p-4">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Users className="h-5 w-5 text-purple-600" />
                <span className="font-medium">Players</span>
              </div>
              <p className="text-2xl font-bold text-purple-600">{game.players.length}</p>
            </div>
            
            <div className="bg-white rounded-lg p-4">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Clock className="h-5 w-5 text-purple-600" />
                <span className="font-medium">Status</span>
              </div>
              <Badge variant={game.status === 'lobby' ? 'secondary' : 'default'} className="text-sm">
                {game.status}
              </Badge>
            </div>
          </div>

          <div className="bg-blue-50 rounded-lg p-4">
            <p className="text-sm text-blue-800">
              <strong>Game Code:</strong> {game.code}
            </p>
            <p className="text-sm text-blue-600 mt-1">
              Quiz: {game.quizId.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}