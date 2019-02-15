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
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly RoleManager<IdentityRole> _roleManager;

        public AppDbContextInitializer(AppDbContext context, UserManager<ApplicationUser> userManager, RoleManager<IdentityRole> roleManager)
        {
            _userManager = userManager;
            _context = context;
            _roleManager = roleManager;
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
            if (await _userManager.FindByEmailAsync(email) == null)
            {
                var user = new ApplicationUser
                {
                    UserName = email,
                    Email = email,
                    EmailConfirmed = true,
                    GivenName = "John Doe"
                };

                await _userManager.CreateAsync(user, "P2ssw0rd!");
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
