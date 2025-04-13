'use client'
import clsx from 'clsx'

type AnswerHintProps = {
  expanded: boolean
}

// Display a hint depending on the state of explanation
export default function AnswerHint({ expanded }: AnswerHintProps) {
  return (
    <span
      className={clsx(
        'absolute -bottom-5 left-1/2 text-sm text-indigo-300/40 italic',
        'opacity-0 transition-opacity duration-300 group-hover:opacity-100'
      )}
    >
      {expanded ? 'Click to close' : 'Click to summon the truth'}
    </span>
  )
}
