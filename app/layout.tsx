import type React from "react"
import "@/app/globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"

import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import { Web3Provider } from "@/components/web3-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "EVM Payment Gateway",
  description: "On-chain payment gateway for merchants",
  generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Web3Provider>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            {children}
            <Toaster />
          </ThemeProvider>
        </Web3Provider>
      </body>
    </html>
  )
}