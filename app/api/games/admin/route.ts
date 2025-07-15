import { NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { db } from "@/lib/db"

export async function GET() {
  try {
    const session = await auth()
    
    if (!session?.user?.isAdmin) {
      return NextResponse.json({ error: "Admin access required" }, { status: 403 })
    }

    const games = db.getActiveGames()
    const gamesWithQuizInfo = games.map(game => {
      const quiz = db.getQuizById(game.quizId)
      return {
        ...game,
        quiz: quiz ? { title: quiz.title, category: quiz.category } : { title: "Unknown", category: "Unknown" }
      }
    })
    
    return NextResponse.json(gamesWithQuizInfo)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch games" }, { status: 500 })
  }
}