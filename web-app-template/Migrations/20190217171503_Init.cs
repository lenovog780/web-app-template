using Microsoft.EntityFrameworkCore.Migrations;

namespace web_app_template.Migrations
{
    public partial class Init : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "application_users",
                columns: table => new
                {
                    id = table.Column<string>(nullable: false),
                    uid = table.Column<string>(nullable: false),
                    display_name = table.Column<string>(nullable: false),
                    email = table.Column<string>(maxLength: 30, nullable: true),
                    provider = table.Column<string>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_application_users", x => x.id);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "application_users");
        }
    }
}
