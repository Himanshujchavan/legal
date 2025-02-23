"use client"

import type React from "react"
import { createContext, useState, useContext, useEffect } from "react"
import axios from "axios"

interface User {
  id: string
  phone: string
  aadhaarNumber: string
}

interface AuthContextType {
  currentUser: User | null
  login: (phone: string) => Promise<void>
  verifyOtp: (otp: string) => Promise<void>
  logout: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check if user is already logged in
    const token = localStorage.getItem("authToken")
    if (token) {
      axios
        .get("/api/user", { headers: { Authorization: `Bearer ${token}` } })
        .then((response) => {
          setCurrentUser(response.data)
        })
        .catch((error) => {
          console.error("Error fetching user data:", error)
        })
        .finally(() => {
          setLoading(false)
        })
    } else {
      setLoading(false)
    }
  }, [])

  async function login(phone: string) {
    try {
      await axios.post("/api/auth/send-otp", { phone })
    } catch (error) {
      console.error("Error sending OTP:", error)
      throw error
    }
  }

  async function verifyOtp(otp: string) {
    try {
      const response = await axios.post("/api/auth/verify-otp", { otp })
      const { token, user } = response.data
      localStorage.setItem("authToken", token)
      setCurrentUser(user)
    } catch (error) {
      console.error("Error verifying OTP:", error)
      throw error
    }
  }

  async function logout() {
    localStorage.removeItem("authToken")
    setCurrentUser(null)
  }

  const value = {
    currentUser,
    login,
    verifyOtp,
    logout,
  }

  return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>
}

