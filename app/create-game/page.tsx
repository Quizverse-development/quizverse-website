import { Header } from "@/components/header"
import { CreateGameDialog } from "@/components/create-game-dialog"

export default function CreateGamePage() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100">
      <Header />
      <main className="flex flex-col items-center justify-center flex-grow text-center px-4 pt-24 pb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Create a New Game</h1>
        <p className="text-lg text-gray-700 mb-8">Start your own quiz game and invite others to play!</p>
        <CreateGameDialog /> {/* You can also place the dialog directly on the page */}
      </main>
    </div>
  )
}
