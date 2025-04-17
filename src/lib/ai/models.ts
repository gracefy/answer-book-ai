// See available models: https://openrouter.ai/models
//Limitation: Free quota limited to 50 requests/day via OpenRouter.
export const models = {
  /**
   * DeepSeek V3 — LLM with GPT-4-like reasoning
   * Pros: High reasoning, great for Chinese, metaphor ok
   * Cons: Slow, sometimes no response
   */
  deepseek_v3: 'deepseek/deepseek-chat-v3-0324:free',
  /**
   * GPT-4o Mini — OpenAI's latest general-purpose model
   * Pros: Reliable, accurate, follows prompts well
   * Cons: Paid
   */
  openai_gpt4o: 'openai/gpt-4o-mini',

  /**
   * DeepSeek R1 — Lightweight variant
   * Pros: Free and fast, good for Chinese
   * Cons: Less sharp, less poetic
   */
  deepseek_r1: 'deepseek/deepseek-r1:free',

  /**
   * Gemini Flash 2.0 — Fast-response Google model
   * Pros: Very fast, short Q&A friendly
   * Cons: Not creative, quota limited
   */
  gemini_flash_2: 'google/gemini-2.0-flash-exp:free',

  /**
   * Gemini Pro 2.5 — Flagship Google model
   * Pros: Sometimes brilliant, Google's best
   * Cons: Fussy with creative prompts, quota limited
   */
  gemini_pro_2_5: 'google/gemini-2.5-pro-exp-03-25:free',
}

/// Fallback order for models
export const fallbackList = [
  // models.deepseek_v3,
  models.openai_gpt4o,
  // models.deepseek_r1,
  // models.gemini_flash_2,
  // models.gemini_pro_2_5,
]
