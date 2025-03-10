using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace opggApi.Models
{
    public class SpellModel
    {
        [Key]
        public int Id { get; set; }
        public int Key { get; set; }

        public int ParticipantId { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string Tooltip { get; set; }
        public List<double> Cooldown { get; set; }
        public List<int> Range { get; set; }

        public string FullImage { get; set; }
        public string SpriteImage { get; set; }
    }
}
