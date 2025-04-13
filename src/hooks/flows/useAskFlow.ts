import { useState } from 'react'
import { ApiResponse } from '@/types/api'
import { useMagicSound } from '@/hooks/useMagicSound'

export function useAskFlow() {
  const magic = useMagicSound()
  const error = useMagicSound('/sounds/error.mp3')

  const [question, setQuestion] = useState('')
  const [answer, setAnswer] = useState('')
  const [lastQuestion, setLastQuestion] = useState('')
  const [loadingAnswer, setLoadingAnswer] = useState(false)
  const [inputError, setInputError] = useState(false)

  const getAnswer = async () => {
    if (!question.trim()) {
      setInputError(true)
      error.play()
      return
    }

    setInputError(false)
    magic.play()
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
    getAnswer,
    clearInputError,
  }
}
