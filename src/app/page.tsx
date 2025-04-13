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
  // Manage the asking flow (question → answer)
  const {
    question,
    answer,
    lastQuestion,
    loadingAnswer,
    inputError,
    errorKey,
    setQuestion,
    clearInputError,
    getAnswer,
  } = useAskFlow()

  // Manage the explanation flow (answer → explanation)
  const { explanation, loadingExplanation, expanded, setExpanded, setExplanation, getExplanation } =
    useAnswerFlow()

  // Reset explanation state when a new answer is received
  useEffect(() => {
    setExplanation('')
    setExpanded(false)
  }, [answer])

  return (
    <main className="relative min-h-screen bg-[url('/images/stars.jpg')] bg-cover bg-center bg-no-repeat">
      {/* Background video layer */}
      <div className="absolute inset-0 z-0">
        <VideoBackground />
      </div>

      {/* Main content layer */}
      <div className="relative z-10 flex min-h-screen flex-col">
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-2xl p-8">
            <Header />

            {/* Ask input and button */}
            <AskSection
              question={question}
              answer={answer}
              loadingAnswer={loadingAnswer}
              inputError={inputError}
              errorKey={errorKey}
              setQuestion={setQuestion}
              clearInputError={clearInputError}
              onclick={getAnswer}
            />

            {/* Answer and explanation display */}

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

            {/* Show a subtle prompt before the user asks a question */}
          </div>
        </div>

        {/* Footer */}
        {/* Footer at the bottom of the screen */}
        <div className="mt-auto">
          <Footer />
        </div>
      </div>
    </main>
  )
}
