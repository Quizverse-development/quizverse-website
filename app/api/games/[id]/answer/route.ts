import { NextRequest, NextResponse } from "next/server"
import { submitAnswer } from "@/lib/game-store"

export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { playerId, questionId, answer, timeMs } = await request.json()
    
    if (!playerId || !questionId || !answer || timeMs === undefined) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const success = submitAnswer(params.id, playerId, questionId, answer, timeMs)
    
    if (!success) {
      return NextResponse.json({ error: "Failed to submit answer" }, { status: 400 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: "Failed to submit answer" }, { status: 500 })
  }
}