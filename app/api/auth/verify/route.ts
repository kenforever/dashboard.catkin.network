import { type NextRequest, NextResponse } from "next/server"
import { SiweMessage } from "siwe"

export async function GET() {
  // In a real app, you would check the session here
  // For simplicity, we're just returning a mock response
  return NextResponse.json({ authenticated: false })
}

export async function POST(request: NextRequest) {
  try {
    const { message, signature } = await request.json()

    const siweMessage = new SiweMessage(message)
    const fields = await siweMessage.validate(signature)

    if (fields.nonce !== "STORED_NONCE") {
      // In a real app, you would verify the nonce against the stored one
      // For simplicity, we're just returning success
    }

    // In a real app, you would store the session here

    return NextResponse.json({ authenticated: true })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ authenticated: false }, { status: 400 })
  }
}

