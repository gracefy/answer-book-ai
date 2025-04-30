import { useState } from 'react'
import { askQuestion } from '@/app/actions/ask'
import AskForm from '@/components/forms/askForm'
import AnswerCard from '@/components/cards/answerCard'
import { useMagicSound } from '@/hooks/useMagicSound'

export default function QnASection() {
  const [answer, setAnswer] = useState('')
  const [loadingAnswer, setLoadingAnswer] = useState(false)
  const [error, setError] = useState('')
  const [errorKey, setErrorKey] = useState(0)

  const magicSound = useMagicSound()
  const errorSound = useMagicSound('/sounds/error.mp3')

  const handleAsk = async (formData: FormData) => {
    setLoadingAnswer(true)

    try {
      const res = await askQuestion(formData)

      if (!res.success) {
        errorSound.play()

        setError(res.error || 'Something went wrong')
        setErrorKey((prev) => (prev === 0 ? 1 : 0))
      } else {
        magicSound.play()
        setAnswer(res.data || 'The spirits remain silent.')
      }
    } catch (error) {
      console.error('Error fetching answer:', error)
      setAnswer('The spirits remain silent.')
    } finally {
      setLoadingAnswer(false)
    }
  }

  return (
    <>
      <AskForm
        answer={answer}
        loadingAnswer={loadingAnswer}
        error={error}
        errorKey={errorKey}
        clearError={() => setError('')}
        handleAsk={handleAsk}
      />

      <AnswerCard answer={answer} />
    </>
  )
}
