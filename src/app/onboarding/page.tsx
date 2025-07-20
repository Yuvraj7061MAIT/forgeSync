// /app/onboarding/page.tsx
'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function OnboardingPage() {
  const [organizationName, setOrganizationName] = useState('')
  const [role, setRole] = useState('admin')
  const router = useRouter()

  const handleSubmit = async () => {
    const res = await fetch('/api/onboarding', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ organizationName, role }),
    })

    if (res.ok) router.push('/dashboard')
  }

  return (
    <div className="p-6 max-w-md mx-auto">
      <h2 className="text-2xl mb-4">Set Up Your Organization</h2>
      <input
        type="text"
        placeholder="Organization Name"
        value={organizationName}
        onChange={(e) => setOrganizationName(e.target.value)}
        className="border p-2 w-full mb-4"
      />
      <select
        value={role}
        onChange={(e) => setRole(e.target.value)}
        className="border p-2 w-full mb-4"
      >
        <option value="admin">Admin</option>
        <option value="editor">Editor</option>
      </select>
      <button onClick={handleSubmit} className="bg-blue-500 text-white px-4 py-2">
        Submit
      </button>
    </div>
  )
}
