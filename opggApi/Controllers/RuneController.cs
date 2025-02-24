using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using opggApi.Interfaces;

namespace opggApi.Controllers
{
    [Microsoft.AspNetCore.Components.Route("api/rune")]
    [ApiController]
    public class RuneController(IRuneRepository runeRepository) : ControllerBase
    {
        private readonly IRuneRepository _runeRepository = runeRepository;

        [HttpGet("getRunes")]
        public async Task<IActionResult> GetRunes()
        {
            try
            {
                var runes = await _runeRepository.GetRunes();
                return Ok(runes);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }
    }
}
