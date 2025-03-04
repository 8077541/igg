"use client"

import { useState } from "react"
import { Search } from "lucide-react"
import { useRouter } from "next/navigation"

const regionColors = {
  EUNE: "bg-blue-500 hover:bg-blue-400",
  EUW: "bg-emerald-500 hover:bg-emerald-400",
  NA: "bg-red-500 hover:bg-red-400",
  KR: "bg-amber-500 hover:bg-amber-400",
}

export function SearchForm() {
  const [username, setUsername] = useState("")
  const [region, setRegion] = useState("EUNE")
  const router = useRouter()

  const handleSubmit = (e) => {
    e.preventDefault()

    // Format the username for the URL (replace # with -)
    const formattedUsername = username.replace("#", "-")

    // Redirect to the profile page
    router.push(`/profile/${formattedUsername}?region=${region.toLowerCase()}`)
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto">
      <div className="relative flex items-stretch bg-gray-800 rounded-lg overflow-hidden shadow-lg">
        <input
          type="text"
          placeholder="Enter summoner name"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="flex-grow bg-transparent text-white placeholder-gray-400 px-4 py-3 text-lg focus:outline-none"
          required
        />
        <div className="relative">
          <select
            value={region}
            onChange={(e) => setRegion(e.target.value)}
            className={`${regionColors[region]} text-white px-3 py-3 text-lg focus:outline-none appearance-none cursor-pointer pr-8 transition-colors duration-200 h-full font-medium`}
          >
            {Object.entries(regionColors).map(([key, value]) => (
              <option key={key} value={key} className={value.split(" ")[0]}>
                {key}
              </option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-white">
            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
              <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
            </svg>
          </div>
        </div>
        <button
          type="submit"
          className="bg-purple-600 hover:bg-purple-500 text-white px-6 flex items-center justify-center transition-colors duration-300"
        >
          <Search className="h-5 w-5" />
          <span className="ml-2 font-medium">Search</span>
        </button>
      </div>
    </form>
  )
}

