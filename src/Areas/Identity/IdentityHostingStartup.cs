using Microsoft.AspNetCore.Hosting;
[assembly: HostingStartup(typeof(TherapeuticStudio.Areas.Identity.IdentityHostingStartup))]
namespace TherapeuticStudio.Areas.Identity
{
    using System;

    using Microsoft.AspNetCore.Hosting;
    using Microsoft.AspNetCore.Identity;
    using Microsoft.AspNetCore.Identity.UI;
    using Microsoft.EntityFrameworkCore;
    using Microsoft.Extensions.Configuration;
    using Microsoft.Extensions.DependencyInjection;

    using TherapeuticStudio.Data;
    using TherapeuticStudio.Models;

    public class IdentityHostingStartup : IHostingStartup
    {
        public void Configure(IWebHostBuilder builder)
        {
            builder.ConfigureServices((context, services) =>
            {
            });
        }
    }
}