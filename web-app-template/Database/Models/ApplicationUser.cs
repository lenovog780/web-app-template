using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations;

namespace web_app_template.Database.Models
{
    public class ApplicationUser
    {
        public string Id { get; set; }

        [Required]
        public string UId { get; set; }
        
        [Required]
        [MinLength(3)]
        public string DisplayName { get; set; }

        [DataType(DataType.EmailAddress)]
        [StringLength(30, MinimumLength = 0)]
        public string Email { get; set; }

        [Required]
        public string Provider { get; set; }
    }
}