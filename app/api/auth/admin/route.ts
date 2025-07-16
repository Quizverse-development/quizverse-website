import { NextRequest, NextResponse } from "next/server"
import { adminLogin } from "@/lib/user-store"

export async function POST(request: NextRequest) {
  try {
    const { code } = await request.json()
    
    if (!code) {
      return NextResponse.json({ success: false, error: "Missing admin code" }, { status: 400 })
    }

    const result = adminLogin(code)
    
    if (result.success) {
      return NextResponse.json({ success: true, user: result.user })
    } else {
      return NextResponse.json({ success: false, error: "Invalid admin code" }, { status: 401 })
    }
  } catch (error) {
    return NextResponse.json({ success: false, error: "Admin login failed" }, { status: 500 })
  }
}