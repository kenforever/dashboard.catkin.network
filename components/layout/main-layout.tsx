"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ConnectButton } from "@rainbow-me/rainbowkit"
import { BarChart3, CreditCard, Home, Package, Settings, Menu, X } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { AuthProvider } from "@/components/auth-provider"
import { RequireAuth } from "@/components/require-auth"

interface MainLayoutProps {
  children: React.ReactNode
}

export function MainLayout({ children }: MainLayoutProps) {
  const pathname = usePathname()
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const routes = [
    {
      label: "Dashboard",
      icon: Home,
      href: "/dashboard",
      active: pathname === "/dashboard",
    },
    {
      label: "Items",
      icon: Package,
      href: "/dashboard/items",
      active: pathname === "/dashboard/items",
    },
    {
      label: "Transactions",
      icon: CreditCard,
      href: "/dashboard/transactions",
      active: pathname === "/dashboard/transactions",
    },
    {
      label: "Analytics",
      icon: BarChart3,
      href: "/dashboard/analytics",
      active: pathname === "/dashboard/analytics",
    },
    {
      label: "Settings",
      icon: Settings,
      href: "/dashboard/settings",
      active: pathname === "/dashboard/settings",
    },
  ]

  return (
    <AuthProvider>
      <RequireAuth>
        <div className="h-full relative">
          <div className="hidden h-full md:flex md:w-72 md:flex-col md:fixed md:inset-y-0 z-[80] bg-gray-900">
            <div className="flex flex-col h-full">
              <div className="h-20 flex items-center justify-center px-6">
                <Link href="/dashboard" className="flex items-center gap-2">
                  <CreditCard className="h-8 w-8 text-white" />
                  <span className="font-bold text-2xl text-white">PayGate</span>
                </Link>
              </div>
              <div className="flex-1 flex flex-col px-6 py-4 space-y-1">
                {routes.map((route) => (
                  <Link
                    key={route.href}
                    href={route.href}
                    className={cn(
                      "flex items-center gap-x-2 text-sm font-medium px-3 py-2 rounded-md transition-colors",
                      route.active ? "bg-gray-800 text-white" : "text-gray-400 hover:text-white hover:bg-gray-800",
                    )}
                  >
                    <route.icon className="h-5 w-5" />
                    {route.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
          <main className="md:pl-72 h-full">
            <div className="flex items-center p-4 border-b h-20">
              <Sheet open={isSidebarOpen} onOpenChange={setIsSidebarOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="md:hidden">
                    <Menu className="h-6 w-6" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="p-0 bg-gray-900 w-72">
                  <div className="flex flex-col h-full">
                    <div className="h-20 flex items-center justify-between px-6">
                      <Link href="/dashboard" className="flex items-center gap-2">
                        <CreditCard className="h-8 w-8 text-white" />
                        <span className="font-bold text-2xl text-white">PayGate</span>
                      </Link>
                      <Button variant="ghost" size="icon" onClick={() => setIsSidebarOpen(false)}>
                        <X className="h-6 w-6 text-white" />
                      </Button>
                    </div>
                    <div className="flex-1 flex flex-col px-6 py-4 space-y-1">
                      {routes.map((route) => (
                        <Link
                          key={route.href}
                          href={route.href}
                          onClick={() => setIsSidebarOpen(false)}
                          className={cn(
                            "flex items-center gap-x-2 text-sm font-medium px-3 py-2 rounded-md transition-colors",
                            route.active
                              ? "bg-gray-800 text-white"
                              : "text-gray-400 hover:text-white hover:bg-gray-800",
                          )}
                        >
                          <route.icon className="h-5 w-5" />
                          {route.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
              <div className="ml-auto flex items-center gap-x-4">
                <ConnectButton />
              </div>
            </div>
            <div className="p-6 h-[calc(100%-5rem)]">{children}</div>
          </main>
        </div>
      </RequireAuth>
    </AuthProvider>
  )
}

