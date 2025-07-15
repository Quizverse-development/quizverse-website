"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Plus, Trash2, X } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface Question {
  question: string
  options: string[]
  correctAnswer: number
  timeLimit: number
}

interface CreateQuizFormProps {
  onSuccess?: () => void
}

export function CreateQuizForm({ onSuccess }: CreateQuizFormProps) {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [category, setCategory] = useState("")
  const [difficulty, setDifficulty] = useState<"Easy" | "Medium" | "Hard">("Easy")
  const [isPublic, setIsPublic] = useState(true)
  const [tags, setTags] = useState<string[]>([])
  const [newTag, setNewTag] = useState("")
  const [questions, setQuestions] = useState<Question[]>([
    { question: "", options: ["", "", "", ""], correctAnswer: 0, timeLimit: 30 }
  ])
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const addTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      setTags([...tags, newTag.trim()])
      setNewTag("")
    }
  }

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove))
  }

  const addQuestion = () => {
    setQuestions([...questions, { question: "", options: ["", "", "", ""], correctAnswer: 0, timeLimit: 30 }])
  }

  const removeQuestion = (index: number) => {
    if (questions.length > 1) {
      setQuestions(questions.filter((_, i) => i !== index))
    }
  }

  const updateQuestion = (index: number, field: keyof Question, value: any) => {
    const updated = [...questions]
    updated[index] = { ...updated[index], [field]: value }
    setQuestions(updated)
  }

  const updateOption = (questionIndex: number, optionIndex: number, value: string) => {
    const updated = [...questions]
    updated[questionIndex].options[optionIndex] = value
    setQuestions(updated)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const response = await fetch("/api/quizzes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          description,
          category,
          difficulty,
          isPublic,
          tags,
          estimatedTime: Math.ceil(questions.length * 1.5),
          questions: questions.map((q, i) => ({ ...q, id: `q${i}`, points: 10 }))
        })
      })

      if (response.ok) {
        toast({ title: "Quiz created successfully!" })
        setTitle("")
        setDescription("")
        setCategory("")
        setTags([])
        setQuestions([{ question: "", options: ["", "", "", ""], correctAnswer: 0, timeLimit: 30 }])
        onSuccess?.()
      } else {
        throw new Error("Failed to create quiz")
      }
    } catch (error) {
      toast({ title: "Error creating quiz", variant: "destructive" })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="title">Quiz Title</Label>
          <Input
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <Label htmlFor="category">Category</Label>
          <Input
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            placeholder="e.g., Science, History, Sports"
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <Label htmlFor="difficulty">Difficulty</Label>
          <Select value={difficulty} onValueChange={(value: "Easy" | "Medium" | "Hard") => setDifficulty(value)}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Easy">Easy</SelectItem>
              <SelectItem value="Medium">Medium</SelectItem>
              <SelectItem value="Hard">Hard</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center space-x-2 pt-6">
          <Switch
            id="public"
            checked={isPublic}
            onCheckedChange={setIsPublic}
          />
          <Label htmlFor="public">Make Public</Label>
        </div>
      </div>

      <div>
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={3}
        />
      </div>

      <div>
        <Label>Tags</Label>
        <div className="flex gap-2 mb-2">
          <Input
            value={newTag}
            onChange={(e) => setNewTag(e.target.value)}
            placeholder="Add a tag"
            onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
          />
          <Button type="button" onClick={addTag} variant="outline" size="sm">
            Add
          </Button>
        </div>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag, index) => (
            <Badge key={index} variant="secondary" className="flex items-center gap-1">
              {tag}
              <X className="h-3 w-3 cursor-pointer" onClick={() => removeTag(tag)} />
            </Badge>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold">Questions</h3>
          <Button type="button" onClick={addQuestion} variant="outline" size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Add Question
          </Button>
        </div>

        {questions.map((question, qIndex) => (
          <Card key={qIndex}>
            <CardHeader className="pb-3">
              <div className="flex justify-between items-center">
                <CardTitle className="text-base">Question {qIndex + 1}</CardTitle>
                {questions.length > 1 && (
                  <Button
                    type="button"
                    onClick={() => removeQuestion(qIndex)}
                    variant="ghost"
                    size="sm"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Question Text</Label>
                <Input
                  value={question.question}
                  onChange={(e) => updateQuestion(qIndex, "question", e.target.value)}
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {question.options.map((option, oIndex) => (
                  <div key={oIndex} className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name={`correct-${qIndex}`}
                      checked={question.correctAnswer === oIndex}
                      onChange={() => updateQuestion(qIndex, "correctAnswer", oIndex)}
                    />
                    <Input
                      placeholder={`Option ${oIndex + 1}`}
                      value={option}
                      onChange={(e) => updateOption(qIndex, oIndex, e.target.value)}
                      required
                    />
                  </div>
                ))}
              </div>

              <div className="w-32">
                <Label>Time Limit (seconds)</Label>
                <Input
                  type="number"
                  min="10"
                  max="300"
                  value={question.timeLimit}
                  onChange={(e) => updateQuestion(qIndex, "timeLimit", parseInt(e.target.value))}
                />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Button type="submit" disabled={isLoading} className="w-full">
        {isLoading ? "Creating..." : "Create Quiz"}
      </Button>
    </form>
  )
}