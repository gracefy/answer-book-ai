import clsx from 'clsx'

type FooterProps = {
  className?: string
}

export default function Footer({ className }: FooterProps) {
  return (
    <footer className={clsx('text-center', className)}>
      <p className="mb-3 text-xs text-indigo-100/40 transition-colors duration-300 hover:text-indigo-100/70 md:text-base">
        A whisper from the stars © {new Date().getFullYear()}
      </p>
    </footer>
  )
}
