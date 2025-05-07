// lib/utils/auth.ts
import { cookies } from 'next/headers'
import jwt from 'jsonwebtoken'
import { User } from '@/types/user'

export async function getUserFromCookie(): Promise<User | null> {
  try {
    // Get the cookies from the request
    const cookieStore = await cookies()
    const token = cookieStore.get('token')?.value

    // If no token is found, return null
    if (!token) return null

    // Verify the token and extract the user information
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string)

    if (!isUser(decoded)) {
      console.error('Invalid token structure', decoded)
      return null
    }

    return decoded as User
  } catch (err) {
    console.error('Invalid token', err)
    return null
  }
}

// Type guard to check if the object is a User
function isUser(obj: any): obj is User {
  return (
    obj &&
    typeof obj === 'object' &&
    typeof obj.id === 'string' &&
    typeof obj.email === 'string' &&
    typeof obj.username === 'string'
  )
}
