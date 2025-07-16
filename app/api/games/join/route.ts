import { NextRequest, NextResponse } from "next/server"
import { joinGame } from "@/lib/game-store"

export async function POST(request: NextRequest) {
  try {
    const { code, username, animal } = await request.json()
    
    if (!code || !username || !animal) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const result = joinGame(code, username, animal)
    
    if (!result.success) {
      return NextResponse.json({ error: result.error }, { status: 400 })
    }

    return NextResponse.json({ game: result.game, player: result.player })
  } catch (error) {
    return NextResponse.json({ error: "Failed to join game" }, { status: 500 })
  }
}