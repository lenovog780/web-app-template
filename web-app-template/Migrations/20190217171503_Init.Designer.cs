﻿// <auto-generated />
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;
using web_app_template.Database;

namespace web_app_template.Migrations
{
    [DbContext(typeof(AppDbContext))]
    [Migration("20190217171503_Init")]
    partial class Init
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.SerialColumn)
                .HasAnnotation("ProductVersion", "2.2.2-servicing-10034")
                .HasAnnotation("Relational:MaxIdentifierLength", 63);

            modelBuilder.Entity("web_app_template.Database.Models.ApplicationUser", b =>
                {
                    b.Property<string>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnName("id");

                    b.Property<string>("DisplayName")
                        .IsRequired()
                        .HasColumnName("display_name");

                    b.Property<string>("Email")
                        .HasColumnName("email")
                        .HasMaxLength(30);

                    b.Property<string>("Provider")
                        .IsRequired()
                        .HasColumnName("provider");

                    b.Property<string>("UId")
                        .IsRequired()
                        .HasColumnName("uid");

                    b.HasKey("Id")
                        .HasName("pk_application_users");

                    b.ToTable("application_users");
                });
#pragma warning restore 612, 618
        }
    }
}
