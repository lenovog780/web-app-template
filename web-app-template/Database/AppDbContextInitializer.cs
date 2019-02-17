using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using web_app_template.Database.Models;

namespace web_app_template.Database
{
    public class AppDbContextInitializer : IAppDbContextInitializer
    {
        private readonly AppDbContext _context;

        public AppDbContextInitializer(AppDbContext context)
        {
            _context = context;
        }

        public bool EnsureCreated()
        {
            return _context.Database.EnsureCreated();
        }

        public void Migrate()
        {
            _context.Database.Migrate();
        }

        public async Task Seed()
        {
            var email = "user@test.com";
            if (await _context.ApplicationUsers.SingleOrDefaultAsync(x => x.Email == email) == null)
            {
                var user = new ApplicationUser
                {
                    UId = "test",
                    Email = email,
                    DisplayName = "John Doe",
                    Provider = "test"
                };

                await _context.ApplicationUsers.AddAsync(user);
            }

            _context.SaveChanges();
        }
    }

    public interface IAppDbContextInitializer
    {
        bool EnsureCreated();
        void Migrate();
        Task Seed();
    }
}
