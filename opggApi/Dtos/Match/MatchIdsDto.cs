using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace opggApi.Dtos
{
    public class MatchIdsDto
    {

        public List<string> MatchIds { get; set; } = new List<string>();
    }
}