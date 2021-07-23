namespace TherapeuticStudio.Data
{
    using IdentityServer4.EntityFramework.Options;

    using Microsoft.AspNetCore.ApiAuthorization.IdentityServer;
    using Microsoft.EntityFrameworkCore;
    using Microsoft.Extensions.Options;

    using TherapeuticStudio.Data.Entity;
    using TherapeuticStudio.Models;

    public class ApplicationDbContext : ApiAuthorizationDbContext<ApplicationUser>
    {
        public DbSet<Тherapist> Therapists { get; set; }

        public DbSet<Client> Clients { get; set; }

        public DbSet<Procedure> Procedures { get; set; }

        public DbSet<Payment> Payments { get; set; }

        public ApplicationDbContext(
            DbContextOptions options,
            IOptions<OperationalStoreOptions> operationalStoreOptions)
                : base(options, operationalStoreOptions)
        {
            if (this.Database.IsSqlServer())
            {
                this.Database.Migrate();
            }
        }
    }
}
