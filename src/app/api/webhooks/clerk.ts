import { prisma } from '@/lib/db'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id, email_addresses, image_url, first_name, last_name } = req.body.data

  const email = email_addresses?.[0]?.email_address

  if (!email) return res.status(400).json({ error: 'Missing email' })

  await prisma.user.upsert({
    where: { email },
    update: {},
    create: {
      email,
      name: `${first_name || ''} ${last_name || ''}`.trim(),
      image: image_url || null,
    },
  })

  return res.status(200).json({ message: 'User synced with DB' })
}
