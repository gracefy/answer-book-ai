'use client'

import { useEffect, useState } from 'react'
import { Input } from './Input'
import { X } from 'lucide-react'
import { Button } from './Button'
import clsx from 'clsx'

type SearchInputProps = {
  value: string
  onChange: (value: string) => void
  delay?: number
  placeholder?: string
  className?: string
  clearable?: boolean
}

export default function SearchInput({
  value,
  onChange,
  delay = 400,
  placeholder = 'Search...',
  className = '',
  clearable = true,
}: SearchInputProps) {
  const [internalValue, setInternalValue] = useState(value)

  useEffect(() => {
    setInternalValue(value)
  }, [value])

  // Debounce the onChange function to avoid too many calls
  useEffect(() => {
    const timer = setTimeout(() => {
      onChange(internalValue.trim())
    }, delay)

    return () => clearTimeout(timer)
  }, [internalValue, delay, onChange])

  return (
    <div className={clsx('relative w-full', className)}>
      <Input
        value={internalValue}
        onChange={(e) => setInternalValue(e.target.value)}
        placeholder={placeholder}
        className="placeholder:text-muted-foreground focus-visible:outline-nonee flex-1 rounded-md border-none bg-indigo-400/20 text-sm text-indigo-100/90 focus-visible:ring-0"
      />
      {clearable && internalValue && (
        <Button
          type="button"
          size="icon"
          variant="ghost"
          className="text-muted-foreground hover:text-foreground absolute top-1/2 right-2 h-6 w-6 -translate-y-1/2 p-0"
          onClick={() => setInternalValue('')}
        >
          <X className="h-4 w-4" />
        </Button>
      )}
    </div>
  )
}
