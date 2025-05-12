import { useState } from 'react'
import { askQuestion } from '@/app/actions/ask'
import { addToHistory } from '@/app/actions/history'
import IntroCard from '@/components/cards/IntroCard'
import AskForm from '@/components/forms/AskForm'
import AnswerCard from '@/components/cards/AnswerCard'
import { useMagicSound } from '@/hooks/useMagicSound'
import { logError } from '@/lib/utils'

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
      const question = formData.get('question')?.toString().trim()

      if (res.success && res.data && question) {
        const answer = res.data.trim()
        magicSound.play()
        setAnswer(answer)

        try {
          await addToHistory(question, answer)
        } catch (error) {
          logError('Error adding to history:', error)
        }
      } else {
        errorSound.play()
        setError(res.error || 'Something went wrong')
        setErrorKey((prev) => (prev === 0 ? 1 : 0))
      }
    } catch (error) {
      logError('Error fetching answer:', error)
      setAnswer('The spirits remain silent.')
    } finally {
      setLoadingAnswer(false)
    }
  }

  return (
    <section className="flex flex-1 flex-col items-center justify-center">
      <div className="w-full max-w-2xl p-8">
        {/* Intro Card */}
        <IntroCard />

        {/* Ask Form */}
        <AskForm
          answer={answer}
          loadingAnswer={loadingAnswer}
          error={error}
          errorKey={errorKey}
          clearError={() => setError('')}
          handleAsk={handleAsk}
        />

        {/* Answer Card */}
        <AnswerCard answer={answer} />
      </div>
    </section>
  )
}
