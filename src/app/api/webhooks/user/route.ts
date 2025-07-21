import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db' // ✅ using your existing db.ts

export async function POST(req: Request) {
  try {
    const body = await req.json()

    const { id, email_addresses, image_url, first_name, last_name } = body.data

    const email = email_addresses?.[0]?.email_address
    if (!email) {
      return new NextResponse('Email not found in webhook payload', { status: 400 })
    }

    // Sync user in your database
    await prisma.user.upsert({
      where: { email },
      update: {}, // no update for now
      create: {
        id, // Clerk ID as User.id (optional: could use cuid if you prefer)
        email,
        name: [first_name, last_name].filter(Boolean).join(' '),
        image: image_url,
      },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('[CLERK_WEBHOOK_ERROR]', error)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}
