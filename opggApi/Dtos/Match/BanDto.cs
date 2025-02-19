using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace opggApi.Dtos.Matches
{
    public class BanDto
    {
        public int ChampionId { get; set; }
        public int PickTurn { get; set; }
    }
}
