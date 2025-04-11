import { getAnswerFromAI } from '@/lib/openai'

export async function POST(req: Request) {
  const { question } = await req.json()

  if (!question || question.trim() === '') {
    return new Response('No question provided', { status: 400 })
  }

  const answer = await getAnswerFromAI(question)

  return new Response(JSON.stringify({ answer }), {
    headers: { 'Content-Type': 'application/json' },
  })
}
