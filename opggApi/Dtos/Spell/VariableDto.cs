using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace opggApi.Dtos.Spell
{
    public class VariableDto
    {
        public string Link { get; set; }
        public List<double> Coeff { get; set; }
        public string Key { get; set; }
    }
}
