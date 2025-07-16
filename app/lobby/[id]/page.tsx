"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { useSession } from "@/components/auth-provider"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Copy, Play, Users } from "lucide-react"
import { toast } from "sonner"

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

export default function LobbyPage() {
  const params = useParams()
  const router = useRouter()
  const { data: session } = useSession()
  const [game, setGame] = useState<Game | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
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
    const interval = setInterval(fetchGame, 2000) // Poll every 2 seconds
    return () => clearInterval(interval)
  }, [params.id])

  const copyCode = () => {
    if (game) {
      navigator.clipboard.writeText(game.code)
      toast.success("Game code copied!")
    }
  }

  const startGame = async () => {
    try {
      const response = await fetch(`/api/games/${params.id}/start`, {
        method: 'POST'
      })
      if (response.ok) {
        router.push(`/game/${params.id}`)
      }
    } catch (error) {
      console.error('Failed to start game:', error)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p>Loading lobby...</p>
        </div>
      </div>
    )
  }

  if (!game) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 flex items-center justify-center">
        <Card>
          <CardContent className="p-6 text-center">
            <p>Game not found</p>
            <Button onClick={() => router.push("/")} className="mt-4">
              Go Home
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  const isHost = session?.user?.id === game.hostId

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 p-4">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Game Lobby</h1>
          <div className="flex items-center justify-center gap-4">
            <div className="bg-white rounded-lg p-4 shadow-md">
              <p className="text-sm text-gray-600 mb-1">Game Code</p>
              <div className="flex items-center gap-2">
                <span className="text-3xl font-bold text-purple-600">{game.code}</span>
                <Button size="sm" variant="outline" onClick={copyCode}>
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <Badge variant="secondary" className="text-lg px-4 py-2">
              <Users className="mr-2 h-4 w-4" />
              {game.players.length}/30 Players
            </Badge>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Players in Lobby
              </CardTitle>
            </CardHeader>
            <CardContent>
              {game.players.length === 0 ? (
                <p className="text-gray-500 text-center py-8">
                  Waiting for players to join...
                </p>
              ) : (
                <div className="space-y-2 max-h-96 overflow-y-auto">
                  {game.players.map((player) => (
                    <div
                      key={player.id}
                      className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg"
                    >
                      <span className="text-2xl">{player.animal}</span>
                      <span className="font-medium">{player.username}</span>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Game Info</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm text-gray-600">Quiz</p>
                <p className="font-medium capitalize">{game.quizId.replace('-', ' ')}</p>
              </div>
              
              <div>
                <p className="text-sm text-gray-600">Status</p>
                <Badge variant={game.status === 'lobby' ? 'secondary' : 'default'}>
                  {game.status}
                </Badge>
              </div>

              {isHost && (
                <div className="pt-4">
                  <Button
                    onClick={startGame}
                    disabled={game.players.length === 0}
                    className="w-full"
                    size="lg"
                  >
                    <Play className="mr-2 h-5 w-5" />
                    Start Game
                  </Button>
                  {game.players.length === 0 && (
                    <p className="text-sm text-gray-500 text-center mt-2">
                      Need at least 1 player to start
                    </p>
                  )}
                </div>
              )}

              {!isHost && (
                <div className="pt-4 text-center">
                  <p className="text-gray-600">Waiting for host to start the game...</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}