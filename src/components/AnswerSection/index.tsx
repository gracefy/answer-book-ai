'use client'
import AnswerDisplay from './AnswerDisplay'
import AnswerExplanation from './AnswerExplanation'

type AnswerSectionProps = {
  answer: string
  expanded: boolean
  loadingExplanation: boolean
  explanation: string
  onClick: () => void
}

export default function AnswerSection({
  answer,
  expanded,
  loadingExplanation,
  explanation,
  onClick,
}: AnswerSectionProps) {
  return (
    <section className="mt-10 w-full text-center">
      <AnswerDisplay answer={answer} expanded={expanded} onClick={onClick} />

      <AnswerExplanation
        loadingExplanation={loadingExplanation}
        explanation={explanation}
        expanded={expanded}
      />
    </section>
  )
}
