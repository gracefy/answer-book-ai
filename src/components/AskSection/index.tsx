'use client'
import { motion, AnimatePresence } from 'framer-motion'
import { fadeIn } from '@/lib/ui/animations'

import AskInput from './AskInput'
import AskButton from './AskButton'
import WaitingMessage from './WaitingMessage'

// Props for the AskSection component
// All values come from useAskFlow hook
type AskSectionProps = {
  question: string
  answer: string
  loadingAnswer: boolean
  inputError: boolean
  errorKey: number
  setQuestion: (question: string) => void
  clearInputError: () => void
  onclick: () => void
}

// Input block for submitting user questions.
export default function AskSection({
  question,
  answer,
  loadingAnswer,
  inputError,
  errorKey,
  setQuestion,
  clearInputError,
  onclick,
}: AskSectionProps) {
  // Show waiting message only when nothing is entered or returned
  const shouldShow = !question && !answer && !loadingAnswer

  return (
    <AnimatePresence mode="wait">
      <motion.section
        layout
        variants={fadeIn()}
        initial="hidden"
        animate="show"
        exit="exit"
        className="mt-8 flex w-full flex-col items-center gap-4"
      >
        {/* User input field with error feedback */}
        <AskInput
          value={question}
          inputError={inputError}
          errorKey={errorKey}
          onChange={setQuestion}
          clearError={clearInputError}
        />

        {/* Faint idle message when nothing is happening */}
        <WaitingMessage shouldShow={shouldShow} />

        {/* Magic ask button that triggers the API call */}
        <AskButton onClick={onclick} loadingAnswer={loadingAnswer} />
      </motion.section>
    </AnimatePresence>
  )
}
