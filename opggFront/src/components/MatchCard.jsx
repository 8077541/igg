"use client"

import { useState, useEffect } from "react"
import "../styles/MatchCard.css"

function MatchCard({ match, summonerName }) {
  const [expanded, setExpanded] = useState(false)
  const [playerData, setPlayerData] = useState(null)

  useEffect(() => {
    // Find the player in the match data
    if (match && match.teams) {
        
      // Look in both teams for the player
      const blueTeamPlayer = match.teams.blue.find((p) => p.name === summonerName)
      const redTeamPlayer = match.teams.red.find((p) => p.name === summonerName)

      // Set the player data
      setPlayerData(blueTeamPlayer || redTeamPlayer)
    }
  }, [match, summonerName])

  const toggleExpanded = () => {
    setExpanded(!expanded)
  }

  // Format timestamp to readable time
  const formatTimeAgo = (timestamp) => {
    if (!timestamp) return "Unknown"

    const now = Date.now()
    const diff = now - timestamp

    // Convert to minutes, hours, days
    const minutes = Math.floor(diff / 60000)
    const hours = Math.floor(minutes / 60)
    const days = Math.floor(hours / 24)

    if (days > 0) return `${days}d ago`
    if (hours > 0) return `${hours}h ago`
    return `${minutes}m ago`
  }

  // Format game duration
  const formatDuration = (seconds) => {
    if (!seconds) return "Unknown"

    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60

    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`
  }

  // If match data isn't loaded yet
  if (!match) {
    return <div className="match-card loading">Loading match data...</div>
  }

  // If player data isn't found
  if (!playerData) {
    return (
      <div className="match-card">
        <div className="match-error">Player data not found in this match</div>
      </div>
    )
  }

  const isWin = match.win
  const gameCreationDate = new Date(match.gameCreation)
  const queueType = match.gameType || "Unknown Queue"
  const timeAgo = match.timeAgo || formatTimeAgo(match.gameCreation)
  const duration = formatDuration(match.gameDuration)

  return (
    <div className={`match-card ${isWin ? "match-win" : "match-loss"}`}>
      {/* Match Summary */}
      <button onClick={toggleExpanded} className="match-summary">
        <div className="match-champion">
          <div className="champion-icon">
            <span>{playerData.champion.charAt(0)}</span>
            <div className="champion-level">{playerData.level}</div>
          </div>
          <div className="champion-info">
            <div className="champion-name">{playerData.champion}</div>
            <div className="game-info">
              <span className="game-type">{queueType}</span>
              <span className="game-time">
                {timeAgo} • {duration}
              </span>
            </div>
          </div>
        </div>

        <div className="match-stats">
          <div className="match-result">
            <div className="result-text">{isWin ? "Victory" : "Defeat"}</div>
          </div>

          <div className="match-kda">
            <div className="kda-numbers">
              {playerData.kills}/{playerData.deaths}/{playerData.assists}
            </div>
            <div className="kda-ratio">
              {((playerData.kills + playerData.assists) / (playerData.deaths || 1)).toFixed(2)} KDA
            </div>
          </div>

          <div className="match-cs">
            <div className="cs-numbers">{playerData.cs} CS</div>
            <div className="cs-per-min">{(playerData.cs / (match.gameDuration / 60)).toFixed(1)} CS/m</div>
          </div>

          <div className="expand-icon">
            {expanded ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="18 15 12 9 6 15"></polyline>
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            )}
          </div>
        </div>
      </button>

      {/* Expanded Match Details */}
      {expanded && (
        <div className="match-details">
          {/* Team Stats */}
          <div className="team-stats">
            <div className="blue-team-stats">
              <div className="team-kills">{match.teams.blue.reduce((acc, player) => acc + player.kills, 0)} Kills</div>
              <div className="team-gold">
                {match.teams.blue.reduce((acc, player) => acc + player.gold, 0).toLocaleString()} Gold
              </div>
            </div>
            <div className="red-team-stats">
              <div className="team-kills">{match.teams.red.reduce((acc, player) => acc + player.kills, 0)} Kills</div>
              <div className="team-gold">
                {match.teams.red.reduce((acc, player) => acc + player.gold, 0).toLocaleString()} Gold
              </div>
            </div>
          </div>

          {/* Teams */}
          <div className="teams-container">
            <div className="blue-team">
              {match.teams.blue.map((player, index) => (
                <div key={index} className={`player-row ${player.name === summonerName ? "current-player" : ""}`}>
                  <div className="player-champion">
                    <div className="player-icon">
                      <span>{player.champion.charAt(0)}</span>
                      <div className="player-level">{player.level}</div>
                    </div>
                    <div className="player-info">
                      <div className="player-name">{player.name}</div>
                      <div className="player-champion-name">{player.champion}</div>
                    </div>
                  </div>
                  <div className="player-stats">
                    <div className="player-kda">
                      {player.kills}/{player.deaths}/{player.assists}
                    </div>
                    <div className="player-cs">{player.cs} CS</div>
                    <div className="player-gold">{player.gold.toLocaleString()} g</div>
                  </div>
                  <div className="player-items">
                    {player.items.map((item, i) => (
                      <div key={i} className="item"></div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <div className="red-team">
              {match.teams.red.map((player, index) => (
                <div key={index} className={`player-row ${player.name === summonerName ? "current-player" : ""}`}>
                  <div className="player-champion">
                    <div className="player-icon">
                      <span>{player.champion.charAt(0)}</span>
                      <div className="player-level">{player.level}</div>
                    </div>
                    <div className="player-info">
                      <div className="player-name">{player.name}</div>
                      <div className="player-champion-name">{player.champion}</div>
                    </div>
                  </div>
                  <div className="player-stats">
                    <div className="player-kda">
                      {player.kills}/{player.deaths}/{player.assists}
                    </div>
                    <div className="player-cs">{player.cs} CS</div>
                    <div className="player-gold">{player.gold.toLocaleString()} g</div>
                  </div>
                  <div className="player-items">
                    {player.items.map((item, i) => (
                      <div key={i} className="item"></div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default MatchCard

