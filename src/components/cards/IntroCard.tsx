import clsx from 'clsx'

type IntroCardProps = {
  title?: string
  mobileTitle?: string
  subtitle?: string
}

export default function IntroCard({
  title = 'Focus Your Mind',
  mobileTitle = 'Focus Mind',
  subtitle = 'Ask your question',
}: IntroCardProps) {
  return (
    <div className="mb-10 flex flex-col items-center justify-center font-mono">
      <h1
        className={clsx(
          'bg-gradient-to-r from-[#c9bfff80] via-indigo-100/80 to-[#dcd6ff80] bg-clip-text',
          'text-5xl font-bold tracking-wider text-transparent drop-shadow-lg',
          'hidden md:block'
        )}
      >
        {title}
      </h1>
      <h1
        className={clsx(
          'bg-gradient-to-r from-[#c9bfff80] via-indigo-100/80 to-[#dcd6ff80] bg-clip-text',
          'text-3xl font-bold tracking-wider text-transparent drop-shadow-lg',
          'md:hidden'
        )}
      >
        {mobileTitle}
      </h1>
      <p className="mb-10 text-base leading-relaxed tracking-wider text-purple-200/50 drop-shadow-md md:text-xl">
        {subtitle}
      </p>
    </div>
  )
}
