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

// Combine all quizzes
const allQuizzes = [...PREMADE_QUIZZES, ...ADDITIONAL_QUIZZES, ...ENHANCED_QUIZZES]

export function HomePage() {
  const router = useRouter()
  const { data: session } = useSession()
  const [joinDialogOpen, setJoinDialogOpen] = useState(false)
  
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
            <h2 className="text-2xl font-bold">Play a Quiz</h2>
            <p className="text-muted-foreground">Join an existing game or create your own</p>
          </div>
          <div className="flex gap-2">
            <Button 
              onClick={() => setJoinDialogOpen(true)}
              className="bg-blue-500 hover:bg-blue-600"
            >
              Join Game
            </Button>
            <JoinGameDialog open={joinDialogOpen} onOpenChange={setJoinDialogOpen} />
          </div>
        </div>
      </section>
      
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Create a Game</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {allQuizzes.map((quiz) => (
            <Card key={quiz.id} className="overflow-hidden transition-all hover:shadow-md">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <span className="text-2xl">{getCategoryIcon(quiz.category)}</span>
                      {quiz.title}
                    </CardTitle>
                    <CardDescription>{quiz.description}</CardDescription>
                  </div>
                  <Badge variant="outline">{quiz.category}</Badge>
                </div>
              </CardHeader>
              <CardContent className="pb-2">
                <p className="text-sm text-muted-foreground">
                  {quiz.questions.length} questions
                </p>
              </CardContent>
              <CardFooter>
                <Button 
                  onClick={() => createGame(quiz.id)}
                  className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600"
                >
                  Host Game
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>
    </div>
  )
}