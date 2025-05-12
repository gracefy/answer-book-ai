import { NextRequest, NextResponse } from 'next/server'
import argon2 from 'argon2'
import jwt from 'jsonwebtoken'
import { serialize } from 'cookie'
import { prisma } from '@/lib/db'
import { Result } from '@/types/result'
import { User } from '@/types/user'
import { loginSchema } from '@/lib/validation'
import { zodErrorToDetails } from '@/lib/utils'
import { logError } from '@/lib/utils'

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    const { email, password } = await req.json()

    const result = loginSchema.safeParse({ email, password })

    // Validate the input
    if (!result.success) {
      const errors = result.error.format()
      const details = zodErrorToDetails(errors)

      return NextResponse.json<Result<null>>(
        {
          success: false,
          error: 'Invalid input',
          details,
        },
        { status: 400 }
      )
    }

    // Check if the user exists
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    })

    // Verify the password
    let isPasswordValid = false
    if (user) {
      isPasswordValid = await argon2.verify(user.password, password)
    }

    // If user doesn't exist or password is invalid, return an error
    if (!user || !isPasswordValid) {
      return NextResponse.json<Result<null>>(
        {
          success: false,
          error: 'Invalid email or password',
        },
        { status: 401 }
      )
    }

    const userInfo: User = {
      id: user.id,
      email: user.email,
      username: user.username,
    }

    // Generate a JWT token
    const token = jwt.sign(userInfo, process.env.JWT_SECRET as string, {
      expiresIn: '1day',
    })

    // Set the token in a cookie
    const cookie = serialize('token', token, {
      httpOnly: true,
      path: '/',
      maxAge: 60 * 60 * 24, // 1 day
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production', // Set to true in production
    })

    // Return the user and token
    return NextResponse.json<Result<User>>(
      {
        success: true,
        data: userInfo,
      },
      {
        status: 200,
        headers: {
          'Set-Cookie': cookie,
        },
      }
    )
  } catch (error) {
    logError('Error in /api/auth/login:', error)

    // Return a generic error response
    return NextResponse.json<Result<null>>(
      {
        success: false,
        error: 'Internal server error',
      },
      { status: 500 }
    )
  }
}
