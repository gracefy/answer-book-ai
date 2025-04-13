'use client'
import AskInput from './AskInput'
import AskButton from './AskButton'

type AskSectionProps = {
  question: string
  answer: string
  loadingAnswer: boolean
  inputError: boolean
  setQuestion: (question: string) => void
  clearInputError: () => void
  onclick: () => void
}

export default function AskSection({
  question,
  answer,
  loadingAnswer,
  inputError,
  setQuestion,
  clearInputError,
  onclick,
}: AskSectionProps) {
  return (
    <div className="mt-8 flex w-full flex-col items-center gap-4">
      <AskInput
        value={question}
        inputError={inputError}
        errorKey={inputError ? 1 : 0}
        onChange={setQuestion}
        clearError={clearInputError}
      />

      <AskButton onClick={onclick} loadingAnswer={loadingAnswer} />
    </div>
  )
}
