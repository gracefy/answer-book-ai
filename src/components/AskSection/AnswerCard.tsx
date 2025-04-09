// This component is used to display an answer card with the provided text.
"use client";

import { motion, AnimatePresence } from 'framer-motion';
import { fadeIn } from "@/lib/animations";

type Props = {
  answer: string;
};

export default function AnswerCard({ answer }: Props) {
  if (!answer) return null;

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={answer}
        variants={fadeIn("up", 0.3)}
        initial="hidden"
        animate="show"
        exit="exit"
        transition={{ duration: 0.5 }}
        className=" bg-white/10 backdrop-blur-sm shadow-lg rounded-lg p-6 mt-4 w-full max-w-md mx-auto"
      >
        <p className="text-xl italic text-center">{answer}</p>
      </motion.div>
    </AnimatePresence>
  );
};
