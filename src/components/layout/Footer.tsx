export default function Footer() {
  return (
    <footer className="absolute bottom-0 left-0 w-full p-5 text-center">
      {/* <p className="text-sm">Made by Grace</p> */}
      <p className="pb-6 text-xs text-white/30 transition hover:text-white/50">
        © {new Date().getFullYear()} Book of Answers
      </p>
    </footer>
  )
}
