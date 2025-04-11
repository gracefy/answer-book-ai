// This component is used to display an answer card with the provided text.
'use client'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { fadeIn } from '@/lib/animations'
import clsx from 'clsx'
import { Typewriter } from 'react-simple-typewriter'

type AnswerCardProps = {
  answer: string
  explanation?: string
}

export default function AnswerCard({ answer, explanation }: AnswerCardProps) {
  // Define the state for the expanded answer
  const [expanded, setExpanded] = useState(false)

  // Reset the expanded state when the answer changes
  useEffect(() => {
    setExpanded(false)
  }, [answer])

  // If there is no answer, show a default message
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
        variants={fadeIn(0.3)}
        initial="hidden"
        animate="show"
        exit="exit"
        className={clsx(
          'animate-pulse bg-gradient-to-r',
          'from-indigo-200 via-purple-300 to-pink-200',
          'bg-clip-text text-center text-xl text-transparent italic',
          'cursor-pointer transition-all duration-500 hover:animate-none'
        )}
        onClick={() => setExpanded(!expanded)}
      >
        {answer}
      </motion.p>

      {expanded && explanation && (
        <motion.p
          className={clsx(
            'mt-4 text-center text-sm leading-relaxed text-indigo-200 sm:text-base',
            'mx-auto max-w-prose px-4 whitespace-pre-line'
          )}
          variants={fadeIn(0.6)}
          initial="hidden"
          animate="show"
          exit="exit"
        >
          <Typewriter words={[explanation]} typeSpeed={50} cursor cursorStyle="_" />
        </motion.p>
      )}
    </AnimatePresence>
  )
}
