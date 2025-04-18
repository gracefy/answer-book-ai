// Footer — displays a subtle poetic message and the current year
export default function Footer() {
  return (
    <footer className="w-full p-5 text-center">
      <p className="mb-3 text-xs text-white/30 transition-colors duration-300 hover:text-white/50 md:text-base">
        A whisper from the stars © {new Date().getFullYear()}
      </p>
    </footer>
  )
}
