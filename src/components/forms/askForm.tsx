'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import clsx from 'clsx'
import '@/app/globals.css'
import CircleButton from '@/components/ui/CircleButton'

type AskFormProps = {
  answer: string
  loadingAnswer: boolean
  error: string
  errorKey: number
  clearError: () => void
  handleAsk: (formData: FormData) => Promise<void>
}

export default function AskForm({
  answer,
  loadingAnswer,
  error,
  errorKey,
  clearError,
  handleAsk,
}: AskFormProps) {
  const [touched, setTouched] = useState(false)
  const [question, setQuestion] = useState('')
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append('question', question)

    await handleAsk(formData)

    setQuestion('')
  }

  // Show waiting message only when nothing is entered or returned
  const showPlaceholder = !question && !answer && !loadingAnswer

  const MAX_LENGTH = 120
  const remaining = MAX_LENGTH - question.length

  return (
    <form onSubmit={handleSubmit} className="mt-8 flex w-full flex-col items-center gap-4">
      {/* User input field with error feedback */}

      <div key={errorKey} className="relative w-full max-w-lg px-4">
        {/* Sweep animation on error */}
        {error && (
          <motion.div
            className="absolute top-0 left-0 h-12 w-full bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0"
            animate={{ x: ['-100%', '100%'], opacity: [0, 1, 0] }}
            transition={{ duration: 2, ease: 'easeInOut' }}
          />
        )}

        {/* Accessible label for screen readers */}
        <label htmlFor="question" className="sr-only">
          Question input
        </label>

        {/* Main input */}
        <input
          id="question"
          name="question"
          aria-label="Ask the AI your question"
          autoFocus
          type="text"
          maxLength={120}
          value={question}
          placeholder="What do you seek..."
          aria-invalid={error ? 'true' : undefined}
          aria-describedby="input-error char-count"
          onChange={(e) => {
            if (error) clearError()
            setQuestion(e.target.value)
            setTouched(true)
          }}
          onBlur={() => setTouched(false)}
          className={clsx(
            'w-full max-w-lg rounded-md px-4 py-2 outline-none',
            'bg-purple-200/10 font-mono text-purple-100/70 placeholder-white/50',
            'transition-all duration-500 placeholder:text-sm md:placeholder:text-base',
            error
              ? 'animate-[shake_0.5s_ease-in-out] border-2 border-amber-400/70'
              : 'border border-transparent focus:animate-[glow_1.5s_ease-in-out_infinite] focus:border-[#dcd6ff80]'
          )}
        />

        {/* Error message */}
        <p
          className={clsx(
            'absolute top-full right-4 mt-1 text-sm transition-opacity duration-300',
            'text-amber-300/80',
            error ? 'opacity-100' : 'invisible opacity-0'
          )}
          id="input-error"
          role="alert"
        >
          {error}
        </p>

        {/* Character count */}
        {touched && (
          <div
            id="char-count"
            className={clsx(
              'absolute top-full right-4 mt-1 text-xs transition-colors duration-300 md:text-sm',
              remaining <= 10
                ? 'text-red-400/80'
                : remaining < 20
                  ? 'text-amber-300/80'
                  : 'text-indigo-200/50'
            )}
            aria-live={remaining <= 10 ? 'polite' : undefined}
            aria-atomic="true"
          >
            {!error ? `${remaining} characters left` : ''}
          </div>
        )}
      </div>

      {/* Waiting message */}
      <p
        className={clsx(
          'mt-2 animate-pulse text-center text-indigo-200/40 italic',
          'text-sm transition-opacity duration-300 md:text-base',
          !showPlaceholder && 'invisible opacity-0'
        )}
      >
        Void is listening...
      </p>

      {/* Magic ask button that triggers the API call */}
      <CircleButton type="submit" loading={loadingAnswer} />
    </form>
  )
}
