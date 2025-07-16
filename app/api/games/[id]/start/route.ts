import { NextRequest, NextResponse } from "next/server"
import { startGame } from "@/lib/game-store"

export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const success = startGame(params.id)
    
    if (!success) {
      return NextResponse.json({ error: "Failed to start game" }, { status: 400 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: "Failed to start game" }, { status: 500 })
  }
}