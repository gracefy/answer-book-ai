'use client'
import { motion, AnimatePresence } from 'framer-motion'
import AnswerDisplay from './AnswerDisplay'
import AnswerExplanation from './AnswerExplanation'
import { fadeIn } from '@/lib/ui/animations'

// Props used to render the answer block and its expanded explanation
type AnswerSectionProps = {
  answer: string
  expanded: boolean
  loadingExplanation: boolean
  explanation: string
  onClick: () => void
}

// Renders the animated section that displays the answer and its optional explanation
export default function AnswerSection({
  answer,
  expanded,
  loadingExplanation,
  explanation,
  onClick,
}: AnswerSectionProps) {
  return (
    <AnimatePresence mode="wait">
      <motion.section
        layout
        variants={fadeIn()}
        initial="hidden"
        animate="show"
        exit="exit"
        className="mt-10 w-full text-center"
      >
        {/* The clickable answer text */}
        <AnswerDisplay answer={answer} expanded={expanded} onClick={onClick} />

        {/* The explanation section, conditionally rendered and animated */}
        <AnswerExplanation
          loadingExplanation={loadingExplanation}
          explanation={explanation}
          expanded={expanded}
        />
      </motion.section>
    </AnimatePresence>
  )
}
