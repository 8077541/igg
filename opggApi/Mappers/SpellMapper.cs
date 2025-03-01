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
        public static List<SpellModel> MapSpellDtosToSpellModels(List<SpellDto> spellDto)
        {
            List<SpellModel> spellModels = new List<SpellModel>();

            foreach (var spell in spellDto)
            {
                SpellModel spellModel = new SpellModel();
                spellModel.Name = spell.Name;
                spellModel.Description = spell.Description;
                spellModel.Cooldown = spell.Cooldown;
                spellModel.Tooltip = spell.Tooltip;
                spellModel.Range = spell.Range;
                spellModel.FullImage = spell.Image.Full;
                spellModel.SpriteImage = spell.Image.Sprite;
                spellModel.Key = Convert.ToInt32(spell.Key);

                spellModels.Add(spellModel);
            }

            return spellModels;
        }
    }
}
