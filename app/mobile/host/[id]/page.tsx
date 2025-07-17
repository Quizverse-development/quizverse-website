"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Timer, Users, Play, QrCode, Copy, ArrowRight } from "lucide-react"
import { formatRemainingTime } from "@/lib/game-utils"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function MobileHostPage() {
  const params = useParams()
  const router = useRouter()
  const [game, setGame] = useState<any>(null)
  const [players, setPlayers] = useState<any[]>([])
  const [gameTimeRemaining, setGameTimeRemaining] = useState<string>("∞")
  const [copied, setCopied] = useState(false)
  const [timeLimit, setTimeLimit] = useState("10")
  
  useEffect(() => {
    const fetchGameData = async () => {
      try {
        // Fetch game info
        const gameResponse = await fetch(`/api/games/${params.id}`)
        const gameData = await gameResponse.json()
        
        if (gameData.game) {
          setGame(gameData.game)
          setPlayers(gameData.game.players || [])
          
          // Update game time remaining
          if (gameData.game.endTime) {
            setGameTimeRemaining(formatRemainingTime(new Date(gameData.game.endTime)))
          }
          
          // Set time limit from game
          if (gameData.game.timeLimit) {
            setTimeLimit(gameData.game.timeLimit.toString())
          }
          
          // Redirect if game is finished
          if (gameData.game.status === 'finished') {
            router.push(`/mobile/host/${params.id}/results`)
          }
        }
      } catch (error) {
        console.error('Failed to fetch game data:', error)
      }
    }

    fetchGameData()
    const interval = setInterval(fetchGameData, 2000)
    return () => clearInterval(interval)
  }, [params.id, router])
  
  const copyGameCode = () => {
    if (game?.code) {
      navigator.clipboard.writeText(game.code)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }
  
  const updateTimeLimit = async () => {
    try {
      await fetch(`/api/games/${params.id}/settings`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ timeLimit: parseInt(timeLimit) || 10 })
      })
    } catch (error) {
      console.error('Failed to update time limit:', error)
    }
  }
  
  const startGame = async () => {
    try {
      // First update time limit
      await updateTimeLimit()
      
      // Then start the game
      await fetch(`/api/games/${params.id}/start`, {
        method: 'POST'
      })
    } catch (error) {
      console.error('Failed to start game:', error)
    }
  }

  if (!game) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md shadow-lg">
          <CardContent className="p-8 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-lg">Loading game...</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-4 w-full max-w-full">
      <div className="w-full max-w-md mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Game Lobby</h1>
          <Badge variant="outline" className="text-sm">Mobile Host</Badge>
        </div>
        
        <Card className="shadow-md mb-6">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Game Code</span>
              {game.status === 'lobby' && (
                <Badge variant="secondary" className="text-lg px-3 py-1">
                  <Timer className="mr-1 h-4 w-4" />
                  Waiting
                </Badge>
              )}
              {game.status === 'playing' && (
                <Badge variant="secondary" className="text-lg px-3 py-1">
                  <Timer className="mr-1 h-4 w-4" />
                  {gameTimeRemaining}
                </Badge>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center gap-4">
              <div className="text-4xl font-bold tracking-widest bg-blue-50 w-full text-center py-3 rounded-md border border-blue-100">
                {game.code}
              </div>
              
              <Button 
                variant="outline" 
                className="w-full flex items-center justify-center gap-2"
                onClick={copyGameCode}
              >
                <Copy className="h-4 w-4" />
                {copied ? 'Copied!' : 'Copy Code'}
              </Button>
              
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <QrCode className="h-4 w-4" />
                <span>Show this code to players</span>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {game.status === 'lobby' && (
          <Card className="shadow-md mb-6">
            <CardHeader>
              <CardTitle>Game Settings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="timeLimit">Game Time Limit (minutes)</Label>
                  <Input 
                    id="timeLimit" 
                    type="number" 
                    min="1" 
                    max="60" 
                    value={timeLimit} 
                    onChange={(e) => setTimeLimit(e.target.value)}
                  />
                  <p className="text-xs text-gray-500">
                    Players will have this much time to answer as many questions as possible.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
        
        <Card className="shadow-md mb-6">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-blue-500" />
                <span>Players</span>
              </div>
              <Badge>{players.length}</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {players.length === 0 ? (
              <div className="text-center py-6 text-gray-500">
                Waiting for players to join...
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-2">
                {players.map((player) => (
                  <div 
                    key={player.id}
                    className="flex items-center gap-2 bg-white p-2 rounded-md border border-gray-100"
                  >
                    <span className="text-xl">{player.animal}</span>
                    <span className="text-sm font-medium truncate">{player.username}</span>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
        
        <div className="flex justify-center">
          {game.status === 'lobby' ? (
            <Button 
              className="bg-blue-600 hover:bg-blue-700 px-8 py-6 text-lg w-full"
              onClick={startGame}
              disabled={players.length === 0}
            >
              <Play className="mr-2 h-5 w-5" />
              Start Game ({timeLimit} min)
            </Button>
          ) : (
            <Button 
              className="bg-blue-600 hover:bg-blue-700 px-8 py-6 text-lg w-full"
              onClick={() => router.push(`/mobile/host/${params.id}/monitor`)}
            >
              <ArrowRight className="mr-2 h-5 w-5" />
              Monitor Game
            </Button>
          )}
        </div>
        
        <div className="mt-8 text-center">
          <Button variant="outline" onClick={() => router.push("/mobile")}>
            Back to Mobile Home
          </Button>
        </div>
      </div>
    </div>
  )
}