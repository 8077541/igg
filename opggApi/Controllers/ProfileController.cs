using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Components;
using Microsoft.AspNetCore.Mvc;
using opggApi.Interfaces;

namespace opggApi.Controllers
{
    [Microsoft.AspNetCore.Components.Route("api/profile")]
    [ApiController]
    public class ProfileController(IProfileRepository profileRepository) : ControllerBase
    {
        private readonly IProfileRepository _profileRepository = profileRepository;

        [HttpGet("getProfile")]
        public async Task<IActionResult> GetProfile(string gameName, string tagLine)
        {
            try
            {
                var profile = await _profileRepository.GetProfileFromDb(gameName, tagLine);
                return Ok(profile);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }
    }
}
