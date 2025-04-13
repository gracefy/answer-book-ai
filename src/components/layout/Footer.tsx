export default function Footer() {
  return (
    <footer className="w-full p-5 text-center">
      {/* <p className="text-sm">Made by Grace</p> */}
      <p className="mb-3 text-xs text-white/30 transition hover:text-white/50">
        A whisper from the stars © {new Date().getFullYear()}
      </p>
    </footer>
  )
}
