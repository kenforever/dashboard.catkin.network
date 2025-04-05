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
import { RadioGroup, RadioGroupItem, RadioGroupLabel } from "@/components/ui/radio-group"

// 用來隨機生成API Key的函式
const generateApiKey = () => {
  const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
  let apiKey = ''
  for (let i = 0; i < 32; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length)
    apiKey += charset[randomIndex]
  }
  return apiKey
  
}

export default function SettingsPage() {
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [selectedNetwork, setSelectedNetwork] = useState("ethereum") // State to hold selected network
  const [apiKey, setApiKey] = useState(generateApiKey()) // State to store the API key

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

  const handleGenerateNewKey = () => {
    alert('Generate New APIKEY!!')
    setApiKey(generateApiKey()) // Generate a new API key
  }

  const handleShowApiKey = () => {
    alert(apiKey) // You can customize this to show it in a modal or elsewhere
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
              <RadioGroup value={selectedNetwork} onValueChange={setSelectedNetwork} className="space-y-4">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="ethereum" id="ethereum" />
                  <Label htmlFor="ethereum">Ethereum</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="polygon" id="polygon" />
                  <Label htmlFor="polygon">Polygon</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="optimism" id="optimism" />
                  <Label htmlFor="optimism">Optimism</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="arbitrum" id="arbitrum" />
                  <Label htmlFor="arbitrum">Arbitrum</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="base" id="base" />
                  <Label htmlFor="base">Base</Label>
                </div>
              </RadioGroup>
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
                  <Input id="api-key" type="password" value={apiKey} readOnly />
                  <Button variant="outline" onClick={handleShowApiKey}>Show</Button>
                  <Button variant="outline" onClick={() => navigator.clipboard.writeText(apiKey)}>Copy</Button>
                </div>
                <p className="text-sm text-muted-foreground">
                  This is your secret API key. Do not share it with anyone.
                </p>
              </div>
              <div className="grid gap-2">
                <Button onClick={handleGenerateNewKey} variant="outline">
                  Generate New API Key
                </Button>
              </div>
            </CardContent>
            <CardFooter>
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
