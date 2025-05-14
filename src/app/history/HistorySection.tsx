'use client'
import { useState, useEffect, useCallback } from 'react'
import { useDebounce } from 'use-debounce'
import { getUserHistory, deleteHistoryEntry } from '@/app/actions/history'
import { HistoryEntry } from '@/types/historyEntry'
import HistoryCard from '@/components/cards/HistoryCard'
import SearchInput from '@/components/ui/SearchInput'
import { Pagination } from '@/components/ui/Pagination'
import { logError } from '@/lib/utils'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export default function HistorySection() {
  const [items, setItems] = useState<HistoryEntry[]>([])
  const [query, setQuery] = useState('')
  const [debouncedQuery] = useDebounce(query, 400)
  const [page, setPage] = useState(1)
  const [total, setTotal] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const pageSize = 5

  const fetchHistory = useCallback(async () => {
    setIsLoading(true)

    try {
      const res = await getUserHistory({ query: debouncedQuery, page, pageSize })
      if (res.success && res.data) {
        setItems(res.data.items)
        setTotal(res.data.total)
      } else {
        console.error('[HISTORY FETCH ERROR in history section]', res.error)
        logError('Error fetching history:', res.error)
      }
    } catch (error) {
      console.error('[HISTORY FETCH ERROR in history section catch: ]', error)
      logError('Unexpected error:', error)
    } finally {
      setIsLoading(false)
    }
  }, [debouncedQuery, page, pageSize])

  useEffect(() => {
    fetchHistory()
  }, [fetchHistory])

  useEffect(() => {
    setPage(1)
  }, [debouncedQuery])

  const handleDelete = async (id: string) => {
    const res = await deleteHistoryEntry(id)
    if (res.success) {
      fetchHistory()
    } else {
      logError('Error deleting history entry:', res.error)
    }
  }

  const totalPages = Math.ceil(total / pageSize)

  return (
    <section className="flex flex-1 flex-col justify-center pt-24 font-mono">
      <div className="flex flex-col items-center justify-center gap-6 px-4 py-8">
        <h1 className="text-3xl font-bold text-indigo-100/80">History</h1>

        <SearchInput
          value={query}
          onChange={setQuery}
          placeholder="Search history..."
          className="w-full max-w-md"
        />
      </div>
      <div className="text-cente z-10 mx-auto flex flex-1 flex-col items-center gap-4 px-4 py-8 font-mono">
        {isLoading ? (
          <p className="text-muted-foreground text-center text-sm">Loading...</p>
        ) : items.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-6 text-center text-sm">
            <p className="text-muted-foreground">No history found.</p>
            <div className="mt-2 flex flex-col items-center justify-center gap-4 font-mono">
              {debouncedQuery && (
                <button
                  onClick={() => setQuery('')}
                  className="text-indigo-300 hover:text-indigo-400 hover:underline"
                >
                  Clear search
                </button>
              )}
              <Link href="/" className="flex items-center gap-1 text-indigo-400 hover:underline">
                Go ask something new
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        ) : (
          items.map((item) => (
            <HistoryCard
              key={item.id}
              item={item}
              onDelete={(id) => {
                handleDelete(id)
              }}
            />
          ))
        )}
        {totalPages > 0 && (
          <div className="mt-auto flex items-center justify-center pb-8">
            <Pagination
              page={page}
              totalPages={totalPages}
              onChange={(newPage) => {
                setPage(newPage)
                if (document.body.scrollHeight > window.innerHeight) {
                  window.scrollTo({ top: 0, behavior: 'smooth' })
                }
              }}
            />
          </div>
        )}
      </div>
    </section>
  )
}
