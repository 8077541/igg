using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using opggApi.Interfaces;

namespace opggApi.Controllers
{
    public class SpellController(ISpellRepository spellRepository) : ControllerBase
    {
        private readonly ISpellRepository _spellRepository = spellRepository;
    }
}
