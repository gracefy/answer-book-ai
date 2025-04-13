import { fallbackList } from './models'
import { askSingleModel } from './askSingleModel'
import { ApiResponse } from '@/types/api'

/**
 * Fallback function for AI model
 * @param question The question to ask
 * @param prompt The prompt to use
 * @returns The answer from the AI model
 */
export async function askWithFallback(
  question: string,
  prompt: string
): Promise<ApiResponse<string>> {
  for (const model of fallbackList) {
    const result = await askSingleModel(question, prompt, model)
    if (result.success) {
      console.log(`\n✅ ${model} answered successfully.\n`)
      return result
    }

    console.warn(`\n⚠️ ${model} failed, trying next..., ${result.error}\n`)
  }

  return { success: false, error: 'All models failed to respond.' }
}
