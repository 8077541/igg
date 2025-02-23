using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace opggApi.Dtos.Match
{
    public class MetadataDto
    {
        public string DataVersion { get; set; } = string.Empty;
        public string MatchId { get; set; } = string.Empty;

        public List<string>? Participants { get; set; }
    }
}
