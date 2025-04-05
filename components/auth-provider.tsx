"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"
import { useAccount, useDisconnect, useSignMessage } from "wagmi"
import { SiweMessage } from "siwe"

interface AuthContextType {
  isAuthenticated: boolean
  isLoading: boolean
  signIn: () => Promise<void>
  signOut: () => void
  address?: string
  userData?: any
}

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  isLoading: true,
  signIn: async () => {},
  signOut: () => {},
})

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [jwt, setJwt] = useState<string | null>(null)
  const [userData, setUserData] = useState<any>(null)
  const { address, isConnected } = useAccount()
  const { disconnect } = useDisconnect()
  const { signMessageAsync } = useSignMessage()

  useEffect(() => {
    // Check if user is authenticated on mount
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem('auth_token')
        if (token) {
          setJwt(token)
          setIsAuthenticated(true)
          // 可以在這裡添加獲取用戶資料的邏輯
        }
      } catch (error) {
        setIsAuthenticated(false)
      } finally {
        setIsLoading(false)
      }
    }

    checkAuth()
  }, [])

  const getSiweMessage = async () => {
    try {
      const response = await fetch('http://localhost:8000/auth/get_siwe_message', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ address }),
      });
      
      if (!response.ok) throw new Error('Failed to get message');
      
      const data = await response.json();
      return data.message;
    } catch (error) {
      console.error('Error getting SIWE message:', error);
      throw error;
    }
  };

  const signIn = async () => {
    if (!isConnected || !address) return;
    
    try {
      setIsLoading(true);
      
      // 獲取消息
      const messageToSign = await getSiweMessage();
      
      // 使用錢包簽名
      const signature = await signMessageAsync({ message: messageToSign });
      
      // 驗證簽名並獲取JWT
      const response = await fetch('http://localhost:8000/auth/verify_siwe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: messageToSign,
          signature,
          address,
        }),
      });
      
      if (!response.ok) throw new Error('Verification failed');
      
      const { token, user } = await response.json();
      
      // 儲存JWT
      localStorage.setItem('auth_token', token);
      setJwt(token);
      setUserData(user);
      setIsAuthenticated(true);
    } catch (error) {
      console.error('Authentication error:', error);
      alert('登入失敗，請重試。');
      setIsAuthenticated(false);
    } finally {
      setIsLoading(false);
    }
  };

  const signOut = async () => {
    try {
      localStorage.removeItem('auth_token');
      setJwt(null);
      setUserData(null);
      setIsAuthenticated(false);
      disconnect()
    } catch (error) {
      console.error("Error signing out:", error)
    }
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, isLoading, signIn, signOut, address, userData }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)

