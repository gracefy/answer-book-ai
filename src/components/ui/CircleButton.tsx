'use client'
import { motion } from 'framer-motion'
import clsx from 'clsx'

type CircleButtonProps = {
  label?: string
  color?: string
  loading?: boolean
} & React.ButtonHTMLAttributes<HTMLButtonElement>

export default function CircleButton({
  label = 'Ask',
  color = 'from-purple-300 via-indigo-500 to-purple-800',
  loading = false,
  ...props
}: CircleButtonProps) {
  return (
    <button
      className={clsx(
        'group relative h-20 w-20 md:h-24 md:w-24 lg:h-28 lg:w-28',
        'mt-10 transition-transform duration-300 hover:scale-105'
      )}
      {...props}
    >
      {/* rotating crystall Ball */}
      <motion.div
        layout
        key={loading ? 'fast' : 'slow'}
        animate={{ rotate: 360 }}
        transition={{
          repeat: Infinity,
          duration: loading ? 1 : 15,
          ease: 'easeInOut',
        }}
        className={clsx(
          'absolute inset-0 rounded-full border-4 border-white/20 bg-gradient-to-br',
          'shadow-[inset_4px_4px_10px_rgba(255,255,255,0.2),0_8px_20px_rgba(0,0,0,0.4)]',
          'animate-pulse hover:animate-none',
          color
        )}
        style={{ transformOrigin: 'center' }}
      />

      {/* static text */}
      <span
        className={clsx(
          'relative z-10 font-mono font-semibold tracking-wider uppercase',
          'text-indigo-100/50 select-none group-hover:text-indigo-100',
          'text-sm transition-colors duration-200 md:text-base lg:text-lg'
        )}
      >
        {label}
      </span>
    </button>
  )
}
