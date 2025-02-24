using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace opggApi.Dtos.Rune
{
    public class TreeDto
    {
        public int Id { get; set; }
        public string Key { get; set; } = string.Empty;
        public string Icon { get; set; } = string.Empty;
        public string Name { get; set; } = string.Empty;

        public List<RunesDto> Slots { get; set; } = new List<RunesDto>();
    }
}
