using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using opggApi.Dtos.Profile;
using opggApi.Interfaces;
using opggApi.Mappers;
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

        public async Task<SummonerDto> GetSummoner(AccountDto account, string region)
        {
            var riotApi = _apiKeyService.ApiKey;
            var response = await _httpClient.GetAsync(
                $"https://{region}.api.riotgames.com/lol/summoner/v4/summoners/by-puuid/{account.Puuid}?api_key={riotApi}"
            );
            var summonerModel =
                await response.Content.ReadFromJsonAsync<SummonerDto>()
                ?? throw new Exception("Summoner not found");
            return summonerModel;
        }

        public async Task<List<LeagueEntryDto>> GetRankeds(SummonerDto summoner, string region)
        {
            var riotApi = _apiKeyService.ApiKey;
            var response = await _httpClient.GetAsync(
                $"https://{region}.api.riotgames.com/lol/league/v4/entries/by-summoner/{summoner.Id}?api_key={riotApi}"
            );
            if (!response.IsSuccessStatusCode)
            {
                throw new Exception("Rankeds not found");
            }
            var leagueEntryModel = await response.Content.ReadFromJsonAsync<List<LeagueEntryDto>>();
            if (leagueEntryModel == null)
            {
                throw new Exception("Rankeds not found");
            }
            return leagueEntryModel;
        }

        public Task<ProfileModel> UpdateProfile(ProfileModel profile)
        {
            throw new NotImplementedException();
        }

        public async Task<ProfileModel> GetFullProfile(
            string gameName,
            string tagLine,
            string region
        )
        {
            var account = await GetPuuid(gameName, tagLine);
            var summoner = await GetSummoner(account, region);
            var rankeds = await GetRankeds(summoner, region);
            var profile = ProfileMapper.DtoToProfile(account, summoner);
            profile = ProfileMapper.LeagueEntryToProfile(profile, rankeds);
            return profile;
        }
    }
}
