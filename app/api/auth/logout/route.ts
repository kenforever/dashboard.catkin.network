import { NextResponse } from "next/server"

export async function POST() {
  // In a real app, you would clear the session here
  return NextResponse.json({ success: true })
}

