"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Timer, Users, Trophy, ArrowRight } from "lucide-react"
import { formatRemainingTime } from "@/lib/game-utils"

export default function MobileHostMonitorPage() {
  const params = useParams()
  const router = useRouter()
  const [game, setGame] = useState<any>(null)
  const [currentQuestion, setCurrentQuestion] = useState<any>(null)
  const [leaderboard, setLeaderboard] = useState<any[]>([])
  const [gameTimeRemaining, setGameTimeRemaining] = useState<string>("∞")
  
  useEffect(() => {
    const fetchGameData = async () => {
      try {
        // Fetch game info
        const gameResponse = await fetch(`/api/games/${params.id}`)
        const gameData = await gameResponse.json()
        
        if (gameData.game) {
          setGame(gameData.game)
          
          if (gameData.game.status === 'finished') {
            router.push(`/mobile/host/${params.id}/results`)
            return
          }
          
          // Update game time remaining
          if (gameData.game.endTime) {
            setGameTimeRemaining(formatRemainingTime(new Date(gameData.game.endTime)))
          }
        }

        // Fetch current question if game is playing
        if (gameData.game?.status === 'playing') {
          const questionResponse = await fetch(`/api/games/${params.id}/question`)
          const questionData = await questionResponse.json()
          
          if (questionData.question) {
            setCurrentQuestion(questionData.question)
          }
        }

        // Fetch leaderboard
        const leaderResponse = await fetch(`/api/games/${params.id}/leaderboard`)
        const leaderData = await leaderResponse.json()
        setLeaderboard(leaderData.leaderboard || [])
        
      } catch (error) {
        console.error('Failed to fetch game data:', error)
      }
    }

    fetchGameData()
    const interval = setInterval(fetchGameData, 2000)
    return () => clearInterval(interval)
  }, [params.id, router])
  
  const nextQuestion = async () => {
    try {
      await fetch(`/api/games/${params.id}/next`, {
        method: 'POST'
      })
    } catch (error) {
      console.error('Failed to advance question:', error)
    }
  }

  if (!game || !currentQuestion) {
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-4">
      <div className="container mx-auto max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-xl font-bold">Game Monitor</h1>
          <Badge variant="outline" className="text-sm">
            <Timer className="mr-1 h-4 w-4" />
            {gameTimeRemaining}
          </Badge>
        </div>
        
        <Card className="shadow-md mb-4">
          <CardHeader className="pb-2">
            <div className="flex justify-between items-center">
              <Badge variant="outline">Question {game.currentQuestion}</Badge>
              <Badge variant="secondary" className="flex items-center">
                <Users className="mr-1 h-4 w-4" />
                {game.players?.length || 0}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <h2 className="text-lg font-medium text-center mb-4">
              {currentQuestion.question}
            </h2>
            
            <div className="grid grid-cols-1 gap-2 mb-4">
              {currentQuestion.options.map((option: string, index: number) => (
                <div
                  key={index}
                  className={`p-3 rounded-md text-center font-medium ${
                    index === currentQuestion.correctAnswer
                      ? 'bg-green-100 border border-green-300 text-green-800'
                      : 'bg-gray-50 border border-gray-200 text-gray-700'
                  }`}
                >
                  {option}
                </div>
              ))}
            </div>
            
            <Button 
              onClick={nextQuestion} 
              className="w-full bg-blue-600 hover:bg-blue-700"
            >
              <ArrowRight className="mr-2 h-5 w-5" />
              Next Question
            </Button>
          </CardContent>
        </Card>
        
        <Card className="shadow-md">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2">
              <Trophy className="h-5 w-5 text-yellow-500" />
              Leaderboard
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 max-h-60 overflow-y-auto">
              {leaderboard.length === 0 ? (
                <p className="text-center text-gray-500 py-2">No scores yet</p>
              ) : (
                leaderboard.slice(0, 5).map((player, index) => (
                  <div
                    key={player.id}
                    className={`flex items-center justify-between p-2 rounded-md ${
                      index === 0 ? 'bg-yellow-50 border border-yellow-200' :
                      index === 1 ? 'bg-gray-50 border border-gray-200' :
                      index === 2 ? 'bg-orange-50 border border-orange-200' :
                      'bg-white border border-gray-100'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold">#{index + 1}</span>
                      <span className="text-lg">{player.animal}</span>
                      <span className="text-sm font-medium truncate">{player.username}</span>
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      {player.score} pts
                    </Badge>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
        
        <div className="mt-6 text-center">
          <Button variant="outline" onClick={() => router.push(`/mobile/host/${params.id}`)}>
            Back to Game Lobby
          </Button>
        </div>
      </div>
    </div>
  )
}