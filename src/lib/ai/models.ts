// See available models: https://openrouter.ai/models
export const models = {
  /**
   * DeepSeek Chat V3
   * Chinese LLM with surprisingly strong capabilities.
   * - Performance: Very close to GPT-4-level reasoning on short to mid-length tasks.
   * - Limitation: Free quota runs out fast. Not suitable for high-traffic fallback.
   */
  deepseek_v3: 'deepseek/deepseek-chat-v3-0324:free',

  /**
   * GPT-4o Mini (OpenAI)
   * OpenAI's latest model.
   * - Performance: Very good at structured output, language style matching, and prompt following.
   * - Limitation: Might be slower or paid depending on provider.
   */
  gpt4o: 'openai/gpt-4o-mini',

  /**
   * DeepSeek R1
   * Lighter version of DeepSeek, more stable quota but less sharp.
   * - Performance: Sometimes vague or off-topic.
   * - Limitation: Less coherent in complex tasks.
   */
  deepseek_r1: 'deepseek/deepseek-r1:free',

  /**
   * Gemini 2 Flash (Experimental)
   * Google’s fast-response model.
   * - Performance: Extremely fast, but shallow. Good for short Q&A, bad for nuance.
   * - Limitation: Creative tasks (e.g. poetry, emotional tone) are often dry or generic.
   * - Quota: Limited, despite being marked "free".
   */
  gemini_2: 'google/gemini-2.0-flash-exp:free',

  /**
   * Gemini 2.5 Pro (Preview)
   * Google’s flagship model.
   * - Performance: Sometimes excellent, but also erratic; often refuses poetic or symbolic prompts.
   * - Limitation: Very limited usage under free access; more like a demo.
   */
  gemini_2_pro: 'google/gemini-2.5-pro-exp-03-25:free',
}
