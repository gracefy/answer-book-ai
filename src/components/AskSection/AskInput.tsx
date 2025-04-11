'use Cleint'

type Props = {
  value: string
  onChange: (value: string) => void
}

export default function AskInput({ value, onChange }: Props) {
  return (
    <input
      type="text"
      value={value}
      placeholder="What do you seek..."
      onChange={(e) => onChange(e.target.value)}
      className="mt-5 w-full max-w-lg rounded-md bg-purple-200/10 px-4 py-2 font-mono text-purple-100/70 placeholder-white/50 transition-all focus:ring-2 focus:ring-purple-500 focus:outline-none"
    />
  )
}
