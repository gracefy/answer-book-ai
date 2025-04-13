import { askWithFallback } from '@/lib/ai'
import { prompts } from '@/lib/prompts'
import { ApiResponse } from '@/types/api'

export async function POST(req: Request): Promise<Response> {
  try {
    const { lastQuestion, answer } = await req.json()

    // Validate the question
    if (!lastQuestion?.trim() || !answer?.trim()) {
      const response: ApiResponse<null> = {
        success: false,
        error: 'Missing question or answer',
      }
      return Response.json(response, { status: 400 })
    }

    const userPrompt = `Question: ${lastQuestion}\nAnswer: ${answer}`
    const systemPrompt = prompts.oracle.longPrompt

    // Get the answer from the AI
    const result = await askWithFallback(userPrompt, systemPrompt)

    const response: ApiResponse<string> = {
      success: true,
      data: result.data,
    }

    return Response.json(response)
  } catch (error) {
    console.error('Error in /api/explanation:', error)

    const response: ApiResponse<null> = {
      success: false,
      error: 'Internal Server Error',
    }

    return Response.json(response, { status: 500 })
  }
}
