type ErrorMessageProps = {
  show?: boolean
  message?: string
  className?: string
}

export default function ErrorMessage({ show, message, className = '' }: ErrorMessageProps) {
  if (!show || !message) return null

  return (
    <p role="alert" className={`mt-1 text-sm text-amber-400/70 md:text-sm ${className}`}>
      {message}
    </p>
  )
}
