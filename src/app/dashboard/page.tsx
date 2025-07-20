import { auth } from '@clerk/nextjs/server'

export default async function Dashboard() {
  const { userId } = await auth()
  if (!userId) return <div>Not signed in</div>

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <h2 className="text-3xl font-bold">Welcome to your Dashboard</h2>
      <p className="text-gray-400">Projects and designs will show here.</p>
    </div>
  )
}
