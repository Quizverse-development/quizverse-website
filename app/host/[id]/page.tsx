"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Trophy, Users, ArrowRight, RotateCcw, Timer, CheckCircle, XCircle } from "lucide-react"
import { getFlagUrl } from "@/lib/flag-utils"
import { formatRemainingTime } from "@/lib/game-utils"

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
  answers: { questionId: number; answer: string; correct: boolean; timeMs: number }[]
}

interface Game {
  id: string
  status: string
  players: Player[]
  currentQuestion: number
  quizId: string
  endTime?: string
}

export default function HostPage() {
  const params = useParams()
  const router = useRouter()
  const [game, setGame] = useState<Game | null>(null)
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null)
  const [leaderboard, setLeaderboard] = useState<Player[]>([])
  const [showResults, setShowResults] = useState(false)
  const [gameFinished, setGameFinished] = useState(false)
  const [gameTimeRemaining, setGameTimeRemaining] = useState<string>("∞")
  const [recentAnswers, setRecentAnswers] = useState<{player: Player, correct: boolean}[]>([])

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
          
          // Update game time remaining
          if (gameData.game.endTime) {
            setGameTimeRemaining(formatRemainingTime(new Date(gameData.game.endTime)))
          }
          
          // Track recent answers
          if (gameData.game.players) {
            const newAnswers: {player: Player, correct: boolean}[] = []
            gameData.game.players.forEach((player: Player) => {
              const latestAnswer = player.answers[player.answers.length - 1]
              if (latestAnswer && latestAnswer.questionId === gameData.game.currentQuestion) {
                newAnswers.push({
                  player,
                  correct: latestAnswer.correct
                })
              }
            })
            
            // Only update if we have new answers
            if (newAnswers.length > 0) {
              setRecentAnswers(newAnswers)
            }
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
  }, [params.id])

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
      }
    } catch (error) {
      console.error('Failed to advance question:', error)
    }
  }

  if (gameFinished) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-4 w-screen overflow-x-hidden">
        <div className="container mx-auto max-w-6xl">
          <Card className="w-full shadow-lg border-2 border-yellow-200">
            <CardHeader className="text-center bg-gradient-to-r from-yellow-50 to-orange-50">
              <Trophy className="h-16 w-16 text-yellow-500 mx-auto mb-4" />
              <CardTitle className="text-4xl font-bold text-black">Game Complete!</CardTitle>
              <p className="text-purple-700">Final Results</p>
            </CardHeader>
            <CardContent className="p-8">
              <div className="space-y-4">
                <h2 className="text-2xl font-semibold text-center text-black mb-6">Final Leaderboard</h2>
                <div className="grid gap-3">
                  {leaderboard.map((player, index) => (
                    <div
                      key={player.id}
                      className={`flex items-center justify-between p-4 rounded-lg shadow-sm ${
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
                        <span className="text-xl font-medium text-black">{player.username}</span>
                      </div>
                      <Badge variant="secondary" className="text-xl px-4 py-2">
                        {player.score} pts
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="text-center mt-8">
                <Button onClick={() => router.push("/")} size="lg" className="bg-blue-600 hover:bg-blue-700 px-8 py-6 text-lg">
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
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center p-4 w-screen overflow-x-hidden">
        <Card className="w-full max-w-md shadow-lg">
          <CardContent className="p-8 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-lg text-black">Loading game...</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-4 w-screen overflow-x-hidden">
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
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 bg-white rounded-lg px-4 py-2 shadow-md">
              <Timer className="h-5 w-5 text-blue-500" />
              <span className="text-xl font-bold text-blue-500">{gameTimeRemaining}</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Question Display */}
          <div className="lg:col-span-7">
            <Card className="w-full shadow-lg border-2 border-blue-100">
              <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
                <CardTitle className="text-2xl sm:text-3xl text-center text-black">
                  {currentQuestion.question}
                </CardTitle>
                {currentQuestion.question.includes('flag') && (
                  <div className="mt-4 text-center">
                    <div className="p-4 bg-white rounded-lg inline-block shadow-lg">
                      <div className="h-48 w-full flex items-center justify-center mb-2">
                        <img 
                          src={getFlagUrl(currentQuestion.options[currentQuestion.correctAnswer])} 
                          alt={`Flag of ${currentQuestion.options[currentQuestion.correctAnswer]}`}
                          className="max-h-40 border border-gray-200 rounded-md shadow-md" 
                        />
                      </div>
                      <p className="text-sm text-purple-700 font-medium">Flag of {currentQuestion.options[currentQuestion.correctAnswer]}</p>
                    </div>
                  </div>
                )}
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                  {currentQuestion.options.map((option, index) => (
                    <div
                      key={index}
                      className={`p-4 rounded-lg border-2 text-center font-medium shadow-sm ${
                        showResults && index === currentQuestion.correctAnswer
                          ? 'bg-green-100 border-green-400 text-green-800'
                          : 'bg-white border-gray-200 text-black'
                      }`}
                    >
                      {option}
                    </div>
                  ))}
                </div>
                
                <div className="text-center">
                  <Button 
                    onClick={nextQuestion} 
                    size="lg"
                    className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 text-lg shadow-md"
                  >
                    <ArrowRight className="mr-2 h-6 w-6" />
                    Next Question
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            {/* Recent Answers */}
            <Card className="w-full mt-4 shadow-md border-2 border-gray-100">
              <CardHeader className="pb-2 bg-gradient-to-r from-gray-50 to-gray-100">
                <CardTitle className="text-lg text-black">Recent Answers</CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                {recentAnswers.length === 0 ? (
                  <p className="text-center text-purple-700 py-2">No answers yet</p>
                ) : (
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {recentAnswers.map((item, index) => (
                      <div 
                        key={index}
                        className={`flex items-center gap-2 p-2 rounded-md ${
                          item.correct ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'
                        }`}
                      >
                        <span className="text-xl">{item.player.animal}</span>
                        <span className="text-sm font-medium truncate text-black">{item.player.username}</span>
                        {item.correct ? (
                          <CheckCircle className="h-4 w-4 text-green-500 ml-auto" />
                        ) : (
                          <XCircle className="h-4 w-4 text-red-500 ml-auto" />
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Live Leaderboard */}
          <div className="lg:col-span-5">
            <Card className="w-full h-fit shadow-lg border-2 border-blue-100">
              <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
                <CardTitle className="flex items-center gap-2 text-black">
                  <Trophy className="h-5 w-5 text-yellow-500" />
                  Live Leaderboard
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <div className="space-y-2 max-h-[500px] overflow-y-auto">
                  {leaderboard.length === 0 ? (
                    <p className="text-center text-purple-700 py-4">No players have scored yet</p>
                  ) : (
                    leaderboard.map((player, index) => (
                      <div
                        key={player.id}
                        className={`flex items-center justify-between p-3 rounded-lg shadow-sm ${
                          index === 0 ? 'bg-yellow-50 border border-yellow-200' :
                          index === 1 ? 'bg-gray-50 border border-gray-200' :
                          index === 2 ? 'bg-orange-50 border border-orange-200' :
                          'bg-white border border-gray-100'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-bold text-black">#{index + 1}</span>
                          <span className="text-lg">{player.animal}</span>
                          <span className="text-sm font-medium truncate text-black">{player.username}</span>
                        </div>
                        <Badge variant="secondary" className="text-xs px-2 py-1">
                          {player.score} pts
                        </Badge>
                      </div>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}