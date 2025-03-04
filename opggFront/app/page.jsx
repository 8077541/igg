import Link from "next/link"
import { SearchForm } from "@/components/search-form"

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex flex-col">
      <header className="container mx-auto p-4">
        <Link href="/" className="text-2xl font-bold text-white hover:text-purple-300 transition-colors">
          LEAGUEv0
        </Link>
      </header>

      <main className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-2xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-center text-white mb-8">Find Your Summoner</h1>
          <SearchForm />
        </div>
      </main>

      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="stars-container">
          <div className="stars"></div>
          <div className="stars2"></div>
          <div className="stars3"></div>
        </div>
      </div>
    </div>
  )
}

