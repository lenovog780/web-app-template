using Microsoft.AspNetCore.Identity;

namespace web_app_template.Database.Models
{
    public class ApplicationUser : IdentityUser
    {
        public string GivenName { get; set; }
    }
}