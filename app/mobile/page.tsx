"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Smartphone, Users, Play, QrCode } from "lucide-react"
import { PREMADE_QUIZZES } from "@/lib/game-store"
import { ADDITIONAL_QUIZZES } from "@/lib/quiz-utils"
import { ENHANCED_QUIZZES } from "@/lib/enhanced-quizzes"
import { getCategoryIcon } from "@/lib/quiz-utils"
import { getAllQuizzes } from "@/lib/game-utils"

export default function MobilePage() {
  const router = useRouter()
  const [gameCode, setGameCode] = useState("")
  const [username, setUsername] = useState("")
  const [selectedQuiz, setSelectedQuiz] = useState("")
  const [timeLimit, setTimeLimit] = useState("10")
  const [isCreating, setIsCreating] = useState(false)
  const [isJoining, setIsJoining] = useState(false)
  const [error, setError] = useState("")
  
  // Get all available quizzes
  const allQuizzes = getAllQuizzes()
  
  const handleJoinGame = async () => {
    if (!gameCode || !username) {
      setError("Please enter both game code and username")
      return
    }
    
    setIsJoining(true)
    setError("")
    
    try {
      const response = await fetch(`/api/games/join`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          code: gameCode,
          username,
          animal: "🦊" // Default animal
        })
      })
      
      const data = await response.json()
      
      if (response.ok) {
        router.push(`/play/${data.game.id}`)
      } else {
        setError(data.error || "Failed to join game")
      }
    } catch (error) {
      setError("An error occurred. Please try again.")
    } finally {
      setIsJoining(false)
    }
  }
  
  const handleCreateGame = async () => {
    if (!selectedQuiz) {
      setError("Please select a quiz")
      return
    }
    
    setIsCreating(true)
    setError("")
    
    try {
      const response = await fetch('/api/games', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          quizId: selectedQuiz,
          timeLimit: parseInt(timeLimit) || 10
        })
      })
      
      if (response.ok) {
        const data = await response.json()
        router.push(`/mobile/host/${data.game.id}`)
      } else {
        setError("Failed to create game")
      }
    } catch (error) {
      setError("An error occurred. Please try again.")
    } finally {
      setIsCreating(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-4 w-full max-w-full">
      <div className="w-full max-w-md mx-auto">
        <div className="flex justify-center mb-8">
          <div className="flex items-center gap-2">
            <Smartphone className="h-6 w-6 text-blue-600" />
            <h1 className="text-2xl font-bold text-center">QuizVerse Mobile</h1>
          </div>
        </div>
        
        <Tabs defaultValue="join" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger value="join">Join Game</TabsTrigger>
            <TabsTrigger value="host">Host Game</TabsTrigger>
          </TabsList>
          
          <TabsContent value="join">
            <Card className="shadow-md">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-blue-500" />
                  Join a Game
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="gameCode">Game Code</Label>
                    <Input 
                      id="gameCode" 
                      placeholder="Enter 6-digit code" 
                      value={gameCode}
                      onChange={(e) => setGameCode(e.target.value.toUpperCase())}
                      maxLength={6}
                      className="text-center text-xl tracking-widest uppercase"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="username">Your Name</Label>
                    <Input 
                      id="username" 
                      placeholder="Enter your name" 
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      maxLength={15}
                    />
                  </div>
                  
                  {error && (
                    <div className="bg-red-50 text-red-600 p-2 rounded-md text-sm">
                      {error}
                    </div>
                  )}
                  
                  <Button 
                    className="w-full bg-blue-600 hover:bg-blue-700"
                    onClick={handleJoinGame}
                    disabled={isJoining}
                  >
                    {isJoining ? 'Joining...' : 'Join Game'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="host">
            <Card className="shadow-md">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Play className="h-5 w-5 text-blue-500" />
                  Host a Game
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="quiz">Select Quiz</Label>
                    <select 
                      id="quiz"
                      value={selectedQuiz}
                      onChange={(e) => setSelectedQuiz(e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-md"
                    >
                      <option value="">-- Select a Quiz --</option>
                      {allQuizzes.map((quiz) => (
                        <option key={quiz.id} value={quiz.id}>
                          {getCategoryIcon(quiz.category)} {quiz.title} ({quiz.questions.length} questions)
                        </option>
                      ))}
                    </select>
                  </div>
                  
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
                  
                  {error && (
                    <div className="bg-red-50 text-red-600 p-2 rounded-md text-sm">
                      {error}
                    </div>
                  )}
                  
                  <Button 
                    className="w-full bg-blue-600 hover:bg-blue-700"
                    onClick={handleCreateGame}
                    disabled={!selectedQuiz || isCreating}
                  >
                    {isCreating ? 'Creating...' : 'Create Game'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
        
        <div className="mt-8 text-center">
          <Button variant="outline" onClick={() => router.push("/")}>
            Back to Desktop Version
          </Button>
        </div>
      </div>
    </div>
  )
}