import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { db } from "@/lib/db"

export async function GET() {
  try {
    const quizzes = db.getQuizzes(true) // Only public quizzes
    return NextResponse.json(quizzes)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch quizzes" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.isAdmin) {
      return NextResponse.json({ error: "Admin access required" }, { status: 403 })
    }

    const body = await request.json()
    const quiz = db.createQuiz({
      ...body,
      createdBy: session.user.email!,
    })

    return NextResponse.json(quiz)
  } catch (error) {
    return NextResponse.json({ error: "Failed to create quiz" }, { status: 500 })
  }
}