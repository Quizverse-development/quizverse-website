import { NextResponse } from "next/server"

export async function GET() {
  return NextResponse.json({ message: "Custom auth system - no NextAuth needed" })
}

export async function POST() {
  return NextResponse.json({ message: "Custom auth system - no NextAuth needed" })
}