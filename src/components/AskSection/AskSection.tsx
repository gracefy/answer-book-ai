'use client'
import { useState } from 'react'
import { useMagicSound } from '@/hooks/useMagicSound'
import { ApiResponse } from '@/types/api'

import AskInput from './AskInput'
import AskButton from './AskButton'
import AnswerCard from './AnswerCard'

export default function AskSection() {
  const magic = useMagicSound()
  const error = useMagicSound('/sounds/error.mp3')
  const [question, setQuestion] = useState('')
  const [lastQuestion, setLastQuestion] = useState('')
  const [inputError, setInputError] = useState(false)
  const [errorKey, setErrorKey] = useState(0)
  const [answer, setAnswer] = useState('')
  const [loading, setLoading] = useState(false)

  const getAnswer = async () => {
    if (!question.trim()) {
      setErrorKey((prev) => (prev === 0 ? 1 : 0))
      setInputError(true)
      error.play()
      return
    }
    setInputError(false)
    magic.play()
    setLoading(true)

    setLastQuestion(question)
    setAnswer('')
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
      setLoading(false)
    }
    // Reset the question after getting the answer
    setQuestion('')
  }

  return (
    <div className="mt-8 flex w-full flex-col items-center gap-4">
      <AskInput
        value={question}
        inputError={inputError}
        errorKey={errorKey}
        onChange={setQuestion}
        clearError={() => setInputError(false)}
      />

      <AskButton onClick={getAnswer} loading={loading} />

      <AnswerCard answer={answer} question={lastQuestion} />
    </div>
  )
}
