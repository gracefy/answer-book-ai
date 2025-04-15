'use client'
import { motion, AnimatePresence } from 'framer-motion'
import { Typewriter } from 'react-simple-typewriter'
import { fadeIn } from '@/lib/ui/animations'
import '@/app/globals.css'
import clsx from 'clsx'

// Props for displaying the answer explanation
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
  // If collapsed, hide the explanation
  if (!expanded) return null

  // If not loading and no explanation yet, don't render anything
  if (!loadingExplanation && !explanation) return null

  return (
    <AnimatePresence mode="wait">
      <motion.div
        className={clsx(
          'mt-3 text-center text-base leading-relaxed text-indigo-200/90',
          'mx-auto max-w-prose px-4 whitespace-pre-line',
          'md:text-lg'
        )}
        key={loadingExplanation ? 'loading' : 'explanation'}
        variants={fadeIn()}
        initial="hidden"
        animate="show"
        exit="exit"
      >
        {loadingExplanation ? (
          // Show animated placeholder while loading
          <div
            className={clsx(
              'mx-auto h-60 w-100 rounded-full bg-gradient-to-br',
              'from-amber-300/80 via-pink-200/70 to-purple-200/80',
              'animate-[breath_2s_ease-in-out_infinite] opacity-80 blur-3xl'
            )}
          />
        ) : (
          // Show explanation with typewriter effect
          <Typewriter words={[explanation]} typeSpeed={50} cursor cursorStyle="_" />
        )}
      </motion.div>
    </AnimatePresence>
  )
}
