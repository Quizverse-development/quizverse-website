import { NextRequest, NextResponse } from "next/server"
import { getGame } from "@/lib/game-store"

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const gameId = params.id
    const game = getGame(gameId)
    
    if (!game) {
      return NextResponse.json({ error: "Game not found" }, { status: 404 })
    }
    
    if (game.status !== 'lobby') {
      return NextResponse.json({ error: "Game already started" }, { status: 400 })
    }
    
    const { timeLimit } = await request.json()
    
    // Update game time limit
    if (typeof timeLimit === 'number' && timeLimit > 0) {
      game.timeLimit = timeLimit
    }
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error updating game settings:', error)
    return NextResponse.json({ error: "Failed to update game settings" }, { status: 500 })
  }
}