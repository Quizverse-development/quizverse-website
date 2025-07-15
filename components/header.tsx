"use client"

import Link from "next/link"
import UserAuthButton from "@/components/user-auth-button"
import { JoinGameDialog } from "@/components/join-game-dialog"
import { CreateGameDialog } from "@/components/create-game-dialog"
import { Button } from "@/components/ui/button"
import { useSession } from "next-auth/react"

export function Header() {
  const { data: session } = useSession()

  return (
    <header className="w-full bg-white/80 backdrop-blur-md shadow-sm border-b p-4 flex items-center justify-between fixed top-0 left-0 z-50">
      <div className="flex items-center gap-6">
        <Link href="/" className="text-2xl font-bold text-purple-600 hover:text-purple-700 transition-colors">
          Quizverse
        </Link>
        <nav className="hidden md:flex gap-2">
          <Button variant="ghost" asChild>
            <Link href="/">Home</Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link href="/search">Search</Link>
          </Button>
        </nav>
      </div>
      <div className="flex items-center gap-2">
        {session && (
          <>
            <JoinGameDialog />
            <CreateGameDialog />
          </>
        )}
        <UserAuthButton />
      </div>
    </header>
  )
}
