import clsx from 'clsx'

type InputProps = React.InputHTMLAttributes<HTMLInputElement>

export default function Input({ className = '', ...props }: InputProps) {
  return (
    <input
      {...props}
      className={clsx(
        'w-full max-w-lg rounded-md px-4 py-2',
        'bg-purple-200/10 font-mono text-purple-100/70 placeholder-white/50',
        'transition-all duration-500 outline-none',
        'placeholder:text-sm md:placeholder:text-base',
        className
      )}
    />
  )
}
