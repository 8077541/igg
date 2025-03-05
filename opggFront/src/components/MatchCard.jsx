"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import "../styles/MatchCard.css"

function MatchCard({ match, summonerName, region }) {
  const [expanded, setExpanded] = useState(false)
  const [playerData, setPlayerData] = useState(null)

  useEffect(() => {
    // Find the player in the match data
    if (match && match.participants) {
      // Look for the player by name in the participants array
      const player = match.participants.find((p) => p.riotIdGameName === summonerName)

      // Set the player data
      setPlayerData(player)
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

  // Format game mode
  const formatGameMode = (gameMode, queueId) => {
    if (queueId === 420) return "Ranked Solo/Duo"
    if (queueId === 440) return "Ranked Flex"
    if (gameMode === "CLASSIC") return "Classic"
    if (gameMode === "ARAM") return "ARAM"
    return gameMode || "Unknown"
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

  const isWin = playerData.win
  const gameCreationDate = new Date(match.gameCreation)
  const queueType = formatGameMode(match.gameMode, match.queueId)
  const timeAgo = formatTimeAgo(match.gameCreation)
  const duration = formatDuration(match.gameDuration)

  return (
    <div className={`match-card ${isWin ? "match-win" : "match-loss"}`}>
      {/* Match Summary */}
      <button onClick={toggleExpanded} className="match-summary">
        <div className="match-champion">
          <div className="champion-icon">
            <img
              src={`https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/champion-icons/${playerData.championId}.png`}
              alt={playerData.championName}
              className="champion-img"
            />
            <div className="champion-level">{playerData.champLevel}</div>
          </div>
          <div className="champion-info">
            <div className="champion-name">{playerData.championName}</div>
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
            <div className="cs-numbers">{playerData.totalMinionsKilled} CS</div>
            <div className="cs-per-min">
              {(playerData.totalMinionsKilled / (match.gameDuration / 60)).toFixed(1)} CS/m
            </div>
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
              <div className="team-kills">
                {match.participants.filter((p) => p.teamId === 100).reduce((acc, player) => acc + player.kills, 0)}{" "}
                Kills
              </div>
              <div className="team-gold">
                {match.participants
                  .filter((p) => p.teamId === 100)
                  .reduce((acc, player) => acc + player.goldEarned, 0)
                  .toLocaleString()}{" "}
                Gold
              </div>
            </div>
            <div className="red-team-stats">
              <div className="team-kills">
                {match.participants.filter((p) => p.teamId === 200).reduce((acc, player) => acc + player.kills, 0)}{" "}
                Kills
              </div>
              <div className="team-gold">
                {match.participants
                  .filter((p) => p.teamId === 200)
                  .reduce((acc, player) => acc + player.goldEarned, 0)
                  .toLocaleString()}{" "}
                Gold
              </div>
            </div>
          </div>

          {/* Teams */}
          <div className="teams-container">
            <div className="blue-team">
              {match.participants
                .filter((p) => p.teamId === 100)
                .map((player, index) => (
                  <div
                    key={index}
                    className={`player-row ${player.riotIdGameName === summonerName ? "current-player" : ""}`}
                  >
                    <div className="player-champion">
                      <div className="player-icon">
                        <img
                          src={`https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/champion-icons/${player.championId}.png`}
                          alt={player.championName}
                          className="champion-img"
                        />
                        <div className="player-level">{player.champLevel}</div>
                      </div>
                      <div className="player-info">
                        <Link
                          to={`/profile/${player.riotIdGameName}${player.riotIdTagLine ? `-${player.riotIdTagLine}` : ""}?region=${region || "euw"}`}
                          className="player-name-link"
                        >
                          {player.riotIdGameName}
                        </Link>
                        <div className="player-champion-name">{player.championName}</div>
                      </div>
                    </div>
                    <div className="player-stats">
                      <div className="player-kda">
                        {player.kills}/{player.deaths}/{player.assists}
                      </div>
                      <div className="player-cs">{player.totalMinionsKilled} CS</div>
                      <div className="player-gold">{player.goldEarned.toLocaleString()} g</div>
                    </div>
                    <div className="player-items">
                      {[player.item0, player.item1, player.item2, player.item3, player.item4, player.item5]
                        .filter((item) => item !== 0)
                        .map((item, i) => (
                          <img
                            key={i}
                            src={`https://ddragon.leagueoflegends.com/cdn/15.4.1/img/item/${item}.png`}
                            alt={`Item ${item}`}
                            className="item-img"
                          />
                        ))}
                    </div>
                  </div>
                ))}
            </div>
            <div className="red-team">
              {match.participants
                .filter((p) => p.teamId === 200)
                .map((player, index) => (
                  <div
                    key={index}
                    className={`player-row ${player.riotIdGameName === summonerName ? "current-player" : ""}`}
                  >
                    <div className="player-champion">
                      <div className="player-icon">
                        <img
                          src={`https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/champion-icons/${player.championId}.png`}
                          alt={player.championName}
                          className="champion-img"
                        />
                        <div className="player-level">{player.champLevel}</div>
                      </div>
                      <div className="player-info">
                        <Link
                          to={`/profile/${player.riotIdGameName}${player.riotIdTagLine ? `-${player.riotIdTagLine}` : ""}?region=${region || "euw"}`}
                          className="player-name-link"
                        >
                          {player.riotIdGameName}
                        </Link>
                        <div className="player-champion-name">{player.championName}</div>
                      </div>
                    </div>
                    <div className="player-stats">
                      <div className="player-kda">
                        {player.kills}/{player.deaths}/{player.assists}
                      </div>
                      <div className="player-cs">{player.totalMinionsKilled} CS</div>
                      <div className="player-gold">{player.goldEarned.toLocaleString()} g</div>
                    </div>
                    <div className="player-items">
                      {[player.item0, player.item1, player.item2, player.item3, player.item4, player.item5]
                        .filter((item) => item !== 0)
                        .map((item, i) => (
                          <img
                            key={i}
                            src={`https://ddragon.leagueoflegends.com/cdn/14.18.1/img/item/${item}.png`}
                            alt={`Item ${item}`}
                            className="item-img"
                          />
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

