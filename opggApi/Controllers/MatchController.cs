using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using opggApi.Interfaces;

namespace opggApi.Controllers
{
    [Microsoft.AspNetCore.Components.Route("api/match")]
    [ApiController]
    public class MatchController(
        IMatchRepository matchRepository,
        IRuneRepository runeRepository,
        ISpellRepository spellRepository,
        ILogger<MatchController> logger
    ) : ControllerBase
    {
        private readonly IMatchRepository _matchRepository = matchRepository;
        private readonly IRuneRepository _runeRepository = runeRepository;
        private readonly ISpellRepository _spellRepository = spellRepository;
        private readonly ILogger<MatchController> _logger = logger;

        [HttpGet("getMatch")]
        public async Task<IActionResult> GetMatch([FromQuery] string matchId)
        {
            try
            {
                var match = await _matchRepository.GetMatchFromDb(matchId);
                if (match != null)
                {
                    _logger.LogInformation("Match found in database");
                    return Ok(match);
                }
                else
                {
                    var matchData = await _matchRepository.GetMatch(matchId);
                    _logger.LogInformation("Fetching match from repo");
                    Console.WriteLine(matchData);
                    if (matchData == null)
                    {
                        return NotFound();
                    }
                    foreach (var participant in matchData.Participants)
                    {
                        participant.Runes = await _runeRepository.AddRunesToParticipant(
                            participant
                        );
                        participant.Spells = await _spellRepository.AddSpellsToParticipant(
                            participant
                        );
                    }
                    return Ok(matchData);
                }
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpGet("getMatchIds")]
        public async Task<IActionResult> GetMatchIds([FromQuery] string puuid)
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
