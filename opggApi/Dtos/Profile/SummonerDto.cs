using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace opggApi.Dtos.Profile
{
    public class SummonerDto
    {
        public string Id { get; set; } = string.Empty;
        public string AccountId { get; set; } = string.Empty;
        public string Puuid { get; set; } = string.Empty;
        public int ProfileIconId { get; set; }
        public long RevisionDate { get; set; }

        public long SummonerLevel { get; set; }
    }
}
