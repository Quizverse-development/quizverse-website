"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Timer, Users, Trophy, CheckCircle, XCircle } from "lucide-react"
import { getFlagUrl } from "@/lib/flag-utils"
import { formatRemainingTime } from "@/lib/game-utils"

interface Question {
  id: number
  question: string
  options: string[]
  correctAnswer: number
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
  endTime?: string
}

export default function PlayPage() {
  const params = useParams()
  const router = useRouter()
  const [game, setGame] = useState<Game | null>(null)
  const [currentQuestion, setCurrentQuestion] = useState<any>(null)
  const [selectedAnswer, setSelectedAnswer] = useState<string>("")
  const [showResults, setShowResults] = useState(false)
  const [isCorrect, setIsCorrect] = useState(false)
  const [gameFinished, setGameFinished] = useState(false)
  const [leaderboard, setLeaderboard] = useState<Player[]>([])
  const [player, setPlayer] = useState<any>(null)
  const [gameTimeRemaining, setGameTimeRemaining] = useState<string>("∞")
  const [redirectTimer, setRedirectTimer] = useState<number>(0)

  useEffect(() => {
    // Get player info from localStorage with error handling
    try {
      const savedPlayer = localStorage.getItem('player')
      if (savedPlayer) {
        const parsedPlayer = JSON.parse(savedPlayer)
        setPlayer(parsedPlayer)
      }
    } catch (error) {
      console.error('Error loading player data:', error)
      localStorage.removeItem('player')
    }

    const fetchGameData = async () => {
      try {
        // Fetch game info
        const gameResponse = await fetch(`/api/games/${params.id}`)
        const gameData = await gameResponse.json()
        
        if (gameData.game) {
          setGame(gameData.game)
          
          if (gameData.game.status === 'finished') {
            setGameFinished(true)
            // Fetch final leaderboard
            const leaderResponse = await fetch(`/api/games/${params.id}/leaderboard`)
            const leaderData = await leaderResponse.json()
            setLeaderboard(leaderData.leaderboard || [])
            
            // Start redirect timer
            setRedirectTimer(5)
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
            // Always update the current question
            setCurrentQuestion(questionData.question)
            
            // Only reset answer if we're not showing results
            if (!showResults) {
              setSelectedAnswer("")
            }
          }
        }
        
        // Always fetch leaderboard for playing games
        if (gameData.game?.status === 'playing') {
          const leaderResponse = await fetch(`/api/games/${params.id}/leaderboard`)
          const leaderData = await leaderResponse.json()
          setLeaderboard(leaderData.leaderboard || [])
        }
        
      } catch (error) {
        console.error('Failed to fetch game data:', error)
      }
    }

    fetchGameData()
    const interval = setInterval(fetchGameData, 1000)
    return () => clearInterval(interval)
  }, [params.id, showResults])

  // Redirect timer for game finished state
  useEffect(() => {
    if (redirectTimer > 0) {
      const timer = setTimeout(() => {
        setRedirectTimer(prev => prev - 1)
      }, 1000)
      
      return () => clearTimeout(timer)
    } else if (redirectTimer === 0 && gameFinished) {
      router.push('/')
    }
  }, [redirectTimer, gameFinished, router])

  const handleSubmitAnswer = async () => {
    if (!currentQuestion || !game || !player) return
    
    // Check if answer is correct
    const correct = selectedAnswer === currentQuestion.options[currentQuestion.correctAnswer]
    setIsCorrect(correct)
    setShowResults(true)
    
    // Submit answer to API
    try {
      await fetch(`/api/games/${params.id}/answer`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          playerId: player.id,
          questionId: currentQuestion.id,
          answer: selectedAnswer || "",
          timeMs: 0 // Time doesn't matter anymore
        })
      })
      
      // Refresh leaderboard after submitting answer
      fetch(`/api/games/${params.id}/leaderboard`)
        .then(res => res.json())
        .then(data => setLeaderboard(data.leaderboard || []))
      
      // Auto-advance to next question after a short delay
      setTimeout(() => {
        setSelectedAnswer("");
        setShowResults(false);
      }, 500); // Shorter delay for faster gameplay
        
    } catch (error) {
      console.error('Failed to submit answer:', error)
    }
  }

  if (gameFinished) {
    const playerRank = leaderboard.findIndex(p => p.id === player?.id) + 1
    const playerScore = leaderboard.find(p => p.id === player?.id)?.score || 0

    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-4 w-screen overflow-x-hidden">
        <div className="container mx-auto max-w-4xl">
          <Card className="w-full shadow-lg border-2 border-yellow-200">
            <CardContent className="p-8 text-center">
              <Trophy className="h-16 w-16 text-yellow-500 mx-auto mb-4" />
              <h1 className="text-4xl font-bold text-black mb-2">Game Over!</h1>
              <p className="text-sm text-purple-700 mb-4">Redirecting to home in {redirectTimer} seconds...</p>
              
              {player && (
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6 mb-6 shadow-md border-2 border-blue-200">
                  <div className="flex items-center justify-center gap-3 mb-4">
                    <span className="text-4xl">{player.animal}</span>
                    <span className="text-2xl font-bold text-black">{player.username}</span>
                  </div>
                  <div className="text-center">
                    <p className="text-lg text-purple-700">Your Rank</p>
                    <p className="text-4xl font-bold text-blue-600">#{playerRank}</p>
                    <p className="text-lg text-purple-700 mt-2">Final Score: {playerScore} points</p>
                  </div>
                </div>
              )}
              
              <div className="space-y-3 mb-6">
                <h2 className="text-xl font-semibold text-black">Top 5 Players</h2>
                {leaderboard.slice(0, 5).map((p, index) => (
                  <div
                    key={p.id}
                    className={`flex items-center justify-between p-3 rounded-lg shadow-sm ${
                      p.id === player?.id ? 'bg-blue-100 border-2 border-blue-400' :
                      index === 0 ? 'bg-yellow-100 border border-yellow-300' :
                      'bg-white border border-gray-200'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-lg font-bold text-black">#{index + 1}</span>
                      <span className="text-2xl">{p.animal}</span>
                      <span className="font-medium text-black">{p.username}</span>
                    </div>
                    <Badge variant="secondary" className="px-2 py-1">{p.score} pts</Badge>
                  </div>
                ))}
              </div>
              
              <Button onClick={() => router.push("/")} size="lg" className="bg-blue-600 hover:bg-blue-700 px-8 py-6 text-lg">
                Play Again
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  if (!game || game.status === 'lobby') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center p-4 w-screen overflow-x-hidden">
        <Card className="w-full max-w-lg shadow-lg border-2 border-blue-100">
          <CardContent className="p-8 text-center space-y-6">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold text-black">Waiting for Game</h1>
              <p className="text-purple-700">The host will start the game soon</p>
            </div>

            <div className="flex justify-center">
              <div className="animate-pulse flex space-x-2">
                <div className="w-3 h-3 bg-blue-600 rounded-full animate-bounce"></div>
                <div className="w-3 h-3 bg-blue-600 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                <div className="w-3 h-3 bg-blue-600 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
              </div>
            </div>

            {player && (
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-4 shadow-md border border-blue-200">
                <p className="text-sm text-purple-700 mb-2">You are playing as:</p>
                <div className="flex items-center justify-center gap-3">
                  <span className="text-3xl">{player.animal}</span>
                  <span className="text-xl font-medium text-black">{player.username}</span>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    )
  }

  if (!currentQuestion) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center p-4 w-screen overflow-x-hidden">
        <Card className="w-full max-w-md shadow-lg">
          <CardContent className="p-8 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-lg text-black">Loading question...</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-100 to-indigo-100 p-4 w-screen overflow-x-hidden">
      <div className="container mx-auto max-w-4xl">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-4">
            <Badge variant="secondary" className="text-lg px-4 py-2">
              <Users className="mr-2 h-4 w-4" />
              {game.players.length} Players
            </Badge>
            <Badge variant="outline" className="text-lg px-4 py-2 bg-white">
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

        {/* Question Card */}
        <Card className="w-full mb-6 shadow-lg border-2 border-blue-200">
          <CardContent className="p-8 bg-gradient-to-r from-blue-50 to-indigo-50">
            <h1 className="text-2xl sm:text-3xl font-bold text-center text-black mb-8">
              {currentQuestion.question}
            </h1>
            
            {currentQuestion.question.includes('flag') && (
              <div className="mb-6 text-center">
                <div className="p-4 bg-white rounded-lg inline-block shadow-lg border border-blue-100">
                  <div className="h-48 w-full flex items-center justify-center mb-2">
                    <img 
                      src={getFlagUrl(currentQuestion.options[currentQuestion.correctAnswer])} 
                      alt="Flag"
                      className="max-h-40 border border-gray-200 rounded-md shadow-md" 
                    />
                  </div>
                  <p className="text-sm text-purple-700 font-medium">Choose the correct country for this flag</p>
                </div>
              </div>
            )}
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {currentQuestion.options.map((option, index) => (
                <Button
                  key={index}
                  variant={selectedAnswer === option ? "default" : "outline"}
                  className={`h-20 text-lg font-medium transition-all shadow-sm hover:shadow-md ${
                    showResults && option === currentQuestion.options[currentQuestion.correctAnswer]
                      ? 'bg-green-500 hover:bg-green-600 text-white border-green-500'
                      : showResults && selectedAnswer === option && option !== currentQuestion.options[currentQuestion.correctAnswer]
                      ? 'bg-red-500 hover:bg-red-600 text-white border-red-500'
                      : selectedAnswer === option
                      ? 'bg-blue-600 hover:bg-blue-700 text-white'
                      : 'bg-white hover:bg-gray-50 border-2 border-blue-200 text-black'
                  }`}
                  onClick={() => !showResults && setSelectedAnswer(option)}
                >
                  {option}
                </Button>
              ))}
            </div>
            
            {selectedAnswer && !showResults && (
              <div className="text-center mt-6">
                <Button 
                  onClick={handleSubmitAnswer} 
                  size="lg" 
                  className="bg-blue-600 hover:bg-blue-700 transition-all px-8 py-6 text-lg shadow-md"
                >
                  Submit Answer
                </Button>
              </div>
            )}

            {showResults && (
              <div className="text-center mt-6">
                <div className={`inline-flex items-center gap-2 px-6 py-3 rounded-lg ${
                  isCorrect ? 'bg-green-100 text-green-800 border-2 border-green-300' : 'bg-red-100 text-red-800 border-2 border-red-300'
                }`}>
                  {isCorrect ? (
                    <CheckCircle className="h-6 w-6" />
                  ) : (
                    <XCircle className="h-6 w-6" />
                  )}
                  <span className="font-bold text-lg">
                    {isCorrect ? 'Correct!' : 'Incorrect'}
                  </span>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
        
        {/* Mini Leaderboard */}
        {leaderboard.length > 0 && (
          <Card className="w-full shadow-md border-2 border-blue-100">
            <CardContent className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50">
              <h3 className="font-medium mb-2 flex items-center text-black">
                <Trophy className="h-4 w-4 text-yellow-500 mr-1" />
                Top 3 Players
              </h3>
              <div className="space-y-2">
                {leaderboard.slice(0, 3).map((p, index) => (
                  <div key={p.id} className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-black">#{index + 1}</span>
                      <span>{p.animal}</span>
                      <span className="text-black">{p.username}</span>
                    </div>
                    <Badge variant="secondary">{p.score} pts</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}