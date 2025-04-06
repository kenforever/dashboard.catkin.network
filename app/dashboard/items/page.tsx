"use client";

import { useEffect, useState } from "react";
import type React from "react";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Plus, Trash2, Pencil, ImageIcon } from "lucide-react";
import { MainLayout } from "@/components/layout/main-layout";

interface Item {
  id: string;
  title: string;
  description: string;
  price: string;
  image: string;
}

export default function ItemsPage() {
  const [items, setItems] = useState<Item[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState<Item | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  // ✅ 取得我的商品
  useEffect(() => {
    const fetchProducts = async () => {
      const token = localStorage.getItem("auth_token") || "";
      console.log("token", token);
      const res = await fetch(
        "https://api.catkin.network/product/my-products",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.ok) {
        const data = await res.json();
        const formatted = data.map((item: any) => ({
          id: item.id.toString(),
          title: item.title,
          description: item.description ?? "",
          price: item.price.toString(),
          image: item.image_uri ?? "/placeholder.svg",
        }));
        setItems(formatted);
      }
    };
    fetchProducts();
  }, []);

  // ✅ 新增/修改商品
  const handleAddOrUpdateItem = async (item: Item) => {
    const token = localStorage.getItem("auth_token") || "";
    const isEdit = Boolean(item.id);

    const endpoint = isEdit
      ? `https://api.catkin.network/product/product/${item.id}`
      : "https://api.catkin.network/product/product";

    const method = isEdit ? "PUT" : "POST";

    try {
      const response = await fetch(endpoint, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title: item.title,
          description: item.description,
          price: parseFloat(item.price),
          image_uri: item.image,
        }),
      });

      if (!response.ok) throw new Error("Failed to save product");

      const data = await response.json();
      if (isEdit) {
        setItems(items.map((i) => (i.id === item.id ? { ...item } : i)));
      } else {
        setItems([...items, { ...item, id: data.id.toString() }]);
      }
      setIsDialogOpen(false);
      setCurrentItem(null);
    } catch (err) {
      console.error("Error saving product:", err);
      alert("儲存商品失敗");
    }
  };

  // ❌ 刪除商品
  const handleDeleteItem = async (id: string) => {
    const token = localStorage.getItem("auth_token") || "";
    const confirmed = confirm("確定要刪除這個商品嗎？");
    if (!confirmed) return;

    try {
      const res = await fetch(
        `https://api.catkin.network/product/product/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!res.ok) throw new Error("Delete failed");
      setItems(items.filter((item) => item.id !== id));
    } catch (err) {
      console.error("Delete error:", err);
      alert("刪除商品失敗");
    }
  };

  const filteredItems = items.filter(
    (item) =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
          <CardDescription>
            Manage items your customers can purchase
          </CardDescription>
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
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredItems.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center h-24">
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
                      <TableCell>{item.title}</TableCell>
                      <TableCell>{item.description}</TableCell>
                      <TableCell>${item.price}</TableCell>
                      <TableCell className="text-right flex gap-2 justify-end">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => {
                            setCurrentItem(item);
                            setIsDialogOpen(true);
                          }}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDeleteItem(item.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
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
  );
}

interface ItemFormProps {
  initialItem: Item | null;
  onSubmit: (item: Item) => void;
  onCancel: () => void;
}

function ItemForm({ initialItem, onSubmit, onCancel }: ItemFormProps) {
  const [item, setItem] = useState<Item>(
    initialItem || {
      id: "",
      title: "",
      description: "",
      price: "",
      image: "/placeholder.svg",
    }
  );

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setItem({ ...item, [name]: value });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setItem({ ...item, image: url });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(item);
  };

  return (
    <form onSubmit={handleSubmit}>
      <DialogHeader>
        <DialogTitle>{initialItem ? "Edit Item" : "Add New Item"}</DialogTitle>
        <DialogDescription>
          {initialItem
            ? "Update your product information"
            : "Create a new product for your customers."}
        </DialogDescription>
      </DialogHeader>
      <div className="grid gap-4 py-4">
        <FormRow
          label="Title"
          name="title"
          value={item.title}
          onChange={handleChange}
        />
        <FormRow
          label="Description"
          name="description"
          value={item.description}
          onChange={handleChange}
          textarea
        />
        <FormRow
          label="Price"
          name="price"
          value={item.price}
          onChange={handleChange}
          type="number"
        />
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="image" className="text-right">
            Image
          </Label>
          <div className="col-span-3 flex items-center gap-4">
            <div className="relative h-16 w-16 overflow-hidden rounded-md">
              <Image
                src={item.image || "/placeholder.svg"}
                alt="Preview"
                fill
                className="object-cover"
              />
            </div>
            <Label
              htmlFor="image-upload"
              className="flex h-10 cursor-pointer items-center justify-center rounded-md border border-dashed px-3 py-2 text-sm"
            >
              <ImageIcon className="mr-2 h-4 w-4" />
              Upload Image
              <Input
                id="image-upload"
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
            </Label>
          </div>
        </div>
      </div>
      <DialogFooter>
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">{initialItem ? "Update" : "Add Item"}</Button>
      </DialogFooter>
    </form>
  );
}

function FormRow({
  label,
  name,
  value,
  onChange,
  textarea = false,
  type = "text",
}: any) {
  return (
    <div className="grid grid-cols-4 items-center gap-4">
      <Label htmlFor={name} className="text-right">
        {label}
      </Label>
      {textarea ? (
        <Textarea
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          className="col-span-3"
        />
      ) : (
        <Input
          id={name}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          className="col-span-3"
        />
      )}
    </div>
  );
}
