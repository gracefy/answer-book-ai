'use client'
import clsx from 'clsx'
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
    <motion.div
      layout
      variants={fadeIn()}
      initial="hidden"
      animate="show"
      exit="exit"
      onClick={onClick}
      className={clsx(
        'relative mt-10 flex cursor-pointer items-center justify-center',
        'transition-transform duration-300 hover:scale-105',
        'text-[#dcd6ff60] hover:text-[#dcd6ff]',
        'h-20 w-20 md:h-24 md:w-24 lg:h-28 lg:w-28'
      )}
    >
      <CrystalBall label={label} gradientColor={gradientColor} loadingAnswer={loadingAnswer} />
    </motion.div>
  )
}
