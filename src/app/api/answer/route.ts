import { askWithFallback } from '@/lib/ai'
import { prompts } from '@/lib/prompts'
import { ApiResponse } from '@/types/api'

export async function POST(req: Request): Promise<Response> {
  try {
    const { question } = await req.json()

    // Validate the question
    if (!question || question.trim() === '') {
      const response: ApiResponse<null> = {
        success: false,
        error: 'No question provided',
      }
      return Response.json(response, { status: 400 })
    }

    // Get the answer from the AI
    const result = await askWithFallback(question, prompts.oracle.shortPrompt)

    const response: ApiResponse<string> = {
      success: true,
      data: result.data,
    }

    return Response.json(response)
  } catch (error) {
    console.error('Error in /api/answer:', error)
    const response: ApiResponse<null> = {
      success: false,
      error: 'Internal Server Error',
    }

    return Response.json(response, { status: 500 })
  }
}
