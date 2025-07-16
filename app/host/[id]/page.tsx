"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Trophy, Users, Clock, ArrowRight, RotateCcw } from "lucide-react"

interface Question {
  id: number
  question: string
  options: string[]
  correctAnswer: number
  timeLimit: number
}

interface Player {
  id: string
  username: string
  animal: string
  score: number
}

interface Game {
  id: string
  status: string
  players: Player[]
  currentQuestion: number
  quizId: string
}

export default function HostPage() {
  const params = useParams()
  const router = useRouter()
  const [game, setGame] = useState<Game | null>(null)
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null)
  const [leaderboard, setLeaderboard] = useState<Player[]>([])
  const [timeLeft, setTimeLeft] = useState(20)
  const [showResults, setShowResults] = useState(false)
  const [gameFinished, setGameFinished] = useState(false)

  useEffect(() => {
    const fetchGameData = async () => {
      try {
        // Fetch game info
        const gameResponse = await fetch(`/api/games/${params.id}`)
        const gameData = await gameResponse.json()
        
        if (gameData.game) {
          setGame(gameData.game)
          
          if (gameData.game.status === 'finished') {
            setGameFinished(true)
          }
        }

        // Fetch current question if game is playing
        if (gameData.game?.status === 'playing') {
          const questionResponse = await fetch(`/api/games/${params.id}/question`)
          const questionData = await questionResponse.json()
          
          if (questionData.question) {
            setCurrentQuestion(questionData.question)
            setTimeLeft(questionData.question.timeLimit)
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
  }, [params.id])

  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;
    
    if (timeLeft > 0 && !showResults && currentQuestion && game?.status === 'playing') {
      timer = setTimeout(() => setTimeLeft(prev => prev - 1), 1000);
    } else if (timeLeft === 0 && !showResults && currentQuestion) {
      setShowResults(true);
    }
    
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [timeLeft, showResults, currentQuestion, game?.status])

  const nextQuestion = async () => {
    try {
      const response = await fetch(`/api/games/${params.id}/next`, {
        method: 'POST'
      })
      const data = await response.json()
      
      if (data.finished) {
        setGameFinished(true)
      } else {
        setShowResults(false)
        setTimeLeft(20)
      }
    } catch (error) {
      console.error('Failed to advance question:', error)
    }
  }

  if (gameFinished) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 p-4">
        <div className="container mx-auto max-w-6xl">
          <Card className="w-full">
            <CardHeader className="text-center">
              <Trophy className="h-16 w-16 text-yellow-500 mx-auto mb-4" />
              <CardTitle className="text-4xl font-bold text-gray-900">Game Complete!</CardTitle>
              <p className="text-gray-600">Final Results</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">Final Leaderboard</h2>
                <div className="grid gap-3">
                  {leaderboard.map((player, index) => (
                    <div
                      key={player.id}
                      className={`flex items-center justify-between p-4 rounded-lg ${
                        index === 0 ? 'bg-gradient-to-r from-yellow-100 to-yellow-200 border-2 border-yellow-400' :
                        index === 1 ? 'bg-gradient-to-r from-gray-100 to-gray-200 border-2 border-gray-400' :
                        index === 2 ? 'bg-gradient-to-r from-orange-100 to-orange-200 border-2 border-orange-400' :
                        'bg-white border border-gray-200'
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <div className={`text-2xl font-bold ${
                          index === 0 ? 'text-yellow-600' :
                          index === 1 ? 'text-gray-600' :
                          index === 2 ? 'text-orange-600' :
                          'text-gray-500'
                        }`}>
                          #{index + 1}
                        </div>
                        <span className="text-3xl">{player.animal}</span>
                        <span className="text-xl font-medium">{player.username}</span>
                      </div>
                      <Badge variant="secondary" className="text-xl px-4 py-2">
                        {player.score} pts
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="text-center mt-8">
                <Button onClick={() => router.push("/")} size="lg" className="mr-4">
                  <RotateCcw className="mr-2 h-5 w-5" />
                  Host Another Game
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  if (!game || !currentQuestion) {
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 p-4">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-4">
            <Badge variant="secondary" className="text-lg px-4 py-2">
              <Users className="mr-2 h-4 w-4" />
              {game.players.length} Players
            </Badge>
            <Badge variant="outline" className="text-lg px-4 py-2">
              Question {game.currentQuestion}
            </Badge>
          </div>
          
          <div className="flex items-center gap-2 bg-white rounded-lg px-4 py-2">
            <Clock className="h-5 w-5 text-red-500" />
            <span className="text-xl font-bold text-red-500">{timeLeft}s</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Question Display */}
          <div className="lg:col-span-2">
            <Card className="w-full">
              <CardHeader>
                <Progress value={(timeLeft / currentQuestion.timeLimit) * 100} className="h-3 mb-4" />
                <CardTitle className="text-2xl sm:text-3xl text-center text-gray-900">
                  {currentQuestion.question}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                  {currentQuestion.options.map((option, index) => (
                    <div
                      key={index}
                      className={`p-4 rounded-lg border-2 text-center font-medium ${
                        showResults && index === currentQuestion.correctAnswer
                          ? 'bg-green-100 border-green-400 text-green-800'
                          : 'bg-gray-50 border-gray-200 text-gray-700'
                      }`}
                    >
                      {option}
                    </div>
                  ))}
                </div>
                
                {showResults && (
                  <div className="text-center">
                    <Button onClick={nextQuestion} size="lg">
                      <ArrowRight className="mr-2 h-5 w-5" />
                      Next Question
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Live Leaderboard */}
          <div className="lg:col-span-1">
            <Card className="w-full h-fit">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Trophy className="h-5 w-5 text-yellow-500" />
                  Live Leaderboard
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 max-h-96 overflow-y-auto">
                  {leaderboard.length === 0 ? (
                    <p className="text-center text-gray-500 py-4">No players have scored yet</p>
                  ) : (
                    leaderboard.slice(0, 10).map((player, index) => (
                      <div
                        key={player.id}
                        className={`flex items-center justify-between p-3 rounded-lg ${
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
                          {player.score}
                        </Badge>
                      </div>
                    ))
                  )}
                </div>
                <div className="mt-4 text-center">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => {
                      fetch(`/api/games/${params.id}/leaderboard`)
                        .then(res => res.json())
                        .then(data => setLeaderboard(data.leaderboard || []))
                    }}
                  >
                    Refresh Leaderboard
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}