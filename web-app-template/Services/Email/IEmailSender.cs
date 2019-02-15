using System.Threading.Tasks;

namespace web_app_template.Services.Email
{
    public interface IEmailSender
    {
        Task SendEmailAsync(string toEmail, string subject, string htmlMessage, string textMessage = null);
    }
}