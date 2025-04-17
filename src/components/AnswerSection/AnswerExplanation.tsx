'use client'
import { motion, AnimatePresence } from 'framer-motion'
import { Typewriter } from 'react-simple-typewriter'
import { fadeOutCollapse } from '@/lib/ui/animations'
import '@/app/globals.css'
import clsx from 'clsx'

// Props for displaying the answer explanation
type AnswerExplanationProps = {
  loadingExplanation: boolean
  explanation: string
  expanded: boolean
}

export default function AnswerExplanation({
  loadingExplanation,
  explanation,
  expanded,
}: AnswerExplanationProps) {
  return (
    <AnimatePresence mode="wait">
      {expanded && (loadingExplanation || explanation) && (
        <motion.div
          layout
          key={loadingExplanation ? 'loading' : 'text'}
          variants={fadeOutCollapse()}
          initial="hidden"
          animate="show"
          exit="exit"
          className={clsx(
            'mt-3 text-center text-base leading-relaxed text-indigo-200/90',
            'mx-auto max-w-prose px-4 whitespace-pre-line',
            'md:text-lg'
          )}
        >
          {loadingExplanation ? (
            // Show animated placeholder while loading
            <div
              className={clsx(
                'mx-auto h-20 w-100 rounded-full bg-gradient-to-br',
                'from-amber-300/80 via-pink-200/70 to-purple-200/80',
                'breathing blur-3xl'
              )}
            />
          ) : (
            // Show explanation with typewriter effect
            <Typewriter words={[explanation]} typeSpeed={50} cursor cursorStyle="_" />
          )}
        </motion.div>
      )}
    </AnimatePresence>
  )
}
