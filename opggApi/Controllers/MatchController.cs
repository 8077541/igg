using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using opggApi.Interfaces;

namespace opggApi.Controllers
{
    [Microsoft.AspNetCore.Components.Route("api/match")]
    [ApiController]
    public class MatchController(IMatchRepository matchRepository) : ControllerBase
    {
        private readonly IMatchRepository _matchRepository = matchRepository;

        [HttpGet("getMatch")]
        public async Task<IActionResult> GetMatch(string matchId)
        {
            try
            {
                var match = await _matchRepository.GetMatch(matchId);
                return Ok(match);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpGet("getMatchIds")]
        public async Task<IActionResult> GetMatchIds(string puuid)
        {
            try
            {
                var matchIds = await _matchRepository.GetMatchIds(puuid);
                return Ok(matchIds);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }
    }
}
