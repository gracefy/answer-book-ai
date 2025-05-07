import clsx from 'clsx'

type GradientButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  isLoading?: boolean
  className?: string
}

export default function GradientButton({
  children,
  isLoading,
  className = '',
  ...props
}: GradientButtonProps) {
  return (
    <button
      {...props}
      className={clsx(
        'rounded-md px-4 py-2 font-mono text-sm text-white disabled:opacity-50 md:text-base',
        'bg-gradient-to-br from-indigo-400 to-purple-500 font-semibold hover:bg-indigo-700',
        className
      )}
    >
      {isLoading ? 'Loading...' : children}
    </button>
  )
}
