using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using opggApi.Dtos.Match;
using opggApi.Interfaces;
using opggApi.Models;

namespace opggApi.Mappers
{
    public class MatchMapper()
    {
        public static MatchModel MatchDtoToMatch(MatchDto matchDto)
        {
            return new MatchModel
            {
                MatchId = matchDto.Metadata.MatchId,
                GameCreation = matchDto.Info.GameCreation,
                GameDuration = matchDto.Info.GameDuration,
                GameStartTimeStamp = matchDto.Info.GameStartTimestamp,
                GameEndTimeStamp = matchDto.Info.GameEndTimestamp,
                GameId = matchDto.Info.GameId,
                GameMode = matchDto.Info.GameMode,
                GameName = matchDto.Info.GameName,
                GameType = matchDto.Info.GameType,
                GameVersion = matchDto.Info.GameVersion,
                MapId = matchDto.Info.MapId,
                PlatformId = matchDto.Info.PlatformId,
                QueueId = matchDto.Info.QueueId,
                Participants = ParticipantDtoToParticipant(matchDto.Info.Participants),
            };
        }

        public static List<ParticipantModel> ParticipantDtoToParticipant(
            List<ParticipantDto> participantDto
        )
        {
            var result = new List<ParticipantModel> { };
            foreach (var participant in participantDto)
            {
                result.Add(
                    new ParticipantModel
                    {
                        Assists = participant.Assists,
                        ChampLevel = participant.ChampLevel,
                        ChampionId = participant.ChampionId,
                        ChampionName = participant.ChampionName,
                        DamageDealtToTurrets = participant.DamageDealtToTurrets,
                        DamageDealtToObjectives = participant.DamageDealtToObjectives,
                        Deaths = participant.Deaths,
                        GoldEarned = participant.GoldEarned,
                        GoldSpent = participant.GoldSpent,
                        IndividualPosition = participant.IndividualPosition,
                        Kills = participant.Kills,
                        Lane = participant.Lane,
                        Item0 = participant.Item0,
                        Item1 = participant.Item1,
                        Item2 = participant.Item2,
                        Item3 = participant.Item3,
                        Item4 = participant.Item4,
                        Item5 = participant.Item5,
                        Item6 = participant.Item6,
                        MagicDamageDealt = participant.MagicDamageDealt,
                        MagicDamageDealtToChampions = participant.MagicDamageDealtToChampions,
                        MagicDamageTaken = participant.MagicDamageTaken,
                        PhysicalDamageDealt = participant.PhysicalDamageDealt,
                        PhysicalDamageDealtToChampions = participant.PhysicalDamageDealtToChampions,
                        PhysicalDamageTaken = participant.PhysicalDamageTaken,
                        Puuid = participant.Puuid,
                        RiotIdGameName = participant.RiotIdGameName,
                        RiotIdTagLine = participant.RiotIdTagline,
                        TotalDamageDealt = participant.TotalDamageDealt,
                        TotalDamageDealtToChampions = participant.TotalDamageDealtToChampions,
                        TotalDamageTaken = participant.TotalDamageTaken,
                        TotalMinionsKilled = participant.TotalMinionsKilled,
                        TrueDamageDealt = participant.TrueDamageDealt,
                        TrueDamageDealtToChampions = participant.TrueDamageDealtToChampions,
                        TrueDamageTaken = participant.TrueDamageTaken,
                        Spell1Casts = participant.Spell1Casts,
                        Spell2Casts = participant.Spell2Casts,
                        Spell3Casts = participant.Spell3Casts,
                        Spell4Casts = participant.Spell4Casts,
                        Kda = participant.Challenges.Kda,
                        VisionScore = participant.VisionScore,
                        LargestMultiKill = participant.LargestMultiKill,
                        ParticipantId = participant.ParticipantId,
                        Win = participant.Win,
                        StatRune0 = participant.Perks.StatPerks.Defense,
                        StatRune1 = participant.Perks.StatPerks.Flex,
                        StatRune2 = participant.Perks.StatPerks.Offense,
                        PrimaryRune0 = participant.Perks.Styles[0].Selections[0].Perk,
                        PrimaryRune0Stat0 = participant.Perks.Styles[0].Selections[0].Var1,
                        PrimaryRune0Stat1 = participant.Perks.Styles[0].Selections[0].Var2,
                        PrimaryRune0Stat2 = participant.Perks.Styles[0].Selections[0].Var3,
                        PrimaryRune1 = participant.Perks.Styles[0].Selections[1].Perk,
                        PrimaryRune1Stat0 = participant.Perks.Styles[0].Selections[1].Var1,
                        PrimaryRune1Stat1 = participant.Perks.Styles[0].Selections[1].Var2,
                        PrimaryRune1Stat2 = participant.Perks.Styles[0].Selections[1].Var3,
                        PrimaryRune2 = participant.Perks.Styles[0].Selections[2].Perk,
                        PrimaryRune2Stat0 = participant.Perks.Styles[0].Selections[2].Var1,
                        PrimaryRune2Stat1 = participant.Perks.Styles[0].Selections[2].Var2,
                        PrimaryRune2Stat2 = participant.Perks.Styles[0].Selections[2].Var3,
                        PrimaryRune3 = participant.Perks.Styles[0].Selections[3].Perk,
                        PrimaryRune3Stat0 = participant.Perks.Styles[0].Selections[3].Var1,
                        PrimaryRune3Stat1 = participant.Perks.Styles[0].Selections[3].Var2,
                        PrimaryRune3Stat2 = participant.Perks.Styles[0].Selections[3].Var3,
                        SecondaryRune0 = participant.Perks.Styles[1].Selections[0].Perk,
                        SecondaryRune0Stat0 = participant.Perks.Styles[1].Selections[0].Var1,
                        SecondaryRune0Stat1 = participant.Perks.Styles[1].Selections[0].Var2,
                        SecondaryRune0Stat2 = participant.Perks.Styles[1].Selections[0].Var3,
                        SecondaryRune1 = participant.Perks.Styles[1].Selections[1].Perk,
                        SecondaryRune1Stat0 = participant.Perks.Styles[1].Selections[1].Var1,
                        SecondaryRune1Stat1 = participant.Perks.Styles[1].Selections[1].Var2,
                        SecondaryRune1Stat2 = participant.Perks.Styles[1].Selections[1].Var3,
                        SummonerSpell1 = participant.Summoner1Id,
                        SummonerSpell2 = participant.Summoner2Id,
                    }
                );
            }
            return result;
        }
    }
}