using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using opggApi.Dtos.Profile;
using opggApi.Interfaces;
using opggApi.Models;
using opggApi.Services;

namespace opggApi.Repositories
{
    public class ProfileRepository(HttpClient httpClient, ApiKeyService apiKeyService)
        : IProfileRepository
    {
        private readonly ApiKeyService _apiKeyService = apiKeyService;
        private readonly HttpClient _httpClient = httpClient;

        public Task<ProfileModel> AddProfileToDb(ProfileModel profile)
        {
            throw new NotImplementedException();
        }

        public Task<ProfileModel> GetProfileFromDb(string gameName, string tagLine)
        {
            throw new NotImplementedException();
        }

        public async Task<AccountDto> GetPuuid(string gameName, string tagLine)
        {
            var riotApi = _apiKeyService.ApiKey;
            var response = await _httpClient.GetAsync(
                $"https://europe.api.riotgames.com/riot/account/v1/accounts/by-riot-id/{gameName}/{tagLine}?api_key={riotApi}"
            );
            var accountModel = await response.Content.ReadFromJsonAsync<AccountDto>();

            if (accountModel == null)
            {
                throw new Exception("Account not found");
            }

            return accountModel;
        }

        public Task<List<LeagueEntryDto>> GetRankeds(SummonerDto summoner, string region)
        {
            throw new NotImplementedException();
        }

        public Task<SummonerDto> GetSummoner(AccountDto account, string region)
        {
            throw new NotImplementedException();
        }

        public Task<ProfileModel> UpdateProfile(ProfileModel profile)
        {
            throw new NotImplementedException();
        }
    }
}
