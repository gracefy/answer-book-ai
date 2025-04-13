import { askWithFallback } from '@/lib/ai'
import { prompts } from '@/lib/prompts'
import { ApiResponse } from '@/types/api'

export async function POST(req: Request): Promise<Response> {
  try {
    const { question } = await req.json()

    // Reject if question is missing or empty
    if (!question || question.trim() === '') {
      const response: ApiResponse<null> = {
        success: false,
        error: 'No question provided',
      }
      return Response.json(response, { status: 400 })
    }

    // Call the AI with fallback logic to get a short poetic answer
    const result = await askWithFallback(question, prompts.oracle.shortPrompt)

    // Return a successful response with the generated answer
    const response: ApiResponse<string> = {
      success: true,
      data: result.data,
    }

    return Response.json(response)
  } catch (error) {
    console.error('Error in /api/answer:', error)

    // Return a generic error response
    const response: ApiResponse<null> = {
      success: false,
      error: 'Internal Server Error',
    }

    return Response.json(response, { status: 500 })
  }
}
