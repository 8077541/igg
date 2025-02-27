using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using opggApi.Interfaces;

namespace opggApi.Controllers
{
    [ApiController]
    [Route("api/spell")]
    public class SpellController(ISpellRepository spellRepository) : ControllerBase
    {
        private readonly ISpellRepository _spellRepository = spellRepository;

        [HttpGet("GetSpells")]
        public async Task<IActionResult> GetSpells()
        {
            var spells = await _spellRepository.GetSpells();

            if (spells == null)
            {
                return NotFound();
            }

            return Ok(spells);
        }
    }
}
