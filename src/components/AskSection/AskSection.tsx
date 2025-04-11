'use client'
import { useState } from 'react'

import AskInput from './AskInput'
import AskButton from './AskButton'
import AnswerCard from './AnswerCard'

export default function AskSection() {
  const [question, setQuestion] = useState('')
  const [answer, setAnswer] = useState('')
  const [explanation, setExplanation] = useState('')
  const [loading, setLoading] = useState(false)

  const getAnswer = async () => {
    if (!question.trim()) return
    setLoading(true)
    const res = await fetch('/api/answer', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ question }),
    })

    const data = await res.json()
    console.log('AI response:', data)
    const { answer, explanation } = data.answer
    setLoading(false)
    setAnswer(answer)
    setExplanation(explanation)

    setQuestion('')
  }

  return (
    <div className="mt-8 flex w-full flex-col items-center gap-4">
      <AskInput value={question} onChange={setQuestion} />

      <AskButton onClick={getAnswer} loading={loading} />

      <AnswerCard answer={answer} explanation={explanation} />
    </div>
  )
}
