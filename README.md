# AnswerBook

A minimalist, symbolic Q&A interface powered by AI.  
Built as a learning project to explore React architecture, state management, and third-party model integration.

## Features

- Short symbolic answers, followed by expanded poetic explanations
- Auto-replies in the same language as the question
- Model fallback system (retry with multiple free models on failure or rate limit)
- Crystal ball ask button with animation
- Input error feedback with subtle shake animation
- Typewriter effect for long-form explanations
- Responsive layout and themed background

## Tech Stack

- Next.js + TypeScript + TailwindCSS
- OpenRouter API for multi-model access
- Custom React hooks (`useAskFlow`, `useAnswerFlow`) for clean logic separation
- Framer Motion for transitions and subtle UI animations

## Models Used

Fallback order includes:

- `deepseek/deepseek-chat-v3-0324` (strong reasoning, limited quota)
- `openai/gpt-4o-mini` (stable, accurate)
- `deepseek/deepseek-r1` (lightweight fallback)
- `google/gemini-2.0-flash-exp`
- `google/gemini-2.5-pro-exp-03-25`

> Note: Model usage is subject to daily free limits via OpenRouter.

## Development Notes

This is an MVP built with focus on clean component design, UI feedback, and prompt-to-response architecture.  
The goal is to gradually expand features while keeping the experience minimal and focused.

## TODO

- Add prompt/response history
- Deploy model usage logging (for debugging fallback behavior)
- Support user-defined characters / personas

## Getting Started

```bash
# clone the repo
git clone https://github.com/gracefy/answer-book-ai.git

# install dependencies
npm install

# set your in .env.local
OPENROUTER_API_KEY=your-api-key-here

# start the dev server
npm dev
```
