'use client'
import clsx from 'clsx'
import { motion, AnimatePresence } from 'framer-motion'
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
  // Display answer with animation when answer is ready
  return (
    <AnimatePresence mode="wait">
      {answer && (
        <motion.div
          layout
          variants={fadeIn()}
          initial="hidden"
          animate="show"
          exit="exit"
          key={answer?.slice(0, 20)}
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
      )}
    </AnimatePresence>
  )
}
