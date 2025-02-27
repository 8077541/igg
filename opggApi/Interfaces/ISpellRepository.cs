using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using opggApi.Dtos.Spell;
using opggApi.Models;

namespace opggApi.Interfaces
{
    public interface ISpellRepository
    {
        Task<List<SpellModel>> GetSpells();
        Task<SpellModel> GetSpell(int id);

        Task<List<SpellModel>> AddSpellsToDb(List<SpellModel> runes);
        Task<List<SpellModel>> AddSpellsToParticipant(ParticipantModel participant);
    }
}
