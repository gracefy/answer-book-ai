'use client'
import { motion } from 'framer-motion'
import { Typewriter } from 'react-simple-typewriter'
import clsx from 'clsx'
import { fadeIn } from '@/lib/ui/animations'

export type AnswerExplanationProps = {
  loadingExplanation: boolean
  explanation: string
  expanded: boolean
}

export default function AnswerExplanation({
  loadingExplanation,
  explanation,
  expanded,
}: AnswerExplanationProps) {
  if (!loadingExplanation && !explanation) return null
  if (!expanded) return null

  return (
    <motion.p
      className={clsx(
        'mt-3 text-center text-base leading-relaxed text-indigo-200/90',
        'mx-auto max-w-prose px-4 whitespace-pre-line',
        'md:text-lg'
      )}
      variants={fadeIn(0.5)}
      initial="hidden"
      animate="show"
      exit="exit"
    >
      {loadingExplanation ? (
        'Summoning...'
      ) : (
        <Typewriter words={[explanation]} typeSpeed={50} cursor cursorStyle="_" />
      )}
    </motion.p>
  )
}
