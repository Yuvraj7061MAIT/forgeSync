import { auth, clerkClient } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function POST() {
  const { userId } = await auth()
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    const clerk = await clerkClient()
    const clerkUser = await clerk.users.getUser(userId)

    const existingUser = await prisma.user.findUnique({
      where: { email: clerkUser.emailAddresses[0].emailAddress },
    })

    if (existingUser) {
      return NextResponse.json({ message: 'User already exists' })
    }

    const newUser = await prisma.user.create({
      data: {
        email: clerkUser.emailAddresses[0].emailAddress,
        name: `${clerkUser.firstName ?? ''} ${clerkUser.lastName ?? ''}`.trim(),
        image: clerkUser.imageUrl,
      },
    })

    return NextResponse.json({ message: 'User created', user: newUser })
  } catch (err) {
    console.error('Error creating user:', err)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
