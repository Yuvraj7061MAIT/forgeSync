'use client'

import Link from 'next/link'
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from '@clerk/nextjs'

export default function Navbar() {
  return (
    <nav className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-6xl">
      <div className="backdrop-blur-lg bg-white/10 border border-white/20 rounded-xl px-6 py-3 shadow-xl flex justify-between items-center text-white">

        <Link href="/">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-green-300 via-blue-400 to-green-500 bg-clip-text text-transparent">
            Forgesync
          </h1>
        </Link>

        <div className="flex items-center gap-6 text-sm font-medium">
          <Link href="/features" className="hover:text-green-300 transition">Features</Link>
          <Link href="/pricing" className="hover:text-green-300 transition">Pricing</Link>
          <Link href="/contact" className="hover:text-green-300 transition">Contact Us</Link>

          <SignedOut>
            <div className="flex gap-3">
              <SignUpButton mode="modal">
                <button className="px-4 py-1 bg-blue-600 hover:bg-green-500 rounded-md text-sm transition">
                  Sign Up
                </button>
              </SignUpButton>
              <SignInButton mode="modal">
                <button className="px-4 py-1 border border-white hover:border-green-400 rounded-md text-sm transition">
                  Sign In
                </button>
              </SignInButton>
            </div>
          </SignedOut>

          <SignedIn>
            <Link href="/admin" className="text-sm px-3 py-1 bg-green-600 hover:bg-blue-500 rounded-md transition">
              Admin
            </Link>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>
        </div>
      </div>
    </nav>
  )
}
