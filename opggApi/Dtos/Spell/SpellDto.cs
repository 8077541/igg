using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace opggApi.Dtos.Spell
{
    public class SpellDto
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string Tooltip { get; set; }
        public int MaxRank { get; set; }
        public List<double> Cooldown { get; set; }
        public string CooldownBurn { get; set; }
        public List<int> Cost { get; set; }
        public string CostBurn { get; set; }
        public Dictionary<string, object> DataValues { get; set; }
        public List<List<double?>> Effect { get; set; }
        public List<string> EffectBurn { get; set; }
        public List<VariableDto> Vars { get; set; }
        public string Key { get; set; }
        public int SummonerLevel { get; set; }
        public List<string> Modes { get; set; }
        public string CostType { get; set; }
        public string MaxAmmo { get; set; }
        public List<int> Range { get; set; }
        public string RangeBurn { get; set; }
        public SpellImageDto Image { get; set; }
        public string Resource { get; set; }
    }
}
