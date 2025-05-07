import { useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'
import clsx from 'clsx'

type FormRowProps = {
  type: 'text' | 'email' | 'password'
  label: string
  classname?: string
  error?: boolean
} & React.InputHTMLAttributes<HTMLInputElement>

export default function FormRow({ type, label, classname, error, ...props }: FormRowProps) {
  const [show, setShow] = useState(false)

  return (
    <div className="grid grid-cols-10 items-center gap-2">
      <label className="col-span-10 text-sm font-medium text-gray-500 md:col-span-3">{label}</label>

      {type === 'password' ? (
        <div className="relative col-span-10 md:col-span-7">
          <input
            type={show ? 'text' : 'password'}
            className={clsx(
              'rounded-md border bg-zinc-100 px-3 py-2 outline-none',
              'text-black placeholder-gray-400 placeholder:text-sm',
              error
                ? 'border-amber-400 focus:ring-2 focus:ring-amber-400'
                : 'border-transparent focus:border-indigo-400',
              classname
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
            'col-span-10 w-full rounded-md border px-3 py-2 outline-none',
            'bg-zinc-100 text-black placeholder-gray-400 placeholder:text-sm md:col-span-7',
            error
              ? 'border-amber-400 focus:ring-2 focus:ring-amber-400'
              : 'border-transparent focus:border-indigo-400',
            classname
          )}
          {...props}
        />
      )}
    </div>
  )
}
