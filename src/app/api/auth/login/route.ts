import { NextRequest, NextResponse } from 'next/server'
import argon2 from 'argon2'
import jwt from 'jsonwebtoken'
import { serialize } from 'cookie'
import { prisma } from '@/db/prisma'
import { Result } from '@/types/result'
import { User } from '@/types/user'

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    const { email, password } = await req.json()

    // Validate the input
    if (!email || !password) {
      return NextResponse.json<Result<null>>(
        {
          success: false,
          error: 'Email and password required',
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
    const isPasswordValid = user && (await argon2.verify(user.password, password))

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
      expiresIn: '1h',
    })

    // Set the token in a cookie
    const cookie = serialize('token', token, {
      httpOnly: true,
      path: '/',
      maxAge: 60 * 60, // 1 hour
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
    console.error('Error in /api/auth/login:', error)

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
