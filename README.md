# AnswerBook

A minimalist, symbolic Q&A interface powered by AI.  
Built as a learning project to explore modern web development techniques including **Next.js**, **PostgreSQL**, **Docker**, and **AI model integration**.

## Features

- Symbolic Q&A interface with themed background
- Seamless fallback across multiple AI models
- Animated feedback for input errors and response delays
- User-friendly, mobile-responsive layout
- Personalized question history: view, search, delete

## Tech Stack

- **Frontend**: Next.js 15 (App Router) + TypeScript + TailwindCSS + Framer Motion
- **Backend**: PostgreSQL + Prisma ORM + Server Actions + REST API routes
- **AI**: OpenRouter API for multi-model integration
- **DevOps**:
  - Docker for local PostgreSQL containerization
  - Railway for production PostgreSQL hosting
  - Vercel for full-stack Next.js deployment

## Version History

### ✅ Version 1.0

- Built the core Q&A interface using Next.js App Router and TailwindCSS
- Integrated multiple AI models via OpenRouter with fallback support
- Explored:
  - UI feedback through subtle animations (shake, typewriter, motion transitions)
  - Prompt/response design patterns
  - Symbolic and multilingual response handling

### ✅ Version 1.1

- Added **PostgreSQL** integration to support persistent **question history**
- Implemented:
  - **Search, pagination, deletion** of history entries
  - Backend logic via **API routes and Server Actions**
  - Production database hosting on **Railway**
  - Development database management using **Docker Compose**

## Future Plans

- User authentication and saved sessions
- Personalized prompt suggestions based on history
- AI persona switching
- Admin dashboard for model logging and analytics

## Getting Started

```bash
# clone the repo
git clone https://github.com/gracefy/answer-book-ai.git

# install dependencies
npm install

# Set environment variables in .env.local
OPENROUTER_API_KEY=your-api-key-here
DATABASE_URL=your-db-url-here

# start the dev server
npm run dev
```
