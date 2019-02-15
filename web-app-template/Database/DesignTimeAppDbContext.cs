using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using Microsoft.Extensions.Configuration;

namespace web_app_template.Database
{
    public class DesignTimeAppDbContext : IDesignTimeDbContextFactory<AppDbContext>
    {
        public AppDbContext CreateDbContext(string[] args)
        {
            var config = new ConfigurationBuilder()
                  .SetBasePath(System.IO.Directory.GetCurrentDirectory())
                  .AddJsonFile("appsettings.json")
                  .Build();

            var options = new DbContextOptionsBuilder<AppDbContext>();
            options.UseNpgsql(config.GetConnectionString("defaultConnection"));

            return new AppDbContext(options.Options);
        }
    }
}
