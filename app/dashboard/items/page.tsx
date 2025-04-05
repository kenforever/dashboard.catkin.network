"use client"

import type React from "react"

import { useState } from "react"
import { MainLayout } from "@/components/layout/main-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Plus, Pencil, Trash2, ImageIcon } from "lucide-react"
import Image from "next/image"

// Mock data for items
const initialItems = [
  {
    id: "1",
    title: "Premium Subscription",
    description: "Monthly access to all premium features",
    price: "29.99",
    image: "/placeholder.svg?height=100&width=100",
    network: "Ethereum",
    token: "ETH",
  },
  {
    id: "2",
    title: "Basic Package",
    description: "Entry level package with core features",
    price: "9.99",
    image: "/placeholder.svg?height=100&width=100",
    network: "Polygon",
    token: "MATIC",
  },
  {
    id: "3",
    title: "Enterprise Solution",
    description: "Full-featured solution for businesses",
    price: "99.99",
    image: "/placeholder.svg?height=100&width=100",
    network: "Optimism",
    token: "ETH",
  },
]

interface Item {
  id: string
  title: string
  description: string
  price: string
  image: string
  network: string
  token: string
}

export default function ItemsPage() {
  const [items, setItems] = useState<Item[]>(initialItems)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [currentItem, setCurrentItem] = useState<Item | null>(null)
  const [searchQuery, setSearchQuery] = useState("")

  const filteredItems = items.filter(
    (item) =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const handleAddOrUpdateItem = (item: Item) => {
    if (currentItem) {
      // Update existing item
      setItems(items.map((i) => (i.id === item.id ? item : i)))
    } else {
      // Add new item
      setItems([...items, { ...item, id: Date.now().toString() }])
    }
    setIsDialogOpen(false)
    setCurrentItem(null)
  }

  const handleDeleteItem = (id: string) => {
    setItems(items.filter((item) => item.id !== id))
  }

  const handleEditItem = (item: Item) => {
    setCurrentItem(item)
    setIsDialogOpen(true)
  }

  return (
    <MainLayout>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Items</h1>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => setCurrentItem(null)}>
              <Plus className="mr-2 h-4 w-4" /> Add Item
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[550px]">
            <ItemForm
              initialItem={currentItem}
              onSubmit={handleAddOrUpdateItem}
              onCancel={() => setIsDialogOpen(false)}
            />
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Manage Items</CardTitle>
          <CardDescription>Create and manage items that customers can purchase</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <Input
              placeholder="Search items..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="max-w-sm"
            />
          </div>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Image</TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Network</TableHead>
                  <TableHead>Token</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredItems.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="h-24 text-center">
                      No items found.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredItems.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>
                        <div className="relative h-10 w-10">
                          <Image
                            src={item.image || "/placeholder.svg"}
                            alt={item.title}
                            fill
                            className="rounded-md object-cover"
                          />
                        </div>
                      </TableCell>
                      <TableCell className="font-medium">{item.title}</TableCell>
                      <TableCell className="max-w-[200px] truncate">{item.description}</TableCell>
                      <TableCell>${item.price}</TableCell>
                      <TableCell>{item.network}</TableCell>
                      <TableCell>{item.token}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="ghost" size="icon" onClick={() => handleEditItem(item)}>
                            <Pencil className="h-4 w-4" />
                            <span className="sr-only">Edit</span>
                          </Button>
                          <Button variant="ghost" size="icon" onClick={() => handleDeleteItem(item.id)}>
                            <Trash2 className="h-4 w-4" />
                            <span className="sr-only">Delete</span>
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </MainLayout>
  )
}

interface ItemFormProps {
  initialItem: Item | null
  onSubmit: (item: Item) => void
  onCancel: () => void
}

function ItemForm({ initialItem, onSubmit, onCancel }: ItemFormProps) {
  const [item, setItem] = useState<Item>(
    initialItem || {
      id: "",
      title: "",
      description: "",
      price: "",
      image: "/placeholder.svg?height=100&width=100",
      network: "Ethereum",
      token: "ETH",
    },
  )

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setItem({ ...item, [name]: value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(item)
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      // In a real app, you would upload this to a storage service
      // For now, we'll just create a local URL
      const imageUrl = URL.createObjectURL(file)
      setItem({ ...item, image: imageUrl })
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <DialogHeader>
        <DialogTitle>{initialItem ? "Edit Item" : "Add New Item"}</DialogTitle>
        <DialogDescription>
          {initialItem ? "Update the details of your item." : "Create a new item for your customers to purchase."}
        </DialogDescription>
      </DialogHeader>
      <div className="grid gap-4 py-4">
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="title" className="text-right">
            Title
          </Label>
          <Input id="title" name="title" value={item.title} onChange={handleChange} className="col-span-3" required />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="description" className="text-right">
            Description
          </Label>
          <Textarea
            id="description"
            name="description"
            value={item.description}
            onChange={handleChange}
            className="col-span-3"
            required
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="price" className="text-right">
            Price
          </Label>
          <Input
            id="price"
            name="price"
            type="number"
            step="0.01"
            value={item.price}
            onChange={handleChange}
            className="col-span-3"
            required
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="network" className="text-right">
            Network
          </Label>
          <select
            id="network"
            name="network"
            value={item.network}
            onChange={handleChange}
            className="col-span-3 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            required
          >
            <option value="Ethereum">Ethereum</option>
            <option value="Polygon">Polygon</option>
            <option value="Optimism">Optimism</option>
            <option value="Arbitrum">Arbitrum</option>
            <option value="Base">Base</option>
          </select>
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="token" className="text-right">
            Token
          </Label>
          <select
            id="token"
            name="token"
            value={item.token}
            onChange={handleChange}
            className="col-span-3 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            required
          >
            <option value="ETH">ETH</option>
            <option value="USDC">USDC</option>
            <option value="USDT">USDT</option>
            <option value="MATIC">MATIC</option>
            <option value="DAI">DAI</option>
          </select>
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="image" className="text-right">
            Image
          </Label>
          <div className="col-span-3 flex items-center gap-4">
            <div className="relative h-16 w-16 overflow-hidden rounded-md">
              <Image src={item.image || "/placeholder.svg"} alt="Item preview" fill className="object-cover" />
            </div>
            <Label
              htmlFor="image-upload"
              className="flex h-10 cursor-pointer items-center justify-center rounded-md border border-dashed px-3 py-2 text-sm"
            >
              <ImageIcon className="mr-2 h-4 w-4" />
              Upload Image
              <Input id="image-upload" type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
            </Label>
          </div>
        </div>
      </div>
      <DialogFooter>
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">{initialItem ? "Update Item" : "Add Item"}</Button>
      </DialogFooter>
    </form>
  )
}

