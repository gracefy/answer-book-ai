'use client'
import clsx from 'clsx'
import { motion } from 'framer-motion'
import { fadeIn } from '@/lib/ui/animations'
import AnswerHint from './AnswerHint'
import AnswerPlaceholder from './AnswerPlaceholder'

type AnswerDisplayProps = {
  answer: string
  expanded: boolean
  onClick: () => void
}

export default function AnswerDisplay({ answer, expanded, onClick }: AnswerDisplayProps) {
  if (!answer) return <AnswerPlaceholder />

  return (
    <>
      <motion.p
        // key={answer}
        variants={fadeIn(0.3)}
        initial="hidden"
        animate="show"
        exit="exit"
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
      </motion.p>
    </>
  )
}
