import { NextResponse } from 'next/server'
import { serialize } from 'cookie'
import { Result } from '@/types/result'

export async function POST(): Promise<NextResponse> {
  // Clear the cookie by setting its max age to 0
  const cookie = serialize('token', '', {
    httpOnly: true,
    path: '/',
    maxAge: 0, // Set max age to 0 to delete the cookie
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
  })

  // Return a response with the cleared cookie
  return NextResponse.json<Result<null>>(
    {
      success: true,
      data: null,
    },
    {
      status: 200,
      headers: {
        'Set-Cookie': cookie,
      },
    }
  )
}
