using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace opggApi.Dtos.Match
{
    public class PerksDto
    {
        public PerksStatsDto? StatPerks { get; set; }
        public List<PerkStyleDto>? Styles { get; set; }
    }
}
