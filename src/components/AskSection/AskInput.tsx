'use Cleint'
import clsx from 'clsx'
import '@/app/globals.css'
import { motion } from 'framer-motion'

// // Props used by the AskInput component
type AskInputProps = {
  value: string
  inputError?: boolean
  errorKey?: number
  onChange: (value: string) => void
  clearError: () => void
}

/**
 * AskInput — a text input for asking questions
 * Props:
 * - value: current input value
 * - inputError: whether the input is in error state
 * - errorKey: used to trigger animation on error
 * - onChange: function to handle input changes
 * - clearError: function to clear the error state
 */
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
