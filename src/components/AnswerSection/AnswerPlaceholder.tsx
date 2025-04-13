'use client'
import { motion } from 'framer-motion'

export default function AnswerPlaceholder() {
  return (
    <motion.div
      className="mx-auto mt-4 w-full max-w-md text-center text-indigo-100/50 italic"
      initial={{ opacity: 0 }}
      animate={{ opacity: 0.5 }}
      transition={{ duration: 0.3 }}
    >
      Void is listening...
    </motion.div>
  )
}
