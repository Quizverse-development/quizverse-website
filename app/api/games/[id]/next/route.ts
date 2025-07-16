import { NextRequest, NextResponse } from "next/server"
import { nextQuestion } from "@/lib/game-store"

export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const hasNext = nextQuestion(params.id)
    return NextResponse.json({ hasNext, finished: !hasNext })
  } catch (error) {
    return NextResponse.json({ error: "Failed to advance question" }, { status: 500 })
  }
}