using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using opggApi.Data;
using opggApi.Dtos.Rune;
using opggApi.Interfaces;
using opggApi.Mappers;
using opggApi.Models;

namespace opggApi.Repositories
{
    public class RuneRepository(HttpClient httpClient, ApplicationDbContext context)
        : IRuneRepository
    {
        private readonly HttpClient _httpClient = httpClient;
        private readonly ApplicationDbContext _context = context;

        public async Task<List<RuneModel>> AddRunesToDb(List<RuneModel> runes)
        {
            foreach (var rune in runes)
            {
                var check = await _context.RuneModel.FindAsync(rune.Id);
                if (check != null)
                {
                    throw new Exception("Rune already exists");
                }
                _context.RuneModel.Add(rune);
            }
            await _context.SaveChangesAsync();
            return runes;
        }

        public async Task<List<RuneModel>> AddRunesToParticipant(ParticipantModel participant)
        {
            var runes = new List<int>
            {
                participant.PrimaryRune0,
                participant.PrimaryRune1,
                participant.PrimaryRune2,
                participant.PrimaryRune3,
                participant.SecondaryRune0,
                participant.SecondaryRune1,
            };
            var mappedRunes = new List<RuneModel>();
            foreach (var rune in runes)
            {
                var runeModel = await GetRune(rune);
                if (runeModel != null)
                {
                    mappedRunes.Add(runeModel);
                }
            }
            return mappedRunes;
        }

        public async Task<RuneModel> GetRune(int id)
        {
            var rune = await _context.RuneModel.Where(r => r.RuneId == id).FirstOrDefaultAsync();
            if (rune == null)
            {
                return null;
            }
            return rune;
        }

        public async Task<List<RuneModel>> GetRunes()
        {
            var response = await _httpClient.GetAsync(
                "https://ddragon.leagueoflegends.com/cdn/15.4.1/data/en_US/runesReforged.json"
            );
            var runesDto = await response.Content.ReadFromJsonAsync<List<TreeDto>>();
            if (runesDto != null)
            {
                var runes = RuneMapper.DtoToRunes(runesDto);
                foreach (var rune in runes)
                {
                    var check = await _context.RuneModel.FindAsync(rune.Id);
                    if (check == null)
                    {
                        _context.RuneModel.Add(rune);
                        await _context.SaveChangesAsync();
                    }
                }
                return runes;
            }
            throw new Exception("Error");
        }
    }
}
