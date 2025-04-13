'use client'
import { useAskFlow } from '@/hooks/flows/useAskFlow'
import { useAnswerFlow } from '@/hooks/flows/useAnswerFlow'

import VideoBackground from '@/components/layout/VideoBackground'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import AskSection from '@/components/AskSection'
import AnswerSection from '@/components/AnswerSection'
import { useEffect } from 'react'

export default function Home() {
  const {
    question,
    answer,
    lastQuestion,
    loadingAnswer,
    inputError,
    setQuestion,
    clearInputError,
    getAnswer,
  } = useAskFlow()

  const { explanation, loadingExplanation, expanded, setExpanded, setExplanation, getExplanation } =
    useAnswerFlow()

  useEffect(() => {
    setExplanation('')
    setExpanded(false)
  }, [answer])

  return (
    <main className="relative bg-[url('/images/stars.jpg')] bg-cover bg-center bg-no-repeat">
      <div className="absolute inset-0 z-0">
        <VideoBackground />
      </div>
      <div className="relative z-10 flex min-h-screen flex-col">
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-2xl p-8">
            <Header />

            <AskSection
              question={question}
              answer={answer}
              loadingAnswer={loadingAnswer}
              inputError={inputError}
              setQuestion={setQuestion}
              clearInputError={clearInputError}
              onclick={getAnswer}
            />

            <AnswerSection
              answer={answer}
              expanded={expanded}
              loadingExplanation={loadingExplanation}
              explanation={explanation}
              onClick={() => {
                if (!explanation) {
                  getExplanation(lastQuestion, answer)
                }
                setExpanded((prev) => !prev)
              }}
            />
          </div>
        </div>
        <Footer />
      </div>
    </main>
  )
}
