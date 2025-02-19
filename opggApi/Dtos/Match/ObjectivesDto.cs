using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace opggApi.Dtos.Matches
{
    public class ObjectivesDto
    {
        public ObjectiveDto? Baron { get; set; }
        public ObjectiveDto? Champion { get; set; }
        public ObjectiveDto? Dragon { get; set; }
        public ObjectiveDto? Horde { get; set; }
        public ObjectiveDto? Inhibitor { get; set; }
        public ObjectiveDto? RiftHerald { get; set; }
        public ObjectiveDto? Tower { get; set; }
    }
}
