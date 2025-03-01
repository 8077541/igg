using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using opggApi.Data;
using opggApi.Dtos.Match;
using opggApi.Interfaces;
using opggApi.Mappers;
using opggApi.Models;
using opggApi.Services;

namespace opggApi.Repositories
{
    public class MatchRepository(
        HttpClient httpClient,
        ApiKeyService apiKeyService,
        ApplicationDbContext context,
        IRuneRepository runeRepository,
        ISpellRepository spellRepository
    ) : IMatchRepository
    {
        private readonly ApplicationDbContext _context = context;
        private readonly ApiKeyService _apiKeyService = apiKeyService;
        private readonly HttpClient _httpClient = httpClient;
        private readonly IRuneRepository _runeRepository = runeRepository;
        private readonly ISpellRepository _spellRepository = spellRepository;

        public async Task<MatchModel> AddMatchToDb(MatchModel match)
        {
            await _context.MatchModel.AddAsync(match);
            await _context.SaveChangesAsync();
            return match;
        }

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

        public async Task<MatchModel> GetMatchFromDb(string matchId)
        {
            return await _context
                .MatchModel.Include(p => p.Participants)
                .Where(m => m.MatchId == matchId)
                .FirstOrDefaultAsync();
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
