import { useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'
import clsx from 'clsx'

type FormRowProps = {
  type: 'text' | 'email' | 'password'
  label: string
  className?: string
  error?: boolean
  errorMessage?: string
} & React.InputHTMLAttributes<HTMLInputElement>

export default function FormRow({
  type,
  label,
  className,
  error,
  errorMessage,
  ...props
}: FormRowProps) {
  const [show, setShow] = useState(false)

  return (
    <div className="grid w-full grid-cols-10 items-center gap-2">
      <label className="col-span-10 text-sm font-semibold text-gray-500 md:col-span-3">
        {label}
      </label>

      {type === 'password' ? (
        <div className="relative col-span-10 md:col-span-7">
          <input
            type={show ? 'text' : 'password'}
            className={clsx(
              'w-full rounded-md border bg-zinc-100 px-3 py-2 outline-none',
              'col-span-10 text-black placeholder-gray-400 placeholder:text-xs md:col-span-7',
              error
                ? 'border-red-400 focus:ring-2 focus:ring-red-400'
                : 'border-transparent focus:border-indigo-400',
              className
            )}
            {...props}
          />

          <button
            type="button"
            onClick={() => setShow((prev) => !prev)}
            className="absolute top-1/2 right-2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
            tabIndex={-1}
          >
            {show ? <Eye size={18} /> : <EyeOff size={18} />}
          </button>
        </div>
      ) : (
        <input
          className={clsx(
            'w-full rounded-md border bg-zinc-100 px-3 py-2 outline-none',
            'col-span-10 text-black placeholder-gray-400 placeholder:text-xs md:col-span-7',
            error
              ? 'border-red-400 focus:ring-2 focus:ring-red-400'
              : 'border-transparent focus:border-indigo-400',
            className
          )}
          {...props}
        />
      )}

      {errorMessage && (
        <p className="col-span-10 mb-3 text-right text-sm text-red-400">{errorMessage}</p>
      )}
    </div>
  )
}
