import { askWithFallback } from '@/lib/ai'
import { prompts } from '@/lib/prompts'
import { ApiResponse } from '@/types/api'

export async function POST(req: Request): Promise<Response> {
  try {
    const { lastQuestion, answer } = await req.json()

    // Reject if either question or answer is missing
    if (!lastQuestion?.trim() || !answer?.trim()) {
      const response: ApiResponse<null> = {
        success: false,
        error: 'Missing question or answer',
      }
      return Response.json(response, { status: 400 })
    }

    if (lastQuestion.length > 200) {
      const response: ApiResponse<null> = {
        success: false,
        error: 'Invalid question length',
      }
      return Response.json(response, { status: 400 })
    }

    // Format the user input for contextual explanation
    const userPrompt = `Question: ${lastQuestion}\nAnswer: ${answer}`
    const systemPrompt = prompts.oracle.longPrompt

    // Request a deeper explanation based on previous answer and original question
    const result = await askWithFallback(userPrompt, systemPrompt)

    // Return the expanded explanation
    const response: ApiResponse<string> = {
      success: true,
      data: result.data,
    }

    return Response.json(response)
  } catch (error) {
    console.error('Error in /api/explanation:', error)

    // Return a generic error response
    const response: ApiResponse<null> = {
      success: false,
      error: 'Internal Server Error',
    }

    return Response.json(response, { status: 500 })
  }
}
