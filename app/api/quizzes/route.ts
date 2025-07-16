import { NextResponse } from "next/server"
import { PREMADE_QUIZZES } from "@/lib/game-store"

export async function GET() {
  return NextResponse.json({ quizzes: PREMADE_QUIZZES })
}