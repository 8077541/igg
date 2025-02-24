using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace opggApi.Models
{
    public class MatchModel
    {
        [Key]
        public string? MatchId { get; set; }
        public long GameCreation { get; set; }
        public long GameDuration { get; set; }
        public long GameStartTimeStamp { get; set; }
        public long GameEndTimeStamp { get; set; }
        public long GameId { get; set; }
        public string? GameMode { get; set; }
        public string? GameName { get; set; }
        public string? GameType { get; set; }
        public string? GameVersion { get; set; }
        public int MapId { get; set; }
        public string? PlatformId { get; set; }
        public int QueueId { get; set; }
        public List<ParticipantModel>? Participants { get; set; }
    }
}
