'use server'
import { Result } from '@/types/result'
import { askWithFallback } from '@/lib/ai'
import { prompts } from '@/lib/prompts'

export async function askQuestion(formData: FormData): Promise<Result<string>> {
  try {
    const question = formData.get('question')?.toString().trim()

    // Reject if question is missing or empty
    if (!question) {
      return {
        success: false,
        error: 'Please ask a question',
      }
    }

    if (question.length > 200) {
      return {
        success: false,
        error: 'Invalid question length',
      }
    }

    // Call the AI with fallback logic to get a short poetic answer
    const result = await askWithFallback(question, prompts.oracle.shortPrompt)

    // Return a successful response with the generated answer
    return {
      success: true,
      data: result.data,
    }
  } catch (error) {
    console.error('Error getting answer:', error)

    // Return a generic error response
    return {
      success: false,
      error: 'Internal Server Error',
    }
  }
}
