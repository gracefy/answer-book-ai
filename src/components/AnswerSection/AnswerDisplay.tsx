'use client'
import clsx from 'clsx'
import { motion } from 'framer-motion'
import { fadeIn } from '@/lib/ui/animations'
import AnswerHint from './AnswerHint'

// Props for displaying the short answer text
type AnswerDisplayProps = {
  answer: string
  expanded: boolean
  onClick: () => void
}

// Display the short answer, with click-to-expand behavior
export default function AnswerDisplay({ answer, expanded, onClick }: AnswerDisplayProps) {
  // Do not render anything if the answer is empty
  if (!answer) return null

  // Display answer with animation when answer is ready
  return (
    <motion.div
      layout
      variants={fadeIn()}
      initial="hidden"
      animate="show"
      exit="exit"
      key={answer}
      className={clsx(
        'bg-gradient-to-r from-indigo-200 via-purple-300 to-pink-200',
        'bg-clip-text text-center text-transparent',
        'group relative mt-5 max-w-prose cursor-pointer',
        'animate-pulse opacity-90 hover:animate-none hover:opacity-100',
        'text-xl md:text-2xl'
      )}
      onClick={onClick}
    >
      {answer}
      <AnswerHint expanded={expanded} />
    </motion.div>
  )
}
