"use client"

import type React from "react"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { ConnectButton } from "@rainbow-me/rainbowkit"
import { useAccount } from "wagmi"

import { useAuth } from "@/components/auth-provider"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export function RequireAuth({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading, signIn } = useAuth()
  const { isConnected } = useAccount()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && !isAuthenticated && !isConnected) {
      router.push("/")
    }
  }, [isLoading, isAuthenticated, isConnected, router])

  if (isLoading) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900" />
      </div>
    )
  }

  if (!isAuthenticated && isConnected) {
    return (
      <div className="h-full flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Sign In Required</CardTitle>
            <CardDescription>Please sign a message to verify your wallet ownership</CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center">
            <Button onClick={() => signIn()}>Sign In with Ethereum</Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (!isConnected) {
    return (
      <div className="h-full flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Connect Wallet</CardTitle>
            <CardDescription>Please connect your wallet to continue</CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center">
            <ConnectButton />
          </CardContent>
        </Card>
      </div>
    )
  }

  return <>{children}</>
}

