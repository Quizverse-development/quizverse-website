import { NextRequest, NextResponse } from "next/server"
import { getLeaderboard } from "@/lib/game-store"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const leaderboard = getLeaderboard(params.id)
    return NextResponse.json({ leaderboard })
  } catch (error) {
    return NextResponse.json({ error: "Failed to get leaderboard" }, { status: 500 })
  }
}