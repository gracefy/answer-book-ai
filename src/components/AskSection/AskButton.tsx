'use client'
import { motion } from 'framer-motion'
import { fadeIn } from '@/lib/ui/animations'
import CrystalBall from '../ui/CrystalBall'

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
    <div
      onClick={onClick}
      className="group mt-10 flex h-20 w-20 items-center justify-center text-indigo-100/50 transition-all duration-300 ease-in-out hover:scale-105 hover:text-indigo-100 md:h-24 md:w-24 lg:h-28 lg:w-28"
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
    </div>
  )
}
