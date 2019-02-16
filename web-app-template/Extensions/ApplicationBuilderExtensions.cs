using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace web_app_template.Extensions
{
    public static class ApplicationBuilderExtensions
    {
        public static IServiceCollection AddFirebaseAuthentication(this IServiceCollection services, string issuer, string audience)
        {
            services.AddAuthentication(options =>
            {
                options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
            })
            .AddJwtBearer(options =>
            {
                options.Authority = issuer;
                options.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuer = true,
                    ValidIssuer = issuer,
                    ValidateAudience = true,
                    ValidAudience = audience,
                    ValidateLifetime = true
                };
            });
            return services;
        }

        public static IServiceCollection AddFirebaseAuthentication(this IServiceCollection services, string firebaseProject)
        {
            return services.AddFirebaseAuthentication("https://securetoken.google.com/" + firebaseProject, firebaseProject);
        }
    }
}
