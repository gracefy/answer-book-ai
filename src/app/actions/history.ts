'use server'
import { prisma } from '@/lib/db'
import { Result } from '@/types/result'
import { getUserFromCookie } from '@/lib/auth'
import { HistoryEntry } from '@/types/historyEntry'
import { logError } from '@/lib/utils'

export async function getUserHistory({
  query = '',
  page = 1,
  pageSize = 10,
}: {
  query?: string
  page?: number
  pageSize?: number
}): Promise<Result<{ items: HistoryEntry[]; total: number }>> {
  const user = await getUserFromCookie()

  if (!user) {
    return {
      success: false,
      error: 'User not authenticated',
    }
  }

  try {
    const whereClause = query
      ? {
          userId: user.id,
          OR: [
            { question: { contains: query, mode: 'insensitive' as const } },
            { answer: { contains: query, mode: 'insensitive' as const } },
          ],
        }
      : {
          userId: user.id,
        }

    const [items, total] = await Promise.all([
      prisma.history.findMany({
        where: whereClause,
        orderBy: { createdAt: 'desc' },
        skip: (page - 1) * pageSize,
        take: pageSize,
      }),
      prisma.history.count({ where: whereClause }),
    ])

    return {
      success: true,
      data: {
        items,
        total,
      },
    }
  } catch (error) {
    console.error('[HISTORY FETCH ERROR]', error)
    logError('Error fetching history:', error)
    return {
      success: false,
      error: 'Failed to fetch user history',
    }
  }
}

export async function addToHistory(
  question: string,
  answer: string
): Promise<Result<HistoryEntry>> {
  const user = await getUserFromCookie()

  if (!user) {
    return {
      success: false,
      error: 'User not authenticated',
    }
  }

  try {
    const historyEntry = await prisma.history.create({
      data: {
        question,
        answer,
        userId: user.id,
      },
    })

    return {
      success: true,
      data: historyEntry,
    }
  } catch (error) {
    logError('Error adding to history:', error)
    return {
      success: false,
      error: 'Failed to add to history',
    }
  }
}

export async function deleteHistoryEntry(id: string): Promise<Result<any>> {
  const user = await getUserFromCookie()

  if (!user) {
    return {
      success: false,
      error: 'User not authenticated',
    }
  }

  try {
    const deletedEntry = await prisma.history.deleteMany({
      where: {
        id,
        userId: user.id,
      },
    })
    // Check if the entry was found and deleted
    if (deletedEntry.count === 0) {
      return {
        success: false,
        error: 'History entry not found',
      }
    }

    return {
      success: true,
      data: deletedEntry,
    }
  } catch (error) {
    logError('Error deleting history entry:', error)
    return {
      success: false,
      error: 'Failed to delete history entry',
    }
  }
}

export async function clearHistory(): Promise<Result<null>> {
  const user = await getUserFromCookie()
  if (!user) return { success: false, error: 'User not authenticated' }

  try {
    await prisma.history.deleteMany({ where: { userId: user.id } })
    return { success: true, data: null }
  } catch (error) {
    logError('Error clearing history:', error)
    return { success: false, error: 'Failed to clear history' }
  }
}
