using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using opggApi.Dtos.Rune;
using opggApi.Interfaces;
using opggApi.Mappers;
using opggApi.Models;

namespace opggApi.Repositories
{
    public class RuneRepository(HttpClient httpClient) : IRuneRepository
    {
        private readonly HttpClient _httpClient = httpClient;

        public Task<List<RuneModel>> AddRunesToDb(List<RuneModel> runes)
        {
            throw new NotImplementedException();
        }

        public Task<List<RuneModel>> AddRunesToParticipant(ParticipantModel participant)
        {
            throw new NotImplementedException();
        }

        public Task<RuneModel> GetRune(int id)
        {
            throw new NotImplementedException();
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
                return runes;
            }
            throw new Exception("Error");
        }
    }
}
