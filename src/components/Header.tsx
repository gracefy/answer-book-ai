import { div } from "framer-motion/client";

export default function Header() {
  return (
    <>
      <h1 className="text-6xl sm:text-5xl font-serif font-bold text-center text-white tracking-wider drop-shadow-md">
        The Book of Answers
      </h1>
      <p className="text-xl  sm:text-2xl text-center font-serif font-bold text-purple-200 mt-2">
        Focus your mind. Ask your question.
      </p>
    </>
  )
}