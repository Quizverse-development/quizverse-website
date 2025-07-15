import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { db } from "@/lib/db"

export async function POST(request: NextRequest) {
  try {
    const session = await auth()
    
    if (!session?.user) {
      return NextResponse.json({ error: "Authentication required" }, { status: 401 })
    }

    const { quizId } = await request.json()
    const quiz = db.getQuizById(quizId)
    
    if (!quiz) {
      return NextResponse.json({ error: "Quiz not found" }, { status: 404 })
    }

    const gameCode = Math.random().toString(36).substring(2, 8).toUpperCase()
    
    const gameSession = db.createGameSession({
      quizId,
      hostId: session.user.id,
      gameCode,
      isActive: true,
      players: [],
      currentQuestion: 0,
    })

    return NextResponse.json(gameSession)
  } catch (error) {
    return NextResponse.json({ error: "Failed to create game" }, { status: 500 })
  }
}