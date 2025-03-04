"use client"

import { useEffect, useState } from "react"
import { useParams, useSearchParams } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, Shield, ChevronDown, ChevronUp, Award } from "lucide-react"

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

export default function ProfilePage() {
  const params = useParams()
  const searchParams = useSearchParams()
  const [profile, setProfile] = useState(null)
  const [expandedMatch, setExpandedMatch] = useState(null)

  const slug = params.slug
  const [username, tag] = slug.split("-")
  const region = searchParams.get("region") || "kr"

  useEffect(() => {
    setProfile({
      ...mockProfile,
      username: username || mockProfile.username,
      tag: tag || mockProfile.tag,
      region: region.toUpperCase(),
    })
  }, [username, tag, region])

  if (!profile) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black flex items-center justify-center">
        <div className="text-white text-xl">Loading profile...</div>
      </div>
    )
  }

  const getRankColor = (tier) => {
    const colors = {
      IRON: "text-gray-400",
      BRONZE: "text-amber-700",
      SILVER: "text-gray-300",
      GOLD: "text-yellow-400",
      PLATINUM: "text-teal-400",
      DIAMOND: "text-blue-400",
    }
    return colors[tier] || "text-white"
  }

  const getTeamColor = (isBlueTeam) => {
    return isBlueTeam ? "from-blue-500/20 to-blue-600/20" : "from-red-500/20 to-red-600/20"
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Link href="/" className="text-white hover:text-purple-300 inline-flex items-center">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Search
          </Link>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Profile Section */}
          <div className="w-full lg:w-1/3">
            {/* Summoner Info Card */}
            <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-20 h-20 rounded-full bg-amber-500 flex items-center justify-center text-3xl font-bold text-white">
                  {profile.username.charAt(0).toUpperCase()}
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-white">{profile.username}</h1>
                  <div className="text-gray-400">#{profile.tag}</div>
                  <div className="mt-1 px-2 py-1 rounded bg-gray-700 text-sm inline-block">{profile.region}</div>
                </div>
              </div>
              <div className="text-gray-300">
                <div className="flex items-center gap-2 mb-2">
                  <Shield className="h-4 w-4" />
                  <span>Level {profile.level}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Award className="h-4 w-4" />
                  <span className={`font-bold ${getRankColor(profile.rank.tier)}`}>
                    {profile.rank.tier} {profile.rank.division} ({profile.rank.lp} LP)
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Match History Section */}
          <div className="w-full lg:w-2/3">
            <div className="space-y-3">
              {profile.recentMatches.map((match) => (
                <div key={match.id} className="bg-gray-800 rounded-lg shadow-lg overflow-hidden">
                  {/* Match Summary */}
                  <button
                    onClick={() => setExpandedMatch(expandedMatch === match.id ? null : match.id)}
                    className="w-full text-left p-4 flex flex-col md:flex-row md:items-center gap-4"
                  >
                    <div className="flex items-center gap-4 flex-1">
                      <div className="relative">
                        <div className="w-14 h-14 rounded-full bg-gray-700 flex items-center justify-center text-xl font-bold text-white">
                          {match.champion.charAt(0)}
                        </div>
                        <div className="absolute -bottom-1 -right-1 bg-gray-900 text-xs px-1 rounded-full">
                          {match.championLevel}
                        </div>
                      </div>
                      <div>
                        <div className="text-white font-medium">{match.champion}</div>
                        <div className="text-sm text-gray-400">{match.gameType}</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-6">
                      <div className="text-center">
                        <div className={`font-bold ${match.win ? "text-blue-400" : "text-red-400"}`}>
                          {match.win ? "Victory" : "Defeat"}
                        </div>
                        <div className="text-sm text-gray-400">{match.timeAgo}</div>
                      </div>

                      <div className="text-center">
                        <div className="text-white font-bold">
                          {match.kills}/{match.deaths}/{match.assists}
                        </div>
                        <div className="text-sm text-gray-400">{match.kda} KDA</div>
                      </div>

                      <div className="text-center hidden md:block">
                        <div className="text-white font-bold">{match.cs}</div>
                        <div className="text-sm text-gray-400">{match.csPerMin} CS/m</div>
                      </div>

                      <div className="ml-2">
                        {expandedMatch === match.id ? (
                          <ChevronUp className="h-5 w-5 text-gray-400" />
                        ) : (
                          <ChevronDown className="h-5 w-5 text-gray-400" />
                        )}
                      </div>
                    </div>
                  </button>

                  {/* Expanded Match Details */}
                  {expandedMatch === match.id && (
                    <div className="border-t border-gray-700">
                      {/* Team Stats */}
                      <div className="grid grid-cols-2 gap-1 p-2 text-sm bg-gray-900/50">
                        <div className="text-center text-blue-400">
                          <div className="font-bold">
                            {match.teams.blue.reduce((acc, player) => acc + player.kills, 0)} Kills
                          </div>
                          <div>
                            {match.teams.blue.reduce((acc, player) => acc + player.gold, 0).toLocaleString()} Gold
                          </div>
                        </div>
                        <div className="text-center text-red-400">
                          <div className="font-bold">
                            {match.teams.red.reduce((acc, player) => acc + player.kills, 0)} Kills
                          </div>
                          <div>
                            {match.teams.red.reduce((acc, player) => acc + player.gold, 0).toLocaleString()} Gold
                          </div>
                        </div>
                      </div>

                      {/* Teams */}
                      {["blue", "red"].map((team) => (
                        <div key={team} className={`bg-gradient-to-r ${getTeamColor(team === "blue")}`}>
                          {match.teams[team].map((player, index) => (
                            <div key={index} className="flex items-center gap-4 p-3 hover:bg-gray-800/20">
                              <div className="relative">
                                <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center font-bold text-white">
                                  {player.champion.charAt(0)}
                                </div>
                                <div className="absolute -bottom-1 -right-1 bg-gray-900 text-xs px-1 rounded-full">
                                  {player.level}
                                </div>
                              </div>
                              <div className="min-w-[120px]">
                                <div className="text-white font-medium">{player.name}</div>
                                <div className="text-sm text-gray-400">{player.champion}</div>
                              </div>
                              <div className="text-gray-300 text-sm">
                                {player.kills}/{player.deaths}/{player.assists}
                              </div>
                              <div className="text-gray-300 text-sm hidden md:block">{player.cs} CS</div>
                              <div className="text-gray-300 text-sm hidden md:block">
                                {player.gold.toLocaleString()} g
                              </div>
                              <div className="flex gap-1 ml-auto">
                                {player.items.map((item, i) => (
                                  <div key={i} className="w-6 h-6 bg-gray-700 rounded"></div>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

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

