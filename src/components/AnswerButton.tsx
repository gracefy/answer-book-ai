"use client";
import { useState } from "react";
import { BookOpen } from "lucide-react";
import AnswerCard from "./AnswerCard";

const sampleAnswers = [
  "You already know the answer.",
  "Let go, and it will come to you.",
  "Try coffee. Then try again.",
  "Absolutely. Unless it's illegal.",
  "Stop refreshing your fate. It’s cached."
];

const AnswerButton = () => {
  const [answer, setAnswer] = useState("");

  const getAnswer = () => {
    const randomIndex = Math.floor(Math.random() * sampleAnswers.length);
    setAnswer(sampleAnswers[randomIndex]);
  }

  return (
    <div className="flex flex-col items-center gap-4 mt-6">
      <button
        className="px-6 py-3 bg-purple-600 text-white rounded-xl shadow-md hover:bg-purple-700 transition"
        onClick={getAnswer}
      >
        <BookOpen className="w-5 h-5" />
        Reveal My Destiny
      </button>

      <AnswerCard text={answer} />

    </div>
  )
}

export default AnswerButton