import { getServerSession, getUserStats, getTopUsers } from "@/lib/auth"
import { redirect } from "next/navigation"
import { AdminDashboard } from "@/components/admin-dashboard"
import { Header } from "@/components/header"

export default async function AdminPage() {
  const session = await getServerSession()
  
  if (!session?.user?.isAdmin) {
    redirect("/")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100">
      <Header />
      <main className="container mx-auto px-4 pt-24 pb-8">
        <AdminDashboard />
      </main>
    </div>
  )
}