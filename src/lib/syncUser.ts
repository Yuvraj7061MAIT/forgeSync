import { prisma } from '@/lib/db'
import { currentUser } from '@clerk/nextjs/server'

export async function syncUserToDB() {
  const user = await currentUser()
  if (!user) return null

  const email = user.emailAddresses?.[0]?.emailAddress
  if (!email) return null

  const existingUser = await prisma.user.findUnique({
    where: { email },
  })

  if (!existingUser) {
    await prisma.user.create({
      data: {
        id: user.id, // optional: only if you're syncing Clerk ID
        email,
        name: [user.firstName, user.lastName].filter(Boolean).join(' '),
        image: user.imageUrl,
      },
    })
  }

  return user
}
