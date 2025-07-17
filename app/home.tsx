"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useSession } from "@/components/auth-provider"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { JoinGameDialog } from "@/components/join-game-dialog"
import { PREMADE_QUIZZES } from "@/lib/game-store"
import { ADDITIONAL_QUIZZES, getCategoryIcon } from "@/lib/quiz-utils"
import { ENHANCED_QUIZZES } from "@/lib/enhanced-quizzes"
import { Badge } from "@/components/ui/badge"
import { Play, Users, Settings } from "lucide-react"
import { useTheme } from "@/components/theme-provider-custom"
import Link from "next/link"

// Combine all quizzes
const allQuizzes = [...PREMADE_QUIZZES, ...ADDITIONAL_QUIZZES, ...ENHANCED_QUIZZES]

export function HomePage() {
  const router = useRouter()
  const { data: session } = useSession()
  const [joinDialogOpen, setJoinDialogOpen] = useState(false)
  const theme = useTheme()
  
  const createGame = async (quizId: string) => {
    try {
      const response = await fetch('/api/games', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ quizId })
      })
      
      if (response.ok) {
        const data = await response.json()
        router.push(`/lobby/${data.game.id}`)
      }
    } catch (error) {
      console.error('Failed to create game:', error)
    }
  }
  
  return (
    <div className="space-y-8">
      <section className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-black">Play a Quiz</h2>
            <p className="text-purple-700 font-medium">Join an existing game or customize your experience</p>
          </div>
          <div className="flex gap-3">
            <Button 
              onClick={() => setJoinDialogOpen(true)}
              className={`bg-gradient-to-r ${theme.buttonGradient} hover:opacity-90 px-6`}
            >
              <Users className="mr-2 h-4 w-4" />
              Join Game
            </Button>
            <JoinGameDialog open={joinDialogOpen} onOpenChange={setJoinDialogOpen} />
          </div>
        </div>
      </section>
      
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-black">Available Quizzes</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {allQuizzes.map((quiz) => (
            <Card 
              key={quiz.id} 
              className="overflow-hidden transition-all hover:shadow-lg border-2 border-gray-100 hover:border-blue-100"
            >
              <CardHeader className={`pb-2 bg-gradient-to-r ${theme.cardGradient}`}>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <span className="text-3xl text-purple-600 bg-transparent">{getCategoryIcon(quiz.category)}</span>
                      <span className="text-black">{quiz.title}</span>
                    </CardTitle>
                    <CardDescription className="font-medium text-purple-700">{quiz.description}</CardDescription>
                  </div>
                  <Badge 
                    variant="outline" 
                    className="bg-white border-blue-200 text-blue-700 font-medium"
                  >
                    {quiz.category}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="pb-2 pt-4">
                <p className="text-sm font-medium text-black">
                  {quiz.questions.length} questions
                </p>
              </CardContent>
              <CardFooter className={`bg-gradient-to-r ${theme.cardGradient} pt-2`}>
                <Button 
                  onClick={() => createGame(quiz.id)}
                  className={`w-full bg-gradient-to-r ${theme.buttonGradient} hover:opacity-90 shadow-md`}
                >
                  <Play className="mr-2 h-4 w-4" />
                  Host Game
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>
      
      <section className="pt-4 pb-8">
        <Card className={`bg-gradient-to-r ${theme.cardGradient} border-none shadow-md`}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-black">
              <Settings className="h-5 w-5" />
              <span>Customize Your Experience</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4 text-black">Change the look and feel of QuizVerse by selecting different color themes.</p>
            <p className="text-black">Click the palette icon <span className="inline-block p-1 bg-white rounded-full"><Settings className="h-4 w-4 inline" /></span> in the header to choose from our fun theme options!</p>
          </CardContent>
        </Card>
      </section>
    </div>
  )
}