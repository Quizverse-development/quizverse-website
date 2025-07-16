"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Clock, Users, Trophy, CheckCircle, XCircle } from "lucide-react"
import { getFlagUrl, getFlagEmoji } from "@/lib/flag-utils"

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
  const [answerSubmitted, setAnswerSubmitted] = useState(false)
  const [isCorrect, setIsCorrect] = useState(false)
  const [gameFinished, setGameFinished] = useState(false)
  const [leaderboard, setLeaderboard] = useState<Player[]>([])
  const [player, setPlayer] = useState<any>(null)

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
            return
          }
        }

        // Fetch current question if game is playing
        if (gameData.game?.status === 'playing') {
          const questionResponse = await fetch(`/api/games/${params.id}/question`)
          const questionData = await questionResponse.json()
          
          if (questionData.question) {
            // Check if this is a new question
            if (!currentQuestion || questionData.question.id !== currentQuestion.id) {
              setCurrentQuestion(questionData.question)
              setTimeLeft(questionData.question.timeLimit)
              setSelectedAnswer("")
              setShowResults(false)
              setAnswerSubmitted(false)
            }
          }
        }
        
      } catch (error) {
        console.error('Failed to fetch game data:', error)
      }
    }

    fetchGameData()
    const interval = setInterval(fetchGameData, 1000)
    return () => clearInterval(interval)
  }, [params.id, currentQuestion])

  useEffect(() => {
    // Completely new timer implementation
    if (!currentQuestion || !game || game.status !== 'playing') return;
    
    // Set initial time from question
    setTimeLeft(currentQuestion.timeLimit);
    
    // Use Date.now() to track elapsed time precisely
    const startTime = Date.now();
    const totalTime = currentQuestion.timeLimit * 1000;
    
    const timer = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const remaining = Math.max(0, Math.ceil((totalTime - elapsed) / 1000));
      
      if (remaining <= 0) {
        clearInterval(timer);
        setTimeLeft(0);
        if (!answerSubmitted && selectedAnswer) {
          handleSubmitAnswer();
        }
      } else {
        setTimeLeft(remaining);
      }
    }, 250); // Update more frequently for smoother countdown
    
    return () => clearInterval(timer);
  }, [currentQuestion?.id, game?.status]) // Only depend on these specific properties

  const handleSubmitAnswer = async () => {
    if (!currentQuestion || !game || !player) return
    
    // Allow answering until timer runs out
    
    // Check if answer is correct
    const correct = selectedAnswer === currentQuestion.options[currentQuestion.correctAnswer]
    setIsCorrect(correct)
    setShowResults(true)
    
    // Don't set answerSubmitted to true to allow multiple attempts
    // setAnswerSubmitted(true)
    
    // Submit answer to API
    try {
      await fetch(`/api/games/${params.id}/answer`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          playerId: player.id,
          questionId: currentQuestion.id,
          answer: selectedAnswer || "",
          timeMs: (currentQuestion.timeLimit - timeLeft) * 1000
        })
      })
      
      // Refresh leaderboard after submitting answer
      fetch(`/api/games/${params.id}/leaderboard`)
        .then(res => res.json())
        .then(data => setLeaderboard(data.leaderboard || []))
        
    } catch (error) {
      console.error('Failed to submit answer:', error)
    }
  }

  if (gameFinished) {
    const playerRank = leaderboard.findIndex(p => p.id === player?.id) + 1
    const playerScore = leaderboard.find(p => p.id === player?.id)?.score || 0

    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-4">
        <div className="container mx-auto max-w-4xl">
          <Card className="w-full shadow-lg">
            <CardContent className="p-8 text-center">
              <Trophy className="h-16 w-16 text-yellow-500 mx-auto mb-4" />
              <h1 className="text-4xl font-bold text-gray-900 mb-2">Game Over!</h1>
              
              {player && (
                <div className="bg-blue-50 rounded-lg p-6 mb-6 shadow-md">
                  <div className="flex items-center justify-center gap-3 mb-4">
                    <span className="text-4xl">{player.animal}</span>
                    <span className="text-2xl font-bold">{player.username}</span>
                  </div>
                  <div className="text-center">
                    <p className="text-lg text-gray-600">Your Rank</p>
                    <p className="text-4xl font-bold text-blue-600">#{playerRank}</p>
                    <p className="text-lg text-gray-600 mt-2">Final Score: {playerScore} points</p>
                  </div>
                </div>
              )}
              
              <div className="space-y-3 mb-6">
                <h2 className="text-xl font-semibold text-gray-800">Top 5 Players</h2>
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
                      <span className="text-lg font-bold">#{index + 1}</span>
                      <span className="text-2xl">{p.animal}</span>
                      <span className="font-medium">{p.username}</span>
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
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-lg shadow-lg">
          <CardContent className="p-8 text-center space-y-6">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold text-gray-900">Waiting for Game</h1>
              <p className="text-gray-600">The host will start the game soon</p>
            </div>

            <div className="flex justify-center">
              <div className="animate-pulse flex space-x-2">
                <div className="w-3 h-3 bg-blue-600 rounded-full animate-bounce"></div>
                <div className="w-3 h-3 bg-blue-600 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                <div className="w-3 h-3 bg-blue-600 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
              </div>
            </div>

            {player && (
              <div className="bg-gray-50 rounded-lg p-4 shadow-md">
                <p className="text-sm text-gray-600 mb-2">You are playing as:</p>
                <div className="flex items-center justify-center gap-3">
                  <span className="text-3xl">{player.animal}</span>
                  <span className="text-xl font-medium">{player.username}</span>
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
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md shadow-lg">
          <CardContent className="p-8 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-lg">Loading question...</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-4">
      <div className="container mx-auto max-w-4xl">
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
          
          <div className="flex items-center gap-2 bg-white rounded-lg px-4 py-2 shadow-md">
            <Clock className="h-5 w-5 text-red-500" />
            <span className="text-xl font-bold text-red-500">{timeLeft}s</span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-6">
          <Progress value={(timeLeft / currentQuestion.timeLimit) * 100} className="h-3" />
        </div>

        {/* Question Card */}
        <Card className="w-full mb-6 shadow-lg">
          <CardContent className="p-8">
            <h1 className="text-2xl sm:text-3xl font-bold text-center text-gray-900 mb-8">
              {currentQuestion.question}
            </h1>
            
            {currentQuestion.question.includes('flag') && (
              <div className="mb-6 text-center">
                <div className="p-4 bg-gray-50 rounded-lg inline-block shadow-lg">
                  <div className="h-48 w-full flex items-center justify-center mb-2">
                    <img 
                      src={getFlagUrl(currentQuestion.options[currentQuestion.correctAnswer])} 
                      alt="Flag"
                      className="max-h-40 border border-gray-200 rounded-md shadow-md" 
                    />
                  </div>
                  <p className="text-sm text-gray-600 font-medium">Choose the correct country for this flag</p>
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
                      : 'hover:bg-gray-50 border-2'
                  }`}
                  onClick={() => setSelectedAnswer(option)}
                  disabled={timeLeft === 0}
                >
                  {option}
                </Button>
              ))}
            </div>
            
            {selectedAnswer && (
              <div className="text-center mt-6">
                <Button 
                  onClick={handleSubmitAnswer} 
                  size="lg" 
                  className="bg-blue-600 hover:bg-blue-700 transition-all px-8 py-6 text-lg"
                  disabled={timeLeft === 0}
                >
                  Submit Answer
                </Button>
              </div>
            )}

            {showResults && (
              <div className="text-center mt-6">
                <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg ${
                  isCorrect ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}>
                  {isCorrect ? (
                    <CheckCircle className="h-5 w-5" />
                  ) : (
                    <XCircle className="h-5 w-5" />
                  )}
                  <span className="font-medium">
                    {isCorrect ? 'Correct!' : 'Incorrect'}
                  </span>
                </div>
                <p className="text-gray-600 mt-2">Try again or wait for next question...</p>
              </div>
            )}
          </CardContent>
        </Card>
        
        {/* Mini Leaderboard */}
        {leaderboard.length > 0 && (
          <Card className="w-full shadow-md">
            <CardContent className="p-4">
              <h3 className="font-medium mb-2 flex items-center">
                <Trophy className="h-4 w-4 text-yellow-500 mr-1" />
                Top 3 Players
              </h3>
              <div className="space-y-2">
                {leaderboard.slice(0, 3).map((p, index) => (
                  <div key={p.id} className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <span className="font-bold">#{index + 1}</span>
                      <span>{p.animal}</span>
                      <span>{p.username}</span>
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