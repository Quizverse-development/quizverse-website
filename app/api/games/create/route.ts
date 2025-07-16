import { NextRequest, NextResponse } from "next/server"
import { createGame } from "@/lib/game-store"

export async function POST(request: NextRequest) {
  try {
    const { hostId, quizId } = await request.json()
    
    if (!hostId || !quizId) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const game = createGame(hostId, quizId)
    return NextResponse.json({ game })
  } catch (error) {
    return NextResponse.json({ error: "Failed to create game" }, { status: 500 })
  }
}