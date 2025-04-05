import { NextResponse } from "next/server"
import { generateNonce } from "siwe"

export async function GET() {
  const nonce = generateNonce()

  // In a real app, you would store this nonce in a session
  // For simplicity, we're just returning it here
  return NextResponse.json({ nonce })
}

