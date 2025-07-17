import { Header } from "@/components/header"

export default function SearchPage() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 w-screen overflow-x-hidden">
      <Header />
      <main className="flex flex-col items-center justify-center flex-grow text-center px-4 pt-24 pb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Search Quizzes</h1>
        <p className="text-lg text-gray-700">This is where you can search for quizzes.</p>
        {/* Add search input and results here */}
      </main>
    </div>
  )
}