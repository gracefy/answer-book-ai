export type Result<T> = {
  success: boolean
  data?: T
  error?: string
  details?: Record<string, string>
}
