'use client'
import { createContext, useContext, useState, useEffect } from 'react'
import { User } from '@/types/user'
import { Result } from '@/types/result'

// Define the AuthContext type
type AuthContextType = {
  user: User | null
  login: (user: User) => void
  logout: () => Promise<void>
  isAuthenticated: boolean
  authLoading: boolean
}

type AuthProviderProps = {
  children: React.ReactNode
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null)
  const [authLoading, setAuthLoading] = useState(true)

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch('/api/auth/user', {
          credentials: 'include',
        })

        if (!res.ok) {
          console.error('Failed to fetch /api/auth/user:', res.statusText)
          setUser(null)
          return
        }
        // Check if the response is a valid JSON
        const data: Result<User> = await res.json()
        if (data.success && data.data) {
          setUser(data.data)
        } else {
          console.error('Failed to fetch user data:', data.error)
          setUser(null)
        }
      } catch (error) {
        console.error('AuthProvider: Error fetching user:', error)
      } finally {
        setAuthLoading(false)
      }
    }

    fetchUser()
  }, [])

  const login = (user: User) => {
    setUser(user)
  }

  const logout = async () => {
    try {
      const res = await fetch('/api/auth/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (!res.ok) {
        throw new Error('Failed to log out')
      }
      setUser(null)
    } catch (error) {
      console.error('Error logging out:', error)
    }
  }

  const isAuthenticated = user !== null

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated, authLoading }}>
      {children}
    </AuthContext.Provider>
  )
}
