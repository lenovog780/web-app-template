using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using web_app_template.Database;
using web_app_template.Database.Models;

namespace web_app_template.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly AppDbContext _context;

        public UserController(AppDbContext context)
        {
            _context = context;
        }

        [HttpPost("~/api/user/checkUid")]
        [Produces("application/json")]
        public async Task<IActionResult> Post(string uid)
        {
            try
            {
                
            }
            catch
            {
                return StatusCode(500);
            }

            return Ok(new { UidExists = true });
        }

        [HttpPost("~/api/user/storeUser")]
        [Produces("application/json")]
        public async Task<IActionResult> Put([FromBody]ApplicationUser model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                var user = await _context.ApplicationUsers.SingleOrDefaultAsync(x => x.UId == model.UId);
                if (user == null)
                {
                    _context.ApplicationUsers.Add(model);
                    await _context.SaveChangesAsync();
                }
                else
                {
                    if (user.Email != model.Email || user.DisplayName != model.DisplayName || user.Provider != model.Provider)
                    {
                        user.Email = model.Email;
                        user.DisplayName = model.DisplayName;
                        user.Provider = model.Provider;

                        _context.Update(user);
                        await _context.SaveChangesAsync();
                    }
                }
            }
            catch
            {
                return StatusCode(500);
            }

            return Ok();
        }
    }
}