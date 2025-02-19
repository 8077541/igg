using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace opggApi.Dtos.Profile
{
    public class AccountDto
    {
        public string Puuid { get; set; } = string.Empty;

        public string GameName { get; set; } = string.Empty;

        public string TagLine { get; set; } = string.Empty;
    }
}
