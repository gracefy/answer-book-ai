/**
 * ActionResult<T> — Generic response format for server/API actions.
 *
 * Structure:
 * - success: whether the API call was successful
 * - data (optional): the result payload of type T (present if success is true)
 * - error (optional): error message string (present if success is false)
 *
 * Usage:
 * Use this as the return type for server/API responses for consistent client handling.
 */
export type ActionResult<T> = {
  success: boolean
  data?: T
  error?: string
}
