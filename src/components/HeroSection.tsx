'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

export default function HeroSection() {
  return (
    <section
      className="relative text-white py-75 px-0 overflow-hidden" // px-0: no horizontal padding
    >
      {/* Background animated gradient */}
<motion.div
  className="absolute inset-0 z-0"
  initial={{ opacity: 0.7 }}
  animate={{ opacity: [0.7, 1, 0.7] }}
  transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
  style={{
    background: 'radial-gradient(circle at 30% 40%, #433D8B, #0a0f0a 80%)',
  }}
/>


      {/* Floating Image */}
      <motion.img
        src="/hero-illustration.png"
        alt="Forgesync Real-time Collaboration"
        className="absolute right-16 top-[20%] w-72 md:w-96 opacity-90 z-10 pointer-events-none animate-floating"
        initial={{ y: 0 }}
        animate={{ y: [0, -15, 0] }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      <div className="relative z-20 w-full flex flex-col md:flex-row items-start justify-start gap-12 mt-20">
        {/* Left Side */}
        <motion.div
          className="w-full md:w-[60%] px-25" // slightly padded only for mobile readability
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <h1 className="text-2xl md:text-6xl font-extrabold leading-tight mb-6 text-green-300">
            Collaborate Visually. <br />
            Commit Your Design Flow.
          </h1>
          <p className="text-lg text-green-200 max-w-xl mb-8">
            Forgesync brings version control to designers – with real-time sync, team-based editing, and merge-ready commits. Built for modern UI teams.
          </p>

          <Link href="/dashboard">
            <button className="bg-green-400 hover:bg-green-500 text-black font-semibold px-6 py-3 rounded-xl shadow-lg transition-all duration-300 transform hover:scale-105">
              Go to Dashboard
            </button>
          </Link>
        </motion.div>

        {/* Spacer for symmetry */}
        <div className="flex-1 hidden md:block"></div>
      </div>
    </section>
  )
}
