// app/api/webhooks/user/route.ts
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function POST(req: Request) {
  try {
    const body = await req.json()

    const { id, email_addresses, image_url, first_name, last_name } = body.data

    const email = email_addresses?.[0]?.email_address
    if (!email) {
      return new NextResponse('Email not found in webhook payload', { status: 400 })
    }

    await prisma.user.upsert({
      where: { email },
      update: {},
      create: {
        id,
        email,
        name: [first_name, last_name].filter(Boolean).join(' '),
        image: image_url,
      },
    })

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('[CLERK_WEBHOOK_ERROR]', err)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}
