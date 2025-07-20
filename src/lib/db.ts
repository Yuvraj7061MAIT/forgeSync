// lib/db.ts
import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

// Reuse Prisma client in development to avoid hot-reload issues
export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: ['query'], // helpful for debugging queries
  })

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma
}
