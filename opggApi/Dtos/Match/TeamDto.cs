using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace opggApi.Dtos.Matches
{
    public class TeamDto
    {
        public List<BanDto> Bans { get; set; } = new List<BanDto>();
        public ObjectivesDto Objectives { get; set; } = new ObjectivesDto();
        public int TeamId { get; set; }
        public bool Win { get; set; }
    }
}
