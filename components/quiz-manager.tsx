"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Edit, Trash2, Eye, Users } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface Quiz {
  id: string
  title: string
  description: string
  category: string
  difficulty: string
  isPublic: boolean
  createdAt: string
  questions: any[]
  tags: string[]
}

interface QuizManagerProps {
  onUpdate: () => void
}

export function QuizManager({ onUpdate }: QuizManagerProps) {
  const [quizzes, setQuizzes] = useState<Quiz[]>([])
  const [loading, setLoading] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    fetchQuizzes()
  }, [])

  const fetchQuizzes = async () => {
    try {
      const response = await fetch("/api/quizzes/admin")
      if (response.ok) {
        const data = await response.json()
        setQuizzes(data)
      }
    } catch (error) {
      toast({ title: "Failed to fetch quizzes", variant: "destructive" })
    } finally {
      setLoading(false)
    }
  }

  const togglePublic = async (id: string, isPublic: boolean) => {
    try {
      const response = await fetch(`/api/quizzes/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isPublic })
      })

      if (response.ok) {
        setQuizzes(quizzes.map(q => q.id === id ? { ...q, isPublic } : q))
        toast({ title: `Quiz ${isPublic ? 'published' : 'unpublished'}` })
        onUpdate()
      }
    } catch (error) {
      toast({ title: "Failed to update quiz", variant: "destructive" })
    }
  }

  const deleteQuiz = async (id: string) => {
    if (!confirm("Are you sure you want to delete this quiz?")) return

    try {
      const response = await fetch(`/api/quizzes/${id}`, {
        method: "DELETE"
      })

      if (response.ok) {
        setQuizzes(quizzes.filter(q => q.id !== id))
        toast({ title: "Quiz deleted successfully" })
        onUpdate()
      }
    } catch (error) {
      toast({ title: "Failed to delete quiz", variant: "destructive" })
    }
  }

  if (loading) {
    return <div className="text-center py-8">Loading quizzes...</div>
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Your Quizzes</h2>
        <Badge variant="outline">{quizzes.length} total</Badge>
      </div>

      {quizzes.length === 0 ? (
        <Card>
          <CardContent className="text-center py-8">
            <p className="text-muted-foreground">No quizzes created yet. Create your first quiz!</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {quizzes.map((quiz) => (
            <Card key={quiz.id}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <CardTitle className="flex items-center gap-2">
                      {quiz.title}
                      <Badge variant={quiz.isPublic ? "default" : "secondary"}>
                        {quiz.isPublic ? "Public" : "Private"}
                      </Badge>
                      <Badge variant="outline">{quiz.difficulty}</Badge>
                    </CardTitle>
                    <p className="text-sm text-muted-foreground">{quiz.description}</p>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <span>{quiz.category}</span>
                      <span>•</span>
                      <span>{quiz.questions.length} questions</span>
                      <span>•</span>
                      <span>{new Date(quiz.createdAt).toLocaleDateString()}</span>
                    </div>
                    {quiz.tags.length > 0 && (
                      <div className="flex gap-1 flex-wrap">
                        {quiz.tags.map((tag, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center space-x-2">
                      <Switch
                        checked={quiz.isPublic}
                        onCheckedChange={(checked) => togglePublic(quiz.id, checked)}
                      />
                      <span className="text-sm">Public</span>
                    </div>
                    <Button variant="ghost" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => deleteQuiz(quiz.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}