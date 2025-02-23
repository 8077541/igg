using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using opggApi.Dtos.Match;
using opggApi.Models;

namespace opggApi.Interfaces
{
    public interface IMatchRepository
    {
        Task<List<string>> GetMatchIds(string puuid);
        Task<MatchModel> GetMatch(string matchId);
    }
}