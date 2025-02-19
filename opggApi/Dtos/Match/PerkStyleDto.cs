using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace opggApi.Dtos.Matches
{
    public class PerkStyleDto
    {
        public string Description { get; set; } = string.Empty;
        public List<PerkStyleSelectionDto> Selections { get; set; } =
            new List<PerkStyleSelectionDto>();
        public int Style { get; set; }
    }
}
