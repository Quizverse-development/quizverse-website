import { getServerSession, getUserStats, getTopUsers } from "@/lib/auth"
import { redirect } from "next/navigation"
import { AdminDashboard } from "@/components/admin-dashboard"
import { Header } from "@/components/header"

export default async function AdminPage() {
  const session = await getServerSession()
  const stats = getUserStats()
  const topUsers = getTopUsers()
  
  if (!session?.user?.isAdmin) {
    redirect("/admin/login")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      <Header />
      <main className="container mx-auto px-4 pt-24 pb-8">
        <AdminDashboard stats={stats} topUsers={topUsers} />
      </main>
    </div>
  )
}