import { NextRequest, NextResponse } from "next/server"
import { createGame } from "@/lib/game-store"
import { getServerSession } from "@/lib/auth"

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession()
    if (!session) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 })
    }
    
    const { quizId, timeLimit } = await request.json()
    
    if (!quizId) {
      return NextResponse.json({ error: "Quiz ID is required" }, { status: 400 })
    }
    
    // Create game with time limit
    const game = createGame(session.user.id, quizId, timeLimit)
    
    return NextResponse.json({ game })
  } catch (error) {
    console.error('Error creating game:', error)
    return NextResponse.json({ error: "Failed to create game" }, { status: 500 })
  }
}