"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { PREMADE_QUIZZES } from "@/lib/game-store"
import { ADDITIONAL_QUIZZES } from "@/lib/quiz-utils"
import { ENHANCED_QUIZZES } from "@/lib/enhanced-quizzes"
import { getCategoryIcon } from "@/lib/quiz-utils"

// Combine all quizzes
const allQuizzes = [...PREMADE_QUIZZES, ...ADDITIONAL_QUIZZES, ...ENHANCED_QUIZZES]

export function CreateGameDialog() {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [quizId, setQuizId] = useState("")
  const [timeLimit, setTimeLimit] = useState("10")
  const [isCreating, setIsCreating] = useState(false)
  
  const handleCreate = async () => {
    if (!quizId) return
    
    setIsCreating(true)
    
    try {
      const response = await fetch('/api/games', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          quizId,
          timeLimit: parseInt(timeLimit) || 10
        })
      })
      
      if (response.ok) {
        const data = await response.json()
        router.push(`/lobby/${data.game.id}`)
      } else {
        console.error('Failed to create game')
      }
    } catch (error) {
      console.error('Error creating game:', error)
    } finally {
      setIsCreating(false)
    }
  }
  
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="w-full bg-blue-600 hover:bg-blue-700">Host a Game</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create a New Game</DialogTitle>
          <DialogDescription>
            Select a quiz and set a time limit for the game.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="quiz">Select Quiz</Label>
            <Select value={quizId} onValueChange={setQuizId}>
              <SelectTrigger id="quiz">
                <SelectValue placeholder="Select a quiz" />
              </SelectTrigger>
              <SelectContent>
                {allQuizzes.map((quiz) => (
                  <SelectItem key={quiz.id} value={quiz.id}>
                    <span className="flex items-center gap-2">
                      <span>{getCategoryIcon(quiz.category)}</span>
                      <span>{quiz.title}</span>
                    </span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="grid gap-2">
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
        </div>
        <DialogFooter>
          <Button 
            onClick={handleCreate} 
            disabled={!quizId || isCreating}
            className="bg-blue-600 hover:bg-blue-700"
          >
            {isCreating ? 'Creating...' : 'Create Game'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}