import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { db } from "@/lib/db"

export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.isAdmin) {
      return NextResponse.json({ error: "Admin access required" }, { status: 403 })
    }

    const quizzes = db.getQuizzes(undefined, session.user.email!)
    return NextResponse.json(quizzes)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch quizzes" }, { status: 500 })
  }
}