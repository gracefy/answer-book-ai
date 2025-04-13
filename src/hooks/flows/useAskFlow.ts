import { useState } from 'react'
import { ApiResponse } from '@/types/api'
import { useMagicSound } from '@/hooks/useMagicSound'

/**
 * useAskFlow — manages the flow of asking questions and receiving short answers
 *
 * Handles:
 * - Question input state
 * - Answer output state
 * - Loading state during answer generation
 * - Input error (e.g. empty question)
 * - Error animation trigger (via key change)
 *
 * Returns:
 * - question: current input string
 * - setQuestion: updates the question input
 * - answer: short AI-generated answer
 * - lastQuestion: snapshot of submitted question (used for explanation)
 * - loadingAnswer: whether an answer is being fetched
 * - inputError: true if the input is empty or invalid
 * - errorKey: toggled to retrigger animations
 * - getAnswer: async function to call /api/answer
 * - clearInputError: resets the inputError state
 */

export function useAskFlow() {
  const magicSound = useMagicSound()
  const errorSound = useMagicSound('/sounds/error.mp3')

  const [question, setQuestion] = useState('')
  const [answer, setAnswer] = useState('')
  const [lastQuestion, setLastQuestion] = useState('')
  const [loadingAnswer, setLoadingAnswer] = useState(false)
  const [inputError, setInputError] = useState(false)
  const [errorKey, setErrorKey] = useState(0)

  const getAnswer = async () => {
    if (!question.trim()) {
      setInputError(true)
      setErrorKey((prev) => (prev === 0 ? 1 : 0))
      errorSound.play()
      return
    }

    setInputError(false)
    magicSound.play()
    setLoadingAnswer(true)

    setLastQuestion(question)

    try {
      const res = await fetch('/api/answer', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ question }),
      })

      const data: ApiResponse<string> = await res.json()

      if (!res.ok || !data.success) {
        console.error('API error:', data.error)
        setAnswer('The spirits remain silent.')
        return
      }
      console.log('AI short answer:', data.data)
      setAnswer(data.data || 'The spirits remain silent.')
    } catch (error) {
      console.error('Error fetching answer:', error)
      setAnswer('The spirits remain silent.')
    } finally {
      setLoadingAnswer(false)
      setQuestion('')
    }
  }
  const clearInputError = () => {
    setInputError(false)
  }

  return {
    question,
    setQuestion,
    answer,
    lastQuestion,
    loadingAnswer,
    inputError,
    errorKey,
    getAnswer,
    clearInputError,
  }
}
