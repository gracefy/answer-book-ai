import clsx from 'clsx'

export default function Header() {
  return (
    <>
      <h1
        className={clsx(
          'bg-gradient-to-r from-[#c9bfff80] via-indigo-100/80 to-[#dcd6ff80] bg-clip-text',
          'text-center font-mono text-4xl font-bold tracking-[0.2em] text-transparent drop-shadow-lg sm:text-5xl'
        )}
      >
        Focus Your Mind
      </h1>
      <p className="mb-10 text-center font-mono text-lg leading-relaxed tracking-wider text-purple-200/50 drop-shadow-md md:text-xl">
        Ask your question
      </p>
    </>
  )
}
