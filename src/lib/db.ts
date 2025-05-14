import { PrismaClient } from '@prisma/client'

// Prevent multiple PrismaClient instances in development
const globalForPrisma = global as unknown as { prisma: PrismaClient }

// Reuse existing PrismaClient or create a new one
export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: ['error'],
  })

// Save to global object in development to avoid re-instantiating
if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma
}
