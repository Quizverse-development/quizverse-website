"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Clock, Users, Trophy } from "lucide-react"

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

export default function PlayPage() {
  const params = useParams()
  const router = useRouter()
  const [game, setGame] = useState<Game | null>(null)
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null)
  const [selectedAnswer, setSelectedAnswer] = useState<string>("")
  const [timeLeft, setTimeLeft] = useState(20)
  const [showResults, setShowResults] = useState(false)
  const [gameFinished, setGameFinished] = useState(false)
  const [leaderboard, setLeaderboard] = useState<Player[]>([])

  useEffect(() => {
    const fetchGame = async () => {
      try {
        const response = await fetch(`/api/games/${params.id}`)
        const data = await response.json()
        if (data.game) {
          setGame(data.game)
          if (data.game.status === 'finished') {
            setGameFinished(true)
            // Fetch leaderboard
            const leaderResponse = await fetch(`/api/games/${params.id}/leaderboard`)
            const leaderData = await leaderResponse.json()
            setLeaderboard(leaderData.leaderboard || [])
          }
        }
      } catch (error) {
        console.error('Failed to fetch game:', error)
      }
    }

    fetchGame()
    const interval = setInterval(fetchGame, 2000)
    return () => clearInterval(interval)
  }, [params.id])

  useEffect(() => {
    if (timeLeft > 0 && !showResults && currentQuestion) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
      return () => clearTimeout(timer)
    } else if (timeLeft === 0 && !showResults) {
      handleSubmitAnswer()
    }
  }, [timeLeft, showResults, currentQuestion])

  const handleSubmitAnswer = async () => {
    if (!selectedAnswer || !currentQuestion || !game) return
    
    setShowResults(true)
    
    // Submit answer to API
    try {
      const player = JSON.parse(localStorage.getItem('player') || '{}')
      await fetch(`/api/games/${params.id}/answer`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          playerId: player.id,
          questionId: currentQuestion.id,
          answer: selectedAnswer,
          timeMs: (currentQuestion.timeLimit - timeLeft) * 1000
        })
      })
    } catch (error) {
      console.error('Failed to submit answer:', error)
    }

    // Show results for 3 seconds
    setTimeout(() => {
      setShowResults(false)
      setSelectedAnswer("")
      setTimeLeft(20)
      // Move to next question or finish game
    }, 3000)
  }

  if (gameFinished) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 p-4">
        <div className="container mx-auto max-w-4xl">
          <Card className="w-full">
            <CardContent className="p-8 text-center">
              <Trophy className="h-16 w-16 text-yellow-500 mx-auto mb-4" />
              <h1 className="text-4xl font-bold text-gray-900 mb-6">Game Finished!</h1>
              
              <div className="space-y-4">
                <h2 className="text-2xl font-semibold text-gray-800">Final Leaderboard</h2>
                <div className="space-y-2">
                  {leaderboard.map((player, index) => (
                    <div
                      key={player.id}
                      className={`flex items-center justify-between p-4 rounded-lg ${
                        index === 0 ? 'bg-yellow-100 border-2 border-yellow-400' :
                        index === 1 ? 'bg-gray-100 border-2 border-gray-400' :
                        index === 2 ? 'bg-orange-100 border-2 border-orange-400' :
                        'bg-white border border-gray-200'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-2xl font-bold">#{index + 1}</span>
                        <span className="text-2xl">{player.animal}</span>
                        <span className="font-medium">{player.username}</span>
                      </div>
                      <Badge variant="secondary" className="text-lg px-3 py-1">
                        {player.score} pts
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>
              
              <Button onClick={() => router.push("/")} className="mt-6" size="lg">
                Play Again
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  if (!currentQuestion) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardContent className="p-8 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
            <p className="text-lg">Loading question...</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 p-4">
      <div className="container mx-auto max-w-4xl">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-4">
            <Badge variant="secondary" className="text-lg px-4 py-2">
              <Users className="mr-2 h-4 w-4" />
              {game?.players.length} Players
            </Badge>
            <Badge variant="outline" className="text-lg px-4 py-2">
              Question {game?.currentQuestion || 1}
            </Badge>
          </div>
          
          <div className="flex items-center gap-2 bg-white rounded-lg px-4 py-2">
            <Clock className="h-5 w-5 text-red-500" />
            <span className="text-xl font-bold text-red-500">{timeLeft}s</span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-6">
          <Progress value={(timeLeft / currentQuestion.timeLimit) * 100} className="h-3" />
        </div>

        {/* Question Card */}
        <Card className="w-full mb-6">
          <CardContent className="p-8">
            <h1 className="text-2xl sm:text-3xl font-bold text-center text-gray-900 mb-8">
              {currentQuestion.question}
            </h1>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {currentQuestion.options.map((option, index) => (
                <Button
                  key={index}
                  variant={selectedAnswer === option ? "default" : "outline"}
                  className={`h-16 text-lg font-medium ${
                    showResults && option === currentQuestion.options[currentQuestion.correctAnswer]
                      ? 'bg-green-500 hover:bg-green-600 text-white'
                      : showResults && selectedAnswer === option && option !== currentQuestion.options[currentQuestion.correctAnswer]
                      ? 'bg-red-500 hover:bg-red-600 text-white'
                      : ''
                  }`}
                  onClick={() => !showResults && setSelectedAnswer(option)}
                  disabled={showResults}
                >
                  {option}
                </Button>
              ))}
            </div>
            
            {selectedAnswer && !showResults && (
              <div className="text-center mt-6">
                <Button onClick={handleSubmitAnswer} size="lg">
                  Submit Answer
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}