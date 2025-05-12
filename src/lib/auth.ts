// lib/utils/auth.ts
import { cookies } from 'next/headers'
import jwt from 'jsonwebtoken'
import { User } from '@/types/user'
import { logError } from '@/lib/utils'

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
      logError('Invalid token structure', decoded)
      return null
    }

    return decoded as User
  } catch (err) {
    logError('Invalid token', err)
    return null
  }
}

// Type guard to check if the object is a User
function isUser(obj: unknown): obj is User {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    'id' in obj &&
    'email' in obj &&
    'username' in obj &&
    typeof (obj as any).id === 'string' &&
    typeof (obj as any).email === 'string' &&
    typeof (obj as any).username === 'string'
  )
}
