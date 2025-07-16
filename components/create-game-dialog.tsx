"use client"

import { useState, useEffect } from "react"
import { useSession } from "@/components/auth-provider"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Play } from "lucide-react"
import { useRouter } from "next/navigation"

interface Quiz {
  id: string
  title: string
  description: string
  category: string
}

export function CreateGameDialog() {
  const { data: session } = useSession()
  const [quizzes, setQuizzes] = useState<Quiz[]>([])
  const [loading, setLoading] = useState(false)
  const [open, setOpen] = useState(false)
  const router = useRouter()

  useEffect(() => {
    if (open) {
      fetch('/api/quizzes')
        .then(res => res.json())
        .then(data => setQuizzes(data.quizzes))
    }
  }, [open])

  const createGame = async (quizId: string) => {
    if (!session?.user) return
    
    setLoading(true)
    try {
      const response = await fetch('/api/games/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ hostId: session.user.id, quizId })
      })
      
      const data = await response.json()
      if (data.game) {
        router.push(`/lobby/${data.game.id}`)
      }
    } catch (error) {
      console.error('Failed to create game:', error)
    }
    setLoading(false)
  }

  if (!session) return null

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Play className="mr-2 h-4 w-4" />
          Host Game
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Choose a Quiz to Host</DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-96 overflow-y-auto">
          {quizzes.map((quiz) => (
            <Card key={quiz.id} className="cursor-pointer hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle className="text-lg">{quiz.title}</CardTitle>
                <p className="text-sm text-gray-500">{quiz.category}</p>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-4">{quiz.description}</p>
                <Button 
                  onClick={() => createGame(quiz.id)}
                  disabled={loading}
                  className="w-full"
                >
                  {loading ? "Creating..." : "Host This Quiz"}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  )
}