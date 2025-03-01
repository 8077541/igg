using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using opggApi.Data;
using opggApi.Dtos.Spell;
using opggApi.Interfaces;
using opggApi.Mappers;
using opggApi.Models;

namespace opggApi.Repositories
{
    public class SpellRepository(HttpClient httpClient, ApplicationDbContext context)
        : ISpellRepository
    {
        private readonly HttpClient _httpClient = httpClient;
        private readonly ApplicationDbContext _context = context;

        public async Task<List<SpellModel>> AddSpellsToDb(List<SpellModel> spells)
        {
            foreach (var spell in spells)
            {
                var check = await _context.SpellModel.FindAsync(spell.Key);
                if (check != null)
                {
                    throw new Exception("Spell already exists");
                }
                _context.SpellModel.Add(spell);
            }
            await _context.SaveChangesAsync();
            return spells;
        }

        public async Task<List<SpellModel>> AddSpellsToParticipant(ParticipantModel participant)
        {
            var spells = new List<int> { participant.SummonerSpell1, participant.SummonerSpell2 };
            var mappedSpells = new List<SpellModel>();
            foreach (var spell in spells)
            {
                var runeModel = await GetSpell(spell);
                if (runeModel != null)
                {
                    mappedSpells.Add(runeModel);
                }
            }
            return mappedSpells;
        }

        public async Task<SpellModel> GetSpell(int id)
        {
            var spell = await _context.SpellModel.Where(s => s.Key == id).FirstOrDefaultAsync();
            if (spell == null)
            {
                return null;
            }
            return spell;
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

            foreach (var spell in spells)
            {
                var check = await GetSpell(spell.Key);
                if (check == null)
                {
                    _context.SpellModel.Add(spell);
                    await _context.SaveChangesAsync();
                }
            }

            return spells;
        }
    }
}
