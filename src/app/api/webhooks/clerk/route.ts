// app/api/webhooks/clerk/route.ts

import { prisma } from '@/lib/db'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { id, email_addresses, image_url, first_name, last_name } = body.data

    const email = email_addresses?.[0]?.email_address

    if (!email) {
      return NextResponse.json({ error: 'Missing email' }, { status: 400 })
    }

    await prisma.user.upsert({
      where: { email },
      update: {},
      create: {
        email,
        name: `${first_name || ''} ${last_name || ''}`.trim(),
        image: image_url || null,
      },
    })

    return NextResponse.json({ message: 'User synced with DB' }, { status: 200 })

  } catch (error) {
    console.error('Webhook error:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
