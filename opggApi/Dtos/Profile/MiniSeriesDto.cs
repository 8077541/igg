using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace opggApi.Dtos.Profile
{
    public class MiniSeriesDto
    {
        public int Losses { get; set; }
        public string Progress { get; set; } = string.Empty;

        public int Target { get; set; }

        public int Wins { get; set; }
    }
}
