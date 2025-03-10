using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace opggApi.Models
{
    public class RuneModel
    {
        [Key]
        public int Id { get; set; }
        public int ParticipantId { get; set; }
        public int RuneId { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public string Image { get; set; } = string.Empty;
    }
}
