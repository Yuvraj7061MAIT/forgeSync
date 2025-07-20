// /app/api/onboarding/route.ts

import { prisma } from '@/lib/db'
import { auth } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const { userId } = await auth()
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const body = await req.json()
  const { organizationName, role } = body

  const user = await prisma.user.findUnique({ where: { id: userId } })
  if (!user) return NextResponse.json({ error: 'User not found' }, { status: 404 })

  const org = await prisma.organization.create({
    data: {
      name: organizationName,
      members: {
        create: {
          userId: user.id,
          role,
        },
      },
    },
  })

  return NextResponse.json({ success: true, organization: org })
}
