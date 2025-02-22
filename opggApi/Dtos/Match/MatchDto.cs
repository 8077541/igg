using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace opggApi.Dtos.Match
{
    public class MatchDto
    {
        public MetadataDto? Metadata { get; set; }
        public InfoDto? Info { get; set; }

    }
}