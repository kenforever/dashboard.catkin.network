"use client"

import { useState } from "react"
import { MainLayout } from "@/components/layout/main-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { CalendarIcon, Download, ExternalLink } from "lucide-react"
import { format } from "date-fns"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"

// Mock data for transactions
const transactions = Array.from({ length: 50 }, (_, i) => ({
  id: `tx-${i + 1}`,
  customer: `Customer ${i + 1}`,
  email: `customer${i + 1}@example.com`,
  amount: `$${(Math.random() * 100 + 5).toFixed(2)}`,
  status: i % 5 === 0 ? "failed" : i % 3 === 0 ? "processing" : "completed",
  date: new Date(Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000).toISOString(),
  token: i % 3 === 0 ? "ETH" : i % 2 === 0 ? "USDC" : "MATIC",
  network: i % 4 === 0 ? "Ethereum" : i % 3 === 0 ? "Polygon" : i % 2 === 0 ? "Optimism" : "Arbitrum",
  txHash: `0x${Array.from({ length: 64 }, () => Math.floor(Math.random() * 16).toString(16)).join("")}`,
}))

export default function TransactionsPage() {
  const [currentPage, setCurrentPage] = useState(1)
  const [filter, setFilter] = useState<string>("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [date, setDate] = useState<Date | undefined>(undefined)

  const itemsPerPage = 10

  // Filter transactions
  const filteredTransactions = transactions.filter((tx) => {
    // Filter by status
    if (filter !== "all" && tx.status !== filter) {
      return false
    }

    // Filter by search query
    if (
      searchQuery &&
      !tx.customer.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !tx.email.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !tx.txHash.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false
    }

    // Filter by date
    if (date && format(new Date(tx.date), "yyyy-MM-dd") !== format(date, "yyyy-MM-dd")) {
      return false
    }

    return true
  })

  // Paginate transactions
  const paginatedTransactions = filteredTransactions.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage)

  return (
    <MainLayout>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Transactions</h1>
        <Button variant="outline">
          <Download className="mr-2 h-4 w-4" /> Export
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Transaction History</CardTitle>
          <CardDescription>View and manage all your payment transactions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-4">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <Input
                placeholder="Search transactions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="max-w-xs"
              />
              <Select value={filter} onValueChange={setFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Transactions</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="processing">Processing</SelectItem>
                  <SelectItem value="failed">Failed</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn("w-[240px] justify-start text-left font-normal", !date && "text-muted-foreground")}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "PPP") : <span>Filter by date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="end">
                <Calendar mode="single" selected={date} onSelect={(date) => setDate(date)} initialFocus />
                {date && (
                  <div className="p-2 border-t border-border">
                    <Button variant="ghost" size="sm" onClick={() => setDate(undefined)} className="w-full">
                      Clear
                    </Button>
                  </div>
                )}
              </PopoverContent>
            </Popover>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Customer</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Network</TableHead>
                  <TableHead>Token</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedTransactions.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="h-24 text-center">
                      No transactions found.
                    </TableCell>
                  </TableRow>
                ) : (
                  paginatedTransactions.map((tx) => (
                    <TableRow key={tx.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{tx.customer}</div>
                          <div className="text-sm text-muted-foreground">{tx.email}</div>
                        </div>
                      </TableCell>
                      <TableCell>{tx.amount}</TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            tx.status === "completed"
                              ? "success"
                              : tx.status === "processing"
                                ? "outline"
                                : "destructive"
                          }
                        >
                          {tx.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{format(new Date(tx.date), "MMM dd, yyyy")}</TableCell>
                      <TableCell>{tx.network}</TableCell>
                      <TableCell>{tx.token}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="icon" asChild>
                          <a href={`https://etherscan.io/tx/${tx.txHash}`} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="h-4 w-4" />
                            <span className="sr-only">View on Explorer</span>
                          </a>
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>

          <div className="mt-4">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                    className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
                  />
                </PaginationItem>

                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  let pageNum: number

                  if (totalPages <= 5) {
                    pageNum = i + 1
                  } else if (currentPage <= 3) {
                    pageNum = i + 1
                  } else if (currentPage >= totalPages - 2) {
                    pageNum = totalPages - 4 + i
                  } else {
                    pageNum = currentPage - 2 + i
                  }

                  return (
                    <PaginationItem key={i}>
                      <PaginationLink onClick={() => setCurrentPage(pageNum)} isActive={currentPage === pageNum}>
                        {pageNum}
                      </PaginationLink>
                    </PaginationItem>
                  )
                })}

                {totalPages > 5 && currentPage < totalPages - 2 && (
                  <>
                    <PaginationItem>
                      <PaginationEllipsis />
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink onClick={() => setCurrentPage(totalPages)}>{totalPages}</PaginationLink>
                    </PaginationItem>
                  </>
                )}

                <PaginationItem>
                  <PaginationNext
                    onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                    className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </CardContent>
      </Card>
    </MainLayout>
  )
}

