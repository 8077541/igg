using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using opggApi.Dtos.Spell;
using opggApi.Models;

namespace opggApi.Mappers
{
    public class SpellMapper
    {
        public List<SpellModel> MapSpellDtosToSpellModels(SpellDto spellDto)
        {
            List<SpellModel> spellModels = new List<SpellModel>();

            SpellModel spellModel = new SpellModel();
            spellModel.Name = spellDto.Name;
            spellModel.Description = spellDto.Description;
            spellModel.Cooldown = spellDto.Cooldown;
            spellModel.Tooltip = spellDto.Tooltip;
            spellModel.Range = spellDto.Range;
            spellModel.FullImage = spellDto.Image.Full;
            spellModel.SpriteImage = spellDto.Image.Sprite;

            return spellModels;
        }
    }
}
