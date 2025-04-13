'use Cleint'
import { motion } from 'framer-motion'
import clsx from 'clsx'
import '@/app/globals.css'

// Props for the AskInput component
type AskInputProps = {
  value: string
  inputError?: boolean
  errorKey?: number
  onChange: (value: string) => void
  clearError: () => void
}

// A stylized input field for user questions
// Includes animated error feedback (shake + light sweep) and glowing focus state
export default function AskInput({
  value,
  inputError,
  errorKey,
  onChange,
  clearError,
}: AskInputProps) {
  return (
    // Input wrapper with dynamic key to retrigger animation on error
    <div key={errorKey} className="relative w-full max-w-lg px-4">
      {/* Light sweep animation triggered when inputError is true */}
      {inputError && (
        <motion.div
          className="absolute top-0 left-0 h-12 w-full bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0"
          animate={{ x: ['-100%', '100%'], opacity: [0, 1, 0] }}
          transition={{ duration: 2, ease: 'easeInOut' }}
        />
      )}

      {/* Main input field with animated borders and error handling */}
      <input
        type="text"
        value={value}
        placeholder="What do you seek..."
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => clearError()}
        className={clsx(
          'w-full max-w-lg rounded-md px-4 py-2',
          'bg-purple-200/10 font-mono text-purple-100/70 placeholder-white/50',
          'transition-all duration-500 outline-none',
          inputError
            ? 'animate-[shake_0.5s_ease-in-out] border-2 border-amber-400/70'
            : 'border border-transparent focus:animate-[glow_1.5s_ease-in-out_infinite] focus:border-[#dcd6ff80]'
        )}
      />
    </div>
  )
}
