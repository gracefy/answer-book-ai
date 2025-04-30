'use client'
import clsx from 'clsx'
import { motion } from 'framer-motion'
import { fadeIn } from '@/lib/utils/animations'

// Props for displaying the short answer text
type AnswerCardProps = {
  answer: string
}

export default function AnswerCard({ answer }: AnswerCardProps) {
  return (
    <motion.div
      key={answer?.slice(0, 20)}
      variants={fadeIn(0.8)}
      initial="hidden"
      animate={answer ? 'show' : 'hidden'}
      exit="exit"
      className={clsx(
        'bg-gradient-to-r from-indigo-200 via-purple-300 to-pink-200',
        'bg-clip-text text-center text-transparent',
        'relative mt-5 max-w-prose leading-relaxed',
        'min-h-30 text-lg opacity-90 md:text-2xl'
      )}
    >
      {answer}
    </motion.div>
  )
}
