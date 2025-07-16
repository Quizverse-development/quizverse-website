import { NextRequest, NextResponse } from "next/server"
import { getGame } from "@/lib/game-store"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const game = getGame(params.id)
    
    if (!game) {
      return NextResponse.json({ error: "Game not found" }, { status: 404 })
    }

    return NextResponse.json({ game })
  } catch (error) {
    return NextResponse.json({ error: "Failed to get game" }, { status: 500 })
  }
}