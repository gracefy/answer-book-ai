"use client";
import { useState } from "react";

import AskInput from "./AskInput";
import AskButton from "./AskButton";
import AnswerCard from "./AnswerCard";

export default function AskSection() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  const getAnswer = async () => {
    if (!question.trim()) return;

    const res = await fetch("/api/answer", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ question }),
    });

    const data = await res.json();
    setAnswer(data.answer);
  }

  return (
    <div className="flex flex-col items-center gap-4 mt-8 w-full">
      <AskInput value={question} onChange={setQuestion} />

      <AskButton onClick={getAnswer} />

      <AnswerCard answer={answer} />

    </div>
  )
}