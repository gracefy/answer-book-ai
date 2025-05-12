'use client'

import { Button } from '@/components/ui/Button'

export interface PaginationProps {
  page: number
  totalPages: number
  onChange: (newPage: number) => void
}

export function Pagination({ page, totalPages, onChange }: PaginationProps) {
  return (
    <div className="mt-6 flex justify-center gap-6">
      <Button variant="outline" size="sm" disabled={page === 1} onClick={() => onChange(page - 1)}>
        Previous
      </Button>
      <span className="text-muted-foreground self-center text-sm">
        Page {page} of {totalPages}
      </span>
      <Button
        variant="outline"
        size="sm"
        disabled={page === totalPages}
        onClick={() => onChange(page + 1)}
      >
        Next
      </Button>
    </div>
  )
}
