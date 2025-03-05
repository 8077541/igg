"use client"

import { useState, useEffect } from "react"
import MatchCard from "./MatchCard"
import "../styles/MatchList.css"

function MatchList({ matchIds, region, summonerName }) {
  const [matches, setMatches] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [page, setPage] = useState(1)
  const matchesPerPage = 5

  useEffect(() => {
    // Reset state when matchIds changes
    setMatches([])
    setLoading(true)
    setError(null)
    setPage(1)

    // Only fetch the first page of matches initially
    fetchMatchBatch(1)
  }, [matchIds]) // Removed unnecessary dependencies: region

  const fetchMatchBatch = async (pageNum) => {
    setLoading(true)

    try {
      // Calculate which matches to fetch based on page number
      const startIndex = (pageNum - 1) * matchesPerPage
      const endIndex = Math.min(startIndex + matchesPerPage, matchIds.length)
      const idsToFetch = matchIds.slice(startIndex, endIndex)

      // Fetch each match data in parallel
      const matchPromises = idsToFetch.map((id) => fetchMatchData(id))
      const newMatches = await Promise.all(matchPromises)

      // Add the new matches to the existing ones
      setMatches((prev) => {
        // Create a map of existing matches to avoid duplicates
        const existingMap = new Map(prev.map((match) => [match.matchId, match]))

        // Add new matches that don't already exist
        newMatches.forEach((match) => {
          if (match && !existingMap.has(match.matchId)) {
            existingMap.set(match.matchId, match)
          }
        })

        // Convert map back to array and sort by gameCreation (newest first)
        return Array.from(existingMap.values()).sort((a, b) => b.gameCreation - a.gameCreation)
      })
    } catch (err) {
      setError("Failed to load match data")
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const fetchMatchData = async (matchId) => {
   
    const response = await fetch(`http://localhost:5011/getMatch?matchId=${matchId}`)
    const data = await response.json()
    console.log(data)
    return data
    
    }
  

  const loadMoreMatches = () => {
    const nextPage = page + 1
    setPage(nextPage)
    fetchMatchBatch(nextPage)
  }

  const hasMoreMatches = matchIds.length > matches.length

  return (
    <div className="match-history">
      {matches.map((match) => (
        <MatchCard key={match.matchId} match={match} summonerName={summonerName} />
      ))}

      {loading && (
        <div className="loading-indicator">
          <div className="spinner"></div>
          <p>Loading matches...</p>
        </div>
      )}

      {error && (
        <div className="error-message">
          {error}
          <button onClick={() => fetchMatchBatch(page)}>Retry</button>
        </div>
      )}

      {!loading && !error && hasMoreMatches && (
        <button className="load-more-button" onClick={loadMoreMatches}>
          Load More Matches
        </button>
      )}

      {!loading && !error && matches.length === 0 && <div className="no-matches">No match history found</div>}
    </div>
  )
}

export default MatchList

