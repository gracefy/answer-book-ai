// This component is used to display an answer card with the provided text.
'use client'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ApiResponse } from '@/types/api'

import { fadeIn } from '@/lib/ui/animations'
import clsx from 'clsx'
import { Typewriter } from 'react-simple-typewriter'

// Props for the AnswerCard component
// It includes the answer text and an explanation
type AnswerCardProps = {
  question: string
  answer: string
}

/**
 * AnswerCard — a component that displays an answer with an optional explanation
 * Props:
 * - answer: the answer text to display
 * - explanation: the explanation text to display when the answer is clicked
 */
export default function AnswerCard({ question, answer }: AnswerCardProps) {
  // This state determines whether the explanation is shown or hidden
  const [expanded, setExpanded] = useState(false)
  const [explanation, setExplanation] = useState('')
  const [loading, setLoading] = useState(false)

  // Reset the expanded state when the answer changes
  useEffect(() => {
    setExplanation('')
    setExpanded(false)
  }, [answer])

  const getExplanation = async () => {
    if (loading || explanation) return
    setLoading(true)

    try {
      const res = await fetch('/api/explanation', {
        method: 'POST',
        body: JSON.stringify({ question, answer }),
        headers: { 'Content-Type': 'application/json' },
      })

      const data: ApiResponse<string> = await res.json()
      if (!res.ok || !data.success) {
        console.error('Server error:', data.error)
        setExplanation('The spirits remain silent.')
        return
      }

      console.log('AI explanation:', data.data)

      setExplanation(data.data || 'The spirits remain silent.')
    } catch (error) {
      console.error('Error fetching explanation:', error)
      setExplanation('The spirits remain silent.')
    } finally {
      setLoading(false)
    }
  }

  // This message is displayed when the answer is not yet available
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
    // AnimatePresence is used to animate the entry and exit of components
    // The motion.p component is used to animate the answer text
    // The key prop is used to trigger the animation when the answer changes
    // The variants prop is used to define the animation states
    // The initial, animate, and exit props define the animation behavior
    <AnimatePresence>
      <motion.p
        key={answer}
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
        onClick={() => {
          setExpanded(!expanded)
          getExplanation()
        }}
      >
        {answer}
        <span className="absolute -bottom-5 left-1/2 text-xs text-indigo-300 opacity-0 transition group-hover:opacity-100">
          Click to unveil the hidden message.
        </span>
      </motion.p>

      {expanded && explanation && (
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
          <Typewriter words={[explanation]} typeSpeed={50} cursor cursorStyle="_" />
        </motion.p>
      )}
    </AnimatePresence>
  )
}
