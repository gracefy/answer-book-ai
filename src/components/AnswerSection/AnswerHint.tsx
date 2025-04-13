'use client'
import clsx from 'clsx'

// Props for the floating answer hint
type AnswerHintProps = {
  expanded: boolean
}

// Display a subtle hover hint below the answer
// Changes text depending on whether the explanation is expanded
export default function AnswerHint({ expanded }: AnswerHintProps) {
  return (
    <span
      className={clsx(
        'absolute -bottom-5 left-1/2 text-sm text-indigo-300/40 italic',
        'opacity-0 transition-opacity duration-300 group-hover:opacity-100'
      )}
    >
      {expanded ? 'Hide explanation' : 'Click to unveil more'}
    </span>
  )
}
