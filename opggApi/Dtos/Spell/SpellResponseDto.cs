using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace opggApi.Dtos.Spell
{
    public class SpellResponseDto
    {
        public string Type { get; set; }
        public string Version { get; set; }
        public Dictionary<string, SpellDto> Data { get; set; }
    }
}
