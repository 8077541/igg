using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using opggApi.Dtos.Match;
using opggApi.Interfaces;
using opggApi.Mappers;
using opggApi.Models;
using opggApi.Services;

namespace opggApi.Repositories
{
    public class MatchRepository(HttpClient httpClient, ApiKeyService apiKeyService)
        : IMatchRepository
    {
        private readonly ApiKeyService _apiKeyService = apiKeyService;
        private readonly HttpClient _httpClient = httpClient;

        public async Task<MatchModel> GetMatch(string matchId)
        {
            var riotApi = _apiKeyService.ApiKey;
            var response = await _httpClient.GetAsync(
                $"https://europe.api.riotgames.com/lol/match/v5/matches/{matchId}?api_key={riotApi}"
            );
            var match = await response.Content.ReadFromJsonAsync<MatchDto>();
            if (match == null)
            {
                throw new Exception("Match not found");
            }
            var matchModel = MatchMapper.MatchDtoToMatch(match);
            return matchModel;
        }

        public async Task<List<string>> GetMatchIds(string puuid)
        {
            var riotApi = _apiKeyService.ApiKey;
            var response = await _httpClient.GetAsync(
                $"https://europe.api.riotgames.com/lol/match/v5/matches/by-puuid/{puuid}/ids?start=0&count=20&api_key={riotApi}"
            );
            var matchIds = await response.Content.ReadFromJsonAsync<List<string>>();
            if (matchIds == null)
            {
                throw new Exception("MatchIds not found");
            }
            return matchIds;
        }
    }
}
