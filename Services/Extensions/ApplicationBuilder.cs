namespace TherapeuticStudio.Services.Extensions
{
    using Microsoft.AspNetCore.Builder;
    using Microsoft.AspNetCore.Identity;
    using Microsoft.EntityFrameworkCore;
    using Microsoft.Extensions.DependencyInjection;

    using System;
    using System.Linq;
    using System.Threading.Tasks;

    using TherapeuticStudio.Data;
    using TherapeuticStudio.Data.Entity;
    using TherapeuticStudio.Data.Enums;
    using TherapeuticStudio.Models;

    using static Data.ApiConstants;

    public static class ApplicationBuilder
    {
        public static IApplicationBuilder PrepareDatabase(
            this IApplicationBuilder app)
        {
            using var serviceScope = app.ApplicationServices.CreateScope();
            var services = serviceScope.ServiceProvider;

            MigrateDatabase(services);

            SeedTherapists(services);
            SeedProcedures(services);
            SeedClients(services);

            SeedAdministrator(services);

            return app;
        }

        private static void MigrateDatabase(IServiceProvider services)
        {
            var data = services.GetRequiredService<ApplicationDbContext>();

            data.Database.Migrate();
        }

        private static void SeedTherapists(IServiceProvider services)
        {
            var data = services.GetRequiredService<ApplicationDbContext>();

            if (data.Therapists.Any())
            {
                return;
            }

            data.Therapists.AddRange(new[]
            {
                new Тherapist {
                    FirstName = "John",
                    LastName = "Dinson",
                    PositionType = (PositionType)1,
                    RoleType = (RoleType)1
                },
                new Тherapist {
                   FirstName = "Peter",
                    LastName = "Petrov",
                    PositionType = (PositionType)5,
                    RoleType = (RoleType)3
                },
                new Тherapist {
                    FirstName = "Eva",
                    LastName = "Nikova",
                    PositionType = (PositionType)2,
                    RoleType = (RoleType)4
                }
            });

            data.SaveChanges();
        }

        private static void SeedProcedures(IServiceProvider services)
        {
            var data = services.GetRequiredService<ApplicationDbContext>();

            if (data.Procedures.Any())
            {
                return;
            }

            data.Procedures.AddRange(new[]
            {
                new Procedure {
                    Name = "Physiotherapy",
                    Duration = 60,
                    Price = 10
                },
                new Procedure {
                    Name = "massage",
                    Duration = 30,
                    Price = 15
                },
                new Procedure {
                     Name = "Magnetic",
                    Duration = 20,
                    Price = 25
                }
            });

            data.SaveChanges();
        }

        private static void SeedClients(IServiceProvider services)
        {
            var data = services.GetRequiredService<ApplicationDbContext>();

            if (data.Clients.Any())
            {
                return;
            }

            data.Clients.AddRange(new[]
            {
                new Client {
                    FirstName = "John",
                    LastName = "Dinson",
                    UCN = "FFFFFFFFFF"

                },
                new Client {
                   FirstName = "Peter",
                    LastName = "Petrov",
                    UCN = "FFFFFFFFFF"
                },
                new Client {
                    FirstName = "Eva",
                    MiddleName ="Denimireva",
                    LastName = "Nikova",
                    UCN = "FFFFFFFFFF"
                }
            });

            data.SaveChanges();
        }

        private static void SeedAdministrator(IServiceProvider services)
        {
            var userManager = services.GetRequiredService<UserManager<ApplicationUser>>();
            var roleManager = services.GetRequiredService<RoleManager<IdentityRole>>();

            Task
                .Run(async () =>
                {
                    if (await roleManager.RoleExistsAsync(AdministratorRoleName))
                    {
                        return;
                    }

                    var role = new IdentityRole { Name = AdministratorRoleName };

                    await roleManager.CreateAsync(role);

                    const string adminEmail = "admin@studio.com";
                    const string adminPassword = "admin123";

                    var user = new ApplicationUser
                    {
                        Email = adminEmail,
                        UserName = adminEmail,
                        FullName = "Admin"
                    };

                    await userManager.CreateAsync(user, adminPassword);

                    await userManager.AddToRoleAsync(user, role.Name);
                })
                .GetAwaiter()
                .GetResult();
        }

    }
}
