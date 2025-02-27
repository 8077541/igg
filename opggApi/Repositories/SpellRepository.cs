using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using opggApi.Dtos.Spell;
using opggApi.Interfaces;
using opggApi.Mappers;
using opggApi.Models;

namespace opggApi.Repositories
{
    public class SpellRepository(HttpClient httpClient) : ISpellRepository
    {
        private readonly HttpClient _httpClient = httpClient;

        public Task<List<SpellModel>> AddSpellsToDb(List<SpellModel> runes)
        {
            throw new NotImplementedException();
        }

        public Task<List<SpellModel>> AddSpellsToParticipant(ParticipantModel participant)
        {
            throw new NotImplementedException();
        }

        public Task<SpellModel> GetSpell(int id)
        {
            throw new NotImplementedException();
        }

        public async Task<List<SpellModel>> GetSpells()
        {
            var response = await _httpClient.GetAsync(
                "https://ddragon.leagueoflegends.com/cdn/15.4.1/data/en_US/summoner.json"
            );
            response.EnsureSuccessStatusCode();
            var content =
                await response.Content.ReadFromJsonAsync<SpellResponseDto>()
                ?? throw new Exception("Error");
            var spells = SpellMapper.MapSpellDtosToSpellModels([.. content.Data.Values]);
            // TODO: Create a mapper to map the content to a list of SpellModel objects

            return spells;
        }
    }
}
