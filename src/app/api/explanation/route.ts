import { getAnswerFromAI } from '@/lib/ai/openai'
import { prompts } from '@/lib/prompts'
import { ApiResponse } from '@/types/api'

export async function POST(req: Request): Promise<Response> {
  try {
    const { question, answer } = await req.json()

    // Validate the question
    if (!question?.trim() || !answer?.trim()) {
      const response: ApiResponse<null> = {
        success: false,
        error: 'Missing question or answer',
      }
      return Response.json(response, { status: 400 })
    }

    const userPrompt = `Question: ${question}\nAnswer: ${answer}`
    const systemPrompt = prompts.oracle.longPrompt

    // Get the answer from the AI
    const result = await getAnswerFromAI(userPrompt, systemPrompt)

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
