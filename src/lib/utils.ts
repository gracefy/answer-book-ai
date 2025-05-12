import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { ZodFormattedError } from 'zod'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function zodErrorToDetails<T extends Record<string, unknown>>(
  error: ZodFormattedError<T>
): Record<string, string> {
  const details: Record<string, string> = {}

  for (const key in error) {
    const field = error[key as keyof typeof error]
    if (
      field &&
      typeof field === 'object' &&
      '_errors' in field &&
      Array.isArray(field._errors) &&
      field._errors.length > 0
    ) {
      details[key] = field._errors[0]
    }
  }

  return details
}

export function logError(...args: any[]) {
  if (process.env.NODE_ENV !== 'production') {
    console.error(...args)
  }
}
