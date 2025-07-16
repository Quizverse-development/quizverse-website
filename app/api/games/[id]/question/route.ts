import { NextRequest, NextResponse } from "next/server"
import { getCurrentQuestion } from "@/lib/game-store"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const question = getCurrentQuestion(params.id)
    
    if (!question) {
      return NextResponse.json({ error: "Question not found" }, { status: 404 })
    }

    return NextResponse.json({ question })
  } catch (error) {
    return NextResponse.json({ error: "Failed to get question" }, { status: 500 })
  }
}