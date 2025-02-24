using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using opggApi.Models;

namespace opggApi.Interfaces
{
    public interface IRuneRepository
    {
        Task<List<RuneModel>> GetRunes();
        Task<RuneModel> GetRune(int id);

        Task<List<RuneModel>> AddRunesToDb(List<RuneModel> runes);
        Task<List<RuneModel>> AddRunesToParticipant(ParticipantModel participant);
    }
}
