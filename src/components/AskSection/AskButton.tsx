'use client'
import { motion } from 'framer-motion'
import { fadeIn } from '@/lib/ui/animations'
import CrystalBall from '../ui/CrystalBall'
import clsx from 'clsx'

// Props for the AskButton component.
// Controls appearance and triggers the ask action on click.
type AskButtonProps = {
  onClick: () => void
  label?: string
  gradientColor?: string
  loadingAnswer?: boolean
}

// Renders the interactive button that triggers a question to the AI
export default function AskButton({
  onClick,
  label = 'Ask',
  gradientColor = 'from-purple-300 via-indigo-500 to-purple-800',
  loadingAnswer,
}: AskButtonProps) {
  return (
    <button
      type="button"
      aria-label="Ask the AI your question"
      onClick={onClick}
      className={clsx(
        'group r mt-10 flex h-20 w-20 appearance-none border-none bg-transparent p-0',
        'justify-cente items-center text-indigo-100/50 transition-all duration-300 ease-in-out',
        'hover:scale-105 hover:text-indigo-100 md:h-24 md:w-24 lg:h-28 lg:w-28'
      )}
    >
      <motion.div
        variants={fadeIn()}
        initial="hidden"
        animate="show"
        exit="exit"
        style={{ willChange: 'transform, opacity' }}
        className="h-full w-full"
      >
        <CrystalBall label={label} gradientColor={gradientColor} loadingAnswer={loadingAnswer} />
      </motion.div>
    </button>
  )
}
