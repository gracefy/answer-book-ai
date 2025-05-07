import { models } from './models'
import { Result } from '@/types/result'

/**
 * Fetches an answer from the AI using the OpenRouter API.
 *
 * @param {string} question - The question to ask the AI.
 * @param {string} [model=models.deepseek] - The model to use for the AI response.
 * @returns {Promise<{string }>} - The AI's answer
 */
export async function askSingleModel(
  question: string,
  prompt: string,
  model: string = models.deepseek_v3
): Promise<Result<string>> {
  // Check the key for OpenRouter
  if (!process.env.OPENROUTER_API_KEY) {
    return {
      success: false,
      error: 'Missing API key.',
    }
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
            content: prompt,
          },
          {
            role: 'user',
            content: question,
          },
        ],
      }),
    })

    // Check if HTTP failed
    if (!res.ok) {
      const errorData = await res.json()
      console.error('API error:', errorData)
      return {
        success: false,
        error: 'The spirits remain silent due to a network disruption.',
      }
    }

    // Parse JSON and check logical errors inside
    const data = await res.json()

    if (data.error) {
      console.error('API logic error:', data.error)
      return {
        success: false,
        error: data.error.message || 'The spirits have declined your request.',
      }
    }

    // Log the raw content to check the format when you change the model or prompt
    // console.log('Raw AI response:', data)
    // console.log('AI message:', data.choices?.[0]?.message)

    const content = data.choices?.[0]?.message?.content || ''
    // console.log('AI response:', content)

    // Check if the content is empty or not
    if (!content) {
      return {
        success: false,
        error: 'The spirits remain silent.',
      }
    }

    return {
      success: true,
      data: content,
    }
  } catch (error) {
    console.error('Error fetching answer from AI:', error)
    return {
      success: false,
      error: 'Something went wrong while talking to the spirits.',
    }
  }
}
