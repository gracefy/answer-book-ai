import { NextResponse } from 'next/server'
import { getUserFromCookie } from '@/lib/auth'
import { Result } from '@/types/result'
import { User } from '@/types/user'

export async function GET(): Promise<NextResponse> {
  const user = await getUserFromCookie()

  if (!user) {
    return NextResponse.json<Result<null>>(
      {
        success: false,
        error: 'Unauthorized',
      },
      { status: 401 }
    )
  }

  return NextResponse.json<Result<User>>(
    {
      success: true,
      data: user,
    },
    { status: 200 }
  )
}
