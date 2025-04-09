"use Cleint";

type Props = {
  value: string;
  onChange: (value: string) => void;
}

export default function AskInput({ value, onChange }: Props) {
  return (
    <input
      type="text"
      value={value}
      placeholder="Ask your question..."
      onChange={(e) => onChange(e.target.value)}
      className="w-full max-w-md px-4 py-2 rounded-md bg-white/10 font-mono text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
    />
  )
};

