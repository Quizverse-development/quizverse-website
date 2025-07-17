"use client"

import Link from "next/link"
import { UserAuthButton } from "@/components/user-auth-button"
import { JoinGameDialog } from "@/components/join-game-dialog"
import { CreateGameDialog } from "@/components/create-game-dialog"
import { Button } from "@/components/ui/button"
import { useSession } from "@/components/auth-provider"
import { ThemeSelector } from "@/components/theme-selector"

export function Header() {
  const { data: session } = useSession()

  return (
    <header className="w-full bg-white/80 backdrop-blur-md shadow-sm border-b px-4 py-3 sm:p-4 flex items-center justify-between fixed top-0 left-0 z-50 max-w-[100vw] overflow-x-hidden">
      <div className="flex items-center gap-6">
        <Link href="/" className="text-xl sm:text-2xl font-bold text-purple-600 hover:text-purple-700 transition-colors">
          QuizVerse
        </Link>
        <nav className="hidden md:flex gap-2">
          <Button variant="ghost" asChild>
            <Link href="/">Home</Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link href="/search">Browse Quizzes</Link>
          </Button>
          {session?.user?.isAdmin && (
            <Button variant="ghost" asChild>
              <Link href="/admin">Admin</Link>
            </Button>
          )}
        </nav>
      </div>
      <div className="flex items-center gap-1 sm:gap-2">
        {session && (
          <>
            <div className="hidden sm:block">
              <JoinGameDialog />
            </div>
          </>
        )}
        <ThemeSelector />
        <UserAuthButton />
      </div>
    </header>
  )
}