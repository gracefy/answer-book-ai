// See available models: https://openrouter.ai/models
//Limitation: Free quota limited to 50 requests/day via OpenRouter.
export const models = {
  // Performance: Very close to GPT-4-level reasoning on short to mid-length tasks.
  deepseek_v3: 'deepseek/deepseek-chat-v3-0324:free',

  //Performance: Very good at structured output, language style matching, and prompt following.
  openai_gpt4o: 'openai/gpt-4o-mini',

  //Performance: Sometimes vague or off-topic.
  //Limitation: Less coherent in complex tasks.
  deepseek_r1: 'deepseek/deepseek-r1:free',

  //Performance: Extremely fast, but shallow. Good for short Q&A, bad for nuance.
  //Limitation: Creative tasks (e.g. poetry, emotional tone) are often dry or generic.
  gemini_flash_2: 'google/gemini-2.0-flash-exp:free',

  // Performance: Sometimes excellent, but also erratic; often refuses poetic or symbolic prompts.
  gemini_pro_2_5: 'google/gemini-2.5-pro-exp-03-25:free',
}

/// Fallback order for models
export const fallbackList = [
  models.deepseek_v3,
  models.openai_gpt4o,
  models.deepseek_r1,
  models.gemini_flash_2,
  models.gemini_pro_2_5,
]
