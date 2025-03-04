"use client"

import { useState, useEffect } from "react"
import { useParams, useSearchParams, Link } from "react-router-dom"
import "../styles/ProfilePage.css"

// Extended mock data with detailed match information
const mockProfile = {
  username: "Faker",
  tag: "T1",
  region: "KR",
  level: 487,
  rank: {
    tier: "DIAMOND",
    division: "I",
    lp: 78,
  },
  winRate: 62,
  kda: "3.42",
  recentMatches: [
    {
      id: 1,
      win: true,
      champion: "Zed",
      championLevel: 18,
      kills: 12,
      deaths: 3,
      assists: 7,
      kda: "6.33",
      cs: 243,
      csPerMin: "8.7",
      gameDuration: 28,
      gameType: "Ranked Solo/Duo",
      timeAgo: "2h ago",
      totalGold: 15420,
      items: ["item1", "item2", "item3", "item4", "item5", "item6"],
      teams: {
        blue: [
          {
            champion: "Zed",
            name: "Faker",
            level: 18,
            kills: 12,
            deaths: 3,
            assists: 7,
            cs: 243,
            gold: 15420,
            items: ["item1", "item2", "item3", "item4", "item5", "item6"],
          },
          {
            champion: "Lee Sin",
            name: "Oner",
            level: 17,
            kills: 8,
            deaths: 4,
            assists: 12,
            cs: 198,
            gold: 13200,
            items: ["item1", "item2", "item3", "item4", "item5"],
          },
          {
            champion: "Azir",
            name: "Chovy",
            level: 18,
            kills: 6,
            deaths: 2,
            assists: 9,
            cs: 289,
            gold: 14800,
            items: ["item1", "item2", "item3", "item4", "item5", "item6"],
          },
          {
            champion: "Kai'Sa",
            name: "Gumayusi",
            level: 17,
            kills: 9,
            deaths: 1,
            assists: 8,
            cs: 267,
            gold: 14200,
            items: ["item1", "item2", "item3", "item4", "item5"],
          },
          {
            champion: "Thresh",
            name: "Keria",
            level: 16,
            kills: 1,
            deaths: 5,
            assists: 21,
            cs: 42,
            gold: 9800,
            items: ["item1", "item2", "item3", "item4"],
          },
        ],
        red: [
          {
            champion: "Sylas",
            name: "ShowMaker",
            level: 17,
            kills: 4,
            deaths: 7,
            assists: 3,
            cs: 221,
            gold: 11200,
            items: ["item1", "item2", "item3", "item4", "item5"],
          },
          {
            champion: "Viego",
            name: "Canyon",
            level: 16,
            kills: 3,
            deaths: 8,
            assists: 6,
            cs: 187,
            gold: 10400,
            items: ["item1", "item2", "item3", "item4"],
          },
          {
            champion: "Viktor",
            name: "Bdd",
            level: 16,
            kills: 2,
            deaths: 6,
            assists: 5,
            cs: 234,
            gold: 11000,
            items: ["item1", "item2", "item3", "item4", "item5"],
          },
          {
            champion: "Jinx",
            name: "Ruler",
            level: 16,
            kills: 5,
            deaths: 5,
            assists: 4,
            cs: 245,
            gold: 12100,
            items: ["item1", "item2", "item3", "item4", "item5"],
          },
          {
            champion: "Leona",
            name: "Life",
            level: 15,
            kills: 1,
            deaths: 10,
            assists: 8,
            cs: 31,
            gold: 8200,
            items: ["item1", "item2", "item3"],
          },
        ],
      },
    },
    // ... other matches with similar detailed data
  ],
}

