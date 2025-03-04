"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import "../styles/SearchForm.css"

const regionColors = {
  EUNE: "blue",
  EUW: "green",
  NA: "red",
  KR: "amber",
}

function SearchForm() {
  const [username, setUsername] = useState("")
  const [region, setRegion] = useState("EUNE")
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()

    // Format the username for the URL (replace # with -)
    const formattedUsername = username.replace("#", "-")

    // Redirect to the profile page
    navigate(`/profile/${formattedUsername}?region=${region.toLowerCase()}`)
  }

  return (
    <form onSubmit={handleSubmit} className="search-form">
      <div className="search-container">
        <input
          type="text"
          placeholder="Enter summoner name"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="search-input"
          required
        />
        <div className="select-container">
          <select
            value={region}
            onChange={(e) => setRegion(e.target.value)}
            className={`region-select region-${regionColors[region]}`}
          >
            {Object.keys(regionColors).map((key) => (
              <option key={key} value={key}>
                {key}
              </option>
            ))}
          </select>
          <div className="select-arrow"></div>
        </div>
        <button type="submit" className="search-button">
          <svg
            className="search-icon"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
          <span>Search</span>
        </button>
      </div>
    </form>
  )
}

export default SearchForm

