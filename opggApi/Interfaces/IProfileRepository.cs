using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using opggApi.Dtos.Profile;
using opggApi.Models;

namespace opggApi.Interfaces
{
    public interface IProfileRepository
    {
        Task<ProfileModel> AddProfileToDb(ProfileModel profile);
        Task<ProfileModel> GetProfileFromDb(string gameName, string tagLine);
        Task<AccountDto> GetPuuid(string gameName, string tagLine);
        Task<SummonerDto> GetSummoner(AccountDto account, string region);
        Task<List<LeagueEntryDto>> GetRankeds(SummonerDto summoner, string region);
        Task<ProfileModel> UpdateProfile(ProfileModel profile);
    }
}
//TEST COMMENT
