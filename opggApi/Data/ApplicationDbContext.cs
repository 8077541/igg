using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using opggApi.Models;

namespace opggApi.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options) { }

        public DbSet<RuneModel> RuneModel { get; set; }
        public DbSet<MatchModel> MatchModel { get; set; }
        public DbSet<ParticipantModel> ParticipantModel { get; set; }
        public DbSet<ProfileModel> ProfileModel { get; set; }
        public DbSet<SpellModel> SpellModel { get; set; }
    }
}
