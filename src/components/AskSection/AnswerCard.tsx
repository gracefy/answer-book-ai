// This component is used to display an answer card with the provided text.
'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { fadeIn } from '@/lib/animations'
import clsx from 'clsx'

type AnswerCardProps = {
  answer: string
}

export default function AnswerCard({ answer }: AnswerCardProps) {
  if (!answer)
    return (
      <motion.div
        className="mx-auto mt-4 w-full max-w-md text-center text-indigo-100/50 italic"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        transition={{ duration: 0.3 }}
      >
        Void is listening...
      </motion.div>
    )

  return (
    <AnimatePresence mode="wait">
      <motion.p
        key={answer}
        initial={{ opacity: 0, scale: 0.95, filter: 'blur(4px)' }}
        animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
        transition={{
          duration: 1.6,
          ease: [0.33, 1, 0.68, 1],
        }}
        className={clsx(
          'animate-pulse bg-gradient-to-r',
          'from-indigo-200 via-purple-300 to-pink-200',
          'bg-clip-text text-center text-xl text-transparent italic',
          'cursor-pointer transition-all duration-500 hover:animate-none'
        )}
      >
        {answer}
      </motion.p>
    </AnimatePresence>
  )
}
