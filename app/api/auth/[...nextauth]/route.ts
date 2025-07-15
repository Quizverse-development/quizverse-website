import { NextResponse } from "next/server"

export async function GET() {
  return NextResponse.json({ message: "Demo auth - no setup needed" })
}

export async function POST() {
  return NextResponse.json({ message: "Demo auth - no setup needed" })
}