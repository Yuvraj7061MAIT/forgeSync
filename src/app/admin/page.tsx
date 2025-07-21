import { auth } from '@clerk/nextjs/server'
import { syncUserToDB } from '@/lib/syncUser'

export default async function AdminPage() {
  const { userId } = await auth()

  // Create user in DB if not already saved
  await syncUserToDB()

  return (
    <div>
      <h1 className="text-2xl font-bold">Admin Dashboard</h1>
      <p>Welcome, user ID: {userId}</p>
    </div>
  )
}
