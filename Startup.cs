namespace TherapeuticStudio
{
    using IdentityServer4.Services;

    using Microsoft.AspNetCore.Authentication;
    using Microsoft.AspNetCore.Builder;
    using Microsoft.AspNetCore.Hosting;
    using Microsoft.AspNetCore.SpaServices.AngularCli;
    using Microsoft.Extensions.Configuration;
    using Microsoft.Extensions.DependencyInjection;
    using Microsoft.Extensions.Hosting;

    using System;
    using System.Net;
    using System.Threading.Tasks;

    using TherapeuticStudio.Services.Clients;
    using TherapeuticStudio.Services.Extensions;
    using TherapeuticStudio.Services.Payments;
    using TherapeuticStudio.Services.Procedures;
    using TherapeuticStudio.Services.Schedulers;
    using TherapeuticStudio.Services.Therapists;

    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        public void ConfigureServices(IServiceCollection services)
        {
            services
                .ConfigureSqlContext(Configuration);

            services
                .AddDatabaseDeveloperPageExceptionFilter();

            services
                .ConfigureAddDefaultIdentity();

            services
                .ConfigureAddIdentityServer();

            services
                .AddAuthentication()
                .AddIdentityServerJwt();

            services
                .AddControllersWithViews();
            services
                .AddRazorPages();

            services
                .AddTransient<ITherapistService, TherapistService>()
                .AddTransient<IProcedureService, ProcedureService>()
                .AddTransient<IClientService, ClientService>()
                .AddTransient<ISchedulerService, SchedulerService>()
                .AddTransient<IPaymentService, PaymentService>();

            services.AddSpaStaticFiles(configuration =>
            {
                configuration.RootPath = "ClientApp/dist";
            });
        }

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            app.PrepareDatabase();

            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseMigrationsEndPoint();
            }
            else
            {
                app.UseExceptionHandler("/Errror");
                app.UseHsts();
            }

            app.UseHttpsRedirection();
            app.UseStaticFiles();

            if (!env.IsDevelopment())
            {
                app.UseSpaStaticFiles();
            }

            app.UseRouting();

            app.UseAuthentication();
            app.UseAuthorization();

            app.UseStatusCodePages(context => {
                var response = context.HttpContext.Response;
                if (response.StatusCode == (int)HttpStatusCode.Unauthorized ||
                    response.StatusCode == (int)HttpStatusCode.Forbidden)
                    response.Redirect("/authentication/login");
                return Task.CompletedTask;
            });

            app.UseIdentityServer();
            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllerRoute(
                    name: "default",
                    pattern: "{controller}/{action=Index}/{id?}");
                endpoints.MapRazorPages();
            });

            app.UseSpa(spa =>
            {
                spa.Options.SourcePath = "ClientApp";

                if (env.IsDevelopment())
                {
                    spa.UseAngularCliServer(npmScript: "start");
                    spa.Options.StartupTimeout = TimeSpan.FromMinutes(3);
                }
            });
        }
    }
}
