namespace TherapeuticStudio.Services.Extensions
{
    using Microsoft.AspNetCore.Identity;
    using Microsoft.EntityFrameworkCore;
    using Microsoft.Extensions.Configuration;
    using Microsoft.Extensions.DependencyInjection;

    using System.Linq;

    using TherapeuticStudio.Data;
    using TherapeuticStudio.Models;

    public static class ConfigureService
    {
        public static void ConfigureSqlContext(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddDbContext<ApplicationDbContext>(options =>
                options.UseSqlServer(configuration.GetConnectionString("SqlConnection")));
        }

        public static void ConfigureAddDefaultIdentity(this IServiceCollection services)
        {
            services
                .AddDefaultIdentity<ApplicationUser>(options =>
            {
                options.SignIn.RequireConfirmedAccount = false;
                options.Password.RequireDigit = false;
                options.Password.RequireLowercase = false;
                options.Password.RequireNonAlphanumeric = false;
                options.Password.RequireUppercase = false;
            })
                 .AddRoles<IdentityRole>()
                .AddEntityFrameworkStores<ApplicationDbContext>();
        }

        public static void ConfigureAddIdentityServer(this IServiceCollection services)
        {
            services.AddIdentityServer()
                .AddApiAuthorization<ApplicationUser, ApplicationDbContext>(options =>
                {
                    options.IdentityResources["openid"].UserClaims.Add("role");
                    options.ApiResources.Single().UserClaims.Add("role");
                });

            System.IdentityModel.Tokens.Jwt.JwtSecurityTokenHandler
                .DefaultInboundClaimTypeMap.Remove("role");
        }
    }
}
