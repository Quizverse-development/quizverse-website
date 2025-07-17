import { NextRequest, NextResponse } from "next/server"
import { getCurrentQuestion, getGame } from "@/lib/game-store"
import { getQuizById } from "@/lib/game-utils"

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const gameId = params.id
    const game = getGame(gameId)
    
    if (!game) {
      return NextResponse.json({ error: "Game not found" }, { status: 404 })
    }
    
    if (game.status !== 'playing') {
      return NextResponse.json({ error: "Game not in playing state" }, { status: 400 })
    }
    
    // Get current question using the game-store utility
    const question = getCurrentQuestion(gameId)
    
    if (!question) {
      // Fallback to getting the question directly from the quiz
      const quiz = getQuizById(game.quizId)
      if (!quiz) {
        return NextResponse.json({ error: "Quiz not found" }, { status: 404 })
      }
      
      const fallbackQuestion = quiz.questions.find(q => q.id === game.currentQuestion)
      if (!fallbackQuestion) {
        return NextResponse.json({ error: "Question not found" }, { status: 404 })
      }
      
      return NextResponse.json({ question: fallbackQuestion })
    }
    
    return NextResponse.json({ question })
  } catch (error) {
    console.error('Error getting question:', error)
    return NextResponse.json({ error: "Failed to get question" }, { status: 500 })
  }
}