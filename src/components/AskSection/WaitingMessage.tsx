import clsx from 'clsx'

// Props to control the visibility of the waiting message
type WaitingMessageProps = {
  shouldShow: boolean
}

// Show a subtle prompt before the user asks a question
export default function WaitingMessage({ shouldShow }: WaitingMessageProps) {
  return (
    <p
      className={clsx(
        'mt-2 animate-pulse text-center text-indigo-200/40 italic',
        'text-sm transition-opacity duration-300 md:text-base',
        !shouldShow && 'invisible opacity-0'
      )}
    >
      Void is listening...
    </p>
  )
}
