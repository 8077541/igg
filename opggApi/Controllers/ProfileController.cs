using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Components;
using Microsoft.AspNetCore.Mvc;
using opggApi.Dtos.Profile;
using opggApi.Interfaces;

namespace opggApi.Controllers
{
    [Microsoft.AspNetCore.Components.Route("api/profile")]
    [ApiController]
    public class ProfileController(IProfileRepository profileRepository) : ControllerBase
    {
        private readonly IProfileRepository _profileRepository = profileRepository;

        [HttpGet("getPuuid")]
        public async Task<IActionResult> GetPuuid(string gameName, string tagLine)
        {
            try
            {
                var profile = await _profileRepository.GetPuuid(gameName, tagLine);
                return Ok(profile);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpGet("getSummoner")]
        public async Task<IActionResult> GetSummoner(AccountDto account, string region)
        {
            try
            {
                var profile = await _profileRepository.GetSummoner(account, region);
                return Ok(profile);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpGet("getRankeds")]
        public async Task<IActionResult> GetRankeds(SummonerDto summoner, string region)
        {
            try
            {
                var profile = await _profileRepository.GetRankeds(summoner, region);
                return Ok(profile);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpGet("getFullProfile")]
        public async Task<IActionResult> GetFullProfile(
            string gameName,
            string tagLine,
            string region
        )
        {
            try
            {
                var profile = await _profileRepository.GetFullProfile(gameName, tagLine, region);
                return Ok(profile);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }
    }
}
