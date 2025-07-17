import { NextRequest, NextResponse } from "next/server"
import { validateAdminLogin } from "@/lib/auth"

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()
    
    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      )
    }
    
    const user = validateAdminLogin(email, password)
    
    if (!user) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      )
    }
    
    // In a real app, you would set a session cookie here
    
    return NextResponse.json({ success: true, user })
  } catch (error) {
    console.error("Admin login error:", error)
    return NextResponse.json(
      { error: "An error occurred during login" },
      { status: 500 }
    )
  }
}