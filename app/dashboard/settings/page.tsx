"use client"

import { useState } from "react"
import { MainLayout } from "@/components/layout/main-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { useToast } from "@/hooks/use-toast"

export default function SettingsPage() {
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)

  const handleSave = () => {
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      toast({
        title: "Settings saved",
        description: "Your payment settings have been updated successfully.",
      })
    }, 1000)
  }

  return (
    <MainLayout>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Settings</h1>
      </div>

      <Tabs defaultValue="payment" className="space-y-4">
        <TabsList>
          <TabsTrigger value="payment">Payment Settings</TabsTrigger>
          <TabsTrigger value="account">Account Settings</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="api">API Keys</TabsTrigger>
        </TabsList>

        <TabsContent value="payment" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Payment Networks</CardTitle>
              <CardDescription>Configure which blockchain networks you want to accept payments on</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between space-x-2">
                <Label htmlFor="ethereum" className="flex flex-col space-y-1">
                  <span>Ethereum</span>
                  <span className="font-normal text-sm text-muted-foreground">Accept payments on Ethereum Mainnet</span>
                </Label>
                <Switch id="ethereum" defaultChecked />
              </div>
              <div className="flex items-center justify-between space-x-2">
                <Label htmlFor="polygon" className="flex flex-col space-y-1">
                  <span>Polygon</span>
                  <span className="font-normal text-sm text-muted-foreground">Accept payments on Polygon PoS</span>
                </Label>
                <Switch id="polygon" defaultChecked />
              </div>
              <div className="flex items-center justify-between space-x-2">
                <Label htmlFor="optimism" className="flex flex-col space-y-1">
                  <span>Optimism</span>
                  <span className="font-normal text-sm text-muted-foreground">Accept payments on Optimism</span>
                </Label>
                <Switch id="optimism" />
              </div>
              <div className="flex items-center justify-between space-x-2">
                <Label htmlFor="arbitrum" className="flex flex-col space-y-1">
                  <span>Arbitrum</span>
                  <span className="font-normal text-sm text-muted-foreground">Accept payments on Arbitrum One</span>
                </Label>
                <Switch id="arbitrum" />
              </div>
              <div className="flex items-center justify-between space-x-2">
                <Label htmlFor="base" className="flex flex-col space-y-1">
                  <span>Base</span>
                  <span className="font-normal text-sm text-muted-foreground">Accept payments on Base</span>
                </Label>
                <Switch id="base" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Payment Tokens</CardTitle>
              <CardDescription>Configure which tokens you want to accept as payment</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between space-x-2">
                <Label htmlFor="eth" className="flex flex-col space-y-1">
                  <span>ETH</span>
                  <span className="font-normal text-sm text-muted-foreground">Accept payments in Ether</span>
                </Label>
                <Switch id="eth" defaultChecked />
              </div>
              <div className="flex items-center justify-between space-x-2">
                <Label htmlFor="usdc" className="flex flex-col space-y-1">
                  <span>USDC</span>
                  <span className="font-normal text-sm text-muted-foreground">Accept payments in USD Coin</span>
                </Label>
                <Switch id="usdc" defaultChecked />
              </div>
              <div className="flex items-center justify-between space-x-2">
                <Label htmlFor="usdt" className="flex flex-col space-y-1">
                  <span>USDT</span>
                  <span className="font-normal text-sm text-muted-foreground">Accept payments in Tether USD</span>
                </Label>
                <Switch id="usdt" />
              </div>
              <div className="flex items-center justify-between space-x-2">
                <Label htmlFor="dai" className="flex flex-col space-y-1">
                  <span>DAI</span>
                  <span className="font-normal text-sm text-muted-foreground">Accept payments in DAI Stablecoin</span>
                </Label>
                <Switch id="dai" />
              </div>
              <div className="flex items-center justify-between space-x-2">
                <Label htmlFor="matic" className="flex flex-col space-y-1">
                  <span>MATIC</span>
                  <span className="font-normal text-sm text-muted-foreground">Accept payments in Polygon MATIC</span>
                </Label>
                <Switch id="matic" defaultChecked />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Receiving Wallet</CardTitle>
              <CardDescription>Configure the wallet address where you want to receive payments</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="wallet-address">Wallet Address</Label>
                <Input
                  id="wallet-address"
                  placeholder="0x..."
                  defaultValue="0x71C7656EC7ab88b098defB751B7401B5f6d8976F"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="default-network">Default Network</Label>
                <Select defaultValue="ethereum">
                  <SelectTrigger id="default-network">
                    <SelectValue placeholder="Select network" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ethereum">Ethereum</SelectItem>
                    <SelectItem value="polygon">Polygon</SelectItem>
                    <SelectItem value="optimism">Optimism</SelectItem>
                    <SelectItem value="arbitrum">Arbitrum</SelectItem>
                    <SelectItem value="base">Base</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSave} disabled={isLoading}>
                {isLoading ? "Saving..." : "Save Changes"}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="account" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Account Information</CardTitle>
              <CardDescription>Update your account details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="display-name">Display Name</Label>
                <Input id="display-name" placeholder="Your name" defaultValue="Merchant Store" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email Address</Label>
                <Input id="email" type="email" placeholder="your@email.com" defaultValue="merchant@example.com" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="business-name">Business Name</Label>
                <Input id="business-name" placeholder="Your business name" defaultValue="Acme Inc." />
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSave} disabled={isLoading}>
                {isLoading ? "Saving..." : "Save Changes"}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Notification Settings</CardTitle>
              <CardDescription>Configure how you want to receive notifications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between space-x-2">
                <Label htmlFor="email-notifications" className="flex flex-col space-y-1">
                  <span>Email Notifications</span>
                  <span className="font-normal text-sm text-muted-foreground">Receive notifications via email</span>
                </Label>
                <Switch id="email-notifications" defaultChecked />
              </div>
              <div className="flex items-center justify-between space-x-2">
                <Label htmlFor="payment-notifications" className="flex flex-col space-y-1">
                  <span>Payment Notifications</span>
                  <span className="font-normal text-sm text-muted-foreground">
                    Get notified when you receive a payment
                  </span>
                </Label>
                <Switch id="payment-notifications" defaultChecked />
              </div>
              <div className="flex items-center justify-between space-x-2">
                <Label htmlFor="marketing-notifications" className="flex flex-col space-y-1">
                  <span>Marketing Updates</span>
                  <span className="font-normal text-sm text-muted-foreground">
                    Receive updates about new features and promotions
                  </span>
                </Label>
                <Switch id="marketing-notifications" />
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSave} disabled={isLoading}>
                {isLoading ? "Saving..." : "Save Changes"}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="api" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>API Keys</CardTitle>
              <CardDescription>Manage your API keys for integrating with your applications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="api-key">API Key</Label>
                <div className="flex gap-2">
                  <Input id="api-key" type="password" value="sk_test_51NZQpsBqrJ3TG7DoIAIEKA9u5Vr2dJ8KNAL5" readOnly />
                  <Button variant="outline">Show</Button>
                  <Button variant="outline">Copy</Button>
                </div>
                <p className="text-sm text-muted-foreground">
                  This is your secret API key. Do not share it with anyone.
                </p>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="webhook-url">Webhook URL</Label>
                <Input
                  id="webhook-url"
                  placeholder="https://your-website.com/webhook"
                  defaultValue="https://example.com/webhook"
                />
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">Generate New Key</Button>
              <Button onClick={handleSave} disabled={isLoading}>
                {isLoading ? "Saving..." : "Save Changes"}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </MainLayout>
  )
}