function ProfilePage() {
  const { slug } = useParams()
  const [searchParams] = useSearchParams()
  const [profile, setProfile] = useState(null)
  const [expandedMatch, setExpandedMatch] = useState(null)

  const [username, tag] = slug.split("-")
  const region = searchParams.get("region") || "kr"

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch(
          `http://localhost:5011/getFullProfile?gameName=${username}&tagLine=${tag}&region=${region}1`
        )

        const data = await response.json()
        data.recentMatches = mockProfile.recentMatches
        setProfile(data)
        console.log(data)
      } catch (error) {
        console.error("Error fetching profile:", error)
      }
    }

    fetchProfile()
  }, [username, tag, region])

  if (!profile) {
    return (
      <div className="loading-container">
        <div className="loading-text">Loading profile...</div>
      </div>
    )
  }

  const getRankColor = (tier) => {
    const colors = {
      IRON: "rank-iron",
      BRONZE: "rank-bronze",
      SILVER: "rank-silver",
      GOLD: "rank-gold",
      PLATINUM: "rank-platinum",
      DIAMOND: "rank-diamond",
    }
    return colors[tier] || ""
  }

  const toggleMatch = (matchId) => {
    setExpandedMatch(expandedMatch === matchId ? null : matchId)
  }

  return (
    <div className="profile-page">
      <div className="container">
        <div className="back-link">
          <Link to="/">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="arrow-icon"
            >
              <line x1="19" y1="12" x2="5" y2="12"></line>
              <polyline points="12 19 5 12 12 5"></polyline>
            </svg>
            Back to Search
          </Link>
        </div>

        <div className="profile-content">
          {/* Profile Section */}
          <div className="profile-info">
            {/* Summoner Info Card */}
            <div className="summoner-card">
              <div className="summoner-header">
                <div className="avatar">{profile.gameName.charAt(0).toUpperCase()}</div>
                <div className="summoner-details">
                  <h1 className="summoner-name">{profile.gameName}</h1>
                  <div className="summoner-tag">#{profile.tagLine}</div>
                  <div className="summoner-region">{profile.region}</div>
                </div>
              </div>
              <div className="summoner-stats">
                <div className="stat-item">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="stat-icon"
                  >
                    <path d="M18 16.36v-1.36a4 4 0 0 0-4-4h-4a4 4 0 0 0-4 4v1.36"></path>
                    <path d="M12 12A4 4 0 0 0 12 4a4 4 0 0 0 0 8Z"></path>
                  </svg>
                  <span>Level {profile.summonerLevel}</span>
                </div>
                <div className="stat-item">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="stat-icon"
                  >
                    <path d="M12 1v4"></path>
                    <path d="M19.071 4.929l-2.829 2.829"></path>
                    <path d="M23 12h-4"></path>
                    <path d="M19.071 19.071l-2.829-2.829"></path>
                    <path d="M12 23v-4"></path>
                    <path d="M4.929 19.071l2.829-2.829"></path>
                    <path d="M1 12h4"></path>
                    <path d="M4.929 4.929l2.829 2.829"></path>
                  </svg>
                  <span className={`rank ${getRankColor(profile.soloTier)}`}>
                    {profile.soloTier} {profile.soloRank} ({profile.soloLeaguePoints} LP)
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Match History Section */}
          <div className="match-history">
            {profile.recentMatches.map((match) => (
              <div key={match.id} className={`match-card ${match.win ? "match-win" : "match-loss"}`}>
                {/* Match Summary */}
                <button onClick={() => toggleMatch(match.id)} className="match-summary">
                  <div className="match-champion">
                    <div className="champion-icon">
                      <span>{match.champion.charAt(0)}</span>
                      <div className="champion-level">{match.championLevel}</div>
                    </div>
                    <div className="champion-info">
                      <div className="champion-name">{match.champion}</div>
                      <div className="game-type">{match.gameType}</div>
                    </div>
                  </div>

                  <div className="match-stats">
                    <div className="match-result">
                      <div className="result-text">{match.win ? "Victory" : "Defeat"}</div>
                      <div className="time-ago">{match.timeAgo}</div>
                    </div>

                    <div className="match-kda">
                      <div className="kda-numbers">
                        {match.kills}/{match.deaths}/{match.assists}
                      </div>
                      <div className="kda-ratio">{match.kda} KDA</div>
                    </div>

                    <div className="match-cs">
                      <div className="cs-numbers">{match.cs}</div>
                      <div className="cs-per-min">{match.csPerMin} CS/m</div>
                    </div>

                    <div className="expand-icon">
                      {expandedMatch === match.id ? (
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
                {expandedMatch === match.id && (
                  <div className="match-details">
                    {/* Team Stats */}
                    <div className="team-stats">
                      <div className="blue-team-stats">
                        <div className="team-kills">
                          {match.teams.blue.reduce((acc, player) => acc + player.kills, 0)} Kills
                        </div>
                        <div className="team-gold">
                          {match.teams.blue.reduce((acc, player) => acc + player.gold, 0).toLocaleString()} Gold
                        </div>
                      </div>
                      <div className="red-team-stats">
                        <div className="team-kills">
                          {match.teams.red.reduce((acc, player) => acc + player.kills, 0)} Kills
                        </div>
                        <div className="team-gold">
                          {match.teams.red.reduce((acc, player) => acc + player.gold, 0).toLocaleString()} Gold
                        </div>
                      </div>
                    </div>

                    {/* Teams */}
                    <div className="teams-container">
                      <div className="blue-team">
                        {match.teams.blue.map((player, index) => (
                          <div key={index} className="player-row">
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
                          <div key={index} className="player-row">
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
            ))}
          </div>
        </div>
      </div>

      <div className="stars-background">
        <div className="stars-container">
          <div className="stars"></div>
          <div className="stars2"></div>
          <div className="stars3"></div>
        </div>
      </div>
    </div>
  )
}

export default ProfilePage

