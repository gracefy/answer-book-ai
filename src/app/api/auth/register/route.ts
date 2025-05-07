import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/db/prisma'
import argon2 from 'argon2'
import jwt from 'jsonwebtoken'
import { serialize } from 'cookie'
import { Result } from '@/types/result'
import { User } from '@/types/user'

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    const { email, username, password } = await req.json()

    // Validate the input
    if (!email || !username || !password) {
      return NextResponse.json<Result<null>>(
        {
          success: false,
          error: 'Missing required fields',
        },
        { status: 400 }
      )
    }

    // Check if the user already exists
    const existingUser = await prisma.user.findUnique({
      where: {
        email,
      },
    })
    if (existingUser) {
      return NextResponse.json<Result<null>>(
        {
          success: false,
          error: 'User already exists',
        },
        { status: 409 }
      )
    }
    // Hash the password
    const hashedPassword = await argon2.hash(password)

    // Create a new user
    const newUser = await prisma.user.create({
      data: {
        email,
        username,
        password: hashedPassword,
      },
    })

    const userInfo: User = {
      id: newUser.id,
      email: newUser.email,
      username: newUser.username,
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

    // Return the new user
    return NextResponse.json<Result<User>>(
      {
        success: true,
        data: userInfo,
      },
      {
        status: 201,
        headers: {
          'Set-Cookie': cookie,
        },
      }
    )
  } catch (error) {
    console.error('Error in /api/auth/register:', error)

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
