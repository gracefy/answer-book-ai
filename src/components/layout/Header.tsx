import clsx from 'clsx'

export default function Header() {
  return (
    <header className="mb-10 flex flex-col items-center justify-center font-mono">
      <h1
        className={clsx(
          'bg-gradient-to-r from-[#c9bfff80] via-indigo-100/80 to-[#dcd6ff80] bg-clip-text',
          'text-5xl font-bold tracking-wider text-transparent drop-shadow-lg',
          'hidden md:block'
        )}
      >
        Focus Your Mind
      </h1>
      <h1
        className={clsx(
          'bg-gradient-to-r from-[#c9bfff80] via-indigo-100/80 to-[#dcd6ff80] bg-clip-text',
          'text-3xl font-bold tracking-wider text-transparent drop-shadow-lg',
          'md:hidden'
        )}
      >
        Focus Mind
      </h1>
      <p className="mb-10 text-base leading-relaxed tracking-wider text-purple-200/50 drop-shadow-md md:text-xl">
        Ask your question
      </p>
    </header>
  )
}
