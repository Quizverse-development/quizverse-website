import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Play, Search } from "lucide-react"

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-purple-50 via-white to-indigo-50">
      <Header />
      <main className="flex flex-col items-center justify-center flex-grow text-center max-w-4xl mx-auto px-4 pt-32 pb-8">
        <div className="space-y-8">
          <div className="space-y-4">
            <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 mb-4 leading-tight">
              Welcome to <span className="text-purple-600">Quizverse</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-700 max-w-2xl mx-auto">
              Explore a universe of quizzes on various topics. Test your knowledge, learn new things, and challenge your
              friends!
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-purple-600 hover:bg-purple-700">
              <Link href="/create-game">
                <Play className="mr-2 h-5 w-5" />
                Start Quizzing
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-purple-600 text-purple-600 hover:bg-purple-50">
              <Link href="/search">
                <Search className="mr-2 h-5 w-5" />
                Browse Categories
              </Link>
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 max-w-3xl mx-auto">
            <div className="text-center p-6 rounded-lg bg-white/50 backdrop-blur-sm border">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Play className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Create Games</h3>
              <p className="text-sm text-gray-600">Host your own quiz games and invite friends to join</p>
            </div>
            
            <div className="text-center p-6 rounded-lg bg-white/50 backdrop-blur-sm border">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Join Games</h3>
              <p className="text-sm text-gray-600">Enter a game code to join exciting quiz challenges</p>
            </div>
            
            <div className="text-center p-6 rounded-lg bg-white/50 backdrop-blur-sm border">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <div className="w-6 h-6 bg-purple-600 rounded-full" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Track Progress</h3>
              <p className="text-sm text-gray-600">Monitor your quiz performance and achievements</p>
            </div>
          </div>
        </div>
      </main>
      
      <footer className="mt-auto py-6 border-t bg-white/50 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="text-gray-600 text-sm">
            &copy; {new Date().getFullYear()} Quizverse. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}
