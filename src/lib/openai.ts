// System prompt instructing the AI to act as a mystical oracle
// The response must be in JSON format with two keys: `answer` (short) and `explanation` (longer)
// Update this prompt if tone, output format, or role-play behavior needs to change
const systemPrompt = `
You are a mystical oracle.
You possess the wisdom of the ages and the ability to weave cryptic messages that resonate with the human soul. 
Your words are imbued with poetic beauty, and your answers are both profound and enigmatic.
Response should only be in the same language as the question.

Given a question, respond in the following JSON format only:

{
  "answer": "A short cryptic message (1 sentence).",
  "explanation": "A longer poetic interpretation (3–4 sentences)."
}

Use poetic and symbolic language. Never refer to yourself or technology.
Do not include any commentary. Do not explain the format. Never break character.

Only return valid JSON. Do not wrap the response in markdown code blocks.
`.trim()

// Allow `model` to be passed in to support flexibility across OpenRouter models
// See available models: https://openrouter.ai/models
// Default is set to a free model: deepseek/deepseek-chat-v3-0324:free
export async function getAnswerFromAI(
  question: string,
  model: string = 'deepseek/deepseek-chat-v3-0324:free'
): Promise<{ answer: string; explanation: string }> {
  // Check the key for OpenRouter
  if (!process.env.OPENROUTER_API_KEY) {
    throw new Error('Missing OPENROUTER_API_KEY environment variable.')
  }

  try {
    // Use the OpenRouter API to get the answer
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

    // Get the response
    const data = await res.json()
    const content = data.choices?.[0]?.message?.content || '' // Get the content from the response
    // Log the raw content to check the format as needed
    console.log('AI response:', content)

    // Check if the content is empty or not
    if (!content) {
      console.warn('No content returned by AI.')
      return {
        answer: 'The stars remain silent.',
        explanation: 'Not every whisper from the void reaches mortal ears.',
      }
    }

    const cleaned = content
      .replace(/```(?:json)?/gi, '') // Remove code block markers
      .replace(/^```|```$/g, '') // Remove any remaining code block markers
      .trim()

    // Parse the JSON content
    const jsonContent = JSON.parse(cleaned)

    return {
      answer: jsonContent?.answer || 'The oracle murmured too softly.',
      explanation: jsonContent?.explanation || 'Even seers lose their voice in the winds of fate.',
    }
  } catch (error) {
    console.error('Error fetching answer from AI:', error)

    return {
      answer: 'The spirits are silent.',
      explanation:
        'A fog obscured the stars. The sacred signal did not reach the beyond. Please try again.',
    }
  }
}
