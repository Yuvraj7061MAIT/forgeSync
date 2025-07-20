// app/layout.tsx

import './globals.css'
import { ClerkProvider } from '@clerk/nextjs'
import { Inter } from 'next/font/google'
import { prisma } from '@/lib/db'

import { redirect } from 'next/navigation'
import { auth } from '@clerk/nextjs/server'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Forgesync – Real-Time Collaborative Design Platform',
  description:
    'Forgesync is a cutting-edge real-time collaborative design SaaS platform for designers, teams, and developers. Share, edit, and innovate in sync.',
  keywords: [
    'Forgesync',
    'design SaaS platform',
    'collaborative design tool',
    'real-time design collaboration',
    'UI/UX design platform',
    'remote design teams',
    'Figma alternative',
    'design in sync',
    'real-time UI collaboration',
    'ForgeSync design system',
  ].join(', '),
  authors: [{ name: 'Forgesync Team', url: 'https://forgesync.com' }],
  openGraph: {
    title: 'Forgesync – Real-Time Collaborative Design Platform',
    description:
      'Work together on designs from anywhere. Forgesync lets your team collaborate in real-time, streamlining workflows and boosting productivity.',
    url: 'https://forgesync.com',
    siteName: 'Forgesync',
    images: [
      {
        url: 'https://forgesync.com/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Forgesync – Real-Time Collaborative Design Tool',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Forgesync – Real-Time Collaborative Design Platform',
    description:
      'Design together, faster. Forgesync enables seamless design collaboration with real-time editing features.',
    site: '@forgesync',
    images: ['https://forgesync.com/og-image.png'],
  },
  robots: 'index, follow',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { userId } = await auth()

  if (userId) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: { organizationMembers: true },
    })

    if (user && user.organizationMembers.length === 0) {
      redirect('/onboarding')
    }
  }

  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>{children}</body>
      </html>
    </ClerkProvider>
  )
}
