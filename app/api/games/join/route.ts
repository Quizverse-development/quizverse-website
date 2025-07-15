import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "@/lib/auth"
import { db } from "@/lib/db"

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession()
    
    if (!session?.user) {
      return NextResponse.json({ error: "Authentication required" }, { status: 401 })
    }

    const { gameCode } = await request.json()
    const gameSession = db.getGameSession(gameCode)
    
    if (!gameSession) {
      return NextResponse.json({ error: "Game not found" }, { status: 404 })
    }

    const player = {
      id: session.user.id,
      name: session.user.name || "Anonymous",
      email: session.user.email!,
      score: 0,
      answers: [],
      joinedAt: new Date(),
      isReady: false
    }

    const existingPlayerIndex = gameSession.players.findIndex(p => p.id === player.id)
    if (existingPlayerIndex >= 0) {
      gameSession.players[existingPlayerIndex] = player
    } else {
      gameSession.players.push(player)
    }

    db.updateGameSession(gameSession.id, { players: gameSession.players })

    return NextResponse.json({ success: true, gameSession })
  } catch (error) {
    return NextResponse.json({ error: "Failed to join game" }, { status: 500 })
  }
}