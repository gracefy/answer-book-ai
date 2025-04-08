import AnswerButton from "@/components/AnswerButton";
import LanguageToggle from "@/components/LanguageToggle";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-indigo-100 to-purple-200 p-8">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-4">
        The Book of Answers
      </h1>
      <p className="text-gray-600 text-lg text-center max-w-md mx-auto">
        Focus your mind. Ask your question.
        Then press the button below to reveal what fate has to say.
      </p>
      <AnswerButton />
    </main>
  )
}