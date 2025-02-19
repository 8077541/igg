using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace opggApi.Models
{
    public class ProfileModel
    {
        [Key]
        public string Puuid { get; set; } = string.Empty;
        public string SummonerId { get; set; } = string.Empty;
        public string AccountId { get; set; } = string.Empty;
        public string GameName { get; set; } = string.Empty;
        public string TagLine { get; set; } = string.Empty;
        public int ProfileIconId { get; set; }
        public long SummonerLevel { get; set; }

        public string SoloTier { get; set; } = string.Empty;
        public string SoloRank { get; set; } = string.Empty;
        public int SoloLeaguePoints { get; set; }
        public int SoloWins { get; set; }
        public int SoloLosses { get; set; }
        public bool SoloHotStreak { get; set; }

        public string FlexTier { get; set; } = string.Empty;
        public string FlexRank { get; set; } = string.Empty;
        public int FlexLeaguePoints { get; set; }
        public int FlexWins { get; set; }
        public int FlexLosses { get; set; }
        public bool FlexHotStreak { get; set; }
    }
}
