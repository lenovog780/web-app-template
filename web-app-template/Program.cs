using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using web_app_template.Database;

namespace web_app_template
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var config = new ConfigurationBuilder()
                 .SetBasePath(Directory.GetCurrentDirectory())
                 .AddJsonFile("appsettings.json")
                 .Build();

            var host = BuildHost(config["serverBindingUrl"], args);

            using (var scope = host.Services.CreateScope())
            {
                var dbInitializer = scope.ServiceProvider.GetRequiredService<IAppDbContextInitializer>();
                var env = scope.ServiceProvider.GetRequiredService<IHostingEnvironment>();
                // Apply any pending migrations
                dbInitializer.Migrate();
                if (env.IsDevelopment())
                {
                    // Seed the database in development mode
                    dbInitializer.Seed().GetAwaiter().GetResult();
                }
            }

            host.Run();
        }

        public static IWebHost BuildHost(string serverBindingUrl, string[] args) =>
            WebHost.CreateDefaultBuilder(args)
            .UseContentRoot(Directory.GetCurrentDirectory())
            .UseUrls(serverBindingUrl)
                .UseStartup<Startup>()
                .Build();
    }
}
