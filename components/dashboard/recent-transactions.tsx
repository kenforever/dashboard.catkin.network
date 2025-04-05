"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

const transactions = [
  {
    id: "tx1",
    customer: "Alex Johnson",
    amount: "$129.00",
    status: "completed",
    date: "2023-04-01T09:35:31.820Z",
    token: "ETH",
  },
  {
    id: "tx2",
    customer: "Michael Brown",
    amount: "$39.00",
    status: "processing",
    date: "2023-04-01T08:10:25.366Z",
    token: "USDC",
  },
  {
    id: "tx3",
    customer: "Sarah Davis",
    amount: "$59.00",
    status: "completed",
    date: "2023-03-31T23:45:01.340Z",
    token: "MATIC",
  },
  {
    id: "tx4",
    customer: "Emily Wilson",
    amount: "$89.00",
    status: "failed",
    date: "2023-03-31T21:22:10.532Z",
    token: "ETH",
  },
  {
    id: "tx5",
    customer: "James Miller",
    amount: "$129.00",
    status: "completed",
    date: "2023-03-31T18:55:43.120Z",
    token: "USDT",
  },
]

export function RecentTransactions() {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        {transactions.map((transaction) => (
          <div key={transaction.id} className="flex items-center justify-between p-2 rounded-lg hover:bg-muted">
            <div className="flex items-center gap-3">
              <Avatar className="h-9 w-9">
                <AvatarImage src={`/placeholder.svg?height=36&width=36`} alt={transaction.customer} />
                <AvatarFallback>
                  {transaction.customer
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm font-medium leading-none">{transaction.customer}</p>
                <p className="text-sm text-muted-foreground">{new Date(transaction.date).toLocaleDateString()}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="text-right">
                <p className="text-sm font-medium leading-none">{transaction.amount}</p>
                <p className="text-sm text-muted-foreground">{transaction.token}</p>
              </div>
              <Badge
                variant={
                  transaction.status === "completed"
                    ? "success"
                    : transaction.status === "processing"
                      ? "outline"
                      : "destructive"
                }
              >
                {transaction.status}
              </Badge>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-center">
        <Button variant="ghost" size="sm" asChild>
          <Link href="/dashboard/transactions">
            View All
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>
    </div>
  )
}

