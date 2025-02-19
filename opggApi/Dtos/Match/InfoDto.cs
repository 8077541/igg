using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace opggApi.Dtos.Matches
{
    public class InfoDto
    {
        public string EndOfGameResult { get; set; } = string.Empty;
        public long GameCreation { get; set; }

        public long GameDuration { get; set; }

        public long GameEndTimestamp { get; set; }

        public long GameId { get; set; }

        public string GameMode { get; set; } = string.Empty;

        public string GameName { get; set; } = string.Empty;
        public long GameStartTimestamp { get; set; }

        public string GameType { get; set; } = string.Empty;
        public string GameVersion { get; set; } = string.Empty;
        public int MapId { get; set; }

        public List<ParticipantDto>? Participants { get; set; }
        public string PlatformId { get; set; } = string.Empty;
        public int QueueId { get; set; }
        public List<TeamDto>? Teams { get; set; }

        public string TournamentCode { get; set; } = string.Empty;
    }
}
