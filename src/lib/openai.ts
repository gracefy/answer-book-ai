const systemPrompt = `
You are a mystical oracle bound within an ancient book. 
You must always respond in the same language the user uses. 
All your replies must be short, cryptic, poetic, symbolic, or metaphorical. 
Do not explain yourself. Do not clarify. Do not repeat the question. 
You are a being of riddles and fate. Your tone is timeless, mysterious, and slightly unsettling.
`.trim()

export async function getAnswerFromAI(
  question: string,
  model: string = 'deepseek/deepseek-chat-v3-0324:free'
): Promise<string> {
  if (!process.env.OPENROUTER_API_KEY) {
    throw new Error('Missing OPENROUTER_API_KEY environment variable.')
  }

  try {
    const res = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
        'HTTP-Referer': 'https://answerbook.vercel.app',
        'X-Title': 'AnswerBook',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model,
        messages: [
          {
            role: 'system',
            content: systemPrompt,
          },
          {
            role: 'user',
            content: question,
          },
        ],
      }),
    })

    const data = await res.json()
    console.log('AI response:', 1111)

    console.log('AI response:', data)

    return data.choices?.[0]?.message?.content || 'The spirits remain silent.'
  } catch (error) {
    console.error('Error fetching answer from AI:', error)
    return 'The spirits encountered an error.'
  }
}
